import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const ITEMS = [
  'AI voice call follow-up to new leads',
  'Lead qualification workflow',
  'Appointment and callback capture',
  'CRM, Airtable, or Google Sheet update',
  'Follow-up task creation for your team',
  'SMS and email notification to staff',
  'Post-call or post-message lead summary',
  'Workflow monitoring and support',
  'Hermes operational memory layer',
  '2-week pilot refinement period',
  'Custom script and qualification criteria',
  'Founder-led onboarding and setup',
  'Product, service, or inventory data connection',
  'Approved FAQ and business knowledge setup',
  'AI product query handling',
  'Human escalation rules for unknown questions',
]

export default function WhatsIncluded() {
  return (
    <FadeInSection as="section" id="whats-included" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow="What's Included" center>
          Everything you need to stop missing leads.
        </SectionHeading>

        <div className="mt-14 grid sm:grid-cols-2 gap-4">
          {ITEMS.map((item) => (
            <div key={item} className="flex items-start gap-3 glass-card rounded-lg px-5 py-4">
              <span className="text-secondary font-bold mt-0.5">✓</span>
              <span className="text-body">{item}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted text-center max-w-2xl mx-auto">
          Complex integrations with existing CRMs or third-party software may require additional
          scoping before setup.
        </p>
      </div>
    </FadeInSection>
  )
}
