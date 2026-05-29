import { lazy, Suspense, useEffect, useState } from "react";
import type { ParallaxUnavailableReason } from "./parallaxTracking";
import { MinimalCubeLoader } from "../ui/MinimalCubeLoader";

const CubeMapScene = lazy(() => import("./CubeMapScene"));

type CubeScenePlaceholderProps = {
  enabled?: boolean;
  highlightRequestId?: number;
  exitOrbitViewRequestId?: number;
  parallaxViewEnabled?: boolean;
  onOrbitViewChange?: (isOrbitView: boolean) => void;
  onParallaxViewUnavailable?: (reason: ParallaxUnavailableReason) => void;
};

export function CubeScenePlaceholder({
  enabled = true,
  highlightRequestId = 0,
  exitOrbitViewRequestId = 0,
  parallaxViewEnabled = false,
  onOrbitViewChange,
  onParallaxViewUnavailable,
}: CubeScenePlaceholderProps) {
  const [isSceneReady, setIsSceneReady] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsSceneReady(false);
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        data-name="future-r3f-cube-scene-placeholder"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <CubeMapScene
          highlightRequestId={highlightRequestId}
          exitOrbitViewRequestId={exitOrbitViewRequestId}
          parallaxViewEnabled={parallaxViewEnabled}
          onOrbitViewChange={onOrbitViewChange}
          onParallaxViewUnavailable={onParallaxViewUnavailable}
          onSceneReady={() => setIsSceneReady(true)}
        />
      </Suspense>
      {!isSceneReady ? (
        <MinimalCubeLoader variant="scene" dataName="cube-scene/loading-indicator" />
      ) : null}
    </>
  );
}
