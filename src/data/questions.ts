import type { Question } from '@/types/quiz'

export const questions: Question[] = [
  {
    question: 'What is the primary focus of transitioning from experimentation to implementation of AI in financial practices?',
    answers: [
      'Creating sporadic AI usage',
      'Developing consistent workflows',
      'Enhancing trial and error methods',
    ],
    correct: 1,
    explanation:
      'Moving from experimentation to implementation means establishing repeatable, consistent workflows that integrate AI reliably into day-to-day financial processes.',
  },
  {
    question: 'Which of the following best describes a key benefit of AI-assisted financial analysis?',
    answers: [
      'Eliminating the need for human oversight',
      'Processing large datasets faster with reduced manual effort',
      'Replacing regulatory compliance requirements',
    ],
    correct: 1,
    explanation:
      'AI excels at processing and synthesising large volumes of data rapidly, freeing advisers to focus on higher-value client interactions while reducing manual data work.',
  },
  {
    question: 'When integrating AI tools into client-facing workflows, what is the most important consideration?',
    answers: [
      'Using the most advanced model available',
      'Ensuring outputs are reviewed and validated by a qualified professional',
      'Automating all client communications',
    ],
    correct: 1,
    explanation:
      'AI outputs must always be reviewed by a qualified professional before reaching clients. Accuracy, compliance, and client trust depend on human accountability.',
  },
  {
    question: "What does 'prompt engineering' refer to in the context of AI tools?",
    answers: [
      'Writing code to build AI models',
      'Crafting inputs to guide AI outputs effectively',
      'Designing the visual interface of an AI product',
    ],
    correct: 1,
    explanation:
      'Prompt engineering is the practice of structuring your questions and instructions to an AI system to obtain more accurate, relevant, and useful responses.',
  },
  {
    question: 'Which risk is most associated with relying solely on AI-generated financial advice without human review?',
    answers: [
      'Increased processing speed',
      'Model hallucinations producing incorrect information',
      'Improved regulatory compliance',
    ],
    correct: 1,
    explanation:
      "AI models can 'hallucinate' — generating plausible-sounding but factually incorrect content. Human review is essential to catch these errors before they reach clients.",
  },
  {
    question: 'How should financial professionals approach data privacy when using AI tools?',
    answers: [
      'Share all client data freely to improve AI accuracy',
      'Anonymise or avoid inputting sensitive client information into third-party AI tools',
      'Use AI tools only for internal reporting',
    ],
    correct: 1,
    explanation:
      'Sensitive client data must be protected. Best practice is to anonymise data or avoid inputting personally identifiable information into AI tools not covered by appropriate data agreements.',
  },
  {
    question: "What is a 'Continuing Professional Development (CPD)' activity in the context of AI adoption?",
    answers: [
      'A one-time onboarding session for new software',
      'Ongoing structured learning to build and maintain AI competency',
      'A government-mandated AI certification exam',
    ],
    correct: 1,
    explanation:
      'CPD in AI adoption means continuously updating your skills and knowledge as tools evolve — through structured activities such as courses, workshops, reading, and reflective practice.',
  },
  {
    question: 'Which statement best reflects responsible AI use in financial services?',
    answers: [
      'AI should make all final decisions to remove human bias',
      'AI is a tool that augments professional judgement, not a replacement for it',
      'AI adoption removes the need for ongoing training',
    ],
    correct: 1,
    explanation:
      'AI is most effective as an augmentation tool — enhancing the speed and quality of professional decision-making while keeping qualified humans accountable for all final decisions.',
  },
]
