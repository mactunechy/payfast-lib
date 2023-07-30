import { Application } from "express";

import { handler as expressHandler } from "./express-handler";
import { PayfastConfig } from "./types";

export { generateSignature, generatePaymentIdentifier } from "./lib/core";
export { PayfastPaymentSchema } from "./lib/validation";
export { nextPayfastHandler } from "./next-handler";
/**
 * This function invocation should come below  `app.use(express.json())`
 */
export const configurePayfastExpressHandler = (
  app: Application,
  config: PayfastConfig
) => {
  app.post("/api/payfast", expressHandler(config));
};
