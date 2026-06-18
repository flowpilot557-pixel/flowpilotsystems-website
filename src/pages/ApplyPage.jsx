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
  business_location: '',
  // Step 2
  business_type: '',
  services_products: '',
  // Step 3
  lead_sources: [],
  weekly_enquiries: '',
  response_time: '',
  after_hours_process: '',
  lead_followup_problems: [],
  // Step 4
  desired_flowpilot_help: [],
  wants_ai_product_answers: '',
  data_storage_location: [],
  common_customer_questions: '',
  // Step 5
  books_appointments: '',
  booking_preference: '',
  alert_recipients: '',
  lead_update_destination: '',
  crm_name: '',
  // Step 6
  pilot_comfort: '',
  lead_consent_status: '',
  approval_comfort: '',
  ai_restrictions: '',
  // Step 7
  budget_fit: '',
  start_timing: '',
  additional_notes: '',
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
    if (!data.business_location.trim()) errs.business_location = 'Required'
  }
  if (step === 1) {
    if (!data.business_type) errs.business_type = 'Required'
    if (!data.services_products.trim()) errs.services_products = 'Required'
  }
  if (step === 2) {
    if (!data.lead_sources.length) errs.lead_sources = 'Select at least one'
    if (!data.weekly_enquiries) errs.weekly_enquiries = 'Required'
    if (!data.response_time) errs.response_time = 'Required'
    if (!data.after_hours_process.trim()) errs.after_hours_process = 'Required'
    if (!data.lead_followup_problems.length) errs.lead_followup_problems = 'Select at least one'
  }
  if (step === 3) {
    if (!data.desired_flowpilot_help.length) errs.desired_flowpilot_help = 'Select at least one'
    if (!data.wants_ai_product_answers) errs.wants_ai_product_answers = 'Required'
    if (!data.common_customer_questions.trim()) errs.common_customer_questions = 'Required'
  }
  if (step === 4) {
    if (!data.books_appointments) errs.books_appointments = 'Required'
    if (!data.booking_preference) errs.booking_preference = 'Required'
    if (!data.alert_recipients.trim()) errs.alert_recipients = 'Required'
    if (!data.lead_update_destination) errs.lead_update_destination = 'Required'
    if (data.lead_update_destination === 'Existing CRM' && !data.crm_name.trim())
      errs.crm_name = 'Please enter your CRM name'
  }
  if (step === 5) {
    if (!data.pilot_comfort) errs.pilot_comfort = 'Required'
    if (!data.lead_consent_status) errs.lead_consent_status = 'Required'
    if (!data.approval_comfort) errs.approval_comfort = 'Required'
    if (!data.ai_restrictions.trim()) errs.ai_restrictions = 'Required'
  }
  if (step === 6) {
    if (!data.budget_fit) errs.budget_fit = 'Required'
    if (!data.start_timing) errs.start_timing = 'Required'
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
      const payload = { ...data, source: 'Website form' }
      console.log('[FlowPilot] Submitting payload:', payload)
      console.log("FlowPilot application payload:", payload)
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      console.log('[FlowPilot] n8n response:', json)
      if (json.success === true) {
        setSubmitted(true)
      } else {
        setSubmitError(
          'There was a problem submitting your application. Please try again or email us directly.'
        )
      }
    } catch (err) {
      console.error('[FlowPilot] Submission error:', err)
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
              <Input id="business_location" value={data.business_location} onChange={set('business_location')} placeholder="e.g. Melbourne, VIC or South East Queensland" error={errors.business_location} />
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
                id="services_products"
                value={data.services_products}
                onChange={set('services_products')}
                placeholder="Briefly describe your main services, products, or offers."
                error={errors.services_products}
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
                id="response_time"
                value={data.response_time}
                onChange={set('response_time')}
                error={errors.response_time}
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
                id="after_hours_process"
                value={data.after_hours_process}
                onChange={set('after_hours_process')}
                placeholder="Describe what happens to leads outside business hours."
                error={errors.after_hours_process}
              />
            </Field>
            <Field label="What is your biggest lead follow-up problem right now?" required>
              <CheckboxGroup
                id="lead_followup_problems"
                value={data.lead_followup_problems}
                onChange={setCheck('lead_followup_problems')}
                error={errors.lead_followup_problems}
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
                id="desired_flowpilot_help"
                value={data.desired_flowpilot_help}
                onChange={setCheck('desired_flowpilot_help')}
                error={errors.desired_flowpilot_help}
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
                id="wants_ai_product_answers"
                value={data.wants_ai_product_answers}
                onChange={set('wants_ai_product_answers')}
                error={errors.wants_ai_product_answers}
                options={[
                  'Yes',
                  'No',
                  'Maybe, but I want to review what it can say first',
                ]}
              />
            </Field>
            <Field label="Where is your product, service, or inventory information currently stored?" helper="Optional — select all that apply.">
              <CheckboxGroup
                id="data_storage_location"
                value={data.data_storage_location}
                onChange={setCheck('data_storage_location')}
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
                id="common_customer_questions"
                value={data.common_customer_questions}
                onChange={set('common_customer_questions')}
                placeholder="Examples: availability, price, service area, appointment times, vehicle details, quote requirements, inclusions, timelines, finance, or next steps."
                error={errors.common_customer_questions}
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
                id="booking_preference"
                value={data.booking_preference}
                onChange={set('booking_preference')}
                error={errors.booking_preference}
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
                id="lead_update_destination"
                value={data.lead_update_destination}
                onChange={set('lead_update_destination')}
                error={errors.lead_update_destination}
                options={[
                  'Google Sheet',
                  'Airtable',
                  'Existing CRM',
                  'Email only for now',
                  'Not sure',
                ]}
              />
            </Field>
            {data.lead_update_destination === 'Existing CRM' && (
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
                id="pilot_comfort"
                value={data.pilot_comfort}
                onChange={set('pilot_comfort')}
                error={errors.pilot_comfort}
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
                id="lead_consent_status"
                value={data.lead_consent_status}
                onChange={set('lead_consent_status')}
                error={errors.lead_consent_status}
                options={['Yes', 'Mostly yes', 'Not sure', 'No']}
              />
            </Field>
            <Field label="Are you happy for the AI script, follow-up rules, and escalation rules to be reviewed and approved before launch?" required>
              <Select
                id="approval_comfort"
                value={data.approval_comfort}
                onChange={set('approval_comfort')}
                error={errors.approval_comfort}
                options={['Yes', 'No', 'I need more information']}
              />
            </Field>
            <Field
              label="What should the AI assistant never say, promise, or do?"
              required
              helper="This is used to set guardrails before go-live."
            >
              <Textarea
                id="ai_restrictions"
                value={data.ai_restrictions}
                onChange={set('ai_restrictions')}
                placeholder="Examples: do not offer discounts, do not confirm availability unless checked, do not provide finance advice, do not guarantee same-day service."
                error={errors.ai_restrictions}
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
                id="start_timing"
                value={data.start_timing}
                onChange={set('start_timing')}
                error={errors.start_timing}
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
                id="additional_notes"
                value={data.additional_notes}
                onChange={set('additional_notes')}
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
