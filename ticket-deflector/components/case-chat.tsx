'use client';

import { useChatStore } from '@markprompt/react';
import { useCallback } from 'react';

import { CaseForm } from '@/components/case-form';
import { Chat } from '@/components/chat';

export function CaseChat() {
  const messages = useChatStore((state) => state.messages);

  const submitCase = useCallback(() => {}, [messages]);

  return (
    <div className="flex flex-col space-y-4">
      {/* <Chat onSubmitCase={submitCase} /> */}
      <CaseForm />
    </div>
  );
}
