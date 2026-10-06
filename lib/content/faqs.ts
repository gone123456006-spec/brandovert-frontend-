export type Faq = { question: string; answer: string; points?: string[] };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        question: "How do I start a project with Brandovert?",
        answer: "Getting started takes three simple steps:",
        points: [
          "Reach out through the contact form, WhatsApp or a phone call.",
          "Join a free 45-minute discovery call so we can understand your goals, users and budget.",
          "Receive a written scope, timeline and fixed quote within 5 working days.",
          "Once you approve the proposal, we kick off with a planning workshop in the first week.",
        ],
      },
      {
        question: "Do you work with startups or only established businesses?",
        answer:
          "Both. About half our clients are early-stage founders building an MVP; the other half are established businesses modernising their software or growing online.",
      },
      {
        question: "Can you work with an existing codebase built by someone else?",
        answer:
          "Yes. We start with a paid code audit (usually one week) so we can give you an honest view of its condition before committing to timelines.",
      },
    ],
  },
  {
    title: "Pricing & contracts",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on scope. Every quote is fixed and itemised, so you know exactly what you are paying for. As a guide:",
        points: [
          "Marketing websites start around ₹75,000.",
          "Mobile apps start around ₹4,00,000.",
          "SaaS MVPs start around ₹6,00,000.",
          "Marketing and support retainers start around ₹40,000 per month.",
        ],
      },
      {
        question: "What are your payment terms?",
        answer:
          "For fixed-scope projects we typically split payment into milestones: 30% to start, then payments tied to delivered milestones. Retainers for marketing and support are billed monthly in advance.",
      },
      {
        question: "Will you sign an NDA?",
        answer:
          "Yes. We are happy to sign your NDA, or we can share ours, before you share any project details.",
      },
    ],
  },
  {
    title: "Delivery & ownership",
    items: [
      {
        question: "How long does a typical project take?",
        answer: "You will get a week-by-week timeline in your proposal. Typical durations are:",
        points: [
          "Websites: 4 to 10 weeks.",
          "Mobile apps: 8 to 16 weeks.",
          "SaaS MVPs: 10 to 24 weeks.",
        ],
      },
      {
        question: "Who owns the source code and designs?",
        answer:
          "You do. Code repositories, design files, domains and cloud accounts are set up in your name from the start, and all intellectual property transfers to you.",
      },
      {
        question: "How will I know how the project is going?",
        answer:
          "You get a shared project board, a weekly demo of working software and a dedicated project manager on WhatsApp or Slack.",
      },
    ],
  },
  {
    title: "Support & maintenance",
    items: [
      {
        question: "What happens after launch?",
        answer:
          "Every project includes 60 days of free bug-fix support. After that, you can move to a monthly maintenance plan or take over the code with your own team. We provide full documentation either way.",
      },
      {
        question: "What are your support response times?",
        answer:
          "On maintenance plans, critical issues get a response within 4 hours and standard issues within 1 working day. Exact SLAs are written into your contract.",
      },
    ],
  },
];

export const homeFaqs: Faq[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[0].items[2],
  faqGroups[1].items[0],
  faqGroups[1].items[1],
  faqGroups[2].items[0],
  faqGroups[2].items[1],
  faqGroups[2].items[2],
  faqGroups[3].items[0],
];
