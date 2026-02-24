import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    name: 'Smart Expense Tracker', emoji: '💰',
    description: 'Full-stack SaaS with React, Django REST, PostgreSQL, AWS EKS, Kubernetes, and zero-downtime CI/CD (GitHub Actions + ArgoCD). 80% reduction in manual entry, 15-min deployment cycles.',
    tech: ['React.js', 'Django', 'PostgreSQL', 'AWS EKS', 'Kubernetes', 'ArgoCD', 'Helm'],
    github: 'https://github.com/likhith0410', live: null,
  },
  {
    name: 'End-to-End CI/CD Pipeline', emoji: '🚀',
    description: 'Production-grade 13-stage CI/CD pipeline using Jenkins, Maven, SonarQube, Trivy, Nexus, Docker, AWS EKS, Prometheus & Grafana. Deploys from commit to production in 8-12 minutes.',
    tech: ['Jenkins', 'Docker', 'AWS EKS', 'SonarQube', 'Trivy', 'Prometheus', 'Grafana'],
    github: 'https://github.com/likhith0410', live: null,
  },
  {
    name: 'Personal AI Advisor', emoji: '🤖',
    description: 'Full-stack RAG platform with Streamlit, SQLite, multi-format doc parser (PDF/DOCX/CSV), Groq LLM integration. Deployed on AWS ECS Fargate — 90% infra cost reduction, 4-min deploy cycles.',
    tech: ['Python', 'Streamlit', 'LangChain', 'Groq LLM', 'Docker', 'AWS ECS Fargate', 'GitHub Actions'],
    github: 'https://github.com/likhith0410', live: null,
  },
  {
    name: 'AI Resume & Job Matcher', emoji: '📄',
    description: '200+ resume automation with 85% matching precision using TF-IDF, Cosine Similarity, and KNN. Achieves 70% reduction in recruiter screening time.',
    tech: ['Python', 'Streamlit', 'MongoDB', 'TF-IDF', 'Cosine Similarity', 'KNN', 'NLP'],
    github: 'https://github.com/likhith0410', live: null,
  },
]

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <section id="projects" style={{ padding: '8rem 2rem', background: 'var(--ink-2)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>04 / Projects</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>Things I have built</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(245,158,11,0.3)'; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = 'translateY(0)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2rem' }}>{p.emoji}</span>
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)' }}>GitHub</a>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>{p.name}</h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-2)', lineHeight: 1.7, flexGrow: 1 }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {p.tech.map((t) => <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', padding: '0.2rem 0.55rem', background: 'var(--ink-3)', borderRadius: '4px', color: 'var(--text-3)' }}>{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
