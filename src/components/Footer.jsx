const LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: "What's Included", href: '#whats-included' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted">
        <p>Flowpilot Automation © 2025 · AI Lead Response System</p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-body transition">
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-right text-xs leading-relaxed">
          <p className="font-medium text-muted/70">Flowpilot Automation</p>
          <p>Operated by Nerissa Moraleda</p>
          <p>ABN 89 223 234 680</p>
          <p>
            <a href="mailto:hello@flowpilot.systems" className="hover:text-body transition">
              hello@flowpilot.systems
            </a>
          </p>
          <p>Australia</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted/50 leading-relaxed">
        Built by{' '}
        <span className="text-muted/70">Nerissa Moraleda</span>
        {' '}— an automation and cloud systems specialist with experience across CRM workflows, cloud infrastructure, business process design, and AI automation.{' '}
        <a
          href="https://www.linkedin.com/in/nerissa-moraleda-5b1aa5220/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted/70 hover:text-muted transition underline underline-offset-2"
        >
          Connect on LinkedIn →
        </a>
      </div>
    </footer>
  )
}
