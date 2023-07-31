import { PayfastConfig } from "./types";
import { Request, Response } from "express";
import { createPaymentSession } from "./create-payment-session";

export const handler =
  (config: PayfastConfig) =>
  async (req: Request, res: Response): Promise<Response> => {
    const body = await req.body;

    try {
      const result = await createPaymentSession(config, body);
      return res.status(200).send(result);
    } catch (error) {
      const errorName = (error as any).name;
      if (errorName === "ZodError") {
        return res.status(400).send(error);
      }

      return res.sendStatus(500);
    }
  };
