import { useState } from "react";
import { createGlassStyle, prototypeParams } from "../../config/prototypeParams";
import {
  prototypeAssets,
  prototypeText,
  type CommentItem,
  type PollOptionId,
} from "../../data/prototypeContent";
import type { CommentPosition, CommentVelocity } from "../../utils/commentLayout";
import { AnimatedButton } from "../ui/AnimatedButton";
import { ArrowGlyph } from "../ui/ArrowGlyph";
import { DraggableCommentCard } from "../ui/DraggableCommentCard";
import { GlassIconButton } from "../ui/GlassIconButton";
import { PollCard } from "../ui/PollCard";
import { ReactionBar } from "../ui/ReactionBar";

type DetailScreenProps = {
  comments: CommentItem[];
  selectedPollOption: PollOptionId | null;
  isPollSubmitted: boolean;
  onBackToSearch: () => void;
  onSelectPollOption: (optionId: PollOptionId) => void;
  onAddComment: (body: string) => void;
  onMoveComment: (commentId: string, position: CommentPosition) => void;
  onSettleComment: (
    commentId: string,
    position: CommentPosition,
    velocity: CommentVelocity,
  ) => void;
  onDeleteComment: (commentId: string) => void;
};

export function DetailScreen({
  comments,
  selectedPollOption,
  isPollSubmitted,
  onBackToSearch,
  onSelectPollOption,
  onAddComment,
  onMoveComment,
  onSettleComment,
  onDeleteComment,
}: DetailScreenProps) {
  const [commentDraft, setCommentDraft] = useState("");
  const [areCommentsVisible, setAreCommentsVisible] = useState(true);
  const page3Glass = prototypeParams.page3.glass;
  const commentInputStyle = createGlassStyle(page3Glass.commentInput);
  const commentSendButtonStyle = createGlassStyle(page3Glass.commentSendButton);
  const storyActionButtonStyle = createGlassStyle(page3Glass.iconButton);
  const commentToggleLabel = areCommentsVisible ? "댓글 숨기기" : "댓글 보이기";

  const submitComment = () => {
    const trimmed = commentDraft.trim();

    if (!trimmed) {
      return;
    }

    onAddComment(trimmed);
    setCommentDraft("");
  };

  const getCommentMeta = (comment: CommentItem) => {
    if (comment.id === "ux-researcher") {
      return {
        nodeId: "15:66",
        dataName: "comment/comment-card-01-ux-researcher",
      };
    }

    if (comment.id === "engineer") {
      return {
        nodeId: "15:56",
        dataName: "comment/comment-card-02-engineer",
      };
    }

    return {
      dataName: "comment/comment-card-local-demo",
    };
  };

  return (
    <section
      className="screen-fill"
      data-node-id="15:4"
      data-name="03 Screen - Story Detail Community (육아 전쟁의 시작)"
    >
      <div
        className="absolute left-0 top-[calc(var(--viewport-height)-285px)] h-[285px] w-[var(--viewport-width)] bg-gradient-to-b from-black/0 to-black"
        data-node-id="15:6"
        data-name="overlay/bottom-gradient-for-comments"
      />
      <div
        className="absolute left-0 top-0 h-[92px] w-[var(--viewport-width)] bg-gradient-to-b from-black/40 to-black/0"
        data-node-id="15:7"
        data-name="overlay/top-header-scrim"
      />

      <AnimatedButton
        type="button"
        onClick={onBackToSearch}
        className="absolute left-[calc(var(--safe-left)+28px)] top-[calc(var(--safe-top)+30px)] h-[64px] w-[74px]"
        data-node-id="15:8"
        data-name="nav/back-button"
        aria-label="검색 화면으로 돌아가기"
        title="검색 화면으로 돌아가기"
      >
        <img src={prototypeAssets.backIcon} alt="" className="h-full w-full" />
      </AnimatedButton>

      <header
        className="absolute left-[var(--viewport-center-x)] top-[calc(var(--safe-top)+35px)] flex h-[75px] w-[206px] -translate-x-1/2 flex-col items-center text-center text-white"
        data-node-id="15:13"
        data-name="header/story-title-and-stats"
      >
        <h1 className="whitespace-nowrap text-[32px] font-bold leading-[1.5] tracking-[-0.32px]">
          {prototypeText.storyTitle}
        </h1>
        <p className="whitespace-nowrap text-[18px] font-semibold leading-[1.5] tracking-[-0.18px] text-white/80">
          {prototypeText.storyStats}
        </p>
      </header>

      <div
        className="absolute left-[calc(var(--safe-right)-156px)] top-[calc(var(--safe-top)+30px)] flex h-[64px] w-[156px] items-center justify-end gap-[8px]"
        data-node-id="15:27"
        data-name="nav/story-action-buttons"
      >
        <GlassIconButton
          label={commentToggleLabel}
          onClick={() => setAreCommentsVisible((isVisible) => !isVisible)}
          style={storyActionButtonStyle}
          nodeId="15:28"
          dataName="nav/story-action-button-left"
          aria-pressed={!areCommentsVisible}
        >
          <span
            className="material-symbols-outlined text-[24px] leading-none"
            aria-hidden="true"
          >
            {areCommentsVisible ? "visibility" : "visibility_off"}
          </span>
        </GlassIconButton>
        <GlassIconButton
          iconSrc={prototypeAssets.storyActionRightIcon}
          label="공유"
          onClick={() => undefined}
          style={storyActionButtonStyle}
          nodeId="15:31"
          dataName="nav/story-action-button-right"
        />
      </div>

      <PollCard
        selectedOption={selectedPollOption}
        isSubmitted={isPollSubmitted}
        onSelectOption={onSelectPollOption}
      />

      {areCommentsVisible
        ? comments.map((comment) => {
            const commentMeta = getCommentMeta(comment);
            const canDeleteComment = comment.isOwnedByCurrentUser === true;

            return (
              <DraggableCommentCard
                key={comment.id}
                comment={comment}
                entranceDelay={comment.id.startsWith("local-") ? 0 : 0.28}
                nodeId={commentMeta.nodeId}
                dataName={commentMeta.dataName}
                onMove={onMoveComment}
                onDragEnd={onSettleComment}
                onDelete={canDeleteComment ? onDeleteComment : undefined}
              />
            );
          })
        : null}

      <ReactionBar />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitComment();
        }}
        className="page3-comment-input absolute left-[calc(var(--safe-left)+27px)] top-[calc(var(--safe-bottom)-76px-28px)] flex h-[76px] w-[440px] max-w-[calc(var(--viewport-width)-32px)] items-center overflow-hidden rounded-full border"
        style={commentInputStyle}
        data-node-id="15:77"
        data-name="comment/comment-input"
      >
        <input
          value={commentDraft}
          onChange={(event) => setCommentDraft(event.target.value)}
          placeholder={prototypeText.commentPlaceholder}
          className="h-full flex-1 border-0 bg-transparent pl-[30px] pr-[12px] text-[18px] leading-[1.5] tracking-[-0.18px] text-white outline-none placeholder:text-white/70"
          aria-label="댓글 입력"
        />
        <AnimatedButton
          type="submit"
          className="mr-[6px] flex h-[64px] w-[74px] shrink-0 items-center justify-center rounded-full px-[23.77px] py-[7.31px] text-white"
          style={commentSendButtonStyle}
          data-node-id="15:79"
          data-name="comment/send-button"
          aria-label="댓글 보내기"
          title="댓글 보내기"
        >
          <ArrowGlyph />
        </AnimatedButton>
      </form>
    </section>
  );
}
