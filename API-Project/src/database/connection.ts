import { Client } from "pg"

const Pool = require('pg').Pool

export const pool = new Pool({
  user: 'rgregnault',
  host: 'localhost',
  database: 'leftovers',
  password: 'motdepasse',
  port: 5432,
})


export class Connection {
  public client:Client
  clientIsConnected:boolean = false

  constructor() {
    this.client = new Client({
      user: 'rgregnault',
      host: 'localhost',
      database: 'leftovers',
      password: 'motdepasse',
      port: 5432,
    })
  }

  public async connect() {
    if (!this.clientIsConnected) {
      await this.client.connect()
      this.clientIsConnected = true
    }
  }
}