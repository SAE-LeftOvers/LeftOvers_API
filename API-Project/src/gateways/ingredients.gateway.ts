import { Ingredient } from "../types/ingredients";
import { Connection } from "../database/connection"

export class IngredientsGateway {
    connection:Connection

    constructor() {
        this.connection = new Connection()
    }

    async getAll() : Promise<Ingredient[]> {
        const client = await this.connection.getPoolClient()

        const res = await client.query('SELECT * FROM Ingredients ORDER BY id')

        client.release()

        let ingredients:Ingredient[] = []

        for (let key in res.rows) {
            let ingredient:Ingredient = new Ingredient(Number(res.rows[key].id), res.rows[key].name);
            ingredients.push(ingredient);
        }

        return ingredients
    }

    async findOneById(id: number) : Promise<Ingredient | null> {
        const client = await this.connection.getPoolClient()

        const query = {
            text: 'SELECT * FROM Ingredients WHERE id =$1',
            values: [id],
        }
        
        const res = await client.query(query)

        client.release()

        if (res.rowCount != 1) {
            return null
        }

        const ingredient = new Ingredient(Number(res.rows[0].id), String(res.rows[0].name))

        return ingredient
    }

    async findIngredientsForRecipe(id: number): Promise<any> {
        const client = await this.connection.getPoolClient()
    
        const query = {
            text: 'SELECT i.name, i.id FROM Ingredients i, Composed c WHERE c.idRecipe =$1 AND i.id = c.idIngredient',
            values: [id],
        };
    
        const res = await client.query(query);

        client.release()
    
        if (res.rowCount === 0) {
            return null;
        }

        const ingredients = res.rows.map(row => ({
            name: row.name,
            id: Number(row.id), // Conversion de l'identifiant en nombre
        }));
    
        return ingredients as Ingredient[];
    }

    async getByLetter(letter: string): Promise<any> {
        const client = await this.connection.getPoolClient()
        
        const query = {
            text: 'SELECT * FROM Ingredients i WHERE LOWER(SUBSTRING(i.name, 1, 1)) = $1 ORDER BY i.name',
            values: [letter.toLowerCase()],
        };
        
        const res = await client.query(query);

        client.release()
        
        if (res.rowCount === 0) {
            return null;
        }
        
        let ingredients: Ingredient[] = [];
    
        for (const row of res.rows) {
            const ingredient: Ingredient = new Ingredient(Number(row.id), row.name);
            ingredients.push(ingredient);
        }
    
        return ingredients;
    }

    async filter(prompt: string): Promise<any> {
        const client = await this.connection.getPoolClient()
        
        const query = {
            text: `
                CREATE EXTENSION IF NOT EXISTS pg_trgm; -- Vérifie si l'extension est déjà installée, sinon l'installe
                SELECT *
                FROM Ingredients
                WHERE LOWER(name) LIKE $1
                ORDER BY similarity(name, $2) DESC, name ASC;
            `,
            values: [`%${prompt.toLowerCase()}%`, prompt.toLowerCase()],
        };
    
        
        const res = await client.query(query);

        client.release()
        
        if (res.rowCount === 0) {
            return null;
        }
        
        let ingredients: Ingredient[] = [];
    
        for (const row of res.rows) {
            const ingredient: Ingredient = new Ingredient(Number(row.id), row.name);
            ingredients.push(ingredient);
        }
    
        return ingredients;
    }
    
    

}