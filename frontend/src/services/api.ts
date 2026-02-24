// Native fetch — works locally and in production
const BASE_URL = import.meta.env.VITE_API_URL || ""

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.detail || "Request failed: " + res.status)
  }
  return res.json()
}

export const sendChatMessage = (message: string, sessionId: string | null) =>
  request<{ reply: string; session_id: string; model_used: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message, session_id: sessionId }),
  })

export const submitContact = (data: { name: string; email: string; message: string }) =>
  request<{ success: boolean; message: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })