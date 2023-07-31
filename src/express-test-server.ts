import "dotenv/config";
import express from "express";

import { configurePayfastExpressHandler } from ".";

const app = express();
const port = 3000;

// Middleware to parse JSON data in the request body
app.use(express.json());

configurePayfastExpressHandler(app, {
  merchant_id: process.env.MERCHANT_ID!,
  merchant_key: process.env.MERCHANT_KEY!,
  return_url: process.env.RETURN_URL!,
  cancel_url: process.env.CANCEL_URL!,
  notify_url: process.env.NOTIFY_URL!,
  env: process.env.ENV as "prod" | "sandbox",
  passPhrase: process.env.PASSPHRASE,
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
