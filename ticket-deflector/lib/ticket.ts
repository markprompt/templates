import { submitChat } from '@/lib/common';
import { CATEGORIES } from '@/lib/constants';

const generate = async (
  message: string,
  instructions: string,
  onContent: (content: string) => void,
) => {
  return submitChat(
    [
      { role: 'user', content: instructions },
      { role: 'user', content: message },
    ],
    'You are an expert technical support engineer.',
    'gpt-3.5-turbo',
    true,
    true,
    onContent,
  );
};

export const summarize = async (
  message: string,
  onChunk: (chunk: string) => void,
) => {
  const instructions =
    'Below is message describing the issue I am having. Please summarize it in a single sentence to use for a subject matter.';
  return generate(message, instructions, onChunk);
};

export const getCategory = async (
  message: string,
  onChunk: (chunk: string) => void,
) => {
  const instructions = `Below is message describing an issue I am having. Based on this message, your task is to assign the message to one of the following categories. You should reply only with the category, and should not add any extra text to the response:\n\n${CATEGORIES.map(
    (c) => `- ${c}`,
  ).join('\n')}`;
  return generate(message, instructions, onChunk);
};

export const improve = async (
  message: string,
  onChunk: (chunk: string) => void,
) => {
  const instructions = `Below is message describing an issue I am having. Please rewrite it into a concise message with all available information and no typos. Also follow these instructions:

- Rewrite it so that a support agent can immediately see what is going wrong.
- Make sure to not omit any parts of the question.
- Rewrite it in English if my message is another language.
- Just rewrite it with no additional tags. For instance, don't include a "Subject:" line.`;
  return generate(message, instructions, onChunk);
};
