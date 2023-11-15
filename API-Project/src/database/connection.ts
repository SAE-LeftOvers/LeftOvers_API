const Pool = require('pg').Pool
export const pool = new Pool({
  user: 'rgregnault',
  host: 'localhost',
  database: 'leftovers',
  password: 'Cl@ssicP@ssw0rd',
  port: 5432,
})