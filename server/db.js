require('dotenv').config()
const mongoose = require("mongoose");

// This is confidential
const MONGOURI = process.env.MONGO_KEY;

// Setting up mongoDB server
const setUpMongoDBServer = async () => {
    try {
        await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connect to DB successful!!");
    } catch(e) {
        console.log(e);
    }
}

module.exports = setUpMongoDBServer;