import Anthropic from "@anthropic-ai/sdk";
import type { RecommendResponse } from "./types";

const SYSTEM_PROMPT = `당신은 한국 가정식 레시피 추천 전문가입니다.
사용자가 가진 재료 목록을 받아, 그 재료로 만들 수 있는 요리를 추천합니다.

규칙:
1. 반드시 순수 JSON만 출력하세요. 설명, 인사말, 코드블록 마크다운 없이 JSON 객체 하나만 반환합니다.
2. 다음 상비 재료는 항상 보유하고 있다고 가정하고, 절대 "부족재료"에 넣지 마세요:
   소금, 후추, 설탕, 식용유, 참기름, 간장, 다진마늘, 물, 고춧가루
3. 레시피는 3~5개 추천하며, "매치상태"가 "완전매치"인 것을 배열 앞쪽에 배치합니다.
4. "부분매치"는 부족한 재료가 최대 2개인 레시피만 포함합니다.
5. 모든 수량은 1인분 기준의 실제 조리 가능한 양(g, ml, 개, 큰술, 작은술, 대, 컵 등)으로 구체적으로 표기하세요.
6. 조리순서는 5단계 이내의 간결한 문장으로 작성하세요.
7. 아래 JSON 스키마를 정확히 따르세요.

{
  "레시피목록": [
    {
      "레시피명": "string",
      "매치상태": "완전매치" | "부분매치",
      "예상시간": "string (예: 20분)",
      "난이도": "초간단" | "중급" | "고급",
      "보유재료": [{"이름": "string", "수량": "string"}],
      "부족재료": [{"이름": "string", "수량": "string"}],
      "조리순서": ["string", "string"]
    }
  ]
}`;

export function stripCodeFence(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

export function parseRecommendResponse(raw: string): RecommendResponse {
  const cleaned = stripCodeFence(raw);
  const parsed = JSON.parse(cleaned);
  if (!parsed || !Array.isArray(parsed.레시피목록)) {
    throw new Error("Invalid recipe response shape");
  }
  return parsed as RecommendResponse;
}

async function requestRecipes(
  client: Anthropic,
  ingredients: string[],
): Promise<string> {
  const message = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
    max_tokens: 4096,
    temperature: 0.4,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `보유 재료: ${ingredients.join(", ")}`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response content type");
  }
  return block.text;
}

export async function getRecipeRecommendations(
  ingredients: string[],
): Promise<RecommendResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
  const client = new Anthropic({ apiKey });

  try {
    const text = await requestRecipes(client, ingredients);
    return parseRecommendResponse(text);
  } catch {
    // JSON 파싱 실패 시 1회 자동 재시도
    const retryText = await requestRecipes(client, ingredients);
    return parseRecommendResponse(retryText);
  }
}
