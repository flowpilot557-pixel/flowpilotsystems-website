import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const PRIMARY = {
  emoji: '🚗',
  title: 'Car Dealerships — Primary Focus',
  body: 'New enquiries from your website, Facebook, or Carsales get an AI voice follow-up before your BDC team starts their shift. FlowPilot qualifies buyer intent, discusses vehicle details using your live inventory, captures test drive and appointment intent, and sends your sales team a clean CRM handover — so no warm lead sits unanswered.',
}

const OTHERS = [
  {
    emoji: '🚛',
    title: 'Removalists',
    body: 'Quote requests that come in after hours get a fast, professional response. FlowPilot captures job details, confirms availability windows, and sends your team a clear brief.',
  },
  {
    emoji: '🔧',
    title: 'Tradies & Contractors',
    body: 'Missed calls and web enquiries become qualified leads with captured job type, location, timeline, and contact preference — before a competitor calls back.',
  },
  {
    emoji: '📍',
    title: 'Local Service Businesses',
    body: 'Any business receiving enquiries from Google, Facebook, or your website can use FlowPilot to respond faster and convert more of the leads you\'re already paying to attract.',
  },
]

export default function UseCases() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Who It's For" center>
          Built for car dealerships. Works for any high-value service business.
        </SectionHeading>

        {/* Primary — dealerships */}
        <div className="mt-14 glass-card rounded-xl p-6 border border-primary/30">
          <div className="text-3xl mb-3" aria-hidden="true">{PRIMARY.emoji}</div>
          <h3 className="text-lg font-bold text-heading mb-2">{PRIMARY.title}</h3>
          <p className="text-sm text-body leading-relaxed">{PRIMARY.body}</p>
        </div>

        {/* Secondary — other service businesses */}
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted text-center">
          Also suited for
        </p>
        <div className="mt-4 grid sm:grid-cols-3 gap-6">
          {OTHERS.map((useCase) => (
            <div key={useCase.title} className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-3" aria-hidden="true">{useCase.emoji}</div>
              <h3 className="text-lg font-bold text-heading mb-2">{useCase.title}</h3>
              <p className="text-sm text-body leading-relaxed">{useCase.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
