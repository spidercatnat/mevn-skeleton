require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router");

async function start() {
    await router({ app });
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

start();