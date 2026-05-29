import { useEffect, useState } from "react";
import {
  type AiChatSortRequest,
  type AiChatSortStage,
} from "../../data/aiChatSortConfig";
import { prototypeAssets, prototypeText } from "../../data/prototypeContent";
import { CubeScenePlaceholder } from "../three/CubeScenePlaceholder";
import { cubeSceneTheme } from "../three/cubeSceneTheme";
import { AiChatSortPanel } from "./AiChatSortPanel";
import { AnimatedButton } from "../ui/AnimatedButton";
import { ArrowGlyph } from "../ui/ArrowGlyph";
import { GlassIconButton } from "../ui/GlassIconButton";

type SearchScreenProps = {
  onOpenStoryDetail: () => void;
  isActive?: boolean;
};

function getOrbitStatWidthClass(id: string) {
  if (id === "comments") {
    return "w-[64px]";
  }

  if (id === "reactions") {
    return "w-[69px]";
  }

  return "w-[79px]";
}

export function SearchScreen({ onOpenStoryDetail, isActive = true }: SearchScreenProps) {
  const [chatSortRequest, setChatSortRequest] = useState<AiChatSortRequest | null>(null);
  const [chatPanelResetId, setChatPanelResetId] = useState(0);
  const [exitOrbitViewRequestId, setExitOrbitViewRequestId] = useState(0);
  const [isOrbitView, setIsOrbitView] = useState(false);
  const [isParallaxViewEnabled, setIsParallaxViewEnabled] = useState<boolean>(
    () => cubeSceneTheme.orbitView.parallax.defaultEnabled,
  );

  useEffect(() => {
    if (!isOrbitView) {
      setIsParallaxViewEnabled(cubeSceneTheme.orbitView.parallax.defaultEnabled);
    }
  }, [isOrbitView]);

  const handleSortStageComplete = (stage: AiChatSortStage) => {
    setChatSortRequest((currentRequest) => ({
      requestId: (currentRequest?.requestId ?? 0) + 1,
      stage,
    }));
  };

  const handleBackToCubeMap = () => {
    setChatSortRequest(null);
    setChatPanelResetId((resetId) => resetId + 1);
    setExitOrbitViewRequestId((requestId) => requestId + 1);
  };

  return (
    <section
      className={`screen-fill ${isActive ? "" : "pointer-events-none opacity-0"}`}
      data-node-id="15:88"
      data-name="02 Screen - Cube View Search"
      aria-hidden={!isActive}
    >
      <CubeScenePlaceholder
        sceneActive={isActive}
        chatSortRequest={chatSortRequest}
        exitOrbitViewRequestId={exitOrbitViewRequestId}
        parallaxViewEnabled={isActive && isOrbitView && isParallaxViewEnabled}
        onOrbitViewChange={setIsOrbitView}
        onParallaxViewUnavailable={() => setIsParallaxViewEnabled(false)}
        onOpenStoryDetail={onOpenStoryDetail}
      />

      {isOrbitView ? (
        <>
          <header
            className="pointer-events-none absolute left-[var(--viewport-center-x)] top-[max(calc(var(--safe-top)+96px),calc(var(--viewport-center-y)-720px))] z-20 flex h-[102px] w-[242px] -translate-x-1/2 flex-col items-center text-white"
            data-name="header/orbit-story-summary"
            aria-label={prototypeText.orbitTitle}
          >
            <div
              className="flex h-[48px] w-[145px] items-center justify-center rounded-full bg-[#d0d0d0] text-[32px] font-bold leading-[1.5] tracking-[-0.32px] text-[#333333]"
              data-name="header/orbit-story-title-pill"
            >
              {prototypeText.orbitTitle}
            </div>

            <div
              className="mt-[30px] flex h-[24px] w-[242px] items-center gap-[15px]"
              data-name="header/orbit-story-stats"
            >
              {prototypeText.orbitStats.map((stat) => (
                <div
                  key={stat.id}
                  className={`flex h-[24px] items-center gap-[6px] ${getOrbitStatWidthClass(stat.id)}`}
                  data-name={`header/orbit-stat-${stat.id}`}
                >
                  <span
                    className="material-symbols-outlined orbit-stat-symbol"
                    aria-hidden="true"
                  >
                    {stat.icon}
                  </span>
                  <span className="whitespace-nowrap text-center text-[16px] font-semibold leading-[1.5] tracking-[-0.16px] text-black/80">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </header>

          <AnimatedButton
            type="button"
            onClick={handleBackToCubeMap}
            className="absolute left-[calc(var(--safe-left)+32px)] top-[calc(var(--safe-top)+32px)] z-20 flex h-[54px] items-center justify-center gap-[8px] rounded-full bg-[#2c2c2d] px-[22px] text-[20px] font-medium leading-[1.5] text-white backdrop-blur-[18.29px]"
            data-name="button/back-to-cube-map"
            aria-label="Back to cube map"
            title="Back to cube map"
          >
            <ArrowGlyph className="rotate-180" />
            <span>Back</span>
          </AnimatedButton>

          <AnimatedButton
            type="button"
            onClick={() => setIsParallaxViewEnabled((isEnabled) => !isEnabled)}
            className="absolute left-[calc(var(--safe-right)-86px)] top-[calc(var(--safe-top)+32px)] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#2c2c2d] text-white backdrop-blur-[18.29px]"
            data-name="button/orbit-parallax-toggle"
            aria-label={isParallaxViewEnabled ? "Disable HeadTrack" : "Enable HeadTrack"}
            aria-pressed={isParallaxViewEnabled}
            title={isParallaxViewEnabled ? "Disable HeadTrack" : "Enable HeadTrack"}
          >
            <span
              className="material-symbols-outlined orbit-parallax-toggle-symbol"
              aria-hidden="true"
            >
              {isParallaxViewEnabled ? "visibility" : "visibility_off"}
            </span>
          </AnimatedButton>

          <AnimatedButton
            type="button"
            onClick={onOpenStoryDetail}
            className="absolute left-[var(--viewport-center-x)] top-[calc(var(--viewport-center-y)+360px)] z-20 flex h-[64px] w-[64px] -translate-x-1/2 items-center justify-center rounded-full bg-[#2c2c2d] text-white shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-[18px]"
            data-name="button/orbit-open-story-detail"
            aria-label="Open story detail"
            title="Open story detail"
          >
            <ArrowGlyph />
          </AnimatedButton>
        </>
      ) : (
        <>
          <nav
            className="absolute left-[var(--viewport-center-x)] top-[calc(var(--safe-top)+44px)] z-10 flex h-[66px] w-[397.46px] max-w-[calc(var(--viewport-width)-32px)] -translate-x-1/2 rounded-full p-[6px] backdrop-blur-[70px]"
            data-node-id="15:93"
            data-name="nav/cube-view-top-bar"
            aria-label="Cube View top menu"
          >
            <div className="flex w-full items-center justify-center gap-[5.49px]">
              <div
                className="flex h-[54px] w-[177px] items-center justify-center gap-[6px] rounded-[40.23px] bg-[#2c2c2d] px-[20px] py-[12px] text-white backdrop-blur-[36.57px]"
                data-node-id="15:95"
                data-name="nav/current-view-tab - Cube View"
              >
                <img src={prototypeAssets.cubeViewIcon} alt="" className="h-[24px] w-[24px]" />
                <span className="whitespace-nowrap text-[22px] font-medium leading-[1.5] tracking-[-0.22px]">
                  {prototypeText.currentView}
                </span>
              </div>

              <GlassIconButton
                iconSrc={prototypeAssets.personIcon}
                label="Profile"
                variant="light"
                className="!h-[54px] !w-[64px] border-0"
                nodeId="15:99"
                dataName="nav/icon-button - profile"
              />
              <GlassIconButton
                iconSrc={prototypeAssets.secondaryIcon01}
                label="Secondary action 1"
                variant="light"
                className="!h-[54px] !w-[64px] border-0"
                nodeId="15:101"
                dataName="nav/icon-button - secondary-action-01"
              />
              <GlassIconButton
                iconSrc={prototypeAssets.secondaryIcon02}
                label="Secondary action 2"
                variant="light"
                className="!h-[54px] !w-[64px] border-0"
                nodeId="15:104"
                dataName="nav/icon-button - secondary-action-02"
              />
            </div>
          </nav>

          <AiChatSortPanel
            key={chatPanelResetId}
            onSortStageComplete={handleSortStageComplete}
          />
        </>
      )}
    </section>
  );
}
