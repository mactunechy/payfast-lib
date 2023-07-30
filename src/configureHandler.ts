import { Application } from "express";
import { handler } from "./express-handler";
import { PayfastConfig } from "./types";

export const configureHandler = (config: PayfastConfig) => ({
  POST: handler(config),
});

/**
 * This function invocation should come below  `app.use(express.json())`
 */
export const configureExpressHandler = (
  app: Application,
  config: PayfastConfig
) => {
  app.post("/api/payfast", handler(config));
};
