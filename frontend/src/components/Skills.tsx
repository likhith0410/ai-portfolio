import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS', 'Shell Script'] },
  { label: 'Frameworks', items: ['Django', 'FastAPI', 'React.js', 'DRF', 'Streamlit'] },
  { label: 'AI / ML', items: ['LangChain', 'RAG Pipelines', 'LLM Integration', 'FAISS', 'TF-IDF', 'KNN'] },
  { label: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'] },
  { label: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'AWS EKS', 'Jenkins', 'GitHub Actions', 'ArgoCD', 'Helm', 'Terraform'] },
  { label: 'Monitoring', items: ['Prometheus', 'Grafana', 'CloudWatch', 'SonarQube', 'Trivy'] },
]

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.05em', padding: '0.3rem 0.75rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text-2)', whiteSpace: 'nowrap', transition: 'all 0.2s', cursor: 'default' }}
      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--amber)'; el.style.color = 'var(--amber)'; el.style.background = 'var(--amber-glow)' }}
      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-2)'; el.style.background = 'var(--surface)' }}
    >{label}</span>
  )
}

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="skills" style={{ padding: '8rem 2rem', background: 'var(--ink-2)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>02 / Skills</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>What I work with</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {skillGroups.map((group, i) => (
              <motion.div key={group.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>{group.label}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.items.map((item) => <Chip key={item} label={item} />)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
