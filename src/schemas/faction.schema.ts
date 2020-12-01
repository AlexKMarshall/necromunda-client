import * as z from "zod";

export const factionSchema = z.object({
  name: z.string(),
  _id: z.string(),
});

const factionNoIdSchema = factionSchema.omit({ _id: true });
export type FactionNoIdType = z.infer<typeof factionNoIdSchema>;
