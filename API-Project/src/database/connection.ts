const Pool = require('pg').Pool
export const pool = new Pool({
  user: 'rgregnault',
  host: 'localhost',
  database: 'leftovers',
  password: 'motdepasse',
  port: 5432,
})