const knex = require('knex')
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: "./sampledb.sqlite"
    }
});
module.exports = db