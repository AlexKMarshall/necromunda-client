import { useAuthClient } from "./client";
import { useQuery, useMutation, useQueryCache } from "react-query";
import {
  FighterPrototypeInput,
  fighterPrototypeSchema,
} from "../schemas/fighter-prototype.schema";
import { createURLQuery } from "../utils/query-params";

interface ReadProps {
  query?: {
    faction?: string;
  };
  config?: {
    enabled?: boolean | unknown;
  };
}

export function useReadFighterPrototypes({ query, config }: ReadProps = {}) {
  const client = useAuthClient();

  const queryParams = query ? `?${createURLQuery(query).toString()}` : "";

  async function getFighterPrototypes() {
    try {
      const data = await client(`fighter-prototypes${queryParams}`);
      return fighterPrototypeSchema.array().parse(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const queryResult = useQuery(
    ["fighter-prototypes", query],
    getFighterPrototypes,
    config
  );

  const fighterPrototypes = queryResult.data;

  return { ...queryResult, fighterPrototypes };
}

export function useCreateFighterPrototype() {
  const cache = useQueryCache();
  const client = useAuthClient();

  async function createFighterPrototype(
    fighterPrototype: FighterPrototypeInput
  ) {
    try {
      const result = await client("fighter-prototypes", fighterPrototype);
      return fighterPrototypeSchema.parse(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return useMutation(createFighterPrototype, {
    onSuccess: () => cache.invalidateQueries("fighter-prototypes"),
  });
}
