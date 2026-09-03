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

## 화면 흐름

1. `/` — 재료 입력 (칩 형태로 추가/삭제)
2. `/recipes` — 추천 레시피 목록 (완전매치 상단 정렬, 배지/시간/난이도 표시)
3. `/recipes/[id]` — 레시피 상세 (보유/부족 재료 구분 + 정확한 수량, 조리 순서)

## 배포

Vercel 배포 시 `ANTHROPIC_API_KEY` 환경 변수를 프로젝트 설정에 등록해야 합니다.
