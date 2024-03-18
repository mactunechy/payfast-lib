import { NextApiRequest, NextApiResponse } from "next";
import { createPaymentSession } from "./create-payment-session";
import { isValidationError } from "./lib/validation";
import { PayfastConfig } from "./types";

export const nextPayfastHandler = (config: PayfastConfig) =>async (req: NextApiRequest)=> Promise<NextApiResponse>;
