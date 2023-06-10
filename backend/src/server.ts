import express from "express";
import cookieParser from "cookie-parser";
import type { Request } from "openapi-backend";
import helmet from "helmet";
import api from "./routes/routes";
import YAML from "yaml";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {
  beforeMorganMiddleware,
  afterMorganMiddleware,
} from "./middleware/morganMiddleware";
import Logger from "./util/Logger";
import EnvVars from "./constants/EnvVars";
import { limiter } from "./middleware/rateLimitMiddleware";

const file = fs.readFileSync("../api/openapi.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

app.use(limiter);

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
