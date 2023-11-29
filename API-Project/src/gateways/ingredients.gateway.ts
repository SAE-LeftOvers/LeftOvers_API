import { Ingredient } from "../types/ingredients";
import { Connection } from "../database/connection"

export class IngredientsGateway {
    connection:Connection

    constructor() {
        this.connection = new Connection()
    }

    async getAll() : Promise<Ingredient[]> {
        this.connection.connect()

        const res = await this.connection.client.query('SELECT * FROM Ingredients ORDER BY id')

        let ingredients:Ingredient[] = []

        for (let key in res.rows) {
            let ingredient:Ingredient = new Ingredient(Number(res.rows[key].id), res.rows[key].name);
            ingredients.push(ingredient);
        }

        return ingredients
    }

    async findOneById(id: number) : Promise<Ingredient | null> {
        this.connection.connect()

        const query = {
            text: 'SELECT * FROM Ingredients WHERE id =$1',
            values: [id],
        }
        
        const res = await this.connection.client.query(query)

        if (res.rowCount != 1) {
            return null
        }

        const ingredient = new Ingredient(Number(res.rows[0].id), String(res.rows[0].name))

        return ingredient
    }

    async findIngredientsForRecipe(id: number): Promise<any> {
        this.connection.connect();
    
        const query = {
            text: 'SELECT i.name, i.id FROM Ingredients i, Composed c WHERE c.idRecipe =$1 AND i.id = c.idIngredient',
            values: [id],
        };
    
        const res = await this.connection.client.query(query);
        console.log(res)
    
        if (res.rowCount === 0) {
            return null;
        }

    
        const ingredients = res.rows.map(row => ({
            name: row.name,
            id: Number(row.id), // Conversion de l'identifiant en nombre
        }));
        console.log(ingredients);
    
        return ingredients as Ingredient[];
    }

}