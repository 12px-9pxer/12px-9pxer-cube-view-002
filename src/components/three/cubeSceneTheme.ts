// HeadTrack tuning surface. Adjust values here instead of touching scene code.
export const headTrackConfig = {
  enabled: {
    // Default HeadTrack state when entering Single Cube Orbit View.
    defaultOn: false,
    // Use pointer input only after secure-context camera/model startup failures.
    fallbackToPointer: true,
  },
  performance: {
    // Lower resolution reduces TFJS inference cost and stutter on slower devices.
    video: {
      width: 320,
      height: 240,
      frameRate: 24,
    },
    // Lower maxFps reduces GPU/CPU load. Higher maxFps updates tracking more often.
    maxFps: 24,
  },
  tracking: {
    // Higher scoreThreshold is stricter but may drop faces more often.
    scoreThreshold: 0.85,
    // Lower smoothing ms reacts faster. Higher smoothing ms reduces jitter.
    smoothEyeMs: 45,
    smoothDistanceMs: 120,
    smoothInputMs: 70,
    // Baseline face distance used to normalize forward/back movement.
    defaultDistance: 0.12,
    // Adds a small nose/eye offset signal for head yaw. Raise carefully to avoid jitter.
    horizontalYawWeight: 0.35,
    // Delay before returning to neutral when no face is detected.
    noFaceHoldMs: 400,
  },
  movement: {
    // Clamp normalized head input before it reaches the camera adapter.
    inputClamp: {
      x: [-1, 1],
      y: [-1, 1],
      z: [0.65, 1.45],
    },
    // Raise x for stronger left/right response. Raise y for stronger up/down response.
    headInputScale: {
      x: 2.0,
      y: 2.5,
    },
    // Flip axes if real-device movement feels reversed.
    invertX: false,
    invertY: false,
    // Raise yawScale for stronger horizontal orbit around the cube.
    yawScale: 0.86,
    // Raise y for more top/bottom reveal. Raise z for stronger forward/back distance.
    positionScale: {
      y: 120,
      z: 70,
    },
  },
  camera: {
    // Raise fovScale for stronger depth/zoom feel from forward/back movement.
    fovScale: 0.08,
    // Lower responseMs follows faster. Higher responseMs feels smoother.
    responseMs: 25,
    // Lower neutralReturnMs snaps back faster when tracking returns to center.
    neutralReturnMs: 100,
  },
} as const;

export const cubeOrbitParallaxConfig = {
  defaultEnabled: headTrackConfig.enabled.defaultOn,
  fallbackToPointer: headTrackConfig.enabled.fallbackToPointer,
  tracking: {
    scoreThreshold: headTrackConfig.tracking.scoreThreshold,
    video: headTrackConfig.performance.video,
    maxFps: headTrackConfig.performance.maxFps,
    smoothEyeMs: headTrackConfig.tracking.smoothEyeMs,
    smoothDistanceMs: headTrackConfig.tracking.smoothDistanceMs,
    smoothInputMs: headTrackConfig.tracking.smoothInputMs,
    defaultDistance: headTrackConfig.tracking.defaultDistance,
    horizontalYawWeight: headTrackConfig.tracking.horizontalYawWeight,
  },
  inputClamp: headTrackConfig.movement.inputClamp,
  camera: {
    headInputScale: headTrackConfig.movement.headInputScale,
    invertX: headTrackConfig.movement.invertX,
    invertY: headTrackConfig.movement.invertY,
    yawScale: headTrackConfig.movement.yawScale,
    positionScale: headTrackConfig.movement.positionScale,
    fovScale: headTrackConfig.camera.fovScale,
    responseMs: headTrackConfig.camera.responseMs,
    neutralReturnMs: headTrackConfig.camera.neutralReturnMs,
  },
  noFaceHoldMs: headTrackConfig.tracking.noFaceHoldMs,
} as const;
export const cubeSceneTheme = {
  background: "#d6d6d6",
  rendering: {
    toneMappingExposure: 0.9,
  },
  fog: {
    density: 0.0004,
  },
  camera: {
    fov: 20,
    near: 0.5,
    far: 2000,
    distance: 500,
    minDistance: 250,
    maxDistance: 800,
    offset: [108, 90, 108],
  },
  controls: {
    dampingFactor: 0.1,
    rotateSpeed: 0.55,
    zoomSpeed: 0.75,
    panSpeed: 0.65,
  },
  searchHighlightZoom: {
    durationMs: 500,
    distanceMultiplier: 0.7,
    targetPull: 0.12,
  },
  mapView: {
    baseColor: "#bfc1c3",
    opacityMaskStrength: 0,
    emissiveStrength: 0,
  },
  orbitView: {
    focusedScale: 4.5,
    cameraDistance: 500,
    minDistance: 500,
    maxDistance: 700,
    cameraOffset: [64, 42, 76],
    opacityMaskSrc: "/assets/models/cube%20mask%20textures/Cube%20Opacity%20Mask_2.png",
    opacityMaskTransitionLerp: 0.08,
    autoRotate: {
      enabled: true,
      speed: 0.55,
      resumeDelayMs: 1500,
    },
    parallax: cubeOrbitParallaxConfig,
    frontViewFade: {
      strength: 1.0,
      power: 2.4,
      alphaMultiplier: 0.38,
      saturationMultiplier: 0.8,
      transitionLerp: 0.08,
    },
    storyCube: {
      scale: 0.9,
      textureSrcs: [
        "/assets/models/story%20thumbnail/story%20thumbnail_001.png",
        "/assets/models/story%20thumbnail/story%20thumbnail_002.png",
        "/assets/models/story%20thumbnail/story%20thumbnail_003.png",
        "/assets/models/story%20thumbnail/story%20thumbnail_004.png",
        "/assets/models/story%20thumbnail/story%20thumbnail_005.png",
        "/assets/models/story%20thumbnail/story%20thumbnail_006.png",
      ],
    },
  },
  cube: {
    model: {
      src: "/assets/models/cube_blender.glb",
      opacityMaskSrc: "/assets/models/cube%20mask%20textures/Cube%20Opacity%20Mask.png",
      emissiveMaskSrc: "/assets/models/cube%20mask%20textures/Cube%20Emissive%20Mask.png",
    },
    radius: 0.45,
    segments: 2,
    opacity: 1,
    shader: {
      roughness: 0.1,
      metallic: 0,
      baseColorOverride: null as string | null,
      palette: ["#c1fff4", "#dafbae", "#b4aefa", "#b4d3ff", "#a4eaff", "#c8ffc1"],
      paletteMode: "spatial",
      subsurfaceColor: "#f7fffb",
      subsurfaceStrength: 0.5,
      wrap: 0.38,
      rimStrength: 0.9,
      rimPower: 2.4,
      transmissionStrength: 0.6,
      shadowStrength: 0.32,
      shadowSoftness: 0.58,
      shadowLift: 0.38,
      baseSaturation: 1.0,
      edgeSaturation: 1.5,
      centerWhiteness: 0.3,
      faceEdgePower: 1.35,
      colorContrast: 1.12,
      colorVibrance: 0.5,
      emissiveColor: "#d7e6ff",
      emissiveStrength: 2.5,
    },
    enterDelay: 220,
    enterStagger: 24,
    enterMaxStagger: 540,
    enterDuration: 520,
  },
  grid: {
    color: 0xc3c1c7,
    opacity: 0.4,
    backfaceHideEpsilon: 0.01,
  },
  hover: {
    spreadDistance: 18.2,
    spreadFalloffUnits: 8.5,
    spreadMinInfluence: 0.18,
    dimScale: 0.75,
    dimOpacityMultiplier: 1,
    positionLerp: 0.09,
    scaleLerp: 0.14,
    materialLerp: 0.12,
    collisionStep: 0.05,
    collisionPadding: 0.01,
    boundaryPadding: 0,
    highlightOpacity: 1,
    searchHighlightHoverScale: 1.08,
  },
  hoverGlow: {
    outlineColor: 0xffffff,
    glowColor: 0xd7e6ff,
    outlineOpacity: 0.95,
    glowOpacity: 0.7,
    outlineThickness: 1.0,
    glowRadius: 50,
    noiseStrength: 0.5,
    flowSpeed: 0.05,
    pulseSpeed: 1.35,
    fadeLerp: 0.16,
  },
  lights: {
    ambient: {
      color: 0xffffff,
      intensity: 0.5,
    },
    directional: [
      { color: 0xffffff, position: [2.2, 3.4, 2.1], intensity: 0.92 },
      { color: 0xffffff, position: [-2, 1.4, -2.6], intensity: 0.22 },
      { color: 0xffffff, position: [0.2, -2, 1.2], intensity: 0.1 },
    ],
  },
} as const;
