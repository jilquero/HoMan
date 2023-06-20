/**
 * Remove old files, copy front-end ones.
 */

import fs from "fs-extra";
import Logger from "./src/util/Logger";
import childProcess from "child_process";

/**
 * Start
 */
(async () => {
  try {
    // Remove current build
    await remove("./dist/");
    // Copy front-end files
    // await copy('./src/public', './dist/public');
    // await copy('./src/views', './dist/views');
    await copy("./env", "./dist/env");
    await copy("./openapi.yaml", "./dist/openapi.yaml");
    // Copy back-end files
    await exec("tsc --build tsconfig.prod.json", "./");
  } catch (err) {
    Logger.error(err);
  }
})();

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

/**
 * Copy file.
 */
function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        Logger.info(stdout);
      }
      if (!!stderr) {
        Logger.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}
