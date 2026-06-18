import FadeInSection from './FadeInSection'
import { PrimaryButton, SecondaryButton } from './ui'

export default function FinalCTA() {
  return (
    <FadeInSection as="section" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-heading">
          Ready to stop missing leads?
        </h2>

        <p className="mt-6 text-body leading-relaxed max-w-xl mx-auto">
          Apply for one of the first FlowPilot pilot spots. We'll have a quick discovery call,
          scope your workflow, and get you set up within two weeks.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <PrimaryButton href="#apply">Apply for Pilot →</PrimaryButton>
          <SecondaryButton href="#book">Book a Discovery Call</SecondaryButton>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-wider text-muted">
          $1,500 setup · $600/month · First 1–3 pilot clients only · Done-for-you setup · No
          technical knowledge required
        </p>

        <p className="mt-6 text-sm text-muted max-w-xl mx-auto leading-relaxed">
          Built by an automation and cloud systems specialist with experience across CRM
          workflows, cloud infrastructure, business process design, and AI automation.
        </p>
      </div>
    </FadeInSection>
  )
}
