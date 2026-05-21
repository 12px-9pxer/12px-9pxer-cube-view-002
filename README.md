# User Story Cube View Prototype

Figma `Prototype Reference - User Story Flow` 페이지를 기준으로 만든 웹 프로토타입입니다.  
코딩에 익숙하지 않은 3D Generalist도 구조를 따라갈 수 있도록 화면, 데이터, UI 부품, 추후 3D 영역을 분리했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다.

프로덕션 빌드는 아래 명령으로 확인합니다.

```bash
npm run build
```

## 폴더 구조

- `src/App.tsx`: 현재 화면 상태, 화면 전환, 투표/댓글/반응 상태를 관리합니다.
- `src/components/screens/`: Figma의 3개 화면을 각각 구현한 컴포넌트입니다.
- `src/components/ui/`: 로고, 글래스 버튼, 투표 카드, 댓글 카드처럼 재사용되는 UI입니다.
- `src/components/three/CubeScenePlaceholder.tsx`: 나중에 R3F 기반 3D Cube View를 넣을 자리입니다.
- `src/data/prototypeContent.ts`: 한글 문구, 댓글, 투표 옵션, 이미지 경로가 모인 데이터 파일입니다.
- `src/styles/index.css`: Tailwind 연결, 전역 색상 토큰, 16:9 스테이지 스타일입니다.
- `public/assets/figma/`: Figma에서 내려받은 로컬 이미지 에셋입니다.

## 구현 기준

- 기준 해상도는 Figma와 동일한 `1920 x 1080`입니다.
- 배경 이미지는 화면 전체를 `cover` 방식으로 채우며, 필요하면 가장자리가 crop됩니다.
- UI 조작 요소는 `1920 x 1080` 디자인 캔버스를 `contain` 방식으로 축소해 버튼과 입력창이 잘리지 않게 유지합니다.
- Figma의 임시 에셋 URL은 만료되므로 앱에서는 `public/assets/figma/`의 로컬 파일만 사용합니다.
- GSAP은 화면 전환, 버튼 press/hover 피드백, 반응 이모지 플로팅 애니메이션에 사용합니다.
- R3F는 현재 시각적으로 켜두지 않았고, 추후 3D 콘텐츠를 넣기 위한 컴포넌트만 마련했습니다.

## 현재 인터랙션

- `GO` 버튼으로 랜딩 화면에서 Cube View 검색 화면으로 이동합니다.
- 검색 제출 버튼으로 스토리 상세 화면에 진입합니다.
- 반응 버튼을 누르면 이모지가 위로 떠오르며 커지고 사라집니다. 연타하면 누른 횟수만큼 계속 생성됩니다.
- 댓글은 여러 번 작성해도 계속 추가됩니다.
- 모든 댓글 카드는 드래그로 이동할 수 있고, 우측 상단 `×` 버튼으로 삭제할 수 있습니다.

## GitHub 준비

`.gitignore`에는 `node_modules`, `dist`, `.env*`, 로그, OS/에디터 파일을 제외하도록 설정했습니다.  
원격 저장소가 생기면 아래처럼 연결하면 됩니다.

```bash
git remote add origin <GitHub repository URL>
git add .
git commit -m "Initial Figma prototype"
git push -u origin main
```

## 직접 조절하는 파라미터

Page3의 glass 질감과 댓글 등장/삭제 움직임은 `src/config/prototypeParams.ts`에서 조절합니다.

- `blur`: 뒤 배경이 흐려지는 정도입니다. 숫자가 클수록 더 많이 흐려집니다.
- `backgroundAlpha`: glass 배경의 불투명도입니다. `0`은 투명, `1`은 불투명입니다.
- `borderAlpha`: glass 테두리의 선명도입니다.
- `motion`: 댓글 카드가 커지며 등장하거나 작아지며 삭제될 때의 시간과 ease 값입니다.

예를 들어 Page3 댓글 카드 glass를 약하게 만들고 싶다면 아래 값을 수정하면 됩니다.

```ts
commentCard: {
  blur: 50,
  backgroundAlpha: 0.12,
}
```
