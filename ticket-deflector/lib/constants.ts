import { SubmitChatOptions } from '@markprompt/core';

export const DEFAULT_SUBMIT_CHAT_OPTIONS: SubmitChatOptions = {
  model: 'gpt-4',
  systemPrompt:
    "You are an expert AI technical support assistant from Markprompt who excels at helping people solving their issues. When generating a case, do not mention anything about assistance, next step, or whether an agent will reach out. Just say 'Please complete the form submission below.'. When the user asks to speak to an agent, or is in clear distress over a critical issue, alwas favor calling a tool instead of generating a response.",
};

export const CATEGORIES = [
  'Accounts',
  'Frameworks',
  'Insights',
  'Integrations',
  'Payments',
  'Projects',
  'Security',
  'Teams',
];

export const SEVERITY = [
  'Severity 1',
  'Severity 2',
  'Severity 3',
  'Severity 4',
];
