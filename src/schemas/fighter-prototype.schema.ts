import * as z from "zod";
import { factionSchema } from "./faction.schema";
import { NonEmptyArray } from "../utils/type-helpers";

export const fighterClasses: NonEmptyArray<string> = [
  "Ganger",
  "Juve",
  "Leader",
  "Champion",
  "Prospect",
];

export const fighterPrototypeSchema = z.object({
  name: z.string(),
  fighterClass: z.enum(fighterClasses),
  faction: factionSchema,
  _id: z.string(),
});

export type FighterPrototype = z.infer<typeof fighterPrototypeSchema>;

const fighterPrototypeInputSchema = fighterPrototypeSchema
  .pick({ name: true, fighterClass: true })
  .extend({ faction: z.string() });

export type FighterPrototypeInput = z.infer<typeof fighterPrototypeInputSchema>;
