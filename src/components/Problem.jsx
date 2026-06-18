import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const CARDS = [
  {
    title: 'After hours?',
    body: 'Enquiries come in at night and on weekends. Without an automated response, they sit untouched.',
  },
  {
    title: 'Too busy?',
    body: "When your team is on the job, they can't stop to qualify new leads.",
  },
  {
    title: 'Slow response loses deals.',
    body: 'The first business to follow up wins the sale more often than not.',
  },
]

export default function Problem() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="The Problem" center>
          Most leads go cold before you even see them.
        </SectionHeading>

        <div className="mt-8 max-w-2xl mx-auto space-y-4 text-center text-body leading-relaxed">
          <p>
            When a new enquiry comes in — from your website, Facebook, or Google — the window to
            respond is short. Response rates drop quickly when leads sit unanswered. After
            hours, on weekends, or during a busy job, that window closes fast.
          </p>
          <p>
            Your team can't be everywhere. Leads sit unanswered. By the time someone follows up,
            the customer has already called someone else.
          </p>
          <p className="text-heading font-semibold">
            This isn't a staffing problem. It's a response system problem.
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
      </div>
    </FadeInSection>
  )
}
