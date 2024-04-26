import type { ChatMessage, FileSectionReference } from '@markprompt/core';

import { submitChat } from '@/lib/common';

import { DEFAULT_SUBMIT_CHAT_OPTIONS } from './constants';

export const generateChat = async (
  messages: ChatMessage[],
  onContent: (content: string) => void,
  onReferences: (references: FileSectionReference[]) => void,
) => {
  return submitChat(
    messages,
    DEFAULT_SUBMIT_CHAT_OPTIONS.systemPrompt!,
    DEFAULT_SUBMIT_CHAT_OPTIONS.model,
    false,
    false,
    true,
    onContent,
    onReferences,
  );
};
