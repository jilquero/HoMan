export async function notFound(c, req, res) {
  return res.status(404).json({ msg: "not found" });
}

export async function unauthorizedHandler(c, req, res) {
  return res.status(401).json({ err: "unauthorized" });
}

function validationFail(c, req, res) {
  return res.status(400).json({ status: 400, err: c.validation.errors });
}

export const errorHandlers = {
  notFound,
  unauthorizedHandler,
  validationFail,
};
