"use client";

import { useState } from "react";

export default function usePostReq(url: string) {
  const [loading, setLoading] = useState(false);

  async function execute(payload: any) {
    setLoading(true);
    const headers = new Headers();

    if (payload.toString().includes("formData")) {
      headers.append(
        "Access-Control-Allow-Origin",
        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || ""
      );
    } else {
      headers.append("Content-Type", "application/json");
      headers.append(
        "Access-Control-Allow-Origin",
        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || ""
      );
    }

    return await fetch(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + url, {
      method: "POST",
      credentials: "include",
      body: payload.toString().includes("FormData")
        ? payload
        : JSON.stringify(payload),
      headers,
    })
      .then((res) => res.json())
      .finally(() => setLoading(false));
    // .catch((err) => setError())
  }

  return { execute, loading };
}
