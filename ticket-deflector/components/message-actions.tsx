'use client';

import { ChatViewMessage, useChatStore, useFeedback } from '@markprompt/react';
import { uniqBy } from 'lodash';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

import { CSATPicker } from './csat-picker';
import { Icons } from './icons';

interface MessageActionsProps extends React.ComponentProps<'div'> {
  message: ChatViewMessage;
  threadId: string | undefined;
  isLast: boolean;
}

export function MessageActions({
  message,
  threadId,
  className,
  isLast,
  ...props
}: MessageActionsProps) {
  const projectKey = useChatStore((state) => state.projectKey);
  const { submitFeedback } = useFeedback({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    projectKey,
  });
  const [vote, setVote] = useState<'1' | '-1' | undefined>(undefined);
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = useCallback(() => {
    if (isCopied) return;
    toast.success('Copied to clipboard!');
    copyToClipboard(message.content || '');
  }, [isCopied, copyToClipboard, message.content]);

  const onVote = useCallback(
    (vote: '-1' | '1') => {
      setVote(vote);
      submitFeedback({ vote }, message.promptId);
      toast.success('Thank you!');
    },
    [setVote, submitFeedback, message.promptId],
  );

  const uniqueReferences = useMemo(() => {
    return uniqBy(message.references || [], (r) => r.file.path).slice(0, 5);
  }, [message.references]);

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <div className="flex flex-row items-start">
        <div className="flex-grow pt-1">
          {isLast && uniqueReferences.length > 0 && (
            <>
              <h4 className="mt-4 text-sm font-semibold">References</h4>
              <ul className="mt-3 flex flex-col gap-y-1 w-full justify-start items-start">
                {uniqueReferences.map((reference) => {
                  return (
                    <Link
                      className="text-sm border-b border-dashed border-border"
                      key={reference.file.path}
                      href={reference.file.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {reference.file.title}
                    </Link>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <div
          className={cn('flex-none flex flex-row items-center space-x-1', {
            'opacity-0 group-hover:opacity-100 transition': !isLast,
          })}
        >
          <Button
            variant="ghost"
            className={cn('text-stone-500 group/thumbup', {
              'bg-stone-100 text-stone-900': vote === '1',
            })}
            size="icon"
            onClick={() => onVote('1')}
          >
            <Icons.thumbUp
              strokeWidth={2}
              className="w-4 h-4 group-hover/thumbup:-rotate-12 transition transform group-hover/thumbup:translate-y-[-2px]"
            />
            <span className="sr-only">Thumb up</span>
          </Button>
          <Button
            variant="ghost"
            className={cn('text-stone-500 group/thumbdown', {
              'bg-stone-100 text-stone-900': vote === '-1',
            })}
            size="icon"
            onClick={() => onVote('-1')}
          >
            <Icons.thumbDown
              strokeWidth={2}
              className="w-4 h-4 group-hover/thumbdown:-rotate-12 group-hover/thumbdown:translate-y-[2px] transition transform"
            />
            <span className="sr-only">Thumb down</span>
          </Button>
          <Button
            variant="ghost"
            className="text-stone-500"
            size="icon"
            onClick={onCopy}
          >
            {isCopied ? (
              <Icons.check strokeWidth={2} className="w-4 h-4" />
            ) : (
              <Icons.copy strokeWidth={2} className="w-4 h-4" />
            )}
            <span className="sr-only">Copy message</span>
          </Button>
        </div>
      </div>
      {isLast && (
        <div className="csat-container">
          <CSATPicker threadId={threadId} className="mt-6" />
        </div>
      )}
    </div>
  );
}
