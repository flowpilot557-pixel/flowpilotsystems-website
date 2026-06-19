import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const TIMELINE = [
  {
    week: 'Week 1',
    title: 'Discovery and build',
    body: 'We scope your lead sources, qualification criteria, and team handover preferences. Your AI script and workflow are designed, and nothing goes live without your sign-off.',
  },
  {
    week: 'Week 2',
    title: 'Go-live with real leads',
    body: 'FlowPilot is connected to your live lead sources and begins handling new enquiries. Your team receives handover summaries and we monitor every interaction closely.',
  },
  {
    week: 'Weeks 3–4',
    title: 'Refinement and optimisation',
    body: "Based on real outcomes, we refine scripts, qualification logic, and handover format. You stay in the loop on what's working and what's being adjusted.",
  },
]

const ACCESS_POINTS = [
  {
    title: 'Direct implementation access',
    body: 'You work with the person building your system — not a support queue or an account manager reading from a script.',
  },
  {
    title: 'Fast iteration',
    body: 'When something needs adjusting, it gets adjusted quickly. No ticketing delays, no waiting for a release cycle.',
  },
  {
    title: 'Founding client pricing',
    body: 'Pilot rates are available to the first 1–3 clients only. As FlowPilot moves out of pilot, setup and monthly fees will increase.',
  },
]

export default function EarlyAdvantage() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="How the Pilot Works" center>
          Up and running in two weeks. Refined from there.
        </SectionHeading>

        <p className="mt-8 max-w-2xl mx-auto text-center text-body leading-relaxed">
          FlowPilot is a done-for-you implementation — not a platform you figure out yourself.
          Here's what the first 30 days look like.
        </p>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {TIMELINE.map((item) => (
            <div key={item.week} className="glass-card rounded-xl p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-secondary mb-3">{item.week}</p>
              <h3 className="text-base font-bold text-heading mb-2">{item.title}</h3>
              <p className="text-sm text-body leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          {ACCESS_POINTS.map((point) => (
            <div key={point.title} className="glass-card rounded-xl p-6 border border-primary/20">
              <h3 className="text-sm font-bold text-heading mb-2">{point.title}</h3>
              <p className="text-sm text-body leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
