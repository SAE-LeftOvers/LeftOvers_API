import { Connection } from "../database/connection"
import { IngredientsClasses } from "../types/ingredientsClasses"

export class IngredientsClassesGateway {
    connection: Connection

    constructor() {
        this.connection = new Connection()
    }


    async getForIngredient(id: number): Promise<IngredientsClasses[]> {
        const client = await this.connection.getPoolClient()
        let classes : IngredientsClasses[] = []
    
        const query = {
            text: 'SELECT name FROM Composed, IngredientsClasses WHERE idIngredient = $1 AND idClass = id',
            values: [id],
        }
    
        const res = await client.query(query)

        client.release()
    
        for (let row of res.rows) {
            const classNameString: string = row.name;
            const classNameEnum: IngredientsClasses = IngredientsClasses[classNameString as keyof typeof IngredientsClasses];

            if (classNameEnum !== undefined) {
                classes.push(classNameEnum);
            }
        }
    
        return classes
    }
}