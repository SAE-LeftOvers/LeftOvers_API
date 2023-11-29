import { Client } from "pg"


export class Connection {
  public client:Client
  clientIsConnected:boolean = false

  constructor() {
    this.client = new Client({
      user: process.env.DB_USERNAME,
      host: process.env.DB_DBHOST,
      database: process.env.DB_DBNAME,
      password: process.env.DB_USERPASSWORD,
      port: Number(process.env.DB_PORT),
    })
  }

  public async connect() {
    if (!this.clientIsConnected) {
      await this.client.connect()
      this.clientIsConnected = true
    }
  }
}