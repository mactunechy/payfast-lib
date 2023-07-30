import { z } from "zod";

export const PayfastPaymentSchema = z.object({
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
