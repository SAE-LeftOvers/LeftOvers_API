import { Request, Response, NextFunction } from "express";
import { Router } from "express";


const RecipesController = Router()

RecipesController.get('/', (req, res) => {
    res.send("Liste des recettes");
    return res;
})

export { RecipesController }