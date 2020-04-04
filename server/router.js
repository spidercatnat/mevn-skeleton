const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const { db } = require("./db");

class Routing {
    constructor(app) {
        this.app = app;
    }

    configure() {
        const { app } = this;
        app.use(cors());
        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.raw());
        app.use(bodyParser.text({ type: "text/*" }));
        app.disable("x-powered-by");
    }

    init() {
        const { app } = this;

        app.post("/api/posts", async (req, res) => {
            const posts = await db.collection("posts");
            await posts.insertOne({
                text: req.body.text,
                createdAt: new Date()
            });
            res.status(201).send()
        })

        app.get("/api/posts", async (req, res) => {
            const posts = await db.collection("posts");
            res.send(await posts.find({}).toArray())
        })

        app.put("/api/posts/:id", async (req, res) => {
            const posts = await db.collection("posts");
            console.log(req.body.text, req.params.id)
            await posts.updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: { text: req.body.text } }, (err, res) => {
                if (err) console.log(err)
            })
        })

        app.delete("/api/posts/:id", async (req, res) => {
            const posts = await db.collection("posts");
            await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
            res.status(200).send()
        })

        if (process.env.NODE_ENV === "production") {
            app.use(express.static(__dirname + "/public/"));
            app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
        }
    }
}

module.exports = async ({ app }) => {
    const routing = new Routing(app);
    routing.configure();
    routing.init();
};