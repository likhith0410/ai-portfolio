import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const h = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled || menuOpen ? 'rgba(10,10,15,0.96)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', zIndex: 1001 }}>
          LG<span style={{ color: 'var(--amber)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--amber)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
            >{l}</a>
          ))}
          <a href="https://github.com/likhith0410" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--amber)', border: '1px solid var(--amber)', padding: '0.45rem 1rem', borderRadius: '6px', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'var(--amber)'; el.style.color = 'var(--ink)' }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = 'var(--amber)' }}
          >GitHub</a>
        </div>

        {/* Hamburger button - mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', zIndex: 1001 }}
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px', transformOrigin: 'center' }} />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px' }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--text)', borderRadius: '2px', transformOrigin: 'center' }} />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 999,
              background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', padding: '1.5rem',
              gap: '0',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--amber)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
              >{l}</motion.a>
            ))}
            <motion.a
              href="https://github.com/likhith0410"
              target="_blank" rel="noopener noreferrer"
              onClick={handleLinkClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: links.length * 0.05 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--amber)', padding: '1rem 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >GitHub ↗</motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for responsive behavior */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
