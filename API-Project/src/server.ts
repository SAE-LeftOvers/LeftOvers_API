import express from "express";
import { IngredientsController } from "./controllers/ingredients.controller"

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from express and typescript !');
});

app.use('/ingredients', IngredientsController);

const port  = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listenning on PORT ${port}`));