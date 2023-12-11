import { Router } from "express";
import { IngredientsClassesGateway } from "../gateways/ingredientsClasses.gateway";
import { RecipeGateway } from "../gateways/recipe.gateway";
import { IngredientsClasses } from "../types/ingredientsClasses";

const IngredientsClassesController = Router();

const class_gw: IngredientsClassesGateway = new IngredientsClassesGateway();
const recipe_gw: RecipeGateway = new RecipeGateway();

function validateAndParseId(req: any, res: any): number | null {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).send('Invalid parameter or no parameter');
        return null;
    }

    return id;
}

IngredientsClassesController.get('/ofingr/:id', async (req, res) => {
    const id = validateAndParseId(req, res);
    if (id === null) return;

    try {
        const classes = await class_gw.getForIngredient(id);

        if (classes.length === 0) {
            res.status(404).send('Not found');
        } else {
            res.status(200).json(classes);
        }
    } catch (error) {
        const error_error = error as Error;
        res.status(500).send(error_error.message);
    }
});

IngredientsClassesController.get('/ofrecipe/:id', async (req, res) => {
    const id = validateAndParseId(req, res);
    if (id === null) return;

    try {
        const recipe = await recipe_gw.getById(id);

        if (!recipe) {
            res.status(404).send('Recipe not found');
            return;
        }

        let final_classes: IngredientsClasses[] = Array.from(new Set(Object.values(IngredientsClasses)));

        for (const ingredient of recipe.ingredients) {
            const new_classes: IngredientsClasses[] = await class_gw.getForIngredient(ingredient.id);
            final_classes = final_classes.filter(item => new_classes.includes(item));
        }

        res.status(200).json(final_classes);
    } catch (error) {
        const error_error = error as Error;
        res.status(500).send(error_error.message);
    }
});

export { IngredientsClassesController };
