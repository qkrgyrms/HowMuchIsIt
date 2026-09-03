"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { RecipeCard } from "@/components/RecipeCard";

export default function RecipesPage() {
  const { recipes, ingredients } = useAppStore();

  if (recipes.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-zinc-500">아직 추천받은 레시피가 없어요.</p>
        <Link
          href="/"
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          재료 입력하러 가기
        </Link>
      </div>
    );
  }

  const hasFullMatch = recipes.some((r) => r.매치상태 === "완전매치");
  const sorted = [...recipes].sort((a, b) => {
    if (a.매치상태 === b.매치상태) return 0;
    return a.매치상태 === "완전매치" ? -1 : 1;
  });

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">추천 레시피</h1>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
            재료 다시 입력
          </Link>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          보유 재료: {ingredients.join(", ")}
        </p>

        {!hasFullMatch && (
          <p className="mt-4 rounded-lg bg-orange-50 px-4 py-3 text-sm text-orange-700">
            완전히 일치하는 레시피는 없지만, 조금만 더 준비하면 만들 수 있는
            부분매치 레시피만 있어요.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {sorted.map((recipe) => {
            const originalIndex = recipes.indexOf(recipe);
            return (
              <RecipeCard key={originalIndex} recipe={recipe} index={originalIndex} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
