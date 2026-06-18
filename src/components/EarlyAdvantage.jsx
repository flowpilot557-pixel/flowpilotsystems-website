import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const POINTS = [
  {
    title: 'Custom setup',
    body: 'Your workflow is designed around your business, not a template.',
  },
  {
    title: 'Founder involvement',
    body: 'Direct access to the person building the system, not a support queue.',
  },
  {
    title: 'Feedback loop',
    body: 'Your outcomes shape how FlowPilot develops.',
  },
  {
    title: 'Early pricing',
    body: 'Pilot rates are available to the first 1–3 clients only.',
  },
]

export default function EarlyAdvantage() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Early Client Advantage" center>
          Pilot clients don't just get a service. They shape it.
        </SectionHeading>

        <p className="mt-8 max-w-2xl mx-auto text-center text-body leading-relaxed">
          This is a hands-on, founder-led pilot — not just a software subscription. The first clients
          working with FlowPilot get direct access during setup, their feedback influences how
          the product evolves, and they lock in pricing that won't be available once the pilot
          closes.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POINTS.map((point) => (
            <div key={point.title} className="glass-card rounded-xl p-6 text-center">
              <h3 className="text-base font-bold text-heading mb-2">{point.title}</h3>
              <p className="text-sm text-body leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
