import * as z from "zod";
import { gangSchema } from "./gang.schema";
import { fighterInputSchema } from "./fighter.schema";

export const purchaseSchema = z.object({
  gangId: gangSchema.shape._id,
  fighters: z.array(fighterInputSchema),
});

export type Purchase = z.infer<typeof purchaseSchema>;
