import { useAuthClient } from "./client";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { FactionNoIdType, factionSchema } from "../schemas/faction.schema";

export function useReadFactions() {
  const client = useAuthClient();

  async function getFactions() {
    try {
      const data = await client("factions");
      return factionSchema.array().parse(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const queryResult = useQuery("factions", getFactions);

  const factions = queryResult.data;

  return { ...queryResult, factions };
}

export function useCreateFaction() {
  const cache = useQueryCache();
  const client = useAuthClient();

  async function createFaction(faction: FactionNoIdType) {
    try {
      const result = await client("factions", faction);
      return factionSchema.parse(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return useMutation(createFaction, {
    onSuccess: () => cache.invalidateQueries("factions"),
  });
}
