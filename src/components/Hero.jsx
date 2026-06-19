import { PrimaryButton, SecondaryButton, openCalendly } from './ui'

const FLOW_STEPS = [
  { label: 'New car enquiry', tag: 'WEB / FB / CARSALES', glow: 'bg-secondary' },
  { label: 'AI BDC responds', tag: 'FLOWPILOT AI', glow: 'bg-primary' },
  { label: 'CRM handover', tag: 'SALES TEAM', glow: 'bg-neon-violet' },
]

const BULLETS = [
  'Responds to new enquiries within minutes — day, night, or weekend',
  'Qualifies buyer intent, urgency, and timeline using your live inventory data',
  'Logs to CRM and delivers a clean handover summary to your sales team',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-40">
      {/* Ambient radar pulse */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] animate-glow-drift">
          <div
            className="absolute inset-0 rounded-full animate-pulse-radar"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.18) 35%, rgba(6,182,212,0.1) 55%, transparent 75%)',
            }}
          />
          <div className="absolute inset-0 rounded-full border border-secondary/10" />
          <div className="absolute inset-[10%] rounded-full border border-neon-violet/10" />
          <div className="absolute inset-[20%] rounded-full border border-primary/10" />
          <div className="absolute inset-[30%] rounded-full border border-secondary/10" />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-secondary border border-border rounded-full px-4 py-1.5 mb-8 bg-surface/60 backdrop-blur-sm">
          AI BDC System · Car Dealerships &amp; High-Value Service Businesses
        </p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
          Stop letting car leads{' '}
          <span className="text-gradient">go cold.</span>
        </h1>

        <ul className="mt-10 inline-flex flex-col items-start gap-3 text-left max-w-xl mx-auto">
          {BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-body">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <PrimaryButton>Apply for Pilot →</PrimaryButton>
          <SecondaryButton href="#book">Book a 15-Minute Discovery Call</SecondaryButton>
        </div>

        <p className="mt-8 text-sm text-highlight bg-highlight/10 border border-highlight/30 rounded-lg px-4 py-3 inline-flex items-center gap-2">
          <span aria-hidden="true">⚑</span>
          Only 1–3 founding pilot spots available. Done-for-you setup. No technical knowledge required.
        </p>

        {/* Floating holographic flow card */}
        <div className="mt-20 animate-float">
          <div className="glow-panel glass-card rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-[0_30px_100px_-40px_rgba(59,130,246,0.5)]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-6 text-left">
              Live workflow preview
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-2 items-center">
              {FLOW_STEPS.map((step, index) => (
                <div key={step.label} className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 text-left">
                  <span className={`relative flex h-2.5 w-2.5 rounded-full ${step.glow} shadow-[0_0_12px_currentColor]`}>
                    <span className={`absolute inset-0 rounded-full ${step.glow} animate-ping opacity-60`} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {step.tag}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-heading">{step.label}</p>
                  </div>
                  {index < FLOW_STEPS.length - 1 && (
                    <span className="hidden sm:block sm:absolute" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
