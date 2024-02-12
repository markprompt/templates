'use client';

import { useChatStore } from '@markprompt/react';
import { useState } from 'react';

import { ChatScrollAnchor } from '@/components/chat-scroll-anchor';
import { Icons } from '@/components/icons';
import { Messages } from '@/components/messages';
import { PromptForm } from '@/components/prompt-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CaseCreationButton = ({ onSubmitCase }: { onSubmitCase: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Button
      size="sm"
      disabled={isSubmitting}
      onClick={async () => {
        setIsSubmitting(true);
        await onSubmitCase();
        setIsSubmitting(false);
      }}
    >
      {isSubmitting && <Icons.spinner className="w-4 h-4 animate-spin mr-2" />}
      Create case
    </Button>
  );
};

export function Chat({ onSubmitCase }: { onSubmitCase: () => void }) {
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
            'shadow-subtle py-4': isChatting,
          })}
        >
          <div className="flex flex-row items-center space-x-2">
            <CardTitle
              className={cn('flex-grow', {
                'text-xl': isChatting,
                'text-2xl': !isChatting,
              })}
            >
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
          className="data-[state=collapsed]:animate-accordion-up data-[state=expanded]:animate-accordion-down flex flex-col flex-no-wrap overflow-y-auto [--radix-accordion-content-height:540px]"
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
            'py-4 shadow-subtle-up': isChatting,
          })}
        >
          <div className="flex-shrink-0 min-w-0 min-h-0">
            <PromptForm
              expanded={!isChatting}
              placeholder={
                isChatting ? 'Send a message' : 'I have an issue with...'
              }
              cta={isChatting ? 'Send' : 'Ask AI'}
            />
          </div>
          {!isChatting && (
            <p className="mt-4 text-xs text-muted-foreground -mb-3">
              Try to ask: how do I add Markprompt to my website?
            </p>
          )}
        </CardContent>
      </div>
      {isChatting && (
        <CardFooter className="flex flex-row items-center space-x-4 py-4">
          <p className="flex-grow text-sm text-muted-foreground text-right">
            Still need help?
          </p>
          <CaseCreationButton onSubmitCase={onSubmitCase} />
        </CardFooter>
      )}
    </Card>
  );
}
