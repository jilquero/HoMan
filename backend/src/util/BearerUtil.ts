import { Request, Response } from "express";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import { RouteError } from "../other/classes";
import jsonwebtoken from "jsonwebtoken";

import EnvVars from "../constants/EnvVars";
import Logger from "./Logger";

// **** Variables **** //

// Errors
const Errors = {
  ParamFalsey: "Param is falsey",
  Validation: "JSON-web-token validation failed.",
} as const;

// Options
const Options = {
  expiresIn: EnvVars.Jwt.Exp,
};

// **** Functions **** //

/**
 * Get session data from request object (i.e. ISessionUser)
 */
function getSessionData<T>(req: Request): Promise<string | T | undefined> {
  const { Key } = EnvVars.CookieProps,
    jwt = req.headers.authorization?.split(" ")[1];
  if (!jwt) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, Errors.ParamFalsey);
  }
  return _decode(jwt);
}

/**
 * Add a JWT to the response
 */
async function addSessionData(
  res: Response,
  data: string | object
): Promise<Response> {
  if (!res || !data) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, Errors.ParamFalsey);
  }
  // Setup JWT
  const jwt = await _sign(data),
    { Key } = EnvVars.CookieProps;
  // Return
  return res.json({ token: "Bearer " + jwt });
}

/**
 * Remove cookie
 */
function clearCookie(res: Response): Response {
  const { Key, Options } = EnvVars.CookieProps;
  res.removeHeader("Authorization");
  return res;
}

// **** Helper Functions **** //

/**
 * Encrypt data and return jwt.
 */
function _sign(data: string | object | Buffer): Promise<string> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, EnvVars.Jwt.Secret, Options, (err, token) => {
      return err ? rej(err) : res(token || "");
    });
  });
}

/**
 * Decrypt JWT and extract client data.
 */
function _decode<T>(jwt: string): Promise<string | undefined | T> {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, EnvVars.Jwt.Secret, (err, decoded) => {
      return err ? rej(Errors.Validation) : res(decoded as T);
    });
  });
}

// **** Export default **** //

export default {
  addSessionData,
  getSessionData,
  clearCookie,
} as const;