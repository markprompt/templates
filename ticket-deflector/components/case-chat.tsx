'use client';

import { useChatStore } from '@markprompt/react';
import { useCallback, useEffect, useState } from 'react';

import { CaseForm, TicketInferredFormData } from '@/components/case-form';
import { Chat } from '@/components/chat';
import { getCategory, getSeverity, improve, summarize } from '@/lib/ticket';

export function CaseChat() {
  const [ticketData, setTicketData] = useState<
    TicketInferredFormData | undefined
  >(undefined);
  const messages = useChatStore((state) => state.messages);

  useEffect(() => {
    if (messages.length === 0) {
      setTicketData(undefined);
    }
  }, [messages]);

  const submitCase = useCallback(async () => {
    const firstMessage = messages?.[0]?.content;
    if (!firstMessage) {
      return;
    }

    const getCategoryPromise = getCategory(firstMessage);
    const getSeverityPromise = getSeverity(firstMessage);
    const summarizePromise = summarize(firstMessage);
    const improvePromise = improve(firstMessage);

    // Run the 3 tasks concurrently for faster ticket generation
    const [category, severity, subject, description] = await Promise.all([
      getCategoryPromise,
      getSeverityPromise,
      summarizePromise,
      improvePromise,
    ]);

    const transcript = messages
      .map((m) => `Sender: ${m.role}\n\n${m.content || 'No answer'}`)
      .join('\n\n===\n\n');

    const summaryWithTranscript = `${description}

--------------------------------------------------------------------------------

Full transcript:

${transcript}`;

    setTicketData({
      category,
      severity,
      subject,
      description: summaryWithTranscript,
    });

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight - 1100,
        behavior: 'smooth',
      });
    }, 200);
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4">
      <Chat onSubmitCase={submitCase} />
      {ticketData && <CaseForm {...ticketData} />}
    </div>
  );
}
