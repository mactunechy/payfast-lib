import * as express from "express";
import { configureExpressHandler } from "./configureHandler";
const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

configureExpressHandler(app, {
  merchant_id: "10029820",
  merchant_key: "7itf1mlh62876",
  return_url: "http://localhost:3000/return",
  cancel_url: "http://localhost:3000/cancel",
  /**
   * Recieve instant payment notifications (IPNs) to this notify webhook. create the webbook on your.
   * This webhook will be called by payfast with the request payload as the details of the payment.
   */
  notify_url: "http://localhost:3000/notify",
  env: "sandbox",
  passPhrase: "Shoerehab123",
});

// Run the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
