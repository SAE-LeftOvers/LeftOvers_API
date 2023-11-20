import { Router } from "express";
import { Recipe } from "../types/recipes";
import { Exceptions } from "../utils/exception";
import { RecipeGateway } from "../gateways/recipe.gateway";


const RecipesController = Router()

const recipes_gw = new RecipeGateway()

RecipesController.get('/', async (req, res) => {
    try {
        const recipes = await recipes_gw.getAll()

        res.status(200).json(recipes)
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

RecipesController.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        throw new Exceptions.BadRequestException('id invalid !');
    }

    try {
        const recipe = await recipes_gw.getById(id)

        if (recipe == null) {
            res.status(404).send('not found')
        }
        else {
            const ingredient_ingredient = recipe as Recipe

            res.status(200).json(recipe)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

export { RecipesController }