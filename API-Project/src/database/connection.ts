import { Pool, PoolClient } from "pg"
require('dotenv').config();

export class Connection {
  private pool:Pool

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USERNAME,
      host: process.env.DB_DBHOST,
      database: process.env.DB_DBNAME,
      password: process.env.DB_USERPASSWORD,
      port: Number(process.env.DB_PORT),
    })
  }

  public async getPoolClient() : Promise<PoolClient> {
    return await this.pool.connect()
  }
}