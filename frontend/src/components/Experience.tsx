import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const jobs = [
  {
    company: 'WorkshopEdge',
    role: 'Full Stack Developer Intern',
    period: 'Feb 2026 - Present',
    location: 'Bengaluru, India',
    bullets: [
      'Developed and integrated RESTful APIs using FastAPI and Django for authentication (OTP-based), job card, invoice, and service history modules with JWT-based access control.',
      'Built a task management system using Django with pipeline workflows, user assignment, status tracking, comment history, and role-based task filtering.',
      'Improved frontend delivery by migrating Bootstrap to CDN, fixing mobile layout issues, and applying Bootstrap 5 CSS updates globally.',
    ],
  },
  {
    company: 'Pentagon Space Pvt. Ltd',
    role: 'Python Full Stack Development Trainee',
    period: 'Aug 2025 - Jan 2026',
    location: 'Bengaluru, India',
    bullets: [
      'Built full-stack web applications using Python, Django, DRF, React.js, and PostgreSQL with JWT auth, CRUD workflows, and role-based access control.',
      'Built responsive React dashboards with seamless backend integration for real-time data interaction across production-ready flows.',
      'Designed PostgreSQL schemas with query optimization in an Agile development environment.',
    ],
  },
]

export function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" style={{ padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>
            03 / Experience
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>
            Where I have worked
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '0', top: '8px', bottom: '0', width: '1px', background: 'var(--border)' }} />
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ paddingLeft: '2.5rem', marginBottom: '3.5rem', position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '11px', height: '11px', borderRadius: '50%', background: 'var(--amber)', border: '2px solid var(--ink)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.2rem' }}>{job.role}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--amber)' }}>{job.company}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-2)' }}>{job.period}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)' }}>{job.location}</p>
                </div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {job.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.7 }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0 }}>&#9658;</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
