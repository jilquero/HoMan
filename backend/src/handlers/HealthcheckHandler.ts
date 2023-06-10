export const healthcheckHandlers = {
  ping: async (_c, _req, res) => res.status(200).json({ msg: "pong" }),
};
