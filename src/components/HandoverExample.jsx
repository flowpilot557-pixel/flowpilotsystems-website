import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const FIELDS = [
  { label: 'Lead', value: 'Sarah M.' },
  { label: 'Source', value: 'Facebook enquiry' },
  { label: 'Interest', value: 'BMW iX xDrive45' },
  { label: 'Intent', value: 'Warm — asked about availability and test drive' },
  { label: 'Preferred time', value: 'Saturday morning' },
  { label: 'Objection', value: 'Wants to confirm finance options' },
  {
    label: 'Next action',
    value: 'Sales team to call back with finance estimate and appointment confirmation',
  },
]

export default function HandoverExample() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="What Your Team Receives" center>
          A clean handover, ready to action.
        </SectionHeading>

        <p className="mt-8 max-w-2xl mx-auto text-center text-body leading-relaxed">
          After FlowPilot follows up and qualifies a lead, your team gets a short, structured
          summary — not a transcript. Here's an example from a car dealership enquiry.
        </p>

        <div className="mt-14 glow-panel glass-card rounded-2xl p-6 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
              Handover Summary
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-highlight bg-highlight/10 border border-highlight/30 rounded-full px-3 py-1">
              Follow-up required
            </span>
          </div>

          <dl className="space-y-4 sm:space-y-0 sm:divide-y sm:divide-border">
            {FIELDS.map((field) => (
              <div
                key={field.label}
                className="sm:grid sm:grid-cols-[160px_1fr] sm:items-baseline sm:gap-6 sm:py-3"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {field.label}
                </dt>
                <dd className="text-sm sm:text-base text-heading font-medium leading-relaxed">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </FadeInSection>
  )
}
