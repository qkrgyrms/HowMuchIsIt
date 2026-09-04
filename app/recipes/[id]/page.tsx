"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useAppStore } from "@/lib/store";
import { DifficultyBadge, MatchBadge } from "@/components/Badge";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const recipes = useAppStore((s) => s.recipes);
  const addToShoppingList = useAppStore((s) => s.addToShoppingList);
  const recipe = recipes[Number(id)];
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const handleAddToShoppingList = () => {
    if (!recipe) return;
    if (recipe.부족재료.length === 0) {
      setAddedMessage("이 레시피는 부족한 재료가 없어요.");
      return;
    }
    addToShoppingList(recipe.부족재료);
    setAddedMessage(`부족한 재료 ${recipe.부족재료.length}개를 장보기 리스트에 담았어요.`);
  };

  if (!recipe) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-zinc-500">레시피 정보를 찾을 수 없어요.</p>
        <Link
          href="/"
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          재료 입력하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between">
          <Link href="/recipes" className="text-sm text-zinc-500 hover:text-zinc-800">
            ← 목록으로
          </Link>
          <Link href="/shopping-list" className="text-sm text-zinc-500 hover:text-zinc-800">
            장보기 리스트
          </Link>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold text-zinc-900">{recipe.레시피명}</h1>
          <MatchBadge status={recipe.매치상태} missingCount={recipe.부족재료.length} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
          <span>⏱ {recipe.예상시간}</span>
          <DifficultyBadge difficulty={recipe.난이도} />
        </div>

        <section className="mt-8">
          <h2 className="text-base font-semibold text-zinc-900">재료</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {recipe.보유재료.map((item) => (
              <li
                key={`have-${item.이름}`}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm shadow-sm"
              >
                <span className="flex items-center gap-2 text-zinc-800">
                  <span className="text-green-600">✓</span>
                  {item.이름}
                </span>
                <span className="text-zinc-500">{item.수량}</span>
              </li>
            ))}
            {recipe.부족재료.map((item) => (
              <li
                key={`missing-${item.이름}`}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm shadow-sm"
              >
                <span className="flex items-center gap-2 text-zinc-800">
                  <span className="text-orange-500">●</span>
                  {item.이름}
                </span>
                <span className="text-zinc-500">{item.수량}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold text-zinc-900">조리 순서</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {recipe.조리순서.map((step, i) => (
              <li key={i} className="flex gap-3 rounded-lg bg-white px-4 py-3 text-sm shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-zinc-700">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <button
          type="button"
          onClick={handleAddToShoppingList}
          className="mt-8 w-full rounded-xl border border-zinc-900 py-4 text-base font-semibold text-zinc-900 hover:bg-zinc-900 hover:text-white"
        >
          장보기 리스트에 담기
        </button>
        {addedMessage && (
          <p className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-center text-sm text-green-700">
            {addedMessage}
          </p>
        )}
      </div>
    </div>
  );
}
