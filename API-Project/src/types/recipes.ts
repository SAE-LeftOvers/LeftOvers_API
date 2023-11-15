import type { IIngredient } from "./ingredients"

export interface IRecipe {
    id: number,
    name: string,
    description: string,
    time_to_cook: number,
    ingredients: IIngredient[],
    steps: string[]
}