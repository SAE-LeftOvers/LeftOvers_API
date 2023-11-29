import { Router } from "express";
import { Exceptions } from "../utils/exception";
import { StepsGateway } from "../gateways/steps.gateway";


const StepsController = Router()
const steps_gw = new StepsGateway()


StepsController.get('/:id', async (req, res) => {
    const id = String(req.params.id);

    if (!Number.isInteger(id)) {
        throw new Exceptions.BadRequestException('id invalid !');
    }

    try {
        const steps = await steps_gw.getForRecipes(Number(id))

        if (steps == null) {
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