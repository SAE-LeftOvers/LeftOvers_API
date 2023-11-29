import express from "express";

require('dotenv').config();

import { IngredientsController } from "./controllers/ingredients.controller";
import { RecipesController } from "./controllers/recipes.controller";
import { StepsController } from "./controllers/steps.controller";

let helmet = require("helmet");
let app = express();
app.use(helmet.hidePoweredBy());

app.get('/', (req, res) => {
    res.send('Hello from express and typescript !');
});

app.use('/ingredients', IngredientsController);
app.use('/recipes', RecipesController);
app.use('/steps', StepsController)

const port  = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listenning on PORT ${port}`));