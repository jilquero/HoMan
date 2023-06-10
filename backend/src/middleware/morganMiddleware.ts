import morgan, { StreamOptions } from "morgan";

import EnvVars from "../constants/EnvVars";
import Logger from "../util/Logger";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

morgan.token("body", (req) => {
  // @ts-ignore
  return req.body;
});

morgan.token("bearer", (req) => {
  // @ts-ignore
  return req.headers.authorization;
});

morgan.token("cookies", (req) => {
  // @ts-ignore
  const { Key } = EnvVars.CookieProps,
    // @ts-ignore
    jwt = req.signedCookies[Key];
  return jwt;
});

// Build the morgan middleware
const beforeMorganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify(
      {
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        bearer: tokens.bearer(req, res),
        cookies: tokens.cookies(req, res),
        body: tokens.body(req, res),
      },
      null,
      2
    );
  },
  { stream, skip, immediate: true }
);

const afterMorganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export { beforeMorganMiddleware, afterMorganMiddleware };

// https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342
