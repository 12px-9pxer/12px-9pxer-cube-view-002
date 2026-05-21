# Figma Web Prototype Handoff Guide

Generated: 2026-05-21  
Source: [팔공산 개인 / Prototype Reference - User Story Flow](https://www.figma.com/design/XR0WSneQr0JXckfXPck2Vj/%ED%8C%94%EA%B3%B5%EC%82%B0-%EA%B0%9C%EC%9D%B8?node-id=15-3)

## Purpose

이 문서는 Codex가 Figma의 현재 페이지 상태를 기준으로 테스트용 웹 프로토타입을 만들 때 참고해야 하는 구현 가이드다.

목표는 마케팅/랜딩 페이지를 새로 해석하는 것이 아니라, Figma의 `Prototype Reference - User Story Flow` 페이지에 있는 3개 화면을 웹에서 최대한 동일하게 재현하는 것이다.

## Source Frames

Figma file key: `XR0WSneQr0JXckfXPck2Vj`  
Page node: `15:3`  
Page name: `Prototype Reference - User Story Flow`

화면 흐름은 캔버스 위치가 아니라 아래 순서를 기준으로 구현한다.

| Order | Node ID | Frame name | Base size |
| --- | --- | --- | --- |
| 1 | `15:123` | `01 Screen - Landing Intro (시작 화면)` | `1920 x 1080` |
| 2 | `15:88` | `02 Screen - Cube View Search (검색 화면)` | `1920 x 1080` |
| 3 | `15:4` | `03 Screen - Story Detail Community (육아 전쟁의 시작)` | `1920 x 1080` |

All 3 top-level screen frames have `clipsContent: true`.

## Implementation Model

Build a single-page prototype with 3 internal views:

- `landing`: shows `01 Screen - Landing Intro`
- `search`: shows `02 Screen - Cube View Search`
- `detail`: shows `03 Screen - Story Detail Community`

Figma currently has no prototype reactions set on the page. Implement navigation from layer semantics:

- `action/go-to-cube-view-button`: `landing -> search`
- `action/open-story-detail` / `button/search-submit-arrow`: `search -> detail`
- `nav/back-button`: `detail -> search`
- `reaction/*` buttons: toggle selected visual state only
- `poll/option-*`: selectable option state
- `poll/submit-vote-button`: submit or lock selected option for prototype feedback
- `comment/send-button`: append a temporary local comment or clear the input for demo behavior

## Responsive Strategy

For a test prototype, prioritize pixel fidelity over inventing new layouts.

Use a `1920 x 1080` design coordinate system and scale it uniformly inside the viewport. This preserves the current Figma composition and avoids unexpected overlap from partial responsive edits.

Recommended stage CSS:

```css
.prototype-root {
  width: 100vw;
  height: 100dvh;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #0f0f10;
}

.prototype-stage {
  position: relative;
  width: min(100vw, calc(100dvh * 16 / 9));
  height: min(100dvh, calc(100vw * 9 / 16));
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
```

Inside `.prototype-stage`, convert Figma coordinates to percentages against `1920 x 1080`, or place a fixed `1920 x 1080` inner canvas and scale it with `transform`.

Use Figma constraints as the intended anchoring model:

- `CENTER/MIN`: centered horizontally, anchored to top.
- `CENTER/MAX`: centered horizontally, anchored to bottom.
- `MAX/MAX`: anchored to right and bottom.
- `MIN/MAX`: anchored to left and bottom.
- `STRETCH/STRETCH`: full background/media coverage.
- `SCALE/MAX`: fluid width with bottom anchoring.

For small mobile viewport QA, keep the 16:9 stage contained rather than reflowing the composition. Only add mobile-specific reflow if explicitly requested later.

## Global Style Tokens

Primary colors observed in the current page:

```css
:root {
  --color-bg-warm: #f9f9f7;
  --color-bg-cool: #f7f6f6;
  --color-black-soft: #2c2c2d;
  --color-option: #353535;
  --color-glass-gray: #c4c4c4;
  --color-white: #ffffff;
  --color-muted-text: #e4e4e4;
  --color-blue: #1447e6;
  --color-avatar-blue: #c8e1f5;
  --color-avatar-peach: #fae9e5;
  --color-avatar-text: #b1432c;
}
```

Glass surfaces use translucent fills, white strokes, and backdrop blur:

- Primary dark button: `#2C2C2D`, radius about `40px` or full pill.
- Light glass panel: `#C4C4C4` at `20-30%`, white stroke `5%`, `backdrop-filter: blur(50px-200px)`.
- Reaction bar: `#FFFFFF 30%`, white stroke `5%`, `backdrop-filter: blur(70px)`.
- Search/tags dark glass: `#000000 40%`, `backdrop-filter: blur(18.29px)`.

Typography:

Use `Pretendard` as the main font. Use `Inter` only for emoji reaction glyph containers if needed.

| Use | Font |
| --- | --- |
| Main title | Pretendard Bold, `32px`, line-height `150%` |
| Subtitle/stat | Pretendard SemiBold, `18px`, line-height `150%` |
| Search/nav/tag text | Pretendard Medium, `22px`, line-height `150%` |
| Logo text | Pretendard Medium, `25px`, line-height `150%` |
| Arrow/GO text | Pretendard Regular, `25.6px`, line-height `150%` |
| Poll question | Pretendard SemiBold, `20px`, line-height `28px` |
| Poll title | Pretendard Bold, `16px`, line-height `20px` |
| Poll option | Pretendard Medium, `16px` |
| Comment author | Pretendard Bold, `16px` |
| Comment role/time/body | Pretendard Regular, `14px`, body line-height `20px` |
| Comment input placeholder | Pretendard Regular, `18px`, line-height `150%` |

## Assets To Export From Figma

Export these visual assets from the Figma nodes if the implementation environment cannot read Figma images directly:

| Node ID | Name | Use |
| --- | --- | --- |
| `15:124` | `background/landing-intro-bg` | Landing full-screen blurred image background |
| `15:89` | `background/cube-view-search-bg` | Search full-screen image background |
| `15:126` | `Hyundai_Motor_Company_logo.svg 1` | Landing logo mark |
| `I15:151;15:126` | `Hyundai_Motor_Company_logo.svg 1` | Search logo mark instance |
| `15:58` | `Gemini_Generated_Image_79tmlv79tmlv79tm 1` | Engineer comment avatar image |
| `15:76` | `media/floating-chat-bubble-reference` | Off-screen/reference chat bubble image |
| `15:5` | `media/story-hero-playbook-image` | Currently clipped outside detail frame; treat as non-visible unless designer requests it |

Important current-state note: `media/story-hero-playbook-image` is inside the detail screen but positioned at `x: 1924`, width `1981`, while the parent frame is `1920` wide and clipped. It is not part of the visible detail screen at the current state.

## Screen 1: Landing Intro

Frame: `01 Screen - Landing Intro (시작 화면)` (`15:123`)  
Base: `1920 x 1080`, fill `#F7F6F6`, clipped.

Layer layout:

| Layer | Node ID | Position/size | Style |
| --- | --- | --- | --- |
| `background/landing-intro-bg` | `15:124` | `0,0,1920,1080` | image fill, `#D4D4D4 20%`, layer blur `30px`, stretch/stretch |
| `brand/logo-component - User Story` | `15:150` | `893,472,133,63` | centered, drop shadow `0 4px 36.7px #000 70%` |
| `action/go-to-cube-view-button` | `15:128` | `897,581,126.54,54` | pill, fill `#2C2C2D`, blur `18.29px`, horizontal auto layout |

Text:

- Logo label: `User Story`, Pretendard Medium `25px`, white, centered.
- Button: `GO` plus `↑`, Pretendard Regular `25.6px`, white.

Implementation notes:

- Background should cover the whole stage with `object-fit: cover`.
- Apply blur to the background layer, not to foreground logo/button.
- Button is horizontally centered below the logo; keep pill radius effectively `999px`.

## Screen 2: Cube View Search

Frame: `02 Screen - Cube View Search (검색 화면)` (`15:88`)  
Base: `1920 x 1080`, fill `#F7F6F6`, clipped.

Top-level layers:

| Layer | Node ID | Position/size | Constraints |
| --- | --- | --- | --- |
| `background/cube-view-search-bg` | `15:89` | `2,0,1920,1080` | min/min |
| `nav/cube-view-top-bar` | `15:93` | `761.5,60,397.46,66` | center/top |
| `search/search-panel` | `15:107` | `502,845,901.49,189.4` | scale/bottom |
| `brand/logo-instance - User Story` | `15:151` | `102,66,133,63` | center/top in Figma, visually placed near left |

Navigation bar:

- `nav/cube-view-top-bar`: pill container, backdrop blur `70px`.
- `nav/top-bar-content`: `385.46 x 54`, horizontal layout.
- `nav/current-view-tab - Cube View`: `177 x 54`, fill `#2C2C2D`, radius `40.23`, blur `36.57px`.
- Three icon buttons are `64 x 54`, fill `#FFFFFF`, radius `40.23`, blur `36.57px`.
- Current tab text: `Cube View`, Pretendard Medium `22px`, white.

Search panel:

| Layer | Node ID | Position/size | Style |
| --- | --- | --- | --- |
| `search/search-panel` | `15:107` | `901.49 x 189.4` | radius `40.23`, fill `#C4C4C4 20%`, white stroke `5%`, blur `50px` |
| `search/query-input-field` | `15:108` | `864.91 x 76.89`, inset `18.29` | radius `24`, fill `#FFFFFF 50%`, blur `40px` |
| `search/footer-actions-row` | `15:110` | `864.91 x 54` | horizontal layout |
| `tag/ai-feature` | `15:112` | `150 x 54` | pill, fill `#000000 40%`, blur `18.29px` |
| `tag/retirement-after-60` | `15:114` | `176 x 54` | pill, fill `#000000 40%`, blur `18.29px` |
| `button/search-submit-arrow` | `15:117` | `85.54 x 54` | pill, fill `#2C2C2D`, blur `18.29px` |

Text:

- Input text: `여기에 검색어 입력.`, Pretendard Medium `22px`, `#2C2C2D`.
- Tags: `Ai 활용 기능`, `60대 은퇴 이후`, Pretendard Medium `22px`, white.
- Submit arrow: `↑`, Pretendard Regular `25.6px`, white.

Responsive note:

- The search panel should be bottom anchored with about `4.22%` bottom gap in stage coordinates.
- Width is about `46.95%` of the base frame. In exact prototype mode, use percentage width inside the scaled stage.

## Screen 3: Story Detail Community

Frame: `03 Screen - Story Detail Community (육아 전쟁의 시작)` (`15:4`)  
Base: `1920 x 1080`, fill `#F9F9F7`, clipped.

Top-level layout:

| Layer | Node ID | Position/size | Constraints |
| --- | --- | --- | --- |
| `overlay/bottom-gradient-for-comments` | `15:6` | `-1,795,1921,285` | stretch/bottom |
| `overlay/top-header-scrim` | `15:7` | `0,92,1920,92` | center/top |
| `nav/back-button` | `15:8` | `44,46,74,64` | left/top |
| `header/story-title-and-stats` | `15:13` | `858,51,206,75` | center/top |
| `reaction/reaction-bar` | `15:16` | `757,960,406,76` | center/bottom |
| `nav/story-action-buttons` | `15:27` | `1720,46,156,64` | right/top |
| `poll/poll-card - child-in-car` | `15:34` | `1445,590,431,446` | right/bottom |
| `comment/comment-card-01-ux-researcher` | `15:66` | `528,440,440,119.57` | center/center |
| `comment/comment-card-02-engineer` | `15:56` | `81,683,440,119.57` | center/center |
| `comment/comment-input` | `15:77` | `43,960,440,76` | left/bottom |

Header:

- Title: `육아 전쟁의 시작`, Pretendard Bold `32px`, white, centered.
- Stats: `조회수 2.4천회 | 댓글 38개`, Pretendard SemiBold `18px`.
- Back button: `74 x 64`, radius `40.23`, fill `#2C2C2D`, stroke white `30%`, blur `36.57px`.
- Right action buttons: two `74 x 64` buttons, fill `#2C2C2D`, stroke white `50%`, blur `36.57px`.

Reaction bar:

- Container: `406 x 76`, radius `999`, fill white `30%`, stroke white `5%`, blur `70px`, padding `6`, gap `6`.
- Each reaction button: `74 x 64`, radius `40.23`, blur `36.57px`.
- Selected/current visual state appears on `reaction/button-like`: fill `#FFFFFF`.
- Other reaction buttons use fill `#2C2C2D`.
- Emoji sequence: `🩷`, `👍`, `🔥`, `😭`, `😱`.

Poll card:

- Card: `431 x 446`, radius `40`, fill `#C4C4C4 30%`, blur `200px`, padding `20 20 18`.
- Title question: `아이와 함께 차에 탑승할 때 운전에 집중하기 어려웠던 경험이 있으신가요?`
- Sub-question: `Q. 가장 불안한 순간은?`
- Option list: vertical, gap `4`, width fill.
- Each option: `391 x 54`, radius `40`, fill `#353535 40%`, stroke white `20%`.
- Submit button: `391 x 68`, radius `40`, fill `#353535`.

Poll option labels:

1. `아이가 울 때 멈출 수 없을 때`
2. `룸미러로 봐도 상태가 잘 안 보일 때`
3. `온도나 창문 조절이 필요한데 운전 중일 때`
4. `돌발 행동 (안전벨트 풀기 등)이 걱정될 때`

Comments:

Both comment cards use:

- Size: `440 x 119.57`
- Radius: `24`
- Fill: `#C4C4C4 20%`
- Stroke: white `5%`, `2px`
- Backdrop blur: `50px`
- Padding: `18.29`
- Horizontal gap: `21.94`

Comment 1:

- Card node: `comment/comment-card-01-ux-researcher` (`15:66`)
- Avatar: `comment/avatar-01`, `40 x 40`, fill `#FAE9E5`, text `SY` in `#B1432C`.
- Author: `박소연`, role `UX 리서처`, time `오전 10:30`.
- Body: `실제 육아 중 부모 인터뷰에서 “운전 중 아이 울음소리에 반응 못 할 때 가장 무기력함"이라는 응답이 가장 많았어요. 실시간 알림보다 예방적 환경 세팅 기능이 더 니즈가 높을 것 같아요.`

Comment 2:

- Card node: `comment/comment-card-02-engineer` (`15:56`)
- Avatar: `comment/avatar-02`, `40 x 40`, image fill.
- Author: `이현준`, role `엔지니어`, time `오후 12:15`.
- Body: `차량 OBD2 포트나 제조사 SDK로 차일드락 연동 가능성 체크해봤는데 현대/기아 기준으로 CCAPI 접근은 되는 것 같아요. 실제 앱 제어는 인증 이슈가 있을 수 있어요.`

Comment input:

- Container: `440 x 76`, radius `999`, fill `#C4C4C4 30%`, stroke white `5%`, blur `70px`.
- Placeholder: `여러분의 경험을 댓글로 남겨주세요!`, Pretendard Regular `18px`, white `70%`.
- Send button: `74 x 64`, fill `#2C2C2D`, full pill, blur `18.29px`.

## Layer Mapping For Components

Suggested web components:

```text
App
  PrototypeStage
    LandingScreen
      BackgroundImage
      UserStoryLogo
      GoButton
    SearchScreen
      BackgroundImage
      UserStoryLogo
      CubeTopBar
      SearchPanel
        QueryInput
        SuggestionTag
        SubmitArrowButton
    DetailScreen
      HeaderControls
      StoryTitle
      FloatingComments
      PollCard
      ReactionBar
      CommentInput
```

Use Figma layer names as class names where practical:

```text
screen-landing
screen-search
screen-detail
nav-back-button
nav-story-action-buttons
search-panel
poll-card
comment-card
reaction-bar
comment-input
```

## Visual Fidelity Checklist

Before calling the prototype complete:

- Render at `1920 x 1080` and compare against Figma node screenshots.
- Verify 16:9 stage scaling at desktop and mobile sizes.
- Do not introduce marketing copy or explanatory UI.
- Preserve translucent glass surfaces with `backdrop-filter`.
- Preserve rounded radii: most controls are pill-shaped; cards use `24px` or `40px`.
- Keep all Korean text exactly as written above.
- Do not render `media/story-hero-playbook-image` inside the visible detail viewport unless the Figma state changes.
- Ensure bottom controls remain anchored: search panel, reaction bar, comment input, poll card.
- Ensure top controls remain anchored: nav bar, story title, back/action buttons.
- Verify text does not overflow buttons or cards after scaling.
