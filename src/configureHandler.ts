import { Application } from "express";
import { handler } from "./express-handler";
import { PayfastConfig } from "./types";

/**
 * This function invocation should come below  `app.use(express.json())`
 */
export const configurePayfastExpressHandler = (
  app: Application,
  config: PayfastConfig
) => {
  app.post("/api/payfast", handler(config));
};
