import { lazy, Suspense } from "react";

const CubeCanvas = lazy(() => import("./CubeCanvas"));

type CubeScenePlaceholderProps = {
  enabled?: boolean;
};

export function CubeScenePlaceholder({ enabled = false }: CubeScenePlaceholderProps) {
  // 지금 Figma 배경 이미지 안에 Cube View 장면이 이미 포함되어 있습니다.
  // 추후 실제 3D 큐브 콘텐츠를 붙일 때 enabled를 true로 바꾸고 이 Canvas 내부를 교체하면 됩니다.
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
      <CubeCanvas />
    </Suspense>
  );
}

