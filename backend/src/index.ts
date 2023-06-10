import "./pre-start";
import EnvVars from "./constants/EnvVars";
import Logger from "./util/Logger";
import server from "./server";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => Logger.info(SERVER_START_MSG));
