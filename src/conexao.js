require('dotenv').config()
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'isabelle.db.elephantsql.com',
        port: 5432,
        user: 'asvocent',
        password: `${process.env.SENHA}`,
        database: 'asvocent'
    },
    ssl: { rejectUnauthorized: false }
});
module.exports = knex