import { useAuthClient } from "./client";
import { useMutation, useQueryCache } from "react-query";
import { gangSchema } from "../schemas/gang.schema";
import { Purchase } from "../schemas/purchase.schema";

export function usePurchase() {
  const cache = useQueryCache();
  const client = useAuthClient();

  async function postPurchase(purchase: Purchase) {
    try {
      const result = await client("purchase", purchase);
      return gangSchema.parse(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return useMutation(postPurchase, {
    onSuccess: (gang) => cache.invalidateQueries(["gangs", gang._id]),
  });
}
