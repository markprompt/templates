'use client';

import { ChatViewMessage, useChatStore, useFeedback } from '@markprompt/react';
import { uniqBy } from 'lodash';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

import { Icons } from './icons';

interface MessageActionsProps extends React.ComponentProps<'div'> {
  message: ChatViewMessage;
}

export function MessageActions({
  message,
  className,
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
    return uniqBy(message.references || [], (r) => r.file.path);
  }, [message.references]);

  return (
    <div className={cn('flex flex-row', className)} {...props}>
      <div className="flex-grow pt-1">
        {uniqueReferences.length > 0 && (
          <>
            <h4 className="text-sm font-semibold">References</h4>
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
      <div className="flex-none flex flex-row items-center space-x-1">
        <Button
          variant="ghost"
          className={cn('text-muted-foreground group', {
            'bg-neutral-100 text-neutral-900': vote === '1',
          })}
          size="icon"
          onClick={() => onVote('1')}
        >
          <Icons.thumbUp
            strokeWidth={1.8}
            className="w-[18px] h-[18px] group-hover:-rotate-12 transition transform group-hover:translate-y-[-2px]"
          />
          <span className="sr-only">Thumb up</span>
        </Button>
        <Button
          variant="ghost"
          className={cn('text-muted-foreground group', {
            'bg-neutral-100 text-neutral-900': vote === '-1',
          })}
          size="icon"
          onClick={() => onVote('-1')}
        >
          <Icons.thumbDown
            strokeWidth={1.8}
            className="w-[18px] h-[18px] group-hover:-rotate-12 group-hover:translate-y-[2px] transition transform"
          />
          <span className="sr-only">Thumb down</span>
        </Button>
        <Button
          variant="ghost"
          className="text-muted-foreground"
          size="icon"
          onClick={onCopy}
        >
          {isCopied ? (
            <Icons.check strokeWidth={1.8} className="w-[18px] h-[18px]" />
          ) : (
            <Icons.copy strokeWidth={1.8} className="w-[18px] h-[18px]" />
          )}
          <span className="sr-only">Copy message</span>
        </Button>
      </div>
    </div>
  );
}
