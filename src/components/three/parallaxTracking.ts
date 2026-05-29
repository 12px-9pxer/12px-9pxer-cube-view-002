import type { BlazeFaceModel, NormalizedFace } from "@tensorflow-models/blazeface";

export type ParallaxViewInput = {
  x: number;
  y: number;
  z: number;
};

export type ParallaxTrackingMode = "face" | "pointer";

export type ParallaxTrackingStatus = {
  mode: ParallaxTrackingMode;
  faceDetected: boolean | null;
  input: ParallaxViewInput;
};

export type ParallaxUnavailableReason = "insecure-context" | "media-unavailable";

export class ParallaxUnavailableError extends Error {
  reason: ParallaxUnavailableReason;

  constructor(reason: ParallaxUnavailableReason, message: string) {
    super(message);
    this.name = "ParallaxUnavailableError";
    this.reason = reason;
  }
}

export type ParallaxTrackingConfig = {
  fallbackToPointer: boolean;
  tracking: {
    scoreThreshold: number;
    smoothEye: number;
    smoothDistance: number;
    defaultDistance: number;
    horizontalYawWeight: number;
  };
  inputClamp: {
    x: readonly [number, number];
    y: readonly [number, number];
    z: readonly [number, number];
  };
  noFaceHoldMs: number;
};

export type ParallaxInputController = {
  mode: ParallaxTrackingMode;
  stop: () => void;
};

type CreateParallaxInputControllerOptions = {
  target: HTMLElement;
  config: ParallaxTrackingConfig;
  onView: (view: ParallaxViewInput) => void;
  onStatus?: (status: ParallaxTrackingStatus) => void;
  signal?: AbortSignal;
};

function clamp(value: number, [min, max]: readonly [number, number]) {
  return Math.min(max, Math.max(min, value));
}

function clampView(view: ParallaxViewInput, config: ParallaxTrackingConfig) {
  return {
    x: clamp(view.x, config.inputClamp.x),
    y: clamp(view.y, config.inputClamp.y),
    z: clamp(view.z, config.inputClamp.z),
  };
}

function getPoint(value: unknown) {
  if (!Array.isArray(value) || value.length < 2) {
    return null;
  }

  const [x, y] = value;

  if (typeof x !== "number" || typeof y !== "number") {
    return null;
  }

  return [x, y] as const;
}

function getFaceBoxCenter(face: NormalizedFace) {
  const faceWithBox = face as NormalizedFace & {
    topLeft?: unknown;
    bottomRight?: unknown;
  };
  const topLeft = getPoint(faceWithBox.topLeft);
  const bottomRight = getPoint(faceWithBox.bottomRight);

  if (!topLeft || !bottomRight) {
    return null;
  }

  return {
    x: (topLeft[0] + bottomRight[0]) / 2,
    y: (topLeft[1] + bottomRight[1]) / 2,
  };
}

function getFaceLandmarks(face: NormalizedFace) {
  const landmarks = face.landmarks;

  if (!Array.isArray(landmarks) || landmarks.length < 2) {
    return null;
  }

  const firstEye = getPoint(landmarks[0]);
  const secondEye = getPoint(landmarks[1]);
  const nose = getPoint(landmarks[2]);

  if (!firstEye || !secondEye) {
    return null;
  }

  return {
    firstEye,
    secondEye,
    nose,
  };
}

function installPointerParallaxFallback({
  target,
  config,
  onView,
  onStatus,
  signal,
}: CreateParallaxInputControllerOptions): ParallaxInputController {
  if (signal?.aborted) {
    throw new Error("Pointer parallax fallback was aborted before startup.");
  }

  let stopped = false;
  let abortHandler: (() => void) | null = null;

  const handlePointerMove = (event: PointerEvent) => {
    if (stopped) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    const view = clampView(
      {
        x: ((event.clientX - rect.left) / width) * 2 - 1,
        y: 1 - ((event.clientY - rect.top) / height) * 2,
        z: 1,
      },
      config,
    );

    onView(view);
    onStatus?.({ mode: "pointer", faceDetected: null, input: view });
  };

  const handlePointerLeave = () => {
    onView({ x: 0, y: 0, z: 1 });
    onStatus?.({ mode: "pointer", faceDetected: null, input: { x: 0, y: 0, z: 1 } });
  };

  const controller: ParallaxInputController = {
    mode: "pointer",
    stop: () => {
      stopped = true;
      target.removeEventListener("pointermove", handlePointerMove);
      target.removeEventListener("pointerleave", handlePointerLeave);
      if (abortHandler) {
        signal?.removeEventListener("abort", abortHandler);
      }
      onView({ x: 0, y: 0, z: 1 });
      onStatus?.({ mode: "pointer", faceDetected: null, input: { x: 0, y: 0, z: 1 } });
    },
  };

  target.addEventListener("pointermove", handlePointerMove);
  target.addEventListener("pointerleave", handlePointerLeave);
  abortHandler = () => controller.stop();
  signal?.addEventListener("abort", abortHandler, { once: true });
  onView({ x: 0, y: 0, z: 1 });
  onStatus?.({ mode: "pointer", faceDetected: null, input: { x: 0, y: 0, z: 1 } });

  return controller;
}

async function waitForVideoMetadata(video: HTMLVideoElement, signal?: AbortSignal) {
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA && video.videoWidth > 0) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Webcam metadata wait was aborted."));
      return;
    }

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Timed out waiting for webcam metadata."));
    }, 6000);

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      signal?.removeEventListener("abort", handleAbort);
    };

    const handleLoadedMetadata = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      reject(new Error("Failed to load webcam metadata."));
    };

    const handleAbort = () => {
      cleanup();
      reject(new Error("Webcam metadata wait was aborted."));
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    video.addEventListener("error", handleError, { once: true });
    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

async function createFaceParallaxTracker({
  target,
  config,
  onView,
  onStatus,
  signal,
}: CreateParallaxInputControllerOptions): Promise<ParallaxInputController> {
  if (!window.isSecureContext) {
    throw new ParallaxUnavailableError(
      "insecure-context",
      "Camera parallax requires a secure context.",
    );
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new ParallaxUnavailableError(
      "media-unavailable",
      "getUserMedia is unavailable in this browser context.",
    );
  }

  if (signal?.aborted) {
    throw new Error("Face parallax tracker was aborted before startup.");
  }

  let stopped = false;
  let animationFrame: number | null = null;
  let stream: MediaStream | null = null;
  let model: BlazeFaceModel | null = null;
  let smoothedEyes: [number, number, number, number] | null = null;
  let smoothedDistance: number | null = null;
  let lastFaceAt = performance.now();

  const video = document.createElement("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;

  const stop = () => {
    stopped = true;

    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    model?.dispose?.();
    model = null;
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    video.pause();
    video.srcObject = null;
    signal?.removeEventListener("abort", stop);
    onView({ x: 0, y: 0, z: 1 });
    onStatus?.({ mode: "face", faceDetected: false, input: { x: 0, y: 0, z: 1 } });
  };

  signal?.addEventListener("abort", stop, { once: true });

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
      },
    });

    if (stopped || signal?.aborted) {
      throw new Error("Face parallax tracker stopped before startup.");
    }

    video.srcObject = stream;
    await waitForVideoMetadata(video, signal);
    await video.play();

    if (stopped || signal?.aborted) {
      throw new Error("Face parallax tracker stopped before model startup.");
    }

    const [tf, blazeface] = await Promise.all([
      import("@tensorflow/tfjs-core"),
      import("@tensorflow-models/blazeface"),
      import("@tensorflow/tfjs-converter"),
      import("@tensorflow/tfjs-backend-webgl"),
    ]).then(([tfModule, blazefaceModule]) => [tfModule, blazefaceModule] as const);

    await tf.setBackend("webgl");
    await tf.ready();

    model = await blazeface.load({
      maxFaces: 1,
      scoreThreshold: config.tracking.scoreThreshold,
    });

    if (stopped || signal?.aborted) {
      throw new Error("Face parallax tracker stopped after model startup.");
    }
  } catch (error) {
    stop();
    throw error;
  }

  const tick = async () => {
    if (stopped || !model) {
      return;
    }

    try {
      const faces = await model.estimateFaces(video, false, true, true);

      if (stopped) {
        return;
      }

      const face = faces[0];
      const faceLandmarks = face ? getFaceLandmarks(face) : null;
      const width = Math.max(1, video.videoWidth);
      const height = Math.max(1, video.videoHeight);

      if (faceLandmarks) {
        const nextEyes: [number, number, number, number] = [
          faceLandmarks.firstEye[0],
          faceLandmarks.firstEye[1],
          faceLandmarks.secondEye[0],
          faceLandmarks.secondEye[1],
        ];

        if (!smoothedEyes) {
          smoothedEyes = nextEyes;
        } else {
          for (let index = 0; index < smoothedEyes.length; index += 1) {
            smoothedEyes[index] =
              smoothedEyes[index] * (1 - config.tracking.smoothEye) +
              nextEyes[index] * config.tracking.smoothEye;
          }
        }

        const eyeDistance = Math.hypot(
          smoothedEyes[0] - smoothedEyes[2],
          smoothedEyes[1] - smoothedEyes[3],
        );
        const nextDistance = eyeDistance / width;

        smoothedDistance =
          smoothedDistance === null
            ? nextDistance
            : smoothedDistance * (1 - config.tracking.smoothDistance) +
              nextDistance * config.tracking.smoothDistance;
        lastFaceAt = performance.now();

        const eyeCenterX = (smoothedEyes[0] + smoothedEyes[2]) / 2;
        const eyeCenterY = (smoothedEyes[1] + smoothedEyes[3]) / 2;
        const faceBoxCenter = getFaceBoxCenter(face);
        const horizontalCenterX = faceBoxCenter?.x ?? eyeCenterX;
        const noseOffsetX = faceLandmarks.nose
          ? ((faceLandmarks.nose[0] - eyeCenterX) / Math.max(1, eyeDistance)) *
            config.tracking.horizontalYawWeight
          : 0;

        const view = clampView(
          {
            x: (horizontalCenterX / width) * 2 - 1 + noseOffsetX,
            y: 1 - (eyeCenterY / height) * 2,
            z: config.tracking.defaultDistance / Math.max(0.0001, smoothedDistance),
          },
          config,
        );

        onView(view);
        onStatus?.({ mode: "face", faceDetected: true, input: view });
      } else if (performance.now() - lastFaceAt > config.noFaceHoldMs) {
        const view = { x: 0, y: 0, z: 1 };

        onView(view);
        onStatus?.({ mode: "face", faceDetected: false, input: view });
      }
    } catch (error) {
      console.warn("Face parallax tracking failed.", error);
      stop();
      return;
    }

    animationFrame = window.requestAnimationFrame(tick);
  };

  animationFrame = window.requestAnimationFrame(tick);

  return {
    mode: "face",
    stop,
  };
}

export async function createParallaxInputController(
  options: CreateParallaxInputControllerOptions,
): Promise<ParallaxInputController> {
  try {
    return await createFaceParallaxTracker(options);
  } catch (error) {
    if (error instanceof ParallaxUnavailableError) {
      throw error;
    }

    if (!options.config.fallbackToPointer) {
      throw error;
    }

    console.warn("Falling back to pointer parallax input.", error);
    return installPointerParallaxFallback(options);
  }
}
