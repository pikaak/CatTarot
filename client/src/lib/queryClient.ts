// src/lib/queryClient.ts

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// 🔥 여기를 절대경로로 수정해야 Static Site가 API 서버에 요청 가능함
const apiBase = "https://cattarot.curioft.com"; 
// 예: https://cattarot.curioft.com/api/tarot/reading


export async function apiRequest(
  method: string,
  url: string,
  body?: unknown
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${apiBase}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // 세션/쿠키 유지 (필요한 경우)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `API Error ${res.status} - ${res.statusText}: ${text}`
    );
  }

  return res;
}
