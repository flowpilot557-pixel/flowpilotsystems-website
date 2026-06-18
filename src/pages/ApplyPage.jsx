import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// n8n production webhook — FlowPilot pilot application
const N8N_WEBHOOK_URL = 'https://n8n.n8nflowpilot.systems/webhook/flowpilot-pilot-application'

// ── Shared field components ──────────────────────────────────────────────────

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-heading mb-1.5">
      {children}
      {required && <span className="text-primary ml-1">*</span>}
    </label>
  )
}

function HelperText({ children }) {
  return <p className="mt-1 text-xs text-muted">{children}</p>
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-400">{message}</p>
}

function Input({ id, type = 'text', value, onChange, placeholder, error, ...rest }) {
  return (
    <>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-surface border rounded-lg px-4 py-3 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
          error ? 'border-red-500/60' : 'border-border focus:border-primary/50'
        }`}
        {...rest}
      />
      <FieldError message={error} />
    </>
  )
}

function Textarea({ id, value, onChange, placeholder, error, rows = 4 }) {
  return (
    <>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-surface border rounded-lg px-4 py-3 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none ${
          error ? 'border-red-500/60' : 'border-border focus:border-primary/50'
        }`}
      />
      <FieldError message={error} />
    </>
  )
}

function Select({ id, value, onChange, options, error, placeholder = 'Select an option…' }) {
  return (
    <>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full bg-surface border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition appearance-none ${
          value ? 'text-heading' : 'text-muted'
        } ${error ? 'border-red-500/60' : 'border-border focus:border-primary/50'}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-heading bg-surface">
            {opt}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </>
  )
}

function CheckboxGroup({ id, options, value = [], onChange, error }) {
  const toggle = (opt) => {
    const next = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    onChange(next)
  }
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2" id={id}>
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition ${
              value.includes(opt)
                ? 'border-primary/50 bg-primary/10 text-heading'
                : 'border-border bg-surface text-body hover:border-border/80'
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="mt-0.5 accent-blue-500 shrink-0"
            />
            <span className="text-sm leading-snug">{opt}</span>
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </>
  )
}

// ── Step card wrapper ─────────────────────────────────────────────────────────

function StepCard({ number, title, children }) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-secondary border border-secondary/30 rounded-full px-2.5 py-1 shrink-0">
          {String(number).padStart(2, '0')}
        </span>
        <h2 className="text-lg font-bold text-heading">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  )
}

function Field({ label, required, helper, children }) {
  return (
    <div>
      {label && (
        <div className="mb-1.5">
          <span className="text-sm font-semibold text-heading">
            {label}
            {required && <span className="text-primary ml-1">*</span>}
          </span>
          {helper && <p className="text-xs text-muted mt-0.5">{helper}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────

const STEPS = [
  'Contact Details',
  'Business Type',
  'Lead Process',
  'FlowPilot Goals',
  'Appointments & Handover',
  'Pilot Readiness',
  'Budget & Timing',
]

function ProgressBar({ current }) {
  const pct = Math.round(((current + 1) / STEPS.length) * 100)
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-secondary">
          Step {current + 1} of {STEPS.length} — {STEPS[current]}
        </span>
        <span className="font-mono text-xs text-muted">{pct}%</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-neon-violet rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ── Initial form state ────────────────────────────────────────────────────────

const INITIAL = {
  // Step 1
  full_name: '',
  business_name: '',
  email: '',
  phone: '',
  website: '',
  location: '',
  // Step 2
  business_type: '',
  products_services: '',
  // Step 3
  lead_sources: [],
  weekly_enquiries: '',
  response_speed: '',
  after_hours: '',
  biggest_problem: [],
  // Step 4
  flowpilot_actions: [],
  answer_product_questions: '',
  data_location: [],
  common_questions: '',
  // Step 5
  books_appointments: '',
  ready_to_book: '',
  alert_recipients: '',
  lead_updates_location: '',
  crm_name: '',
  // Step 6
  comfortable_with_pilot: '',
  leads_opted_in: '',
  scripts_approved: '',
  never_say: '',
  // Step 7
  budget_fit: '',
  start_when: '',
  anything_else: '',
}

// ── Validation per step ───────────────────────────────────────────────────────

function validateStep(step, data) {
  const errs = {}
  if (step === 0) {
    if (!data.full_name.trim()) errs.full_name = 'Required'
    if (!data.business_name.trim()) errs.business_name = 'Required'
    if (!data.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email'
    if (!data.phone.trim()) errs.phone = 'Required'
    if (!data.location.trim()) errs.location = 'Required'
  }
  if (step === 1) {
    if (!data.business_type) errs.business_type = 'Required'
    if (!data.products_services.trim()) errs.products_services = 'Required'
  }
  if (step === 2) {
    if (!data.lead_sources.length) errs.lead_sources = 'Select at least one'
    if (!data.weekly_enquiries) errs.weekly_enquiries = 'Required'
    if (!data.response_speed) errs.response_speed = 'Required'
    if (!data.after_hours.trim()) errs.after_hours = 'Required'
    if (!data.biggest_problem.length) errs.biggest_problem = 'Select at least one'
  }
  if (step === 3) {
    if (!data.flowpilot_actions.length) errs.flowpilot_actions = 'Select at least one'
    if (!data.answer_product_questions) errs.answer_product_questions = 'Required'
    if (!data.common_questions.trim()) errs.common_questions = 'Required'
  }
  if (step === 4) {
    if (!data.books_appointments) errs.books_appointments = 'Required'
    if (!data.ready_to_book) errs.ready_to_book = 'Required'
    if (!data.alert_recipients.trim()) errs.alert_recipients = 'Required'
    if (!data.lead_updates_location) errs.lead_updates_location = 'Required'
    if (data.lead_updates_location === 'Existing CRM' && !data.crm_name.trim())
      errs.crm_name = 'Please enter your CRM name'
  }
  if (step === 5) {
    if (!data.comfortable_with_pilot) errs.comfortable_with_pilot = 'Required'
    if (!data.leads_opted_in) errs.leads_opted_in = 'Required'
    if (!data.scripts_approved) errs.scripts_approved = 'Required'
    if (!data.never_say.trim()) errs.never_say = 'Required'
  }
  if (step === 6) {
    if (!data.budget_fit) errs.budget_fit = 'Required'
    if (!data.start_when) errs.start_when = 'Required'
  }
  return errs
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const set = (field) => (e) =>
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  const setCheck = (field) => (val) =>
    setData((prev) => ({ ...prev, [field]: val }))

  const next = () => {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      const firstErrField = Object.keys(errs)[0]
      const el = document.getElementById(firstErrField)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    setStep((s) => s + 1)
  }

  const back = () => {
    setErrors({})
    setStep((s) => s - 1)
  }

  const submit = async () => {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
    } catch {
      setSubmitError(
        'There was a problem submitting your application. Please try again or email us directly.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-xl w-full text-center glass-card rounded-2xl p-10">
          <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-heading mb-4">Application received.</h1>
          <p className="text-body leading-relaxed mb-8">
            Thank you for applying for the FlowPilot AI Lead Concierge Pilot. We'll review your
            application and contact you if your business looks like a good fit for one of the
            first pilot spots.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ← Back to FlowPilot
          </Link>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-3">
            Pilot Program — 1–3 Spots Available
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-heading mb-4">
            Apply for the FlowPilot<br className="hidden sm:block" /> AI Lead Concierge Pilot
          </h1>
          <p className="text-body leading-relaxed max-w-lg mx-auto">
            FlowPilot is currently opening 1–3 pilot client spots for businesses that receive
            web, Facebook, Google, or missed-call enquiries and want a faster way to follow up,
            qualify leads, answer customer questions, and send clean handovers to their team.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-highlight bg-highlight/10 border border-highlight/30 rounded-lg px-4 py-2">
            <span aria-hidden="true">⚑</span>
            Pilot pricing: $1,500 setup + $600/month · Limited to 1–3 pilot clients
          </div>
        </div>

        {/* Progress */}
        <ProgressBar current={step} />

        {/* ── Step 1: Contact Details ──────────────────────────────────────── */}
        {step === 0 && (
          <StepCard number={1} title="Contact Details">
            <Field label="Full Name" required>
              <Input id="full_name" value={data.full_name} onChange={set('full_name')} error={errors.full_name} />
            </Field>
            <Field label="Business Name" required>
              <Input id="business_name" value={data.business_name} onChange={set('business_name')} error={errors.business_name} />
            </Field>
            <Field label="Email Address" required>
              <Input id="email" type="email" value={data.email} onChange={set('email')} error={errors.email} />
            </Field>
            <Field label="Phone Number" required>
              <Input id="phone" type="tel" value={data.phone} onChange={set('phone')} placeholder="e.g. 0400 000 000" error={errors.phone} />
            </Field>
            <Field label="Website" helper="Optional — include if you have one.">
              <Input id="website" value={data.website} onChange={set('website')} placeholder="e.g. https://yourbusiness.com.au" />
            </Field>
            <Field label="Business Location / Service Area" required>
              <Input id="location" value={data.location} onChange={set('location')} placeholder="e.g. Melbourne, VIC or South East Queensland" error={errors.location} />
            </Field>
          </StepCard>
        )}

        {/* ── Step 2: Business Type ────────────────────────────────────────── */}
        {step === 1 && (
          <StepCard number={2} title="Business Type">
            <Field label="What type of business do you run?" required>
              <Select
                id="business_type"
                value={data.business_type}
                onChange={set('business_type')}
                error={errors.business_type}
                options={[
                  'Car dealership',
                  'Removalist / moving company',
                  'Tradie / contractor',
                  'Local service business',
                  'Professional service',
                  'Other',
                ]}
              />
            </Field>
            <Field label="What services or products do you sell?" required>
              <Textarea
                id="products_services"
                value={data.products_services}
                onChange={set('products_services')}
                placeholder="Briefly describe your main services, products, or offers."
                error={errors.products_services}
              />
            </Field>
          </StepCard>
        )}

        {/* ── Step 3: Current Lead Process ─────────────────────────────────── */}
        {step === 2 && (
          <StepCard number={3} title="Current Lead Process">
            <Field label="Where do your leads currently come from?" required>
              <CheckboxGroup
                id="lead_sources"
                value={data.lead_sources}
                onChange={setCheck('lead_sources')}
                error={errors.lead_sources}
                options={[
                  'Website form',
                  'Facebook page',
                  'Facebook ads',
                  'Google Ads',
                  'Phone calls',
                  'Email enquiries',
                  'Marketplace / directory listing',
                  'CRM',
                  'Referral',
                  'Other',
                ]}
              />
            </Field>
            <Field label="How many new enquiries do you usually receive per week?" required>
              <Select
                id="weekly_enquiries"
                value={data.weekly_enquiries}
                onChange={set('weekly_enquiries')}
                error={errors.weekly_enquiries}
                options={['1–5', '6–10', '11–25', '26–50', '50+']}
              />
            </Field>
            <Field label="How quickly do you usually respond to new leads?" required>
              <Select
                id="response_speed"
                value={data.response_speed}
                onChange={set('response_speed')}
                error={errors.response_speed}
                options={[
                  'Within 5 minutes',
                  'Within 30 minutes',
                  'Within a few hours',
                  'Same day',
                  'Next day',
                  'It depends / inconsistent',
                ]}
              />
            </Field>
            <Field label="What happens to enquiries that come in after hours or on weekends?" required>
              <Textarea
                id="after_hours"
                value={data.after_hours}
                onChange={set('after_hours')}
                placeholder="Describe what happens to leads outside business hours."
                error={errors.after_hours}
              />
            </Field>
            <Field label="What is your biggest lead follow-up problem right now?" required>
              <CheckboxGroup
                id="biggest_problem"
                value={data.biggest_problem}
                onChange={setCheck('biggest_problem')}
                error={errors.biggest_problem}
                options={[
                  'Leads come in after hours',
                  'We respond too slowly',
                  'Missed calls are not followed up properly',
                  'Team is too busy to qualify leads',
                  'Lead notes are messy or incomplete',
                  'Customers ask the same questions repeatedly',
                  'Appointments or callbacks are not tracked properly',
                  'We are paying for leads but not converting enough',
                  'Other',
                ]}
              />
            </Field>
          </StepCard>
        )}

        {/* ── Step 4: FlowPilot Goals ──────────────────────────────────────── */}
        {step === 3 && (
          <StepCard number={4} title="What You Want FlowPilot To Help With">
            <Field label="What would you like FlowPilot to do first?" required>
              <CheckboxGroup
                id="flowpilot_actions"
                value={data.flowpilot_actions}
                onChange={setCheck('flowpilot_actions')}
                error={errors.flowpilot_actions}
                options={[
                  'Call new leads',
                  'Send SMS follow-up',
                  'Send email follow-up',
                  'Qualify customer interest',
                  'Answer basic product or service questions',
                  'Capture appointment or callback intent',
                  'Book appointments or test drives',
                  'Update CRM / Google Sheet / Airtable',
                  'Send my team a summary',
                  'Create follow-up tasks',
                  'Monitor workflow issues',
                ]}
              />
            </Field>
            <Field label="Do you want the AI assistant to answer product, service, or inventory questions?" required>
              <Select
                id="answer_product_questions"
                value={data.answer_product_questions}
                onChange={set('answer_product_questions')}
                error={errors.answer_product_questions}
                options={[
                  'Yes',
                  'No',
                  'Maybe, but I want to review what it can say first',
                ]}
              />
            </Field>
            <Field label="Where is your product, service, or inventory information currently stored?" helper="Optional — select all that apply.">
              <CheckboxGroup
                id="data_location"
                value={data.data_location}
                onChange={setCheck('data_location')}
                options={[
                  'Website',
                  'Google Sheet',
                  'Airtable',
                  'CRM',
                  'Inventory system',
                  'PDF / document',
                  'Manually maintained list',
                  'Not sure',
                  'Other',
                ]}
              />
            </Field>
            <Field
              label="What questions do customers commonly ask before booking or buying?"
              required
              helper="e.g. availability, price, service area, appointment times, vehicle details, quote requirements."
            >
              <Textarea
                id="common_questions"
                value={data.common_questions}
                onChange={set('common_questions')}
                placeholder="Examples: availability, price, service area, appointment times, vehicle details, quote requirements, inclusions, timelines, finance, or next steps."
                error={errors.common_questions}
                rows={5}
              />
            </Field>
          </StepCard>
        )}

        {/* ── Step 5: Appointments & Handover ─────────────────────────────── */}
        {step === 4 && (
          <StepCard number={5} title="Appointments, Callbacks, and Handover">
            <Field label="Do you currently book appointments, test drives, consultations, or callbacks?" required>
              <Select
                id="books_appointments"
                value={data.books_appointments}
                onChange={set('books_appointments')}
                error={errors.books_appointments}
                options={['Yes', 'No', 'Sometimes']}
              />
            </Field>
            <Field label="What should happen when a lead is ready to book or speak to someone?" required>
              <Select
                id="ready_to_book"
                value={data.ready_to_book}
                onChange={set('ready_to_book')}
                error={errors.ready_to_book}
                options={[
                  'AI should book directly if availability is known',
                  'AI should request a preferred time and have our team confirm',
                  'AI should create a callback task',
                  'AI should send the lead summary only',
                  'Not sure yet',
                ]}
              />
            </Field>
            <Field
              label="Who should receive lead summaries and alerts?"
              required
              helper="Include name, role, and email if known."
            >
              <Input
                id="alert_recipients"
                value={data.alert_recipients}
                onChange={set('alert_recipients')}
                placeholder="e.g. Sarah (Sales Manager) — sarah@yourbusiness.com.au"
                error={errors.alert_recipients}
              />
            </Field>
            <Field label="Where do you want lead updates stored?" required>
              <Select
                id="lead_updates_location"
                value={data.lead_updates_location}
                onChange={set('lead_updates_location')}
                error={errors.lead_updates_location}
                options={[
                  'Google Sheet',
                  'Airtable',
                  'Existing CRM',
                  'Email only for now',
                  'Not sure',
                ]}
              />
            </Field>
            {data.lead_updates_location === 'Existing CRM' && (
              <Field label="Which CRM do you use?" helper="Optional — helps us scope the integration.">
                <Input
                  id="crm_name"
                  value={data.crm_name}
                  onChange={set('crm_name')}
                  placeholder="e.g. HubSpot, Salesforce, REX, Zoho, DealerSocket"
                  error={errors.crm_name}
                />
              </Field>
            )}
          </StepCard>
        )}

        {/* ── Step 6: Pilot Readiness ──────────────────────────────────────── */}
        {step === 5 && (
          <StepCard number={6} title="Pilot Readiness">
            <Field label="Are you comfortable testing an AI-assisted lead follow-up system as part of a pilot?" required>
              <Select
                id="comfortable_with_pilot"
                value={data.comfortable_with_pilot}
                onChange={set('comfortable_with_pilot')}
                error={errors.comfortable_with_pilot}
                options={[
                  'Yes',
                  'Yes, but I want to approve scripts first',
                  'Maybe, I need more information',
                  'No',
                ]}
              />
            </Field>
            <Field label="Are your leads people who have enquired, opted in, or requested contact from your business?" required>
              <Select
                id="leads_opted_in"
                value={data.leads_opted_in}
                onChange={set('leads_opted_in')}
                error={errors.leads_opted_in}
                options={['Yes', 'Mostly yes', 'Not sure', 'No']}
              />
            </Field>
            <Field label="Are you happy for the AI script, follow-up rules, and escalation rules to be reviewed and approved before launch?" required>
              <Select
                id="scripts_approved"
                value={data.scripts_approved}
                onChange={set('scripts_approved')}
                error={errors.scripts_approved}
                options={['Yes', 'No', 'I need more information']}
              />
            </Field>
            <Field
              label="What should the AI assistant never say, promise, or do?"
              required
              helper="This is used to set guardrails before go-live."
            >
              <Textarea
                id="never_say"
                value={data.never_say}
                onChange={set('never_say')}
                placeholder="Examples: do not offer discounts, do not confirm availability unless checked, do not provide finance advice, do not guarantee same-day service."
                error={errors.never_say}
                rows={5}
              />
            </Field>
          </StepCard>
        )}

        {/* ── Step 7: Budget & Timing ──────────────────────────────────────── */}
        {step === 6 && (
          <StepCard number={7} title="Budget and Timing">
            <Field label="The pilot price is $1,500 setup + $600/month. Is this within your current budget if FlowPilot is a good fit?" required>
              <Select
                id="budget_fit"
                value={data.budget_fit}
                onChange={set('budget_fit')}
                error={errors.budget_fit}
                options={[
                  'Yes',
                  'Yes, but I would like to discuss scope first',
                  'Maybe, depending on what is included',
                  'Not right now',
                ]}
              />
            </Field>
            <Field label="When would you like to start?" required>
              <Select
                id="start_when"
                value={data.start_when}
                onChange={set('start_when')}
                error={errors.start_when}
                options={[
                  'Immediately',
                  'Within 2 weeks',
                  'Within 30 days',
                  'Later',
                  'Just exploring',
                ]}
              />
            </Field>
            <Field label="Anything else you would like us to know?" helper="Optional.">
              <Textarea
                id="anything_else"
                value={data.anything_else}
                onChange={set('anything_else')}
                placeholder="Any context, questions, or constraints we should be aware of."
                rows={4}
              />
            </Field>

            {/* Trust note */}
            <p className="text-xs text-muted border border-border rounded-lg px-4 py-3 leading-relaxed">
              Your information will only be used to assess pilot fit and prepare for a
              discovery call. FlowPilot will not contact your customers without your approval.
            </p>

            {submitError && (
              <p className="text-sm text-red-400 border border-red-500/30 rounded-lg px-4 py-3">
                {submitError}
              </p>
            )}
          </StepCard>
        )}

        {/* ── Navigation buttons ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 mt-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="text-sm text-body border border-border rounded-lg px-5 py-3 hover:border-primary/40 hover:text-heading transition"
            >
              ← Back
            </button>
          ) : (
            <Link
              to="/"
              className="text-sm text-muted hover:text-body transition"
            >
              ← Back to FlowPilot
            </Link>
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="bg-primary hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-sm transition"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="bg-primary hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-sm transition"
            >
              {submitting ? 'Submitting…' : 'Submit Pilot Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
