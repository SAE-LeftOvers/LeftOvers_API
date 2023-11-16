export interface IIngredient {
    readonly id: number;
    readonly name: string;
}

export class Ingredient implements IIngredient {
    id: number;
    name: string;

    constructor (id: number, name: string) {
        this.id = id
        this.name = name
    }
}