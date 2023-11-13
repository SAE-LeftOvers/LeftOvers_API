import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { Exceptions } from "../utils/exception";


const IngredientsController = Router()

/** To get all ingredients */
IngredientsController.get('/', (req, res) => {
    res.status(200)
    res.send("Liste des ingredients");
    return res;
})

/** To get one ingredient by id */
IngredientsController.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        throw new Exceptions.BadRequestException('id invalid !')
    }

    res.send(`Searching for ingredient with id = ${id}...`);
    res.status(200);

    return res;
})

export { IngredientsController }