const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./db");
const { User } = require("./db/models")

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
        db.connect()
    }

    init() {
        const { app } = this;

        // app.post("/api/posts", async (req, res) => {
        //     const posts = await db.collection("posts");
        //     await posts.insertOne({
        //         text: req.body.text,
        //         createdAt: new Date()
        //     });
        //     res.status(201).send()
        // })

        app.post("/api/signup", async (req, res) => {
            try {
                const user = new User(req.body.newUser);
                await user.save();
                res.status(201).send({ ok: true, message: "Creating your account...", user, token: await user.generateAuthToken() });
            } catch (e) {
                console.log(e)
                res.status(500).send({ ok: false, message: e });
            }
        });

        app.post("/api/login", async (req, res) => {
            try {
                const { email, password } = req.body
                const user = await User.findByCredentials(email, password)
                if (!user) {
                    return res.status(401).send({error: 'Login failed! Check authentication credentials'})
                }
                const token = await user.generateAuthToken()
                res.send({ user, token, message: "Logging in..." })
            } catch (e) {
                res.status(400).send({ ok: false, message: "Please double-check your credentials."});
            }
            
        })

        app.get("/api/verify", (req, res, next) => {
            let token = req.headers['authorization'].split(' ')[1]; // Express headers are auto converted to lowercase

            require('jsonwebtoken').verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        auth: false,
                        message: 'You are not logged in.',
                        err
                    });
                } else {
                    return res.json({
                        auth: true,
                        message: "You are logged in."
                    })
                }
            });

        })

        app.use(express.static(__dirname + "/public/"));
        app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
    }
}

module.exports = async ({ app }) => {
    const routing = new Routing(app);
    routing.configure();
    routing.init();
};