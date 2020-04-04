const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./db")

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

        app.get("/api/all", async (req, res) => {
            const posts = await db.collection("posts");
            res.send(await posts.find({}).toArray())
        })

        app.post("/api/posts", async (req, res) => {
            const posts = await db.collection("posts");
            await posts.insertOne({
                text: req.body.text,
                createdAt: new Date()
            });
            res.status(201).send()
        })

        app.delete("/api/delete/:id", async (req, res) => {
            const posts = await db.collection("posts");
            await posts.deleteOne({ _id: new require("mongodb").ObjectID(req.params.id) });
            res.status(200).send()
        })
    }
}

module.exports = async ({ app }) => {
    const routing = new Routing(app);
    routing.configure();
    routing.init();
};