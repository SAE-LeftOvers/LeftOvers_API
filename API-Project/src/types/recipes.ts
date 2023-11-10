import type { Ingredient } from "./ingredients"

export interface Recipe {
    id: number,
    name: string,
    description: string,
    time_to_cook: number,
    ingredients: Ingredient[],
    steps: string[]
}