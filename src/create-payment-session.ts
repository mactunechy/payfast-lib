import { generatePaymentIdentifier, generateSignature } from "./lib/core";
import { PayfastPaymentSchema } from "./lib/validation";
import { PayfastConfig, PayfastPayload, PayfastPaymentProps } from "./types";

export const createPaymentSession = async (
  config: PayfastConfig,
  paymentDetails: PayfastPaymentProps
) => {
  // Validate valid data
  const result = PayfastPaymentSchema.safeParse(paymentDetails);

  if (!result.success) {
    throw result.error;
  }

  const { passPhrase, env, ...restConfig } = config;

  const payload: PayfastPayload = {
    ...restConfig,
    ...result.data,
  };

  try {
    const signature = generateSignature(payload, passPhrase);
    payload.signature = signature.toString();
    const result = await generatePaymentIdentifier(payload, { env });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("error while creating a session");
  }
};
