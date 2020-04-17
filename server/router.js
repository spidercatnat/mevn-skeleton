const express = require("express"); // Express backend framework
const morgan = require("morgan"); // Morgan for debugging logs
const cors = require("cors"); // Enables CORS for local API development
const bodyParser = require("body-parser"); // JSON utility
const { db } = require("./db"); // Database connection
const { User, Appointment, Barber } = require("./models"); // Models
const { auth } = require("./middleware"); // Auth middleware
const {
  user: { signup, login, logout, verify },
} = require("./controllers");

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

    app.post("/api/signup", signup);
    app.post("/api/login", login);
    app.get("/api/logout", auth, logout);
    app.get("/api/verify", auth, (req, res) => console.log("Verifying credentials."));

    app.post("/api/new-appointment", auth, async (req, res) => {
      const { title, start, end } = req.body.haircut;
      const appointment = {
        customerID: new require("mongoose").Types.ObjectId(req.user._id),
        title,
        start,
        end,
      };
      try {
        const haircut = new Appointment(appointment);
        await haircut.save();
      } catch (e) {
        console.log(e);
        res.status(500).send("Error creating new appointment!");
      }
    });

    app.get("/api/available-appointments/:barber", async (req, res) => {
      console.log(`Getting available appointments for ${req.params.barber}`);
      const { _id: barberID} = await Barber.findOne({ name: req.params.barber });
      const appointments = await Appointment.find({ barberID, available: true });
      res.json(appointments)
    });

    app.get("/api/all-appointments", async (req, res) => {
      const appointments = await Haircut.find({ customerID: req.user._id });
      console.log(appointments);
    });

    app.put("/api/update-appointment", async (req, res) => {
      console.log("Updating appointment...");
    });

    app.delete("/api/cancel-appointment", async (req, res) => {
      console.log("Canceling appointment...");
    });

    /* In production, serve assets from the build folder. */
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
  }
}

module.exports = async ({ app }) => {
  const routing = new Routing(app);
  routing.configure();
  routing.init();
};
