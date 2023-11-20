import type { IIngredient } from "./ingredients"

export interface IRecipe {
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly time_to_cook: number,
    ingredients: IIngredient[],
    steps: string[]
}

export class Recipe implements IRecipe {
    id: number
    name: string
    description: string
    time_to_cook: number
    ingredients: IIngredient[]
    steps: string[]

    constructor(id: number, name: string, description: string, time_to_cook: number, steps: string[]) {
        this.id = id
        this.name = name
        this.description = description
        this.time_to_cook = time_to_cook
        this.ingredients = []
        this.steps = steps;
    }

    addStep(newStep: string) {
        this.steps.push(newStep)
    }

    addIngredient(newIngredient: IIngredient) {
        this.ingredients.push(newIngredient)
    }
}