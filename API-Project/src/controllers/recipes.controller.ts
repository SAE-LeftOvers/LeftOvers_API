import { Router } from "express";
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
            res.status(200).json(recipe)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

RecipesController.get('/withingr/:ids', async (req, res) => {
    let ids: number[] = [];
    let raw_ids = String(req.params.ids).split(':')
    for (let key in raw_ids) {
        const test = Number(raw_ids[key])
        if (Number.isNaN(test) || !Number.isInteger(test)) {
            res.status(400).json('A parameter is not an integer')
        }
        ids.push(Number(test))
    }

    try {
        const recipes = await recipes_gw.getIdsRecipesThatContainsIngredients(ids)

        if (recipes.length == 0) {
            res.status(404).json('no data found')
        } 
        else {
            res.status(200).json(recipes)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

RecipesController.get('/getcommentsdictionary/:id', async (req, res) => {
    const id: number = Number(req.params.id)
    if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json('The parameter is not an integer')
    }

    try {
        const dictionary_comments = await recipes_gw.getCommentsDictionary(id)

        if (dictionary_comments.length == 0) {
            res.status(404).json('no data found')
        }
        else {
            res.status(200).json(dictionary_comments)
        }
    }
    catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

RecipesController.get('/getratinglist/:id', async (req, res) => {
    const id: number = Number(req.params.id)
    if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json('The parameter is not an integer')
    }

    try {
        const rating_list = await recipes_gw.getRatingList(id)

        if (rating_list.length == 0) {
            res.status(404).json('no data found')
        }
        else {
            res.status(200).json(rating_list)
        }
    }
    catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

export { RecipesController }