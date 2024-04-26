import { ChatViewMessage } from '@markprompt/react';

import { TicketGeneratedData } from '@/components/case-form';
import { submitChat } from '@/lib/common';
import { CATEGORIES, SEVERITY } from '@/lib/constants';

const generate = async (
  messages: ChatViewMessage[],
  instructions: string,
  systemPrompt: string,
) => {
  let content = '';
  await submitChat(
    [
      ...messages
        .filter(
          (m) =>
            (m.role === 'user' || m.role === 'assistant') &&
            m.content &&
            m.content.length > 0,
        )
        .map((m) => ({
          content: m.content || '',
          role: m.role as 'user' | 'assistant',
        })),
      { role: 'user', content: instructions },
    ],
    systemPrompt,
    'gpt-3.5-turbo',
    true,
    true,
    false,
    (c) => (content = c),
  );
  return content;
};

export const summarize = async (messages: ChatViewMessage[]) => {
  const instructions =
    'Above is a conversation between a customer and an AI. Please summarize it in a single sentence to use for a subject matter. Do not add surrounding quotes or any other content, such as a "Subject" prefix. Subject matter:';
  return generate(
    messages,
    instructions,
    'You are a customer support agent, expert at summarization.',
  );
};

export const getCategory = async (messages: ChatViewMessage[]) => {
  const instructions = `Above is a conversation between a customer and an AI. Based on this message, your task is to assign the conversation to one of the following categories. You should reply only with the category, and should not add any extra text to the response:\n\n${CATEGORIES.map(
    (c) => `- ${c}`,
  ).join('\n')}`;
  return generate(
    messages,
    instructions,
    'You are a customer support agent, expert at categorization.',
  );
};

export const getSeverity = async (messages: ChatViewMessage[]) => {
  const instructions = `Above is a conversation between a customer and an AI. Based on this message, your task is to assign the conversation to one of the following severity levels. Severity 1 is highest. You should reply only with the severity level, and should not add any extra text to the response:\n\n${SEVERITY.map(
    (c) => `- ${c}`,
  ).join('\n')}`;
  return generate(
    messages,
    instructions,
    'You are a customer support agent, expert at categorization.',
  );
};

export const improve = async (messages: ChatViewMessage[]) => {
  const instructions = `Above is a conversation between a customer and an AI. Please rewrite it into a concise message with all available information and no typos. Also follow these instructions:

- Rewrite it so that a support agent can immediately see what is going on.
- Make sure to not omit any parts of the question.
- Rewrite it in English if the conversation is in another language.
- Just rewrite it with no additional tags. For instance, don't include a "Subject:" line.`;
  return generate(messages, instructions, 'You are a customer support agent.');
};

export const generateTicketData = async (
  messages: ChatViewMessage[],
): Promise<TicketGeneratedData | undefined> => {
  const firstMessage = messages?.[0]?.content;
  if (!firstMessage) {
    return;
  }

  const getCategoryPromise = getCategory(messages);
  const getSeverityPromise = getSeverity(messages);
  const summarizePromise = summarize(messages);
  const improvePromise = improve(messages);

  // Run the 4 tasks concurrently for faster ticket generation
  const [category, severity, subject, description] = await Promise.all([
    getCategoryPromise,
    getSeverityPromise,
    summarizePromise,
    improvePromise,
  ]);

  const transcript = messages
    .filter((m) => !m.tool_calls)
    .map((m) => `${m.role}:${m.content || 'No answer'}`)
    .join(`\n\n${'-'.repeat(80)}\n\n`);

  return {
    category,
    severity,
    subject,
    description: `${description}\n\n${'='.repeat(80)}\nFull transcript:\n\n${transcript}`,
  };
};
