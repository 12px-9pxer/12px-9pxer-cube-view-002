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
        className="absolute left-[calc(var(--viewport-center-x)-102.5px)] top-[calc(var(--viewport-center-y)-80px)]"
        nodeId="15:160"
        width={205}
        height={97}
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
    </section>
  );
}
