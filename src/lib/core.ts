import { createHash } from "crypto";
import axios from "axios";
import { URLSearchParams } from "url";

import { PayfastPayload, PayfastResponse } from "../types";

/**
 *
 * @param {Object} data - Payment info for the transaction
 * @param {String} passPhrase - The passphrase is an extra security feature, used as a ‘salt’, and is set by the Merchant in the Settings section of their Payfast Dashboard.
 * @returns {String}
 */
export const generateSignature = (
  data: PayfastPayload,
  passPhrase: string | null | undefined = null
): String => {
  const urlencoded = new URLSearchParams();

  for (let prop in data) {
    const value = data[prop as keyof PayfastPayload];
    if (value) urlencoded.append(prop, value);
  }

  if (passPhrase !== null) {
    urlencoded.append("passphrase", passPhrase);
  }

  return createHash("md5").update(urlencoded.toString()).digest("hex");
};

/**
 * Converts a JSON object to a querystring
 * @param {Object} dataArray  - Object to be converted to a querystring
 * @returns {String}
 */
const dataToString = (data: PayfastPayload): String => {
  const urlencoded = new URLSearchParams();

  for (let prop in data) {
    const value = data[prop as keyof PayfastPayload];
    if (value) urlencoded.append(prop, value);
  }

  return urlencoded.toString();
};

/**
 * Generates a payment identifier for the Payfast payment gateway
 * @param {Object} pfParamString - Data sent to payfast to generate a payment identifier
 * @returns {Promise}
 */
export const generatePaymentIdentifier = async (
  payload: PayfastPayload,
  config: {
    env: "prod" | "sandbox" | undefined;
  }
): Promise<PayfastResponse> => {
  const pfParamString = dataToString(payload);
  const baseUrl =
    config.env === "prod"
      ? "https://www.payfast.co.za/onsite/process"
      : "https://sandbox.payfast.co.za/onsite/process";
  try {
    const result = await axios.post(baseUrl, pfParamString);
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
