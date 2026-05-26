import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { prototypeAssets } from "../../data/prototypeContent";
import { AnimatedButton } from "./AnimatedButton";
import { ArrowGlyph } from "./ArrowGlyph";

type SingleCubeStoryCardProps = {
  onOpenStoryDetail: () => void;
};

export function SingleCubeStoryCard({ onOpenStoryDetail }: SingleCubeStoryCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, x: 48 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      },
    );

    return () => {
      if (cardRef.current) {
        gsap.killTweensOf(cardRef.current);
      }
    };
  }, []);

  return (
    <aside
      ref={cardRef}
      className="single-cube-story-card absolute left-[calc(var(--safe-right)-564px-42px)] top-[calc(var(--viewport-center-y)-343.5px)] z-20 flex h-[687px] w-[564px] max-w-[calc(var(--viewport-width)-32px)] flex-col overflow-hidden rounded-[42px] border border-white/35 bg-[#d8d8d8]/70 p-[24px] text-[#19191a] opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[46px]"
      data-name="orbit/story-detail-card"
      aria-labelledby="single-cube-story-card-title"
    >
      <header className="flex shrink-0 flex-col items-center text-center">
        <h2
          id="single-cube-story-card-title"
          className="text-[30px] font-bold leading-[1.35] tracking-normal text-[#19191a]"
        >
          육아 전쟁의 시작
        </h2>
        <p className="mt-[4px] text-[16px] font-semibold leading-[1.5] tracking-normal text-[#19191a]/60">
          조회수 2.4천회 | 댓글 38개
        </p>
      </header>

      <figure className="relative mt-[20px] h-[342px] shrink-0 overflow-hidden rounded-[30px] bg-black/20">
        <img
          src={prototypeAssets.detailBg}
          alt="차 안에서 울고 있는 아이와 운전 중인 보호자"
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-black/0 to-black/48" />
      </figure>

      <div className="mt-[22px] flex flex-1 flex-col gap-[14px] text-[18px] font-medium leading-[1.55] tracking-normal text-[#242426]/80">
        <p>
          아이의 울음소리가 차 안을 채우는 순간, 운전자는 도로와 아이 사이에서 계속 시선을
          나누게 됩니다.
        </p>
        <p>
          차량 안에서 바로 상황을 확인하고 도움을 받을 수 있다면, 보호자의 불안은 조금 더
          빠르게 줄어듭니다.
        </p>
      </div>

      <AnimatedButton
        type="button"
        onClick={onOpenStoryDetail}
        className="mt-[22px] flex h-[64px] shrink-0 items-center justify-between rounded-full bg-white/60 py-[6px] pl-[26px] pr-[6px] text-left text-[20px] font-semibold leading-[1.5] tracking-normal text-[#19191a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] backdrop-blur-[24px]"
        data-name="orbit/story-detail-card-cta"
        aria-label="상세 페이지로 이동"
        title="상세 페이지로 이동"
      >
        <span>상세 페이지로 이동</span>
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2c2c2d] text-white">
          <ArrowGlyph />
        </span>
      </AnimatedButton>
    </aside>
  );
}
