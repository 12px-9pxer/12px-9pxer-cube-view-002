import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  pollOptions,
  prototypeText,
  type PollOptionId,
} from "../../data/prototypeContent";
import { createGlassStyle, prototypeParams, toRgba } from "../../config/prototypeParams";
import { AnimatedButton } from "./AnimatedButton";

type PollCardProps = {
  selectedOption: PollOptionId | null;
  isSubmitted: boolean;
  onSelectOption: (optionId: PollOptionId) => void;
};

export function PollCard({
  selectedOption,
  isSubmitted,
  onSelectOption,
}: PollCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const resultFillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const page3Glass = prototypeParams.page3.glass;
  const page3Motion = prototypeParams.page3.motion;
  const pollCardStyle = createGlassStyle(page3Glass.pollCard);
  const pollOptionStyle = createGlassStyle(page3Glass.pollOption);
  const selectedResultOptionStyle = {
    ...pollOptionStyle,
    borderColor: toRgba("#ffffff", 0.78),
  };

  useLayoutEffect(() => {
    const cardElement = cardRef.current;

    if (!cardElement) {
      return;
    }

    const enterTween = gsap.fromTo(
      cardElement,
      { scale: 0 },
      {
        scale: 1,
        delay: page3Motion.pollEnterDelay,
        duration: page3Motion.pollEnterDuration,
        ease: page3Motion.pollEnterEase,
        force3D: true,
        overwrite: "auto",
        transformOrigin: "50% 50%",
      },
    );

    return () => {
      enterTween.kill();
    };
  }, [
    page3Motion.pollEnterDelay,
    page3Motion.pollEnterDuration,
    page3Motion.pollEnterEase,
  ]);

  useEffect(() => {
    const resultFills = resultFillRefs.current.filter(Boolean) as HTMLSpanElement[];

    gsap.killTweensOf(resultFills);

    if (!isSubmitted) {
      resultFills.forEach((fillElement) => {
        gsap.set(fillElement, { width: "0%" });
      });
      return undefined;
    }

    const resultTweens = pollOptions
      .map((option, index) => {
        const fillElement = resultFillRefs.current[index];

        if (!fillElement) {
          return null;
        }

        gsap.set(fillElement, { width: "0%" });

        return gsap.to(fillElement, {
          width: `${option.resultPercent}%`,
          delay: index * 0.12,
          duration: 0.72,
          ease: "power3.out",
          overwrite: "auto",
        });
      })
      .filter(Boolean) as gsap.core.Tween[];

    return () => {
      resultTweens.forEach((tween) => tween.kill());
    };
  }, [isSubmitted, selectedOption]);

  return (
    <section
      ref={cardRef}
      className="page3-poll-card absolute left-[max(var(--safe-left),calc(var(--safe-right)-439px))] top-[max(calc(var(--safe-top)+120px),calc(var(--safe-bottom)-348px-28px))] flex h-[348px] w-[439px] max-w-[calc(var(--viewport-width)-32px)] flex-col gap-[16px] overflow-hidden rounded-[24px] border px-[20px] py-[20px] text-white"
      style={pollCardStyle}
      data-node-id="15:34"
      data-name="poll/poll-card - child-in-car"
      aria-label="투표 카드"
    >
      <div className="flex w-full flex-col gap-[4px]" data-name="poll/header">
        <h2 className="text-[20px] font-bold leading-[20px] tracking-[-0.6px]">
          이런 순간, 있으셨나요?
        </h2>
        <p className="text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-white/90">
          {prototypeText.pollQuestion}
        </p>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col gap-[10px]" data-name="poll/body">
        <p className="text-[16px] font-bold leading-[20px] tracking-[-0.32px]">
          {prototypeText.pollSubQuestion}
        </p>

        <div className="flex w-full flex-col gap-[6px]" data-name="poll/options-list">
          {pollOptions.map((option, index) => {
            const isSelected = selectedOption === option.id;

            return (
              <AnimatedButton
                key={option.id}
                type="button"
                disabled={isSubmitted}
                onClick={() => onSelectOption(option.id)}
                className={`relative flex h-[51px] w-full items-center overflow-hidden rounded-[18px] border px-[16px] text-left text-white transition-colors disabled:cursor-default ${
                  isSubmitted && isSelected ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" : ""
                }`}
                style={isSubmitted && isSelected ? selectedResultOptionStyle : pollOptionStyle}
                data-name={`poll/option-0${index + 1}`}
                data-result-percent={option.resultPercent}
                aria-pressed={isSelected}
              >
                {isSubmitted ? (
                  <span
                    ref={(element) => {
                      resultFillRefs.current[index] = element;
                    }}
                    className={`pointer-events-none absolute inset-y-0 left-0 rounded-[inherit] ${
                      isSelected ? "bg-white/55" : "bg-white/40"
                    }`}
                    aria-hidden="true"
                  />
                ) : null}

                <span className="relative z-10 min-w-0 flex-1 truncate text-[16px] font-medium leading-[19px] tracking-[-0.48px]">
                  {option.label}
                </span>

                {isSubmitted ? (
                  <span className="relative z-10 ml-[12px] w-[42px] shrink-0 text-right text-[16px] font-medium leading-[19px] tracking-[-0.48px]">
                    {option.resultPercent}%
                  </span>
                ) : null}
              </AnimatedButton>
            );
          })}
        </div>
      </div>
    </section>
  );
}
