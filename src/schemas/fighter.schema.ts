import * as z from "zod";
import { fighterPrototypeSchema } from "./fighter-prototype.schema";

export const fighterSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  proto: fighterPrototypeSchema.shape.name,
  protoId: fighterPrototypeSchema.shape._id,
  fighterClass: fighterPrototypeSchema.shape.fighterClass,
});

export const fighterInputSchema = fighterSchema.pick({
  name: true,
  protoId: true,
});

export type FighterInput = z.infer<typeof fighterInputSchema>;
