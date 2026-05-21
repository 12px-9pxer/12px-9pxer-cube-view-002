import { useState } from "react";
import { prototypeAssets, prototypeText } from "../../data/prototypeContent";
import { CubeScenePlaceholder } from "../three/CubeScenePlaceholder";
import { AnimatedButton } from "../ui/AnimatedButton";
import { ArrowGlyph } from "../ui/ArrowGlyph";
import { GlassIconButton } from "../ui/GlassIconButton";
import { UserStoryLogo } from "../ui/UserStoryLogo";

type SearchScreenProps = {
  onOpenStoryDetail: () => void;
};

export function SearchScreen({ onOpenStoryDetail }: SearchScreenProps) {
  const [query, setQuery] = useState("");

  const submitSearch = () => {
    // 현재 프로토타입에는 검색 결과 목록이 없으므로, 검색 제출은 상세 화면 진입으로 연결합니다.
    onOpenStoryDetail();
  };

  return (
    <section
      className="screen-fill"
      data-node-id="15:88"
      data-name="02 Screen - Cube View Search (검색 화면)"
    >
      <CubeScenePlaceholder enabled={false} />

      <UserStoryLogo
        className="absolute left-[calc(var(--safe-left)+86px)] top-[calc(var(--safe-top)+50px)]"
        nodeId="15:151"
      />

      <nav
        className="absolute left-[var(--viewport-center-x)] top-[calc(var(--safe-top)+44px)] flex h-[66px] w-[397.46px] max-w-[calc(var(--viewport-width)-32px)] -translate-x-1/2 rounded-full p-[6px] backdrop-blur-[70px]"
        data-node-id="15:93"
        data-name="nav/cube-view-top-bar"
        aria-label="Cube View 상단 메뉴"
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
            label="프로필"
            variant="light"
            className="h-[54px] w-[64px] border-0"
            nodeId="15:99"
            dataName="nav/icon-button - profile"
          />
          <GlassIconButton
            iconSrc={prototypeAssets.secondaryIcon01}
            label="보조 액션 1"
            variant="light"
            className="h-[54px] w-[64px] border-0"
            nodeId="15:101"
            dataName="nav/icon-button - secondary-action-01"
          />
          <GlassIconButton
            iconSrc={prototypeAssets.secondaryIcon02}
            label="보조 액션 2"
            variant="light"
            className="h-[54px] w-[64px] border-0"
            nodeId="15:104"
            dataName="nav/icon-button - secondary-action-02"
          />
        </div>
      </nav>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch();
        }}
        className="glass-panel absolute left-[var(--viewport-center-x)] top-[calc(var(--safe-bottom)-189.4px-29.6px)] flex h-[189.4px] w-[901.49px] max-w-[calc(var(--viewport-width)-32px)] -translate-x-1/2 flex-col gap-[21.94px] rounded-[40.23px] p-[18.29px]"
        data-node-id="15:107"
        data-name="search/search-panel"
      >
        <label
          className="flex h-[76.89px] w-full items-center rounded-[24px] bg-white/50 px-[21.94px] backdrop-blur-[40px]"
          data-node-id="15:108"
          data-name="search/query-input-field"
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={prototypeText.searchPlaceholder}
            className="h-full w-full border-0 bg-transparent text-[22px] font-medium leading-[1.5] tracking-[-0.22px] text-[#2c2c2d] outline-none placeholder:text-[#2c2c2d]"
            aria-label="검색어"
          />
        </label>

        <div
          className="flex h-[54px] w-full items-center justify-between"
          data-node-id="15:110"
          data-name="search/footer-actions-row"
        >
          <div className="flex gap-[10.97px]" data-name="search/suggestion-tags">
            {prototypeText.searchTags.map((tag) => (
              <AnimatedButton
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="h-[54px] rounded-full bg-black/40 px-[22px] text-[22px] font-medium leading-[1.5] tracking-[-0.22px] text-white backdrop-blur-[18.29px]"
                data-name={tag === prototypeText.searchTags[0] ? "tag/ai-feature" : "tag/retirement-after-60"}
              >
                {tag}
              </AnimatedButton>
            ))}
          </div>

          <AnimatedButton
            type="submit"
            className="flex h-[54px] w-[85.54px] items-center justify-center rounded-full bg-[#2c2c2d] px-[23.77px] py-[7.31px] text-white backdrop-blur-[18.29px]"
            data-node-id="15:117"
            data-name="button/search-submit-arrow"
            aria-label="스토리 상세 열기"
            title="스토리 상세 열기"
          >
            <ArrowGlyph />
          </AnimatedButton>
        </div>
      </form>
    </section>
  );
}
