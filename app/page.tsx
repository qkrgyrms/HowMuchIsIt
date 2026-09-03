"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IngredientInput } from "@/components/IngredientInput";
import { useAppStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { ingredients, setIngredients, setRecipes } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (value: string) => {
    if (ingredients.includes(value)) return;
    setIngredients([...ingredients, value]);
    setError(null);
  };

  const removeIngredient = (value: string) => {
    setIngredients(ingredients.filter((item) => item !== value));
  };

  const handleSubmit = async () => {
    if (ingredients.length === 0) {
      setError("재료를 하나 이상 입력해주세요.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "레시피 추천에 실패했습니다.");
        return;
      }
      setRecipes(data.레시피목록);
      router.push("/recipes");
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-zinc-900">냉장고 셰프</h1>
        <p className="mt-2 text-zinc-500">
          냉장고에 있는 재료를 입력하면 AI가 만들 수 있는 요리를 추천해드려요.
        </p>

        <div className="mt-8">
          <IngredientInput
            ingredients={ingredients}
            onAdd={addIngredient}
            onRemove={removeIngredient}
          />
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-orange-50 px-4 py-3 text-sm text-orange-700">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-zinc-900 py-4 text-base font-semibold text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {loading ? "레시피 찾는 중..." : "레시피 추천받기"}
        </button>
      </div>
    </div>
  );
}
