import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as number[] } },
}

export function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 2rem', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '80px' }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1.5rem' }}>
            Hello, I am
          </motion.p>
          <motion.h1 variants={item} style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Likhith<br /><em style={{ fontStyle: 'italic', color: 'var(--text-2)' }}>Gowda</em>
          </motion.h1>
          <motion.div variants={item} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: 'var(--text-2)', marginBottom: '2rem', minHeight: '2em' }}>
            <TypeAnimation
              sequence={['Full Stack Developer', 2000, 'AI/ML Engineer', 2000, 'DevOps Enthusiast', 2000, 'LangChain & RAG Builder', 2000]}
              wrapper="span" speed={50} repeat={Infinity}
            />
            <span style={{ color: 'var(--amber)', marginLeft: '2px' }}>_</span>
          </motion.div>
          <motion.p variants={item} style={{ fontSize: '1.05rem', color: 'var(--text-2)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '3rem' }}>
            Full Stack and DevOps Engineer with AI/ML expertise from Bangalore. I build production-grade systems using Python, Django, React.js and LangChain-powered RAG pipelines, 
            while implementing cloud infrastructure, CI/CD pipelines and scalable deployment strategies.
          </motion.p>
          <motion.div variants={item} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--amber)', color: 'var(--ink)', padding: '0.85rem 2rem', borderRadius: '8px', fontWeight: 500, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.05em', border: '2px solid var(--amber)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}
            >View Projects</a>
            <a href="#contact"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'var(--text)', padding: '0.85rem 2rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.05em', border: '2px solid var(--border-2)', transition: 'border-color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--amber)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)')}
            >Get in touch</a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className='scroll-indicator' style={{ position: 'absolute', bottom: '3rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--amber))' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', writingMode: 'vertical-rl' }}>Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
