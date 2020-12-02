import { useAuthClient } from "./client";
import { useQuery, useMutation, useQueryCache } from "react-query";
import { GangInput, gangSchema } from "../schemas/gang.schema";

export function useReadGangs() {
  const client = useAuthClient();

  async function getGangs() {
    try {
      const data = await client("gangs");
      return gangSchema.array().parse(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const queryResult = useQuery("gangs", getGangs);

  const gangs = queryResult.data;

  return { ...queryResult, gangs };
}

export function useCreateGang() {
  const cache = useQueryCache();
  const client = useAuthClient();

  async function createGang(gang: GangInput) {
    try {
      const result = await client("gangs", gang);
      return gangSchema.parse(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return useMutation(createGang, {
    onSuccess: () => cache.invalidateQueries("gangs"),
  });
}
