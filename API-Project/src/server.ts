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
    res.json({ message: 'Hello from express and typescript!' });
});

app.use('/ingredients', IngredientsController);
app.use('/recipes', RecipesController);
app.use('/steps', StepsController);

const port = process.env.PORT || 3000;

export const startServer = () => {
  return app.listen(port, () => console.log(`App listening on PORT ${port}`));
};

// Exécutez le serveur uniquement si le module est le point d'entrée principal
if (require.main === module) {
  startServer();
}

export default app;
