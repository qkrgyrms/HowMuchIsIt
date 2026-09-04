import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Recipe, RecipeIngredient, ShoppingListItem } from "./types";

interface AppState {
  ingredients: string[];
  recipes: Recipe[];
  shoppingList: ShoppingListItem[];
  setIngredients: (ingredients: string[]) => void;
  setRecipes: (recipes: Recipe[]) => void;
  addToShoppingList: (items: RecipeIngredient[]) => void;
  toggleShoppingItem: (이름: string) => void;
  removeShoppingItem: (이름: string) => void;
  clearCheckedShoppingItems: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ingredients: [],
      recipes: [],
      shoppingList: [],
      setIngredients: (ingredients) => set({ ingredients }),
      setRecipes: (recipes) => set({ recipes }),
      addToShoppingList: (items) =>
        set((state) => {
          const existingNames = new Set(state.shoppingList.map((i) => i.이름));
          const newItems = items
            .filter((item) => !existingNames.has(item.이름))
            .map((item) => ({ ...item, checked: false }));
          return { shoppingList: [...state.shoppingList, ...newItems] };
        }),
      toggleShoppingItem: (이름) =>
        set((state) => ({
          shoppingList: state.shoppingList.map((item) =>
            item.이름 === 이름 ? { ...item, checked: !item.checked } : item,
          ),
        })),
      removeShoppingItem: (이름) =>
        set((state) => ({
          shoppingList: state.shoppingList.filter((item) => item.이름 !== 이름),
        })),
      clearCheckedShoppingItems: () =>
        set((state) => ({
          shoppingList: state.shoppingList.filter((item) => !item.checked),
        })),
    }),
    {
      name: "howmuchisit-shopping-list",
      partialize: (state) => ({ shoppingList: state.shoppingList }),
    },
  ),
);
