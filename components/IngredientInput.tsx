"use client";

import { useState } from "react";

export function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
}: {
  ingredients: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}) {
  const [text, setText] = useState("");

  const commit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            }
          }}
          placeholder="예: 두부, 대파, 계란"
          className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={commit}
          className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          추가
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-800"
            >
              {ingredient}
              <button
                type="button"
                onClick={() => onRemove(ingredient)}
                aria-label={`${ingredient} 삭제`}
                className="text-zinc-400 hover:text-zinc-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
