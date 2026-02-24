import { Suspense, lazy } from 'react'
import { Navbar }    from '../components/Navbar'
import { Hero }      from '../components/Hero'
import { Noise }     from '../components/Noise'

// Lazy load everything below the fold - they load as user scrolls
const About      = lazy(() => import('../components/About').then(m => ({ default: m.About })))
const Skills     = lazy(() => import('../components/Skills').then(m => ({ default: m.Skills })))
const Experience = lazy(() => import('../components/Experience').then(m => ({ default: m.Experience })))
const Projects   = lazy(() => import('../components/Projects').then(m => ({ default: m.Projects })))
const Contact    = lazy(() => import('../components/Contact').then(m => ({ default: m.Contact })))
const Footer     = lazy(() => import('../components/Footer').then(m => ({ default: m.Footer })))
const ChatWidget = lazy(() => import('../components/ChatWidget').then(m => ({ default: m.ChatWidget })))

function SectionFallback() {
  return (
    <div style={{ padding: '8rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '32px', height: '32px', border: '2px solid var(--border)', borderTopColor: 'var(--amber)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function Home() {
  return (
    <>
      <Noise />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </>
  )
}
