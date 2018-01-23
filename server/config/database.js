var Datastore = require('nedb')
    ,dbName = 'data.db'
    ,db;

if(!db) {
    db = new Datastore({
        filename: dbName, 
        autoload: true 
    });
    console.log('Banco ' + dbName + ' no ponto de bala')
}

module.exports = db;