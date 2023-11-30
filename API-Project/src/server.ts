import express from "express";
import cors from "cors";
import { IngredientsController } from "./controllers/ingredients.controller";
import { RecipesController } from "./controllers/recipes.controller";
import { StepsController } from "./controllers/steps.controller";

const app = express();

// Configuration du middleware CORS pour autoriser toutes les origines
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
    res.json({ message: 'Hello from express and typescript!' });
});

app.use('/ingredients', IngredientsController);
app.use('/recipes', RecipesController);
app.use('/steps', StepsController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
