import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="about" style={{ padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>01 / About</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
              Code, Cloud,<br /><em style={{ color: 'var(--text-2)' }}>and AI</em>
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              Building scalable web apps, LangChain RAG pipelines and cloud-native systems with integrated DevOps practices. Proficient in Python, Django, React.js, AWS and CI/CD workflows for reliable deployment and automation.
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Currently at WorkshopEdge building FastAPI backends and Django task management systems. B.E. Computer Science graduate (CGPA 8.1) from Impact College, Bengaluru.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/likhith0410' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/likhith-gowda-t-r' },
                { label: 'LeetCode', href: 'https://leetcode.com/Likhith_24' },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber)', border: '1px solid var(--amber)', padding: '0.35rem 0.85rem', borderRadius: '6px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'var(--amber)'; el.style.color = 'var(--ink)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--amber)' }}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { num: '8.1', label: 'CGPA / 10' },
              { num: '4+', label: 'Major Projects' },
              { num: '13', label: 'CI/CD Stages Built' },
              { num: '90%', label: 'Infra Cost Cut' },
            ].map((s) => (
              <div key={s.label}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.3)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
              >
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--amber)', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.05em', marginTop: '0.5rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
