import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const STEPS = [
  {
    title: 'Lead comes in',
    body: 'A new enquiry arrives from your website, Facebook lead form, or Google ad.',
  },
  {
    title: 'AI follows up',
    body: 'The AI places a voice call to follow up with the lead while they\'re still warm, using your approved business and inventory data.',
  },
  {
    title: 'Lead is qualified',
    body: 'FlowPilot asks the right questions: what they need, their timeline, urgency, and any key objections — and product or service questions are captured along the way.',
  },
  {
    title: 'Appointment or callback is captured',
    body: 'If the lead is ready, FlowPilot books a time or requests a callback and confirms with the customer.',
  },
  {
    title: 'CRM or sheet is updated',
    body: 'Lead details, qualification notes, outcome, and next action are logged to your CRM, Airtable, or Google Sheet automatically.',
  },
  {
    title: 'Your team receives a summary',
    body: 'A clean handover — lead name, what they said, what they need, and what to do next — is sent to the right person on your team.',
  },
]

export default function HowItWorks() {
  return (
    <FadeInSection as="section" id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="How It Works" center>
          Automated follow-up. Human-ready handover.
        </SectionHeading>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, index) => (
            <div key={step.title} className="glass-card rounded-xl p-6">
              <span className="font-mono text-xs text-secondary border border-secondary/30 rounded-full px-2.5 py-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold text-heading mt-4 mb-2">{step.title}</h3>
              <p className="text-sm text-body leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
