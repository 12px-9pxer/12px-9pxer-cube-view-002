import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  pollOptions,
  prototypeAssets,
  prototypeText,
  type PollOptionId,
} from "../../data/prototypeContent";
import { createGlassStyle, prototypeParams, toRgba } from "../../config/prototypeParams";
import { AnimatedButton } from "./AnimatedButton";

type PollCardProps = {
  selectedOption: PollOptionId | null;
  isSubmitted: boolean;
  onSelectOption: (optionId: PollOptionId) => void;
  onSubmitVote: () => void;
  onDismissAfterSubmit: () => void;
};

export function PollCard({
  selectedOption,
  isSubmitted,
  onSelectOption,
  onSubmitVote,
  onDismissAfterSubmit,
}: PollCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const page3Glass = prototypeParams.page3.glass;
  const page3Motion = prototypeParams.page3.motion;
  const pollCardStyle = createGlassStyle(page3Glass.pollCard);
  const pollOptionStyle = createGlassStyle(page3Glass.pollOption);
  const pollSubmitButtonStyle = createGlassStyle(page3Glass.pollSubmitButton);
  const pollSubmitDoneButtonStyle = createGlassStyle(page3Glass.pollSubmitDoneButton);
  const selectedOptionStyle = {
    backgroundColor: toRgba("#ffffff", 0.85),
    borderColor: toRgba("#ffffff", 1),
  };

  useLayoutEffect(() => {
    const cardElement = cardRef.current;

    if (!cardElement) {
      return;
    }

    // Page3에 들어오자마자 보이지 않고, 2초 뒤 댓글 카드처럼 scale만 커지며 등장합니다.
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
    const cardElement = cardRef.current;

    if (!isSubmitted || !cardElement) {
      return;
    }

    // 투표 완료 문구를 잠깐 보여준 뒤, opacity 변화 없이 scale만 줄여서 제거합니다.
    const exitTween = gsap.to(cardElement, {
      scale: 0,
      delay: page3Motion.pollExitDelay,
      duration: page3Motion.pollExitDuration,
      ease: page3Motion.pollExitEase,
      force3D: true,
      overwrite: "auto",
      transformOrigin: "50% 50%",
      onComplete: onDismissAfterSubmit,
    });

    return () => {
      exitTween.kill();
    };
  }, [
    isSubmitted,
    onDismissAfterSubmit,
    page3Motion.pollExitDelay,
    page3Motion.pollExitDuration,
    page3Motion.pollExitEase,
  ]);

  return (
    <section
      ref={cardRef}
      className="page3-poll-card absolute left-[max(var(--safe-left),calc(var(--safe-right)-431px))] top-[max(calc(var(--safe-top)+120px),calc(var(--safe-bottom)-446px-28px))] flex h-[446px] w-[431px] max-w-[calc(var(--viewport-width)-32px)] flex-col gap-[12px] overflow-hidden rounded-[40px] border px-[20px] pb-[18px] pt-[20px] text-white"
      style={pollCardStyle}
      data-node-id="15:34"
      data-name="poll/poll-card - child-in-car"
      aria-label="투표 카드"
    >
      <h2 className="text-[20px] font-semibold leading-[28px] tracking-[-0.6px]">
        {prototypeText.pollQuestion}
      </h2>
      <p className="text-[16px] font-bold leading-[20px] tracking-[-0.32px]">
        {prototypeText.pollSubQuestion}
      </p>

      <div className="flex w-full flex-col gap-[4px]" data-name="poll/options-list">
        {pollOptions.map((option, index) => {
          const isSelected = selectedOption === option.id;

          return (
            <AnimatedButton
              key={option.id}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelectOption(option.id)}
              className={`flex h-[54px] w-full items-center gap-[10px] rounded-[40px] border px-[24px] text-left transition-colors ${
                isSelected ? "text-[#2c2c2d]" : "text-white"
              } ${isSubmitted ? "cursor-default" : ""}`}
              style={isSelected ? selectedOptionStyle : pollOptionStyle}
              data-name={`poll/option-0${index + 1}`}
            >
              <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                <img src={prototypeAssets.radioEmptyIcon} alt="" className="h-full w-full" />
                {isSelected ? (
                  <span className="absolute h-[8px] w-[8px] rounded-full bg-[#1447e6]" />
                ) : null}
              </span>
              <span className="text-[16px] font-medium leading-none tracking-[-0.48px]">
                {option.label}
              </span>
            </AnimatedButton>
          );
        })}
      </div>

      <AnimatedButton
        type="button"
        onClick={onSubmitVote}
        disabled={!selectedOption || isSubmitted}
        className="mt-auto flex h-[68px] w-full items-center justify-center rounded-[40px] text-center text-[20px] font-semibold tracking-[-0.6px] text-white disabled:cursor-default"
        style={isSubmitted ? pollSubmitDoneButtonStyle : pollSubmitButtonStyle}
        data-node-id="15:54"
        data-name="poll/submit-vote-button"
      >
        {isSubmitted ? prototypeText.pollDone : prototypeText.pollSubmit}
      </AnimatedButton>
    </section>
  );
}
