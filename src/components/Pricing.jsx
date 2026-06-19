import FadeInSection from './FadeInSection'
import { PrimaryButton, SecondaryButton, SectionHeading, openCalendly } from './ui'

const PILOT_ITEMS = [
  'Done-for-you AI BDC setup',
  'One lead source integration (website, Facebook, Google, or similar)',
  'Lead qualification flow — intent, urgency, timeline, and objections',
  'AI voice follow-up setup (via ElevenLabs)',
  'Inventory or product data connection where available',
  'CRM, Airtable, or Google Sheet writeback',
  'Appointment, test drive, or callback intent capture',
  'Team handover summary with lead notes',
  'SMS booking confirmation and reminders',
  'Hermes operational memory and workflow diagnostics',
  '2-week post-launch refinement period',
  'Up to 100 leads/month or reasonable pilot usage',
]

const PRO_ITEMS = [
  'Everything in Founding Pilot',
  'Multiple lead source integrations',
  'Higher lead volume capacity',
  'Refined AI conversation scripts',
  'Deeper CRM workflow configuration',
  'Inventory-aware response improvements',
  'Salesperson task creation and lead routing',
  'Monthly optimisation review',
  'Priority support',
]

const ENTERPRISE_ITEMS = [
  'Multi-location workflow design',
  'Custom CRM integration scoping',
  'Advanced reporting and handover logic',
  'Multiple AI assistants or routing flows',
  'Custom escalation, approval, and compliance rules',
  'Higher volume usage planning',
  'Dedicated implementation and review process',
  'Scoped per location, system, and lead volume',
]

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-secondary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function TierCard({ badge, badgeColor = 'bg-primary', name, setup, monthly, monthlyNote, description, items, cta, featured = false }) {
  return (
    <div className={`relative glass-card rounded-2xl p-8 flex flex-col ${featured ? 'border border-primary/50 shadow-[0_0_50px_-12px_rgba(59,130,246,0.4)]' : ''}`}>
      {badge && (
        <div className="absolute -top-3 left-6">
          <span className={`${badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {badge}
          </span>
        </div>
      )}
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-secondary mb-2">{name}</p>
        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-3xl font-extrabold text-heading">{monthly}</span>
          <span className="text-sm text-muted pb-1">{monthlyNote}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{setup}</p>
        <p className="mt-4 text-sm text-body leading-relaxed">{description}</p>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-body">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {cta}
    </div>
  )
}

export default function Pricing() {
  return (
    <FadeInSection as="section" id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Pricing" center>
          Transparent pricing. No lock-ins. No guesswork.
        </SectionHeading>

        <p className="mt-6 max-w-2xl mx-auto text-center text-body leading-relaxed">
          FlowPilot includes AI voice, inventory data integration, CRM writeback, workflow
          automation, and ongoing support. Pricing reflects the full cost of building, running,
          and maintaining an AI BDC system that actually works.
        </p>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-start">
          <TierCard
            badge="Limited — 1–3 Spots"
            name="Founding Pilot"
            setup="$1,500 one-time setup"
            monthly="$600"
            monthlyNote="/month"
            description="Best for dealerships or service businesses wanting a done-for-you AI BDC pilot with hands-on setup and founder-direct support."
            items={PILOT_ITEMS}
            featured
            cta={
              <a
                href="/apply"
                className="inline-flex items-center justify-center w-full bg-primary hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-sm transition"
              >
                Apply for Pilot →
              </a>
            }
          />

          <TierCard
            name="Professional"
            setup="$2,500 one-time setup"
            monthly="$950"
            monthlyNote="/month"
            description="Designed for dealerships and sales teams that want FlowPilot actively supporting daily lead follow-up — not just a small pilot."
            items={PRO_ITEMS}
            cta={
              <button
                type="button"
                onClick={openCalendly}
                aria-label="Book a demo for the Professional plan"
                className="inline-flex items-center justify-center w-full border border-border hover:border-primary/50 text-body hover:text-heading px-6 py-3 rounded-lg font-semibold text-sm transition"
              >
                Book a Demo →
              </button>
            }
          />

          <TierCard
            name="Enterprise / Multi-location"
            setup="From $5,000 one-time setup"
            monthly="From $1,500"
            monthlyNote="/month"
            description="Scoped based on lead volume, systems, locations, communication channels, and integration complexity."
            items={ENTERPRISE_ITEMS}
            cta={
              <button
                type="button"
                onClick={openCalendly}
                aria-label="Get in touch about the Enterprise plan"
                className="inline-flex items-center justify-center w-full border border-border hover:border-primary/50 text-body hover:text-heading px-6 py-3 rounded-lg font-semibold text-sm transition"
              >
                Get in Touch →
              </button>
            }
          />
        </div>

        {/* Usage limits */}
        <div className="mt-10 max-w-3xl mx-auto glass-card rounded-xl px-6 py-5 text-sm text-body leading-relaxed space-y-3">
          <p>
            <span className="text-heading font-semibold">Usage limits apply.</span>{' '}
            The Founding Pilot includes up to 100 leads/month or reasonable pilot usage. Additional AI voice minutes, SMS, WhatsApp, high-volume lead processing, or complex integrations may be quoted separately.
          </p>
          <p>
            <span className="text-heading font-semibold">SMS and WhatsApp.</span>{' '}
            SMS is used for booking confirmation and reminders. WhatsApp follow-up can be added where approved messaging setup is available. During pilot rollout, FlowPilot can operate with AI voice, CRM updates, and team handover summaries while messaging approval is completed.
          </p>
          <p className="text-muted text-xs">
            Complex CRM, SMS, WhatsApp, or multi-location integrations may require additional scoping. The sales team remains in control. The AI escalates when confidence is low or a question falls outside approved business data.
          </p>
        </div>

        {/* ROI note */}
        <p className="mt-8 text-sm text-highlight bg-highlight/10 border border-highlight/30 rounded-lg px-5 py-4 max-w-3xl mx-auto flex items-start gap-3">
          <span aria-hidden="true" className="shrink-0">⚑</span>
          <span>
            Recovering even a small number of missed test drive bookings or sales enquiries can justify the pilot cost. The goal is to make your existing lead volume work harder — not to replace your sales team.
          </span>
        </p>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <PrimaryButton>Apply for Pilot →</PrimaryButton>
          <SecondaryButton href="#book">Book a 15-Minute Discovery Call</SecondaryButton>
        </div>
      </div>
    </FadeInSection>
  )
}
