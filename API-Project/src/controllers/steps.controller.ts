import { Router } from "express";
import { Exceptions } from "../utils/exception";
import { StepsGateway } from "../gateways/steps.gateway";


const StepsController = Router()
const steps_gw = new StepsGateway()


StepsController.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(400).send('invalid parameter or no parameter')
        return
    }

    try {
        const steps = await steps_gw.getForRecipes(Number(id))

        if (steps.length == 0) {
            res.status(404).send('not found')
        }
        else {
            res.status(200).json(steps)
        }
    } catch (error) {
        const error_error = error as Error
        res.status(500).send(error_error.message)
    }
})

export { StepsController }