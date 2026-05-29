export const cubeOrbitParallaxConfig = {
  // Default HeadTrack state when entering Single Cube Orbit View.
  defaultEnabled: false,
  // Use pointer input only after secure-context camera/model startup failures.
  fallbackToPointer: true,
  // Face tracking parameters aligned with the parallax-effect three.js example.
  tracking: {
    scoreThreshold: 0.85,
    // Keep webcam frames small so TFJS inference does not stall Three.js rendering.
    video: {
      width: 320,
      height: 240,
      frameRate: 24,
    },
    // Cap face inference independently from the Three.js render loop.
    maxFps: 24,
    // Time-based input smoothing. Lower values react faster, higher values smooth more.
    smoothEyeMs: 45,
    smoothDistanceMs: 120,
    smoothInputMs: 70,
    defaultDistance: 0.12,
    horizontalYawWeight: 0.35,
  },
  // Clamp normalized head input before it reaches the camera adapter.
  inputClamp: {
    x: [-1, 1],
    y: [-1, 1],
    z: [0.65, 1.45],
  },
  // Single tuning surface for HeadTrack camera response.
  camera: {
    // Scale horizontal/vertical head angles only. Distance z stays raw.
    headInputScale: {
      x: 2.6,
      y: 2,
    },
    // Flip axes if real-device movement feels reversed.
    invertX: false,
    invertY: false,
    // Relative horizontal head movement rotates the camera around controls.target.
    yawScale: 0.46,
    // Vertical and distance offsets in scene world units.
    positionScale: {
      y: 55,
      z: 70,
    },
    // Distance input also affects camera field of view.
    fovScale: 0.08,
    // Time-based camera follow. Lower values feel faster.
    responseMs: 55,
    // Smoothing used when returning to the neutral view.
    neutralReturnMs: 120,
  },
  // Delay before returning to neutral when no face is detected.
  noFaceHoldMs: 400,
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
    parallax: {
      ...cubeOrbitParallaxConfig,
    },
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
