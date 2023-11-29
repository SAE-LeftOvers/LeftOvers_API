import { Connection } from "../database/connection"

export class StepsGateway {
    connection:Connection

    constructor() {
        this.connection = new Connection()
    }


    async getForRecipes(id: Number): Promise<string[]> {
        this.connection.connect();
    
        const query = {
            text: 'SELECT action FROM Steps WHERE idRecipe = $1 ORDER BY numstep',
            values: [id],
        };
    
        const res = await this.connection.client.query(query);
    
        const steps = res.rows.map(row => row.action);
    
        return steps as string[];
    }
}