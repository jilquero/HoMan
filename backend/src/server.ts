import express from "express";
import cookieParser from "cookie-parser";
import type { Request } from "openapi-backend";
import helmet from "helmet";
import api from "./routes/routes";
import YAML from "yaml";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import {
  beforeMorganMiddleware,
  afterMorganMiddleware,
} from "./middleware/morganMiddleware";
import Logger from "./util/Logger";
import EnvVars from "./constants/EnvVars";
import { limiter } from "./middleware/rateLimitMiddleware";

const file = fs.readFileSync(EnvVars.OpenApiSpec, "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// var whitelist = ["http://localhost:5173", "http://localhost:3000"];
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

let corsOptions = { origin: "http://localhost:5173", credentials: true };

app.use(cors(corsOptions));

// app.use(limiter);

app.use(beforeMorganMiddleware);
app.use(afterMorganMiddleware);

app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) =>
  api.handleRequest(
    req as Request,
    req as Express.Request,
    res as Express.Response
  )
);

export default app;
