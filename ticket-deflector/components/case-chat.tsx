'use client';

import { Markprompt, ChatProvider, ChatViewMessage } from '@markprompt/react';
import { useCallback, useState } from 'react';

import { type TicketGeneratedData, CaseForm } from '@/components/case-form';
import { Chat } from '@/components/chat';
import { DEFAULT_SUBMIT_CHAT_OPTIONS } from '@/lib/constants';
import { generateTicketData } from '@/lib/ticket';

import { useChatForm } from './chat-form-context';
import { Button } from './ui/button';

export function CaseChat() {
  const { setIsCreatingCase } = useChatForm();
  const [messages, setMessages] = useState<ChatViewMessage[]>([]);
  const [ticketData, setTicketData] = useState<TicketGeneratedData | undefined>(
    undefined,
  );

  const submitCase = useCallback(async () => {
    setIsCreatingCase(true);
    const ticketData = await generateTicketData(messages);
    setTicketData(ticketData);
    setIsCreatingCase(false);

    setTimeout(() => {
      // Scroll down to ticket form
      window.scrollTo({
        top: document.body.scrollHeight - 1150,
        behavior: 'smooth',
      });
    }, 500);
  }, [messages, setIsCreatingCase]);

  return (
    <>
      <ChatProvider
        apiUrl={process.env.NEXT_PUBLIC_API_URL}
        chatOptions={{
          model: 'gpt-4-turbo-preview',
          systemPrompt:
            process.env.NEXT_PUBLIC_CHAT_SYSTEM_PROMPT ||
            DEFAULT_SUBMIT_CHAT_OPTIONS.systemPrompt,
          tool_choice: 'auto',
          tools: [
            {
              tool: {
                type: 'function',
                function: {
                  name: 'createCase',
                  description:
                    'Creates a case automatically when the user asks to create a ticket/case or when they ask to speak to someone.',
                  parameters: {
                    type: 'object',
                    properties: {},
                  },
                },
              },
              call: async () => {
                submitCase();
                return 'Generating case details for you.';
              },
              requireConfirmation: true,
            },
          ],
          ToolCallsConfirmation: ({
            toolCalls,
            toolCallsStatus,
            confirmToolCalls,
          }) => {
            const toolCall = toolCalls[0];
            if (!toolCall) {
              return <></>;
            }
            const status = toolCallsStatus[toolCall.id]?.status;
            return (
              <div className="p-3 border border-dashed border-border rounded-md flex flex-col space-y-4 items-start">
                <p className="text-sm">
                  Please confirm that you want to submit a case:
                </p>
                <Button
                  size="sm"
                  onClick={confirmToolCalls}
                  disabled={status === 'done'}
                >
                  Confirm
                </Button>
              </div>
            );
          },
        }}
        projectKey={process.env.NEXT_PUBLIC_PROJECT_KEY!}
      >
        <div className="flex flex-col space-y-4">
          <Chat
            onNewMessages={setMessages}
            onSubmitCase={submitCase}
            onNewChat={() => setTicketData(undefined)}
          />
          {ticketData && <CaseForm {...ticketData} />}
        </div>
      </ChatProvider>
      <Markprompt projectKey={process.env.NEXT_PUBLIC_PROJECT_KEY!}>
        Hello
      </Markprompt>
    </>
  );
}
