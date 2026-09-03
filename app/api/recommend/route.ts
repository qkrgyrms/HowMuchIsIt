import { NextRequest, NextResponse } from "next/server";
import { getRecipeRecommendations } from "@/lib/claude";

export async function POST(req: NextRequest) {
  let ingredients: unknown;
  try {
    const body = await req.json();
    ingredients = body.ingredients;
  } catch {
    return NextResponse.json(
      { error: "요청 본문을 읽을 수 없습니다." },
      { status: 400 },
    );
  }

  if (
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    !ingredients.every((item) => typeof item === "string" && item.trim())
  ) {
    return NextResponse.json(
      { error: "재료를 하나 이상 입력해주세요." },
      { status: 400 },
    );
  }

  try {
    const result = await getRecipeRecommendations(
      ingredients.map((item) => item.trim()),
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Recipe recommendation failed:", error);
    return NextResponse.json(
      { error: "레시피 추천 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }
}
