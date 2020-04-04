const mongodb = require("mongodb");

const MONGODB_URI = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017/";

const db = {
    collection: async function (name) {
        const client = await mongodb.MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
        return client.db("vue_express").collection(name);
    }
}

module.exports = { db };