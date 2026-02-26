import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../hooks/useChat'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { messages, isLoading, error, sendMessage, suggestions } = useChat()
  const [input, setInput] = useState('')
  const [shownSugg, setShownSugg] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isLoading])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300) }, [open])

  const handleSend = async () => {
    if (!input.trim()) return
    setShownSugg(false)
    await sendMessage(input)
    setInput('')
  }

  return (
    <>
      <motion.button onClick={() => setOpen((o) => !o)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} title="Chat with Likhith AI"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px', borderRadius: '50%', background: open ? 'var(--surface-2)' : 'var(--amber)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 8px 32px rgba(245,158,11,0.35)', zIndex: 2000, cursor: 'pointer', transition: 'background 0.3s' }}>
        {open ? '✕' : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#080810">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 700, color: '#080810', letterSpacing: '0.04em' }}>AI</span>
        </div>
      )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ duration: 0.3 }}
            style={{ position: 'fixed', bottom: '6rem', right: '2rem', width: 'min(420px, calc(100vw - 1rem))', height: 'min(560px, calc(100vh - 120px))', background: 'var(--ink-2)', border: '1px solid var(--border-2)', borderRadius: '16px', display: 'flex', flexDirection: 'column', zIndex: 1999, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>

            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--amber-glow)', border: '2px solid var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🤖</div>
              <div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 700 }}>Likhith AI</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#22c55e' }}>Online</p>
              </div>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-3)', padding: '0.2rem 0.5rem', background: 'var(--ink-3)', borderRadius: '4px' }}>OpenRouter</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px', background: msg.role === 'user' ? 'var(--amber)' : 'var(--surface-2)', color: msg.role === 'user' ? 'var(--ink)' : 'var(--text)', fontSize: '0.87rem', lineHeight: 1.6, border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: 'flex', gap: '4px', padding: '0.75rem 1rem', background: 'var(--surface-2)', borderRadius: '12px 12px 12px 2px', width: 'fit-content', border: '1px solid var(--border)' }}>
                  {[0,1,2].map((i) => <motion.div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />)}
                </div>
              )}
              {error && <div style={{ fontSize: '0.8rem', color: '#ef4444', padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.08)', borderRadius: '8px' }}>{error}</div>}
              {shownSugg && messages.length <= 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Try asking:</p>
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => { setShownSugg(false); sendMessage(s) }}
                      style={{ textAlign: 'left', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-2)', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--amber)'; el.style.color = 'var(--amber)' }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-2)' }}
                    >{s}</button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about Likhith..." maxLength={1000}
                style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.65rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-sans)', fontSize: '0.87rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <motion.button onClick={handleSend} disabled={isLoading || !input.trim()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{ background: input.trim() && !isLoading ? 'var(--amber)' : 'var(--surface-2)', border: 'none', borderRadius: '8px', padding: '0.65rem 1rem', color: input.trim() && !isLoading ? 'var(--ink)' : 'var(--text-3)', fontSize: '0.85rem', fontWeight: 600, cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
