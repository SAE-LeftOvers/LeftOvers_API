import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { Exceptions } from "../utils/exception";
import { IIngredient, Ingredient } from "../types/ingredients";
import { pool } from "../database/connection";
import { Query, QueryResult } from "pg";


const IngredientsController = Router()

/** To get all ingredients */
IngredientsController.get('/', (req, res) => {
    let ingredients:Ingredient[] = []
    pool.query({text:'SELECT * FROM Ingredients ORDER BY id'}, (error: Error, results: QueryResult) => {
        if (error) {
            throw(error);
        }
        for (let key in results.rows) {
            let ingredient:Ingredient = new Ingredient(Number(results.rows[key].id), results.rows[key].name);
            ingredients.push(ingredient);
        }
        res.status(200);
        res.json(ingredients);
    })
    return res;
})

/** To get one ingredient by id */
IngredientsController.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        throw new Exceptions.BadRequestException('id invalid !');
    }

    pool.query({text:'SELECT * FROM Ingredients WHERE id =$1',
                values: [id]}, (error: Error, results: QueryResult) => {
        if (error) {
            throw(error)
        }
        
        if (results.rowCount == 0) {
            throw new Exceptions.NotFoundException('no ingredient with this id');
        }

        res.status(200)
        res.json(results.rows)
    })

    return res;
})

export { IngredientsController }