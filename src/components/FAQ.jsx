import { useState } from 'react'
import FadeInSection from './FadeInSection'
import { SectionHeading } from './ui'

const FAQS = [
  {
    q: 'Does this replace my team?',
    a: 'No. FlowPilot handles the first-response and qualification step so your team focuses on conversations that are ready to move forward. Your team always receives a clear handover summary and remains in control of the customer relationship.',
  },
  {
    q: 'What is Hermes?',
    a: "Hermes is FlowPilot's AI reasoning and operational memory layer. It helps interpret lead data, apply your business rules consistently, generate handover summaries, and flag recurring workflow issues. Think of it as operational context that persists across your workflows — not a separate AI product.",
  },
  {
    q: 'What does FlowPilot remember?',
    a: "It can retain operational context including approved scripts, qualification rules, appointment logic, escalation preferences, common customer objections, and recurring workflow fixes. What is retained and how it's handled can be scoped during onboarding.",
  },
  {
    q: 'Can I approve the AI script first?',
    a: 'Yes. All scripts, qualification questions, and handover formats are reviewed and approved by you before the system goes live. Nothing runs without your sign-off.',
  },
  {
    q: 'Can it work with my current CRM?',
    a: "FlowPilot can connect to Airtable, Google Sheets, and common CRMs. If you're using a specific platform, we'll scope the integration during onboarding. Complex CRM integrations may require additional setup time.",
  },
  {
    q: 'Can FlowPilot answer customer questions about our products or services?',
    a: 'Yes. FlowPilot can be connected to approved business data such as inventory records, product lists, service catalogues, FAQs, Airtable, Google Sheets, CRM data, or other databases depending on the setup. This allows the AI assistant to answer common questions using the information you provide.',
  },
  {
    q: 'What if the customer asks something the AI does not know?',
    a: 'FlowPilot can be configured to avoid guessing. If a question is outside the approved knowledge base or confidence is low, the assistant can collect the question, flag it in the lead summary, and ask your team to follow up.',
  },
  {
    q: 'Can it work with live inventory?',
    a: 'Where access is available, FlowPilot can connect to inventory or product data so the assistant can reference current details such as availability, price, stock number, features, or service options. More complex integrations can be scoped separately.',
  },
  {
    q: 'Can it use SMS?',
    a: 'Yes. SMS follow-up is included via Twilio integration. Email notifications are also included. Voice calling (AI voice agent) is available depending on your use case.',
  },
  {
    q: "What happens if the AI can't answer?",
    a: "If FlowPilot can't confidently handle a response, it flags the lead for human follow-up and sends your team a notification. The system is designed to hand off, not guess.",
  },
  {
    q: 'How long does setup take?',
    a: 'Most setups are completed within 1–2 weeks from the scoping session. This includes workflow design, integration, testing, and onboarding.',
  },
  {
    q: 'Is this suitable if I only get a few leads?',
    a: "If you're receiving fewer than 5–10 leads per month, the ROI of an automated system may not be there yet. We'll discuss your lead volume during the discovery call and be honest about whether it's a good fit.",
  },
  {
    q: 'Do I need technical knowledge?',
    a: "No. FlowPilot is a done-for-you service. You don't need to build or configure anything yourself. You'll be walked through how it works and what to expect, but the technical setup is handled entirely by us.",
  },
  {
    q: 'Does the system improve automatically?',
    a: 'FlowPilot supports a human-reviewed improvement loop. The system flags outcomes, identifies patterns, and surfaces suggested refinements — but changes to scripts, rules, and workflows are reviewed and approved before being applied. It does not update itself without oversight.',
  },
  {
    q: "Can I update or change the AI's business rules?",
    a: 'Yes. During the pilot, business rules, qualification criteria, and scripts can be updated at any time. This is a collaborative process — your feedback is how the system gets better.',
  },
  {
    q: 'Can I review what the AI is using to make decisions?',
    a: "Yes. Operational memory, scripts, and qualification rules are visible and reviewable. During the pilot, we'll walk through what the system is using and why, and refine it based on real outcomes.",
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left py-5 text-heading font-semibold hover:text-primary transition"
      >
        <span>{faq.q}</span>
        <span
          className={`shrink-0 text-secondary transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-5 text-sm text-body leading-relaxed pr-8">{faq.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <FadeInSection as="section" id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Questions" center>
          Common questions answered.
        </SectionHeading>

        <div className="mt-12">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
