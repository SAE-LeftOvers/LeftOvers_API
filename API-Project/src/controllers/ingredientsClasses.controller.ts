import { Router } from "express";
import { IngredientsClassesGateway } from "../gateways/ingredientsClasses.gateway";


const IngredientsClassesController = Router()

const class_gw: IngredientsClassesGateway = new IngredientsClassesGateway()


IngredientsClassesController.get('/ofingr/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).send('invalid parameter or no parameter')
        return
    }

    try {
        const classes = await class_gw.getForIngredient(Number(id))

        if (classes.length == 0) {
            res.status(404).send('not found')
        }
        else {
            res.status(200).json(classes)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

export { IngredientsClassesController }