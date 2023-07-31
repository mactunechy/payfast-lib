import { createPaymentSession } from "./create-payment-session";
import { generatePaymentIdentifier, generateSignature } from "./lib/core";
import { PayfastPaymentSchema } from "./lib/validation";
import { PayfastConfig } from "./types";

export const nextPayfastHandler =
  (config: PayfastConfig) =>
  async (req: Request): Promise<Response> => {
    const { passPhrase, env, ...restConfig } = config;
    const body = await req.json();

    try {
      const result = await createPaymentSession(config, body);
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      const errorName = (error as any).name;
      if (errorName === "ZodError") {
        return new Response(JSON.stringify(error), { status: 400 });
      }
      return new Response("Internal error", { status: 500 });
    }
  };
