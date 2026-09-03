import { create } from "zustand";
import type { Recipe } from "./types";

interface AppState {
  ingredients: string[];
  recipes: Recipe[];
  setIngredients: (ingredients: string[]) => void;
  setRecipes: (recipes: Recipe[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  ingredients: [],
  recipes: [],
  setIngredients: (ingredients) => set({ ingredients }),
  setRecipes: (recipes) => set({ recipes }),
}));
