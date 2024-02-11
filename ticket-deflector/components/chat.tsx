'use client';

import { useChatStore } from '@markprompt/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { ChatScrollAnchor } from './chat-scroll-anchor';
import { Messages } from './messages';
import { PromptForm } from './prompt-form';
import { Button } from './ui/button';

export function Chat() {
  const messages = useChatStore((state) => state.messages);
  const selectConversation = useChatStore((state) => state.selectConversation);

  const messageState = useChatStore(
    (state) => state.messages[state.messages.length - 1]?.state,
  );

  const isChatting = messages.length > 0;

  return (
    <Card>
      <div className="flex flex-col flex-no-wrap overflow-y-auto">
        <CardHeader
          className={cn('space-y-1 flex-shrink-0 min-w-0 min-h-0', {
            'shadow-subtle': isChatting,
          })}
        >
          <div className="flex flex-row items-center space-x-2">
            <CardTitle className="flex-grow text-2xl">
              {isChatting ? 'Support chat' : 'What is your issue?'}
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              className={cn('transition', {
                'opacity-0 pointer-events-none': !isChatting,
                'opacity-100': isChatting,
              })}
              onClick={() => {
                selectConversation(undefined);
              }}
            >
              New chat
            </Button>
          </div>
          {!isChatting && (
            <CardDescription>
              Describe the issue your are having
            </CardDescription>
          )}
        </CardHeader>
        <div
          data-state={isChatting ? 'expanded' : 'collapsed'}
          className="data-[state=collapsed]:animate-accordion-up data-[state=expanded]:animate-accordion-down flex flex-col flex-no-wrap overflow-y-auto [--radix-accordion-content-height:480px]"
        >
          <CardContent className="flex-1 min-w-0 grid gap-4 relative pt-4">
            <Messages />
            <div className="h-8" />
            <ChatScrollAnchor
              trackVisibility={
                messageState === 'preload' ||
                messageState === 'streaming-answer'
              }
            />
          </CardContent>
        </div>
        <CardContent
          className={cn({
            'pt-6 shadow-subtle-up': isChatting,
          })}
        >
          <div className="flex-shrink-0 min-w-0 min-h-0">
            <PromptForm
              expanded={!isChatting}
              placeholder={
                isChatting ? 'Send a message' : 'I have an issue with...'
              }
              cta="Ask AI"
            />
          </div>
        </CardContent>
      </div>
      {isChatting && (
        <CardFooter className="flex flex-row items-center space-x-4">
          <p className="flex-grow text-sm text-muted-foreground text-right">
            Still need help?
          </p>
          <Button size="sm">Create case</Button>
        </CardFooter>
      )}
    </Card>
  );
}
