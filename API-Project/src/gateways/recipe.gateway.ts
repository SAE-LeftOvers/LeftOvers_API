import { Ingredient } from "../types/ingredients";
import { Recipe } from "../types/recipes"
import { Connection } from "../database/connection"

export class RecipeGateway {
    connection:Connection

    constructor() {
        this.connection = new Connection()
    }

    async getAll() : Promise<Recipe[]> {
        this.connection.connect()

        const res = await this.connection.client.query('SELECT * FROM Recipes ORDER BY id')

        let recipes:Recipe[] = []
        console.log(res.rows);

        for (let key in res.rows) {
            let recipe:Recipe = new Recipe(Number(res.rows[key].id), res.rows[key].name,  res.rows[key].description,  res.rows[key].time);
            recipes.push(recipe);
        }

        return recipes
    }

    async getById(id: number) : Promise<any>{
        this.connection.connect()

        const query = {
            text: 'SELECT * FROM Recipes WHERE id =$1',
            values: [id],
        }

        const res = await this.connection.client.query(query)

        if (res.rowCount != 1) {
            return null
        }

        const recipe = new Recipe(Number(res.rows[0].id), res.rows[0].name,  res.rows[0].description,  res.rows[0].time);

        return recipe;
    }
}