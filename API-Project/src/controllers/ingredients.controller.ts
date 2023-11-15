import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { Exceptions } from "../utils/exception";
import { IIngredient } from "../types/ingredients";
import { pool } from "../database/connection";
import { queryResult } from "pg-promise";


const IngredientsController = Router()

/** To get all ingredients */
IngredientsController.get('/', (req, res) => {
    pool.query('SELECT * FROM Ingredients ORDER BY id', (error: Error, results: queryResult) => {
        if (error) {
            throw(error)
        }
        res.status(200);
        res.send("Liste des ingredients").json(results);
    })

    return res;
})

/** To get one ingredient by id */
IngredientsController.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        throw new Exceptions.BadRequestException('id invalid !');
    }

    res.send(`Searching for ingredient with id = ${id}...`);
    res.status(200);

    return res;
})

export { IngredientsController }