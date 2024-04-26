import { ChatViewMessage } from '@markprompt/react';

import { TicketGeneratedData } from '@/components/case-form';
import { submitChat } from '@/lib/common';
import { CATEGORIES, PRODUCTS, SEVERITY } from '@/lib/constants';

const generate = async (messages: ChatViewMessage[], systemPrompt: string) => {
  let content = '';
  const conversation = messages
    .filter(
      (m) =>
        (m.role === 'user' || m.role === 'assistant') &&
        m.content &&
        m.content.length > 0,
    )
    .map((m) => {
      return `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`;
    })
    .join('\n\n------------------------\n\n');

  await submitChat(
    [
      {
        role: 'user',
        content: `Customer support conversation:\n\n${conversation}`,
      },
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
  const systemPrompt = `- Prompt: Given the transcript of a customer support conversation, generate a concise and relevant email subject line that captures the essence of the issue discussed.
- Output: A single string that is a succinct and informative email subject line, which reflects the main issue or resolution discussed in the conversation.
- Constraints:
  - The subject line should be no more than 75 characters long.
  - It should be specific enough to inform the recipient of the email about the key issue discussed.
  - Avoid jargon and keep the language simple and direct. Do not decorate the output, do not add quotes or prefixes.`;
  const text = await generate(messages, systemPrompt);
  return text
    .trim()
    .replace(/^["'](.*)["']$/, '$1')
    .replace(/^subject:/gi, '')
    .trim();
};

export const getCategory = async (
  messages: ChatViewMessage[],
  categories: string[],
) => {
  const c = categories.map((c) => `- ${c}`).join('\n');
  return generate(
    messages,
    `- Prompt: Given the transcript of a customer support conversation, assign the conversation to one of the following categories. You should reply only with the category, and should not add any extra text to the response:\n\n${c}`,
  );
};

export const getSeverity = async (messages: ChatViewMessage[]) => {
  const severities = SEVERITY.map((c) => `- ${c}`).join('\n');
  return generate(
    messages,
    `Prompt: Given the transcript of a customer support conversation, assign the conversation to one of the following severity levels. You should reply only with the severity level, and should not add any extra text to the response:\n\n${severities}`,
  );
};

export const improve = async (messages: ChatViewMessage[]) => {
  return generate(
    messages,
    `Prompt: Given the transcript of a customer support conversation, rewrite it into a concise message with all available information and no typos. Also follow these instructions:

  - Rewrite it so that a support agent can immediately see what is going on.
  - Make sure to not omit any parts of the question.
  - Rewrite it in English if the conversation is in another language.
  - Just rewrite it with no additional tags. For instance, don't include a "Subject:" line.`,
  );
};

export const generateTicketData = async (
  messages: ChatViewMessage[],
): Promise<TicketGeneratedData | undefined> => {
  const firstMessage = messages?.[0]?.content;
  if (!firstMessage) {
    return;
  }

  const getCategoryPromise = getCategory(messages, CATEGORIES);
  const getProductPromise = getCategory(messages, PRODUCTS);
  const getSeverityPromise = getSeverity(messages);
  const summarizePromise = summarize(messages);
  const improvePromise = improve(messages);

  // Run the 4 tasks concurrently for faster ticket generation
  const [category, product, severity, subject, description] = await Promise.all(
    [
      getCategoryPromise,
      getProductPromise,
      getSeverityPromise,
      summarizePromise,
      improvePromise,
    ],
  );

  const transcript = messages
    .filter((m) => !m.tool_calls)
    .map(
      (m) =>
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content || 'No answer'}`,
    )
    .join(`\n${'-'.repeat(40)}\n`);

  return {
    category,
    product,
    severity,
    subject,
    description: `${description}\n\n----- FULL TRANSCRIPT -----\n\n${transcript}`,
  };
};
