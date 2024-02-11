import {
  type ChatMessage,
  type SubmitChatOptions,
  type FileSectionReference,
  submitChat as submitChatCore,
} from '@markprompt/core';

export const submitChat = async (
  messages: ChatMessage[],
  systemPrompt: string,
  model: SubmitChatOptions['model'],
  excludeFromInsights: SubmitChatOptions['excludeFromInsights'],
  doNotInjectContext: SubmitChatOptions['doNotInjectContext'],
  onContent: (content: string) => void,
  onReferences?: (references: FileSectionReference[]) => void,
) => {
  for await (const value of submitChatCore(
    messages,
    process.env.NEXT_PUBLIC_PROJECT_KEY!,
    {
      systemPrompt,
      model,
      excludeFromInsights,
      doNotInjectContext,
    },
  )) {
    if (value.content) {
      onContent(value.content);
    }

    if (value.references && onReferences) {
      onReferences(value.references);
    }
  }
};
