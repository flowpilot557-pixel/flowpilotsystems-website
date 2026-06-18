import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const CARDS = [
  {
    title: 'Remembers your rules',
    body: 'Qualification criteria, escalation preferences, appointment logic, and approved scripts are retained and applied consistently — not reconfigured every time.',
  },
  {
    title: 'Recognises patterns',
    body: 'When the same workflow issue or customer objection keeps appearing, Hermes flags it. Known fixes are reused rather than rediscovered.',
  },
  {
    title: 'Supports refinement',
    body: 'During and after the pilot, outcomes are reviewed together. Scripts, rules, and handover logic are refined based on what\'s actually happening in your business.',
  },
]

export default function HermesSection() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Built-in Learning Loop" center>
          FlowPilot gets more consistent the longer it runs.
        </SectionHeading>

        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-center text-body leading-relaxed">
          <p>
            Most automation tools treat every lead, every workflow failure, and every customer
            interaction as a one-off event. FlowPilot is different.
          </p>
          <p>
            The Hermes layer maintains operational memory across your workflows. Over time, it
            retains what's working, flags what isn't, and supports better decisions — without
            replacing your team's judgment.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div key={card.title} className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold text-heading mb-2">{card.title}</h3>
              <p className="text-sm text-body leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted text-center max-w-2xl mx-auto">
          FlowPilot supports a human-reviewed learning loop. The system does not update its own
          rules without review. All business logic is visible and can be adjusted during the
          pilot.
        </p>
      </div>
    </FadeInSection>
  )
}
