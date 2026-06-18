import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const HERMES_POINTS = [
  'Remembers your lead qualification rules and appointment logic',
  'Retains approved scripts and common customer objections',
  'Tracks recurring workflow issues and known fixes',
  'Keeps handover summaries consistent with your business preferences',
  'Supports human review when confidence is low',
]

export default function Solution() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="The Solution" center>
          FlowPilot responds the moment a lead comes in.
        </SectionHeading>

        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-center text-body leading-relaxed">
          <p>
            When a new enquiry arrives, FlowPilot follows up, qualifies the lead, captures what
            matters, and sends your team the next action — whether that's a booked appointment,
            a callback request, or a clear summary of where the customer is at.
          </p>
          <p>
            You stay in control. FlowPilot handles the follow-up, so your team focuses on the
            conversations that are ready to close.
          </p>
        </div>

        <div className="mt-14 glass-card rounded-2xl p-8 sm:p-10 border-primary/20">
          <h3 className="text-xl font-bold text-heading mb-1">
            Powered by Hermes Operational Memory
          </h3>
          <p className="text-body leading-relaxed mt-4">
            FlowPilot doesn't just run one-off automations. Its Hermes layer gives the system
            persistent operational memory — so it can retain your business rules, recognise
            recurring issues, and improve consistency over time.
          </p>

          <ul className="mt-6 space-y-3">
            {HERMES_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-body">
                <span className="text-secondary mt-1">●</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted italic">
            Changes to business rules and scripts are always reviewable and approved by you.
          </p>
        </div>
      </div>
    </FadeInSection>
  )
}
