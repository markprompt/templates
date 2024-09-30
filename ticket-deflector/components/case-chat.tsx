/* eslint-disable @next/next/no-img-element */
'use client';

import { Markprompt, ChatProvider, ChatViewMessage } from '@markprompt/react';
import { useCallback, useState } from 'react';

import { type TicketGeneratedData, CaseForm } from '@/components/case-form';
import { Chat } from '@/components/chat';
import { CHAT_DEFAULT_PROMPTS, CHAT_WELCOME_MESSAGE } from '@/lib/constants';
import { generateTicketData } from '@/lib/ticket';

import { useChatForm } from './chat-form-context';
import { Icons } from './icons';
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
          assistantId: process.env.NEXT_PUBLIC_ASSISTANT_ID,
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
      {process.env.NEXT_PUBLIC_INCLUDE_SEARCH !== 'true' && (
        <Markprompt
          apiUrl={process.env.NEXT_PUBLIC_API_URL}
          projectKey={process.env.NEXT_PUBLIC_PROJECT_KEY!}
          branding={{ show: false }}
          chat={{
            assistantId: process.env.NEXT_PUBLIC_ASSISTANT_ID,
            defaultView: {
              message: CHAT_WELCOME_MESSAGE,
              prompts: CHAT_DEFAULT_PROMPTS,
            },
            avatars: {
              user: '/avatars/user.png',
              assistant: () => (
                <Icons.logo className="w-[18px] h-[18px] text-black ml-[-1.5px]" />
              ),
            },
          }}
          menu={{
            sections: [
              {
                entries: [
                  {
                    title: 'Documentation',
                    type: 'link',
                    href: 'https://markprompt.com/docs',
                    iconId: 'book',
                  },
                  {
                    title: 'Help center',
                    type: 'link',
                    href: 'https://markprompt.com/docs',
                    iconId: 'magnifying-glass',
                  },
                  {
                    title: 'Changelog',
                    type: 'link',
                    iconId: 'newspaper',
                    href: 'https://markprompt.com',
                    target: '_blank',
                  },
                  {
                    title: 'Contact sales',
                    type: 'link',
                    iconId: 'chat',
                    href: 'https://markprompt.com',
                    target: '_blank',
                  },
                ],
              },
              {
                heading: 'Follow us',
                entries: [
                  {
                    title: 'Twitter',
                    type: 'link',
                    href: 'https://twitter.com',
                    target: '_blank',
                  },
                  {
                    title: 'Discord',
                    type: 'link',
                    href: 'https://discord.com',
                    target: '_blank',
                  },
                  {
                    title: 'Status',
                    type: 'link',
                    href: 'https://markprompt.com',
                    target: '_blank',
                  },
                ],
              },
              {
                entries: [
                  {
                    title: 'Ask a question',
                    type: 'button',
                    iconId: 'sparkles',
                    action: 'chat',
                  },
                ],
              },
            ],
          }}
        />
      )}
    </>
  );
}
