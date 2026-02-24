import { useState, useCallback } from 'react'
import { sendChatMessage } from '../services/api'
import type { Message } from '../types'

// crypto.randomUUID() is built into all modern browsers - no library needed
const uid = () => crypto.randomUUID()

const SUGGESTED = [
  "What tech stack do you use?",
  "Tell me about your AI/ML projects",
  "What is your work experience?",
  "What DevOps tools do you know?",
]

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: 'assistant',
      content: "Hi! I am Likhith's AI assistant. I can answer questions about his skills, experience, and projects. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return
    const userMsg: Message = { id: uid(), role: 'user', content: text.trim(), timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setError(null)
    try {
      const data = await sendChatMessage(text.trim(), sessionId)
      setSessionId(data.session_id)
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'assistant', content: data.reply, timestamp: new Date() },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection error')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, sessionId])

  return { messages, isLoading, error, sendMessage, suggestions: SUGGESTED }
}
