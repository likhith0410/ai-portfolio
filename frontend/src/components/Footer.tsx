export function Footer() {
  return (
    <footer style={{ padding: '3rem 2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)' }}>
        2025 Likhith Gowda T R - Built with FastAPI + React + OpenRouter
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)' }}>
        Bangalore, Karnataka, India
      </p>
    </footer>
  )
}
