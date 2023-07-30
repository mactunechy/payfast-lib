import { z } from "zod";
import { PaymentMethods } from "../types";

interface PayfastPaymentProps {
  name_first?: string;
  name_last?: string;
  email_address: string;
  cell_number?: string;
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
  email_confirmation?: "0" | "1"; //1=on 0=off
  confirmation_address?: string;
  payment_method?: PaymentMethods;
}

const PayfastPaymentSchema = z.object({
  name_first: z.string().optional(),
  name_last: z.string().optional(),
  email_address: z.string().nonempty(),
  cell_number: z.string().optional(),
  m_payment_id: z.string().optional(),
  amount: z.string().nonempty(),
  item_name: z.string().nonempty(),
  item_description: z.string().optional(),
  custom_int1: z.string().optional(),
  custom_int2: z.string().optional(),
  custom_int3: z.string().optional(),
  custom_int4: z.string().optional(),
  custom_int5: z.string().optional(),
  custom_str1: z.string().optional(),
  custom_str2: z.string().optional(),
  custom_str3: z.string().optional(),
  custom_str4: z.string().optional(),
  custom_str5: z.string().optional(),
  email_confirmation: z.enum(["0", "1"]).optional(),
  confirmation_address: z.string().optional(),
  payment_method: z
    .enum(["eft", "cc", "dc", "mp", "mc", "sc", "ss", "zp", "mt", "rcs"])
    .optional(),
});

export { PayfastPaymentSchema };
