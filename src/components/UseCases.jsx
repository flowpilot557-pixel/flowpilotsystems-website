import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const CASES = [
  {
    emoji: '🚗',
    title: 'Car Dealerships',
    body: 'New enquiries from your website or Facebook ads get an immediate follow-up — before your BDC team even starts their shift. FlowPilot qualifies interest, captures urgency, and books test drive appointments.',
  },
  {
    emoji: '🚛',
    title: 'Removalists',
    body: 'Quote requests that come in after hours or on weekends get a fast, professional response. FlowPilot captures job details, confirms availability windows, and sends your team a clear brief.',
  },
  {
    emoji: '🔧',
    title: 'Tradies & Contractors',
    body: 'Missed calls and web enquiries become qualified leads with captured job type, location, timeline, and contact preference — before your competitors call back.',
  },
  {
    emoji: '📍',
    title: 'Local Service Businesses',
    body: 'Any business receiving enquiries from Google, Facebook, or your website — from cleaning companies to physios to gyms — can use FlowPilot to respond faster and convert more of the leads you\'re already paying to attract.',
  },
]

export default function UseCases() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Who It's For" center>
          Built for service businesses that can't afford to miss a lead.
        </SectionHeading>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {CASES.map((useCase) => (
            <div key={useCase.title} className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-3" aria-hidden="true">
                {useCase.emoji}
              </div>
              <h3 className="text-lg font-bold text-heading mb-2">{useCase.title}</h3>
              <p className="text-sm text-body leading-relaxed">{useCase.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
