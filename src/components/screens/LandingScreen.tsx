import { prototypeText } from "../../data/prototypeContent";
import { AnimatedButton } from "../ui/AnimatedButton";
import { ArrowGlyph } from "../ui/ArrowGlyph";
import { UserStoryLogo } from "../ui/UserStoryLogo";

type LandingScreenProps = {
  onGoToSearch: () => void;
};

export function LandingScreen({ onGoToSearch }: LandingScreenProps) {
  return (
    <section
      className="screen-fill"
      data-node-id="15:123"
      data-name="01 Screen - Landing Intro (시작 화면)"
    >
      <UserStoryLogo
        className="absolute left-[calc(var(--viewport-center-x)-210px)] top-[calc(var(--viewport-center-y)-110px)]"
        nodeId="15:160"
        width={420}
        height={118}
      />

      <AnimatedButton
        type="button"
        onClick={onGoToSearch}
        className="absolute left-[calc(var(--viewport-center-x)-63.27px)] top-[calc(var(--viewport-center-y)+41px)] flex h-[54px] w-[126.54px] items-center justify-center gap-[4px] rounded-full bg-[#2c2c2d] px-[23.77px] py-[7.31px] text-[25.6px] leading-[1.5] tracking-[-0.256px] text-white backdrop-blur-[18.29px]"
        data-node-id="15:128"
        data-name="action/go-to-cube-view-button"
      >
        <span>{prototypeText.landingButton}</span>
        <ArrowGlyph />
      </AnimatedButton>

      <div
        className="absolute bottom-[56px] left-[var(--viewport-center-x)] flex h-[16px] -translate-x-1/2 items-center"
        data-node-id="1897:863"
        data-name="brand/landing-bottom-hyundai-kia-logos"
        aria-label="Hyundai Kia"
      >
        <img
          src="/assets/figma/logo-hyundai-kia-bottom.png"
          alt="Hyundai Kia"
          className="h-[16px] w-auto"
          draggable={false}
        />
      </div>
    </section>
  );
}
