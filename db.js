const mongoose = require("mongoose");
require("dotenv").config();

const server = process.env.MONGODB_URI;
const server2 = process.env.DATABASE_SERVER;
const database = process.env.DATABASE_NAME;

class Database {
    constructor(){
        this._connect();
    }

_connect(){
    mongoose
    .connect(`${server}`)
    .then(() => {
        console.log('Database successfully connect.');
    })
    .catch((err) => {
        console.error("Database connection faield.");
    });
}
}

module.exports = new Database();