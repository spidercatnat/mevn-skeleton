const mongodb = require("mongodb");

const db = {
    collection: async function (name) {
        const client = await mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/", { useUnifiedTopology: true });
        return client.db("vue_express").collection(name);
    }
}

module.exports = { db };