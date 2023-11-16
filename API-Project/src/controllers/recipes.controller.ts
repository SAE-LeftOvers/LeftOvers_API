import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { pool } from "../database/connection";
import { Query, QueryResult } from "pg";
import { IRecipe, Recipe } from "../types/recipes";
import { IngredientsController } from "./ingredients.controller";
import { IIngredient } from "../types/ingredients";


const RecipesController = Router()

RecipesController.get('/', async (req, res) => {
    let recipes:IRecipe[] = []
    await pool.query('SELECT * FROM Recipe ORDER BY id', async (error: Error, result: QueryResult) => {
        if (error) {
            throw error;
        }

        for (let key in result.rows) {
            const current = result.rows[key]
            let recipe = new Recipe(current.id, current.name, current.description, current.time_to_cook);
            const ingr_ids = current.ingredients
            for (let ingr_id in ingr_ids) {
                
            }
        }

        res.json(result.rows)
    })
    return res;
})

export { RecipesController }