import { Router } from "express";
import { IngredientsGateway } from "../gateways/ingredients.gateway";

const IngredientsController = Router()

const ingredient_gw = new IngredientsGateway()


IngredientsController.get('/filter/:prompt', async (req, res) => {
    const prompt = req.params.prompt;

    if (!prompt) {
        res.status(400).send('invalid parameter or no parameter')
        return
    }

    try {
        const ingredient = await ingredient_gw.filter(prompt);

        if (ingredient == null) {
            res.status(404).send('Not found');
        } else {
            res.status(200).json(ingredient);
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message);
    }
});

IngredientsController.get('/letter/:letter', async (req, res) => {
    const letter = req.params.letter;

    if (!letter) {
        res.status(400).send('invalid parameter or no parameter')
        return
    }

    try {
        const ingredient = await ingredient_gw.getByLetter(letter);

        if (ingredient == null) {
            res.status(404).send('Not found');
        } else {
            res.status(200).json(ingredient);
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message);
    }
});

/** To get one ingredient by id */
IngredientsController.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).send('invalid parameter')
        return
    }

    try {
        const ingredient = await ingredient_gw.findOneById(id)

        if (ingredient == null) {
            res.status(404).send('not found')
        }
        else {
            res.status(200).json(ingredient)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

IngredientsController.get('/', async (req, res) => {
    try {
        const ingredients = await ingredient_gw.getAll()

        res.status(200).json(ingredients)
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

export { IngredientsController }