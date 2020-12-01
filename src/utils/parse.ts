import { ZodType } from "zod/lib/src/types/base";

export function parse<T>(schema: ZodType<T>) {
  return (obj: unknown): T => schema.parse(obj);
}
