import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const CARDS = [
  {
    title: 'Inventory-aware responses',
    body: 'The AI can reference approved inventory or product records before responding — ideal for dealerships, equipment suppliers, or product-based businesses.',
  },
  {
    title: 'Service catalogue support',
    body: 'FlowPilot can use your services, locations, pricing rules, availability windows, and FAQs to answer common customer questions consistently.',
  },
  {
    title: 'Escalation when unsure',
    body: 'When confidence is low or the question is outside the approved data, FlowPilot can flag the lead for human follow-up instead of guessing.',
  },
]

const DEALERSHIP_TOPICS = [
  'Availability',
  'Price',
  'Year',
  'Make/model',
  'Variant',
  'Colour',
  'Kilometres',
  'Transmission',
  'Fuel type',
  'Stock number',
  'Features',
  'Appointment/test drive options',
]

const SERVICE_TOPICS = [
  'Services offered',
  'Service areas',
  'Availability windows',
  'Basic pricing rules or quote ranges, if approved',
  'Booking requirements',
  'Common FAQs',
  'What info is needed before a human follows up',
]

export default function ConnectedData() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="AI + Your Business Data" center>
          Connected to Your Business Data
        </SectionHeading>

        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-center text-body leading-relaxed">
          <p>
            FlowPilot doesn't answer from guesswork. It can connect to your approved product,
            service, or inventory data — such as your inventory, product list, service
            catalogue, CRM, Airtable, Google Sheet, or database — so the AI assistant can answer
            customer questions using approved and up-to-date business information.
          </p>
          <p>
            For dealerships, that means the assistant can reference vehicle details like price,
            model, stock number, kilometres, colour, transmission, fuel type, and availability.
            For service businesses, it can reference your services, service areas, booking
            rules, quote requirements, and approved FAQs.
          </p>
          <p>
            If the answer is outside the approved data, FlowPilot can escalate to your team
            instead of making things up.
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

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4">
              Dealerships — example questions
            </p>
            <div className="flex flex-wrap gap-2">
              {DEALERSHIP_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="text-xs text-body border border-border rounded-full px-3 py-1"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4">
              Service businesses — example questions
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="text-xs text-body border border-border rounded-full px-3 py-1"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted text-center max-w-2xl mx-auto">
          FlowPilot is designed to use approved business data. You stay in control of what the
          AI can say, what it should avoid, and when it should escalate to a human. Complex
          inventory or CRM integrations may require additional scoping during onboarding.
        </p>
      </div>
    </FadeInSection>
  )
}
