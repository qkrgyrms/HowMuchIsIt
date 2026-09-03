import Link from "next/link";
import type { Recipe } from "@/lib/types";
import { MatchBadge, DifficultyBadge } from "./Badge";

export function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  return (
    <Link
      href={`/recipes/${index}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900">{recipe.레시피명}</h3>
        <MatchBadge status={recipe.매치상태} missingCount={recipe.부족재료.length} />
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
        <span>⏱ {recipe.예상시간}</span>
        <DifficultyBadge difficulty={recipe.난이도} />
      </div>
    </Link>
  );
}
