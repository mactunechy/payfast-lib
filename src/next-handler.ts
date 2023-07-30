import { generatePaymentIdentifier, generateSignature } from "./lib/core";
import { PayfastPaymentSchema } from "./lib/validation";
import { PayfastConfig } from "./types";

export const nextPayfastHandler =
  (config: PayfastConfig) =>
  async (req: Request): Promise<Response> => {
    const { passPhrase, env, ...restConfig } = config;
    const body = await req.json();

    // Validate valid data
    const result = PayfastPaymentSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify(result.error), { status: 400 });
    }

    const payload: any = {
      ...restConfig,
      ...result.data,
    };

    try {
      const signature = generateSignature(payload, passPhrase);
      payload.signature = signature;
      const result = await generatePaymentIdentifier(payload, { env });

      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Internal error", { status: 500 });
    }
  };
