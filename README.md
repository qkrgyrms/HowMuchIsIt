# 냉장고 셰프

냉장고에 있는 재료를 입력하면 AI가 만들 수 있는 요리를 추천하고, 정확한 재료 수량과
조리 순서를 알려주는 웹 서비스입니다.

## 기술 스택

- Next.js (App Router)
- Tailwind CSS
- Anthropic Claude API (레시피 생성, 서버사이드 API 라우트에서 호출)
- zustand (화면 간 상태 공유)

## 로컬 실행

```bash
npm install
cp .env.example .env.local
# .env.local 에 ANTHROPIC_API_KEY 입력
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### API 키 없이 UI만 테스트하기

`ANTHROPIC_API_KEY`를 아직 발급받지 않았다면 `.env.local`에 아래 값을 넣으면
Claude API를 호출하지 않고 `lib/mockRecipes.json`의 고정 레시피 4개
(완전매치 2개, 부족 1개/2개인 부분매치 각 1개)를 그대로 반환합니다.

```bash
USE_MOCK_RECIPES=true
```

목록 정렬/배지, 상세 화면의 재료 구분·수량 표기, 조리 순서까지 실제 플로우
그대로 확인할 수 있습니다. 실제 키를 넣고 테스트하려면 이 값을 `false`로
바꾸거나 지우면 됩니다.

## 화면 흐름

1. `/` — 재료 입력 (칩 형태로 추가/삭제)
2. `/recipes` — 추천 레시피 목록 (완전매치 상단 정렬, 배지/시간/난이도 표시)
3. `/recipes/[id]` — 레시피 상세 (보유/부족 재료 구분 + 정확한 수량, 조리 순서)
4. `/shopping-list` — 장보기 리스트 (레시피 상세에서 "장보기 리스트에 담기"를
   누르면 부족 재료가 모임, 체크/삭제 가능, localStorage에 저장되어 새로고침해도
   유지됨). 근처 마트 최저가(참가격 공공데이터 API 연동)는 아직 미구현 —
   API 키 발급 후 진행 예정.

## 배포

Vercel 배포 시 `ANTHROPIC_API_KEY` 환경 변수를 프로젝트 설정에 등록해야 합니다.
