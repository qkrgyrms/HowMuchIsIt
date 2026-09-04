"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function ShoppingListPage() {
  const { shoppingList, toggleShoppingItem, removeShoppingItem, clearCheckedShoppingItems } =
    useAppStore();

  const checkedCount = shoppingList.filter((item) => item.checked).length;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">장보기 리스트</h1>
          <Link href="/recipes" className="text-sm text-zinc-500 hover:text-zinc-800">
            레시피 목록으로
          </Link>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          레시피 상세 화면에서 &ldquo;장보기 리스트에 담기&rdquo;를 누르면 부족한 재료가
          여기 모입니다.
        </p>

        {shoppingList.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-zinc-500">아직 담긴 재료가 없어요.</p>
            <Link
              href="/recipes"
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700"
            >
              레시피 보러 가기
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-6 flex flex-col gap-2">
              {shoppingList.map((item) => (
                <li
                  key={item.이름}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 text-sm shadow-sm"
                >
                  <label className="flex flex-1 items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleShoppingItem(item.이름)}
                      className="h-4 w-4 rounded border-zinc-300"
                    />
                    <span
                      className={
                        item.checked
                          ? "text-zinc-400 line-through"
                          : "text-zinc-800"
                      }
                    >
                      {item.이름}
                    </span>
                    <span className="text-zinc-400">{item.수량}</span>
                  </label>
                  <span className="shrink-0 text-xs text-zinc-400">가격 정보 없음</span>
                  <button
                    type="button"
                    onClick={() => removeShoppingItem(item.이름)}
                    aria-label={`${item.이름} 삭제`}
                    className="shrink-0 text-zinc-400 hover:text-zinc-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-center text-xs text-zinc-400">
              근처 마트 최저가 안내는 준비 중입니다.
            </p>

            {checkedCount > 0 && (
              <button
                type="button"
                onClick={clearCheckedShoppingItems}
                className="mt-6 w-full rounded-xl border border-zinc-300 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
              >
                구매 완료한 재료 지우기 ({checkedCount}개)
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
