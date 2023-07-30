/**
 * For more information visit
 * @see {@link https://developers.payfast.co.za/docs#step_1_form_fields}
 */

export interface PayfastConfig {
  merchant_id: string;
  merchant_key: string;
  return_url?: string;
  cancel_url?: string;
  notify_url?: string;
  env: "prod" | "sandbox";
  passPhrase?: string;
}

export interface PayfastPaymentProps {
  // Customer details
  name_first?: string;
  name_last?: string;
  email_address: string;
  cell_number?: string;
  //Transaction details
  m_payment_id?: string;
  amount: string;
  item_name: string;
  item_description?: string;
  custom_int1?: string;
  custom_int2?: string;
  custom_int3?: string;
  custom_int4?: string;
  custom_int5?: string;
  custom_str1?: string;
  custom_str2?: string;
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  //Transaction options
  email_confirmation?: "0" | "1"; //1=on 0=off
  confirmation_address?: string;
  payment_method?: PaymentMethods;
}

export type PaymentMethods =
  | "eft"
  | "cc"
  | "dc"
  | "mp"
  | "mc"
  | "sc"
  | "ss"
  | "zp"
  | "mt"
  | "rcs";

export interface PayfastPayload extends PayfastConfig, PayfastPaymentProps {}

export interface PayfastResponse {
  return_url: string;
  notify_url: string;
  uuid: string;
}

export interface PayfastITN extends PayfastPayload {
  pf_payment_id: string;
  payment_status: string;
  amount_gross: string;
  amount_fee: string;
  amount_net: string;
  signature: string;
}
