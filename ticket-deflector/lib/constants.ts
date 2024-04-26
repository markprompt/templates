import { SubmitChatOptions } from '@markprompt/core';

export const DEFAULT_SUBMIT_CHAT_OPTIONS: SubmitChatOptions = {
  model: 'gpt-4-turbo-preview',
  systemPrompt:
    process.env.NEXT_PUBLIC_CHAT_SYSTEM_PROMPT ||
    "You are an expert AI technical support assistant from Markprompt who excels at helping people solving their issues. When generating a case, do not mention anything about assistance, next step, or whether an agent will reach out. Just say 'Please complete the form submission below.'. When the user asks to speak to an agent, or is in clear distress over a critical issue, alwas favor calling a tool instead of generating a response.",
};

export const CATEGORIES = process.env.NEXT_PUBLIC_CATEGORIES?.split(',') ?? [
  'Accounts',
  'Frameworks',
  'Insights',
  'Integrations',
  'Payments',
  'Projects',
  'Security',
  'Teams',
];

export const PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS?.split(',') ?? [
  'Mobile App',
  'Desktop App',
  'Dashboard',
  'API',
];

export const SEVERITY = ['Low', 'Medium', 'High', 'Urgent', 'Critical'];

export const CHAT_WELCOME_MESSAGE =
  process.env.NEXT_PUBLIC_CHAT_WELCOME_MESSAGE ||
  "Hello, I'm an AI assistant from Acme";

export const CHAT_DEFAULT_PROMPTS =
  process.env.NEXT_PUBLIC_CHAT_DEFAULT_PROMPTS?.split(',') || [
    'What is Markprompt?',
    'How do I setup the React component?',
    'Do you have a REST API?',
  ];
