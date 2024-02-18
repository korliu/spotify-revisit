"use client";
import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "./useAuthentication";
import { HTTPError } from "@/lib/_errors";
import { fetchServerSpotify } from "@/lib/request";




export default function useDataFetch(
  queryKey: string,
  queryRoute: string,
  queryOptions: object = {},
): { data: unknown, isLoading: boolean, error: Error | null, isFetched: boolean } {

  const accessToken = useAccessToken("");

  const { data, isLoading, error, isFetched } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const r = await fetchServerSpotify(queryRoute, accessToken!, queryOptions);
      const response = await r.json();
      if (!r.ok) {
        const statusCode = r.status
        const errorMsg = response.error ?? "HTTPError";
        throw new HTTPError(statusCode, errorMsg);
        
      }

      return response;
    },
    // only runs when access token exists
    enabled: !!(accessToken)
  });

  return { data, isLoading, error, isFetched };

 
}

