import { lazy, Suspense } from "react";

const CubeMapScene = lazy(() => import("./CubeMapScene"));

type CubeScenePlaceholderProps = {
  enabled?: boolean;
  highlightRequestId?: number;
  exitOrbitViewRequestId?: number;
  onOrbitViewChange?: (isOrbitView: boolean) => void;
};

export function CubeScenePlaceholder({
  enabled = true,
  highlightRequestId = 0,
  exitOrbitViewRequestId = 0,
  onOrbitViewChange,
}: CubeScenePlaceholderProps) {
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
    <Suspense fallback={null}>
      <CubeMapScene
        highlightRequestId={highlightRequestId}
        exitOrbitViewRequestId={exitOrbitViewRequestId}
        onOrbitViewChange={onOrbitViewChange}
      />
    </Suspense>
  );
}
