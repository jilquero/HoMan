import AuthService from "../services/AuthService";
import BearerUtil from "../util/BearerUtil";
import SessionUtil from "../util/SessionUtil";

export async function requireUserBearer(c) {
  let result = await BearerUtil.getSessionData(c.request);
  c.user = result;
  return result;
}

export async function requireUserCookie(c) {
  let result = await SessionUtil.getSessionData(c.request);
  // Logger.info("requireUser: " + JSON.stringify(result));
  // if (result === undefined) {
  //   return null;
  // }

  // if (typeof result === "string") {
  //   return null;
  // }

  // if (result.exp < Date.now()) {
  //   return null;
  // }
  c.user = result;
  return result;
}

// export default async function signupHandler(req, res) {
//   return res.status(200).json({ msg: "signup" });
//   // return res.header("Authorization", accessToken).send(accessToken);
// }

export async function login(c, req, res) {
  const { email, password } = c.request.body;
  const user = await AuthService.authN(email, password);

  if (!user) {
    return res.status(401).json({ msg: "invalid credentials" });
  }

  res = await SessionUtil.addSessionData(res, {
    id: user.id,
    email: user.email,
    username: user.username,
  });

  // res = await BearerUtil.addSessionData(res, {
  //   id: user.id,
  //   email: user.email,
  //   username: user.username,
  // });

  return res.status(200).end();
}

export async function logout(c, req, res) {
  res = await SessionUtil.clearCookie(res);
  // res = await BearerUtil.clearCookie(res);
  return res.status(200).json({ msg: "logged out" });
}

export const authHandlers = {
  login,
  logout,
};
