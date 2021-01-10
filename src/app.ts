import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";

// package.json
const packageJson = require("../package.json");

const app = express();

// Helmet Setup
// TODO: Look into more options from helmet and try to implement
app.use(helmet());
app.set("trust proxy", true);

// CORS Setup
// TODO: More advance feature can be added here
// if (!inProduction()) {
app.use(cors());
// }

// Port setup
app.set("port", process.env.PORT || 8000);

// Body Parser
// FIXME: Make limit to 5mb
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Compression - gzip
app.use(compression());

// Logger
app.use(morgan("combined")); // TODO: fix morgan with winston

// Passport Setup
// app.use(passport.initialize());
// passportConfigure(passport);


// Database Connection: MONGO
// require("@utils/database/mongo");

app.get("/", (req, res) => {
  res.send({
    name: packageJson.name,
    version: packageJson.version
  });
});

// Routes
// app.use("/api/v1", routerV2); // api version 2 routes

// app.use(errorHandler); // custom error handler

export { app };
