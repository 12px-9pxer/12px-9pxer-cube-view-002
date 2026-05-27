export type ScreenId = "landing" | "search" | "detail";

export type ReactionId = "heart" | "like" | "fire" | "cry" | "surprised";

export type PollOptionId =
  | "childCrying"
  | "mirrorVisibility"
  | "climateWindowControl"
  | "suddenSafetyAction";

export type PrototypeAssetKey =
  | "logoUserStory"
  | "landingBg"
  | "searchBg"
  | "detailBg"
  | "cubeViewIcon"
  | "personIcon"
  | "secondaryIcon01"
  | "secondaryIcon02"
  | "backIcon"
  | "storyActionLeftIcon"
  | "storyActionRightIcon"
  | "radioEmptyIcon"
  | "engineerAvatar"
  | "floatingChatReference";

export type CommentItem = {
  id: string;
  author: string;
  role: string;
  time: string;
  body: string;
  position: {
    x: number;
    y: number;
  };
  avatarType: "initials" | "image";
  initials?: string;
};

export type PollOption = {
  id: PollOptionId;
  label: string;
};

export type ReactionItem = {
  id: ReactionId;
  emoji: string;
  figmaName: string;
};

// 모든 이미지는 public/assets/figma 아래에 저장했습니다.
// Figma MCP의 임시 URL은 만료되므로, 앱에서는 반드시 이 로컬 경로만 사용합니다.
export const prototypeAssets: Record<PrototypeAssetKey, string> = {
  logoUserStory: "/assets/figma/logo-user-story.png",
  landingBg: "/assets/figma/landing-bg.png",
  searchBg: "/assets/figma/search-bg.png",
  detailBg: "/assets/figma/detail-bg.png",
  cubeViewIcon: "/assets/figma/icon-cube-view.svg",
  personIcon: "/assets/figma/icon-person.svg",
  secondaryIcon01: "/assets/figma/icon-secondary-01.svg",
  secondaryIcon02: "/assets/figma/icon-secondary-02.svg",
  backIcon: "/assets/figma/icon-back.svg",
  storyActionLeftIcon: "/assets/figma/icon-story-action-left.svg",
  storyActionRightIcon: "/assets/figma/icon-story-action-right.svg",
  radioEmptyIcon: "/assets/figma/icon-radio-empty.svg",
  engineerAvatar: "/assets/figma/avatar-engineer.png",
  floatingChatReference: "/assets/figma/floating-chat-reference.png",
};

export const prototypeText = {
  logoLabel: "User Story",
  landingButton: "GO",
  currentView: "Cube View",
  orbitTitle: "워킹맘",
  orbitStats: [
    { id: "views", icon: "visibility", label: "2.4천회" },
    { id: "comments", icon: "comment", label: "36개" },
    { id: "reactions", icon: "share_windows", label: "800회" },
  ],
  searchPlaceholder: "검색어 입력",
  searchTags: ["Ai 활용 기능", "워킹맘"],
  storyTitle: "육아 전쟁의 시작",
  storyStats: "조회수 2.4천회 | 댓글 38개",
  commentPlaceholder: "여러분의 경험을 댓글로 남겨주세요!",
  pollQuestion:
    "아이와 함께 차에 탑승할 때 운전에 집중하기 어려웠던 경험이 있으신가요?",
  pollSubQuestion: "Q. 가장 불안한 순간은?",
  pollSubmit: "투표하기",
  pollDone: "투표 완료",
};

export const reactions: ReactionItem[] = [
  { id: "heart", emoji: "🩷", figmaName: "reaction/button-heart" },
  { id: "like", emoji: "👍", figmaName: "reaction/button-like" },
  { id: "fire", emoji: "🔥", figmaName: "reaction/button-fire" },
  { id: "cry", emoji: "😭", figmaName: "reaction/button-cry" },
  { id: "surprised", emoji: "😱", figmaName: "reaction/button-surprised" },
];

export const pollOptions: PollOption[] = [
  { id: "childCrying", label: "아이가 울 때 멈출 수 없을 때" },
  { id: "mirrorVisibility", label: "룸미러로 봐도 상태가 잘 안 보일 때" },
  {
    id: "climateWindowControl",
    label: "온도나 창문 조절이 필요한데 운전 중일 때",
  },
  {
    id: "suddenSafetyAction",
    label: "돌발 행동 (안전벨트 풀기 등)이 걱정될 때",
  },
];

export const initialComments: CommentItem[] = [
  {
    id: "ux-researcher",
    author: "박소연",
    role: "UX 리서처",
    time: "오전 10:30",
    position: { x: 528, y: 440 },
    avatarType: "initials",
    initials: "SY",
    body: `실제 육아 중 부모 인터뷰에서 “운전 중 아이 울음소리에 반응 못 할 때 가장 무기력함"이라는 응답이 가장 많았어요. 실시간 알림보다 예방적 환경 세팅 기능이 더 니즈가 높을 것 같아요.`,
  },
  {
    id: "engineer",
    author: "이현준",
    role: "엔지니어",
    time: "오후 12:15",
    position: { x: 81, y: 683 },
    avatarType: "image",
    body: "차량 OBD2 포트나 제조사 SDK로 차일드락 연동 가능성 체크해봤는데 현대/기아 기준으로 CCAPI 접근은 되는 것 같아요. 실제 앱 제어는 인증 이슈가 있을 수 있어요.",
  },
];
