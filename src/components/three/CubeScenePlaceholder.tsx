import { lazy, Suspense, useEffect, useState } from "react";

const CubeMapScene = lazy(() => import("./CubeMapScene"));

type CubeScenePlaceholderProps = {
  enabled?: boolean;
  highlightRequestId?: number;
  exitOrbitViewRequestId?: number;
  onOrbitViewChange?: (isOrbitView: boolean) => void;
};

function CubeSceneLoader() {
  return (
    <div className="cube-scene-loader" data-name="cube-scene/loading-indicator" aria-hidden="true">
      <div className="cube-scene-loader-icon">
        <span />
        <span />
        <span />
      </div>
      <div className="cube-scene-loader-track">
        <span />
      </div>
    </div>
  );
}

export function CubeScenePlaceholder({
  enabled = true,
  highlightRequestId = 0,
  exitOrbitViewRequestId = 0,
  onOrbitViewChange,
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
          onOrbitViewChange={onOrbitViewChange}
          onSceneReady={() => setIsSceneReady(true)}
        />
      </Suspense>
      {!isSceneReady ? <CubeSceneLoader /> : null}
    </>
  );
}
