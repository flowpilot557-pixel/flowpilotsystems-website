import { Link } from 'react-router-dom'

export function Eyebrow({ children }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-3">
      {children}
    </p>
  )
}

export function SectionHeading({ eyebrow, children, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-heading max-w-2xl mx-auto">
        {children}
      </h2>
    </div>
  )
}

const PRIMARY_CLS = 'inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition'

export function PrimaryButton({ href, to = '/apply', onClick, children }) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={PRIMARY_CLS}>
        {children}
      </button>
    )
  }
  if (href) {
    return <a href={href} className={PRIMARY_CLS}>{children}</a>
  }
  return <Link to={to} className={PRIMARY_CLS}>{children}</Link>
}

export function SecondaryButton({ href = '#book', to, onClick, children }) {
  const cls = 'text-slate-300 underline underline-offset-4 hover:text-white transition cursor-pointer'

  if (to) {
    return <Link to={to} className={cls}>{children}</Link>
  }

  function handleClick(e) {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    } else if (href === '#book') {
      e.preventDefault()
      window.Calendly?.initPopupWidget({ url: 'https://calendly.com/flowpilot557/30min' })
    }
  }

  return (
    <a href={href} onClick={handleClick} className={cls}>
      {children}
    </a>
  )
}

export function openCalendly() {
  window.Calendly?.initPopupWidget({ url: 'https://calendly.com/flowpilot557/30min' })
}
