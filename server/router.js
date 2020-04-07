const express = require("express"); // Express backend framework
const morgan = require("morgan"); // Morgan for debugging logs
const cors = require("cors"); // Enables CORS for local API development
const bodyParser = require("body-parser"); // JSON utility
const { db } = require("./db"); // Database connection
const { User, Haircut } = require("./models") // Models
const { auth } = require("./middleware"); // Auth middleware
/** Routing
 *  A class that configures middleware and initializes endpoints for the REST API.
 */
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
        db.connect();
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
        app.post("/api/new-appointment", auth, async (req, res) => {
            const { title, start, end } = req.body.haircut;
            const appointment = {
                customerID: new require('mongoose').Types.ObjectId(req.user._id),
                title,
                start,
                end
            }
            try {
                const haircut = new Haircut(appointment);
                await haircut.save();
            } catch(e) {
                console.log(e);
                res.status(500).send("Error creating new appointment!")
            }
        });

        /** ALL APPOINTMENTS
         *  Read operation for appointments in MongoDB. 
         *  Gets all appointments associated with the user's ID.
         */
        app.get("/api/all-appointments", async (req, res) => {
            const appointments = await Haircut.find({ customerID: req.user._id })
            console.log(appointments);
        });

        /** UPDATE APPOINTMENT
         * 
         */
        app.put("/api/update-appointment", async (req, res) => {
            console.log("Updating appointment...")
        });

        /** DELETE APPOINTMENT
         * 
         */
        app.delete("/api/cancel-appointment", async (req, res) => {
            console.log("Canceling appointment...")
        });

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
         *  Gets the user's specific session token and removes it from MongoDB.
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