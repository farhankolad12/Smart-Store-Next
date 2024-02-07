"use client";

import { useState, useEffect } from "react";

export default function useGetReq(url: string, params: any) {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setUserData(undefined);
      setLoading(true);
      const headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Origin", "https://www.smart-store.co.in");

      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + url}${
          params.searchParams
            ? "?" + new URLSearchParams(params.searchParams)
            : params
            ? "?" + new URLSearchParams(params)
            : ""
        }`,
        {
          method: "GET",
          credentials: "include",
          headers,
        }
      )
        .then(async (res) => {
          const data = await res.json();
          setUserData(data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    })();
  }, [params.makeReq, params.allAttributes, params.searchParams]);

  return { userData, error, loading, setUserData };
}
