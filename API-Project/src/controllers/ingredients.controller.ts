import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { Exceptions } from "../utils/exception";
import { IIngredient, Ingredient } from "../types/ingredients";
import { pool } from "../database/connection";
import { Query, QueryResult } from "pg";
import { IngredientsGateway } from "../gateways/ingredients.gateway";


const IngredientsController = Router()

const ingredient_gw = new IngredientsGateway()

/** To get all ingredients */
IngredientsController.get('/', async (req, res) => {
    try {
        const ingredients = await ingredient_gw.getAll()

        res.status(200).json(ingredients)
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

/** To get one ingredient by id */
IngredientsController.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        throw new Exceptions.BadRequestException('id invalid !');
    }

    try {
        const ingredient = await ingredient_gw.findOneById(id)

        if (ingredient == null) {
            res.status(404).send('not found')
        }
        else {
            const ingredient_ingredient = ingredient as Ingredient

            res.status(200).json(ingredient)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

export { IngredientsController }