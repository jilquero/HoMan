import addFormats from "ajv-formats";

export function customizeAjv(ajv) {
  addFormats(ajv);
  return ajv;
}
