export type MatchStatus = "완전매치" | "부분매치";
export type Difficulty = "초간단" | "중급" | "고급";

export interface RecipeIngredient {
  이름: string;
  수량: string;
}

export interface Recipe {
  레시피명: string;
  매치상태: MatchStatus;
  예상시간: string;
  난이도: Difficulty;
  보유재료: RecipeIngredient[];
  부족재료: RecipeIngredient[];
  조리순서: string[];
}

export interface RecommendResponse {
  레시피목록: Recipe[];
}

export interface ShoppingListItem {
  이름: string;
  수량: string;
  checked: boolean;
}
