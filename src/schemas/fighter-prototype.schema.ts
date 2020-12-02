import * as z from "zod";
import { factionSchema } from "./faction.schema";

export const fighterPrototypeSchema = z.object({
  name: z.string(),
  class: z.enum(["Ganger", "Juve", "Leader", "Champion", "Prospect"]),
  faction: factionSchema,
  _id: z.string(),
});
