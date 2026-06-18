import FadeInSection from './FadeInSection'
import { PrimaryButton, SecondaryButton, SectionHeading } from './ui'

const SETUP_ITEMS = [
  'Discovery and scoping session',
  'Custom AI script and qualification workflow',
  'Integration with your lead source (website form, Facebook, Google)',
  'CRM, Airtable, or Google Sheet setup',
  'SMS and/or email notification configuration',
  'Hermes operational memory configuration',
  'Product, service, or inventory data connection',
  'Approved business knowledge and FAQ setup',
  'End-to-end testing before go-live',
  'Founder-led onboarding and walkthrough',
]

const MONTHLY_ITEMS = [
  'Ongoing AI lead follow-up and qualification',
  'Workflow monitoring and issue resolution',
  'Hermes memory updates and rule refinement',
  'Post-call analysis and summary generation',
  'Monthly review and optimisation',
  'Direct support access during pilot period',
]

export default function Pricing() {
  return (
    <FadeInSection as="section" id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Pilot Program" center>
          First 1–3 clients. Done-for-you. Priced for early adopters.
        </SectionHeading>

        <p className="mt-6 max-w-2xl mx-auto text-center text-body leading-relaxed">
          Best suited for businesses receiving regular inbound enquiries from website forms,
          Facebook, Google Ads, or missed calls.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-sm font-mono uppercase tracking-wider text-secondary mb-1">
              Setup Fee
            </h3>
            <p className="text-3xl font-extrabold text-heading mb-1">
              $1,500 <span className="text-base font-medium text-muted">one-time</span>
            </p>
            <ul className="mt-6 space-y-3">
              {SETUP_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-body">
                  <span className="text-secondary mt-1">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-sm font-mono uppercase tracking-wider text-secondary mb-1">
              Monthly
            </h3>
            <p className="text-3xl font-extrabold text-heading mb-1">
              $600 <span className="text-base font-medium text-muted">/month</span>
            </p>
            <ul className="mt-6 space-y-3">
              {MONTHLY_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-body">
                  <span className="text-secondary mt-1">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-sm text-highlight bg-highlight/10 border border-highlight/30 rounded-lg px-4 py-3 flex items-start gap-2 max-w-3xl mx-auto">
          <span aria-hidden="true">⚑</span>
          <span>
            This pricing is available for the first 1–3 pilot clients only. As FlowPilot moves
            out of pilot, setup and monthly fees will increase. Pilot clients receive hands-on
            access and founder-direct support not available in future packages.
          </span>
        </p>

        <p className="mt-6 text-xs text-muted text-center max-w-2xl mx-auto">
          Advanced CRM integrations, paid ad management, and custom dashboards can be scoped
          separately.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <PrimaryButton href="#apply">Apply for Pilot →</PrimaryButton>
          <SecondaryButton href="#book">Book a Discovery Call</SecondaryButton>
        </div>
      </div>
    </FadeInSection>
  )
}
