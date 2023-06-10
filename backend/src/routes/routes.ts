import OpenAPIBackend from "openapi-backend";
import { productsHandlers } from "../handlers/ProductsHandler";
import { usersHandlers } from "../handlers/UsersHandler";
import { warehousesHandlers } from "../handlers/WarehousesHandler";
import {
  authHandlers,
  requireUserBearer,
  requireUserCookie,
} from "../handlers/AuthHandler";
import { errorHandlers } from "../handlers/ErrorHandler";
import { healthcheckHandlers } from "../handlers/HealthcheckHandler";
import addFormats from "ajv-formats";

const api = new OpenAPIBackend({
  definition: "../api/openapi.yaml",
  validate: true,
  customizeAjv: function customizeAjv(ajv) {
    addFormats(ajv);
    let uuid = {
      type: "string",
      validate: /^[a-f\d]{24}$/i,
    };
    ajv.addFormat("uuid", uuid as any);
    return ajv;
  },
});

api.registerSecurityHandler("bearerAuth", requireUserBearer);
api.registerSecurityHandler("cookieAuth", requireUserCookie);

api.register(errorHandlers);
api.register(healthcheckHandlers);
api.register(authHandlers);
api.register(usersHandlers);
api.register(warehousesHandlers);
api.register(productsHandlers);

api.init();

export default api;
