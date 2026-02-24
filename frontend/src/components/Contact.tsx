import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { submitContact } from '../services/api'

export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setMsg('Please fill in all fields.')
      return
    }
    // Basic email validation
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    if (!emailOk) {
      setStatus('error')
      setMsg('Please enter a valid email address.')
      return
    }
    // Message must be at least 10 chars (backend requires min_length=10)
    if (form.message.trim().length < 10) {
      setStatus('error')
      setMsg('Message must be at least 10 characters.')
      return
    }
    setStatus('sending')
    try {
      const res = await submitContact(form)
      setStatus('sent')
      setMsg(res.message)
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      setStatus('error')
      // Safely extract error message string (fixes [object Object] bug)
      if (e instanceof Error) {
        setMsg(e.message)
      } else if (typeof e === 'string') {
        setMsg(e)
      } else {
        setMsg('Something went wrong. Please try again.')
      }
    }
  }

  const inp: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>
            05 / Contact
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
            Let us work together
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Open to full-time roles and interesting projects. Reach me at likhithgowda88923@gmail.com or use the form below.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inp}
              maxLength={100}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inp}
              maxLength={200}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <textarea
              placeholder="Your message (min 10 characters)..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              maxLength={2000}
              style={{ ...inp, resize: 'vertical', minHeight: '120px' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--amber)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />

            {msg && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.88rem',
                background: status === 'sent' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                color: status === 'sent' ? '#22c55e' : '#ef4444',
                border: '1px solid ' + (status === 'sent' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'),
              }}>
                {msg}
              </div>
            )}

            <motion.button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'var(--amber)',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.9rem 2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' ? 0.7 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
            </motion.button>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/likhith0410' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/likhith-gowda-t-r' },
              { label: 'LeetCode', href: 'https://leetcode.com/Likhith_24' },
              { label: 'Email', href: 'mailto:likhithgowda88923@gmail.com' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-2)', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--amber)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
