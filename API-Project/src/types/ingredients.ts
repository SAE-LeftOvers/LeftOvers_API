export class Ingredient {
    readonly id: number;
    readonly name: string;

    constructor(init_id: number, init_name: string) {
        this.id = init_id;
        this.name = init_name;
    }
}