import { Recipe } from "../types/recipes"
import { Connection } from "../database/connection"
import { StepsGateway } from "./steps.gateway";
import { IngredientsGateway } from "./ingredients.gateway";

export class RecipeGateway {
    connection:Connection
    steps_gw:StepsGateway
    ingredient_gw:IngredientsGateway

    constructor() {
        this.connection = new Connection()
        this.steps_gw = new StepsGateway()
        this.ingredient_gw = new IngredientsGateway()
    }

    async getAll() : Promise<Recipe[]> {
        const client = await this.connection.getPoolClient()
        const res = await client.query('SELECT * FROM Recipes ORDER BY id');
        client.release()
        
        const steps: string[] = [];
        let recipes: Recipe[] = []

        for (let key in res.rows) {
            const steps = await this.steps_gw.getForRecipes(Number(key));
            const ingredients = await this.ingredient_gw.findIngredientsForRecipe(Number(key))
            let recipe:Recipe = new Recipe(Number(res.rows[key].id), res.rows[key].name,  res.rows[key].description,  res.rows[key].time, steps, ingredients);
            recipes.push(recipe);
        }

        return recipes as Recipe[];
    }

    async getById(id: number) : Promise<Recipe | null>{
        const client = await this.connection.getPoolClient()

        const query = {
            text: 'SELECT * FROM Recipes WHERE id =$1',
            values: [id],
        }

        const res = await client.query(query)

        client.release()

        if (res.rowCount != 1) {
            return null
        }

        const steps = await this.steps_gw.getForRecipes(Number(id))
        const ingredients = await this.ingredient_gw.findIngredientsForRecipe(Number(id))
        const recipe = new Recipe(Number(res.rows[0].id), 
                                        res.rows[0].name,  
                                        res.rows[0].description,  
                                        Number(res.rows[0].time), 
                                        steps, ingredients);

        return recipe;
    }

    async getIdsRecipesThatContainsIngredients(ids: number[]) : Promise<Recipe[]> {
        let recipes: Recipe[] = []

        const client = await this.connection.getPoolClient()

        let query_list_text = '($1'
        for (let count = 1; count < ids.length; count++) {
            query_list_text = query_list_text + ', $' + String(count+1)
        }
        query_list_text = query_list_text + ')'
        
        const query = {
            text: 'SELECT idRecipe FROM Composed GROUP BY idRecipe HAVING COUNT(DISTINCT idIngredient) = COUNT(DISTINCT CASE WHEN idIngredient IN ' + query_list_text + ' THEN idIngredient END)',
            values: ids
        }

        const res = await client.query(query)

        client.release()

        for(let key in res.rows) {
            const recipe = await this.getById(Number(res.rows[key].idrecipe))
            if (recipe != null) {
                recipes.push(recipe)
            }
        }

        return recipes as Recipe[];
    }

    async getCommentsDictionary(id: number): Promise<{[word: string]: number}> {
        let comments_dictionary: {[word: string]: number} = {}

        const client = await this.connection.getPoolClient()

        const query = {
            text: 'SELECT comments_dico FROM Recipes WHERE id=$1',
            values: [id]
        }

        const res = await client.query(query)

        client.release()

        if (res.rows != null && res.rows.length >= 1 && res.rows[0] != null) {
            const dictionnary_as_str: string = res.rows[0].comments_dico.replace(/'/g, '"')
            comments_dictionary = JSON.parse(dictionnary_as_str);
            console.log(comments_dictionary)
        }
        
        return comments_dictionary
    }
}