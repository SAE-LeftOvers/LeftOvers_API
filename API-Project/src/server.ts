require('dotenv').config();
import express from "express";
import cors from "cors";
import { IngredientsController } from "./controllers/ingredients.controller";
import { RecipesController } from "./controllers/recipes.controller";
import { StepsController } from "./controllers/steps.controller";

let helmet = require("helmet");
const app = express();
app.use(helmet.hidePoweredBy());

// Configuration du middleware CORS pour autoriser toutes les origines
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
    res.status(200).send('Hello from express and typescript!');
});

app.use('/ingredients', IngredientsController);
app.use('/recipes', RecipesController);
app.use('/steps', StepsController);

const port = Number(process.env.PORT) || 3000;

export const startServer = (port_to_use: number) => {
  return app.listen(port_to_use, () => console.log(`App listening on PORT ${port_to_use}`));
};

if (require.main === module) {
  startServer(port);
}

export default app;
