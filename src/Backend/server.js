const mongoose = require("mongoose"),
    express = require("express"),
    routes = require("./routes/"),
    app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    router = express.Router(),
    helmet = require("helmet"),
    config = require("config"),
    logger = require("morgan");

const API_PORT = 8080;

// This is our MongoDB database
let dbRoute = "mongodb://localhost:27017/CodeShackDev"; // Change this

// If test, set the uri correctly
if (config.util.getEnv("NODE_ENV") === "test") {
    console.log("Running test...");
    dbRoute = "mongodb://localhost:27017/CodeShackTest";
} else {
    app.use(logger("dev"));
}

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(router);

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

module.exports = app;
