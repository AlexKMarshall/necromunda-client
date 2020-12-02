import * as z from "zod";
import { factionSchema } from "./faction.schema";
import { fighterSchema } from "./fighter.schema";

export const gangSchema = z.object({
  name: z.string(),
  userId: z.string(),
  faction: factionSchema,
  _id: z.string(),
  fighters: z.array(fighterSchema),
});

const gangInputSchema = gangSchema
  .pick({ name: true })
  .extend({ faction: z.string() });
export type GangInput = z.infer<typeof gangInputSchema>;
