import { Ingredient } from "../types/ingredients";
import { Recipe } from "../types/recipes"
import { Connection } from "../database/connection"
import { Router } from "express";
import { StepsGateway } from "./steps.gateway";

export class RecipeGateway {
    connection:Connection

    constructor() {
        this.connection = new Connection()
    }

    async getAll() : Promise<Recipe[]> {
        this.connection.connect()
        const steps_gw = new StepsGateway()

        const res = await this.connection.client.query('SELECT * FROM Recipes ORDER BY id');
        
        const steps: string[] = [];
        let recipes:Recipe[] = []

        for (let key in res.rows) {
            const steps = await steps_gw.getForRecipes(Number(key));
            let recipe:Recipe = new Recipe(Number(res.rows[key].id), res.rows[key].name,  res.rows[key].description,  res.rows[key].time, steps);
            recipes.push(recipe);
        }

        console.log(recipes);

        return recipes
    }

    async getById(id: Number) : Promise<Recipe | null>{
        this.connection.connect()
        const steps_gw = new StepsGateway()

        const query = {
            text: 'SELECT * FROM Recipes WHERE id =$1',
            values: [id],
        }

        const res = await this.connection.client.query(query)

        if (res.rowCount != 1) {
            return null
        }

        const steps = await steps_gw.getForRecipes(id)
        console.log(steps);
        const recipe = new Recipe(Number(res.rows[0].id), res.rows[0].name,  res.rows[0].description,  res.rows[0].time, steps);
        console.log(recipe);
        
        return recipe;
    }
}