import { Recipe } from "../types/recipes"
import { Connection } from "../database/connection"
import { StepsGateway } from "./steps.gateway";
import { IngredientsGateway } from "./ingredients.gateway";

export class RecipeGateway {
    connection:Connection
    steps_gw:StepsGateway
    ingredient_gw:IngredientsGateway

    constructor() {
        this.connection = new Connection()
        this.steps_gw = new StepsGateway()
        this.ingredient_gw = new IngredientsGateway()
    }

    async getAll() : Promise<Recipe[]> {
        this.connection.connect()
        const res = await this.connection.client.query('SELECT * FROM Recipes ORDER BY id');
        
        const steps: string[] = [];
        let recipes: Recipe[] = []

        for (let key in res.rows) {
            const steps = await this.steps_gw.getForRecipes(Number(key));
            const ingredients = await this.ingredient_gw.findIngredientsForRecipe(Number(key))
            let recipe:Recipe = new Recipe(Number(res.rows[key].id), res.rows[key].name,  res.rows[key].description,  res.rows[key].time, steps, ingredients);
            recipes.push(recipe);
        }

        console.log(recipes);

        return recipes
    }

    async getById(id: number) : Promise<Recipe | null>{
        this.connection.connect()

        const query = {
            text: 'SELECT * FROM Recipes WHERE id =$1',
            values: [id],
        }

        const res = await this.connection.client.query(query)

        if (res.rowCount != 1) {
            return null
        }

        const steps = await this.steps_gw.getForRecipes(Number(id))
        const ingredients = await this.ingredient_gw.findIngredientsForRecipe(Number(id))
        const recipe = new Recipe(Number(res.rows[0].id), 
                                        res.rows[0].name,  
                                        res.rows[0].description,  
                                        Number(res.rows[0].time), 
                                        steps, ingredients);
        console.log(ingredients);

        return recipe;
    }
}