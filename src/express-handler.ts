import { generatePaymentIdentifier, generateSignature } from "./lib/core";
import { PayfastConfig } from "./types";
import { PayfastPaymentSchema } from "./lib/validation";
import { Request, Response } from "express";

export const handler =
  (config: PayfastConfig) =>
  async (req: Request, res: Response): Promise<Response> => {
    const { passPhrase, env, ...restConfig } = config;
    const body = await req.body;

    // Validate valid data
    const result = PayfastPaymentSchema.safeParse(body);

    if (!result.success) {
      return res.status(400).send(result.error);
    }

    const payload: any = {
      ...restConfig,
      ...result.data,
    };

    try {
      const signature = generateSignature(payload, passPhrase);
      payload.signature = signature;
      const result = await generatePaymentIdentifier(payload, { env });

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
