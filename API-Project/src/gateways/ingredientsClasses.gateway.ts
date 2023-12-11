import { Connection } from "../database/connection"
import { IngredientsClasses } from "../types/ingredientsClasses"

function convertToEnum<T extends Record<string, string>>(enumObject: T, value: string): T[keyof T] | undefined {
    const enumKeys = Object.keys(enumObject) as Array<keyof T>;
    const enumValues = enumKeys.map(key => enumObject[key]);

    const index = enumValues.indexOf(value as T[keyof T]);
    return index !== -1 ? enumValues[index] as T[keyof T] : undefined;
}

export class IngredientsClassesGateway {
    connection: Connection

    constructor() {
        this.connection = new Connection()
    }


    async getForIngredient(id: number): Promise<IngredientsClasses[]> {
        const client = await this.connection.getPoolClient()
        let classes : IngredientsClasses[] = []
    
        const query = {
            text: 'SELECT name FROM IngredientsClassesAttribution, IngredientsClasses WHERE idIngredient = $1 AND idClass = id',
            values: [id],
        }
    
        const res = await client.query(query)

        client.release()
    
        for (let row of res.rows) {
            const classNameString: string = row.name;

            const classNameEnum: IngredientsClasses | undefined = convertToEnum(IngredientsClasses, classNameString);

            if (classNameEnum !== undefined) {
                classes.push(classNameEnum);
            }

        }

        console.log(classes)
    
        return classes
    }
}