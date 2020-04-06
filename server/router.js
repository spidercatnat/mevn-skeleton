const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./db");
const { User } = require("./db/models")


/** AUTH
 *  Authorization middleware for protected routes.
 *  Decodes the user's ID from the token and searches MongoDB.
 */
const auth = async (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1]; // Express headers are auto converted to lowercase
    require('jsonwebtoken').verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.json({
                auth: false,
                message: 'You are not logged in.',
                err
            });
        } else {
            try {
                const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
                if (!user) {
                    throw new Error()
                }
                req.user = user
                req.token = token
            } catch (error) {
                console.log(error)
            }
            res.json({
                auth: true,
                message: "You are logged in."
            })
            next()
        }
    });
}

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
        app.use(express.static(__dirname + "/public/"));

        db.connect()

    }

    init() {
        const { app } = this;

        /** SIGNUP
         *  Parses the data from the request and saves a new user to MongoDB.
         */
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
        
        /** CREATE APPOINTMENT
         *  Write operation for appointments in MongoDB.
         */
        app.post("/api/create-appointment", (req, res) => {
            console.log("Creating appointment...", req.body);
        });

        /** ALL APPOINTMENTS
         *  Read operation for appointments in MongoDB.
         */
        app.get("/api/all-appointments", (req, res) => {
            console.log("Getting all appointments for <user>");
        })

        /** LOGIN
         *  Parses the data from the request and uses it to look up account info in MongoDB.
         *  If successful, a JSON Web Token is generated, signed, and sent back to the user.
         *  If unsuccessful, an error is sent back.
         */
        app.post("/api/login", async (req, res) => {
            try {
                const { email, password } = req.body
                const user = await User.findByCredentials(email, password)
                if (!user) {
                    return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
                }
                const token = await user.generateAuthToken()
                res.send({ user, token, message: "Logging in..." })
            } catch (e) {
                res.status(400).send({ ok: false, message: "Please double-check your credentials." });
            }
        });

        /** LOGOUT
         *  Gets the user's specific session token and removes it from MongoDB/
         */
        app.get("/api/logout", auth, async (req, res) => {
            try {
                req.user.tokens = req.user.tokens.filter((token) => {
                    return token.token != req.token
                })
                await req.user.save()
            } catch (error) {
                res.status(500).send(error)
            }
        })

        /** VERIFY
         *  A convenience endpoint to send the auth status to the client for UI rendering.
         */
        app.get("/api/verify", auth, (req, res, next) => {
            console.log("Checking auth status.")
        })

        /** WILDCARD
         *  In production, serve assets from this build folder.
         */
        app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
    }
}

module.exports = async ({ app }) => {
    const routing = new Routing(app);
    routing.configure();
    routing.init();
};