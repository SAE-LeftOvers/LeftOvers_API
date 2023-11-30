import { Connection } from "../database/connection"

export class StepsGateway {
    connection:Connection

    constructor() {
        this.connection = new Connection()
    }


    async getForRecipes(id: number): Promise<string[]> {
        const client = await this.connection.getPoolClient()
    
        const query = {
            text: 'SELECT action FROM Steps WHERE idRecipe = $1 ORDER BY numstep',
            values: [id],
        };
    
        const res = await client.query(query);

        client.release()
    
        const steps = res.rows.map(row => row.action);
    
        return steps as string[];
    }
}