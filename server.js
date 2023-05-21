const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

let database;

async function getDatabase(){
    const client = await MongoClient.connect('mongodb+srv://tlogeshwaran2003:logeshlogu@customerorderdatabase.6krvscb.mongodb.net/Customer');
    database = client.db('Customer');

    if (!database) {
            console.log('Error connecting to Database');
    }

    return database;
}

module.exports = {
    getDatabase,
    ObjectID
}