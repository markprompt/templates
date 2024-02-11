/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatMessage, submitChat } from '@markprompt/core';
import { clsx } from 'clsx';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Button } from '@/components/ui/Button';
import { TicketForm } from '@/components/ui/TicketForm';
import { DEFAULT_SUBMIT_CHAT_OPTIONS } from '@/lib/constants';
import { getCategory, improve, summarize } from '@/lib/ticket';

const inter = Inter({ subsets: ['latin'] });

type State = {
  currentMessage?: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
  streamedMessage?: string | null;
  generatingResponse?: boolean;
  generatingTicketInfo?: boolean;
  references?: any[];
  ticketInfo?: {
    product: 'platform' | 'mobile-app';
    problemArea: string;
    subject: string;
    description: string;
  };
};

export default function Home() {
  const [state, setState] = useState<State>({ messages: [] });

  const submitMessage = useCallback(async (message: string) => {
    setState((s) => ({
      ...s,
      streamedMessage: '',
      ticketInfo: undefined,
      generatingResponse: true,
    }));

    const messages: ChatMessage[] = [];

    messages.push({
      role: 'user',
      content: message,
    });

    for await (const value of submitChat(
      messages,
      process.env.NEXT_PUBLIC_PROJECT_KEY!,
      DEFAULT_SUBMIT_CHAT_OPTIONS,
    )) {
      if (value.content) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
        setState((s) => ({ ...s, streamedMessage: value.content }));
      }

      if (value.references) {
        setState((s) => ({ ...s, references: value.references }));

        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 200);
      }
    }

    setState((s) => ({
      ...s,
      messages: [
        ...(s.messages || []),
        { role: 'assistant', content: s.streamedMessage || '' },
      ],
      generatingResponse: false,
    }));
  }, []);

  const createTicket = useCallback(
    async (message: string) => {
      setState((s) => ({ ...s, generatingTicketInfo: true }));

      const getCategoryPromise = getCategory(message, (chunk) => {
        console.log('Got category', chunk);
      });

      const summarizePromise = summarize(message, (chunk) => {
        console.log('Got summary', chunk);
      });

      const improvePromise = improve(message, (chunk) => {
        console.log('Got improved', chunk);
      });

      // Run the 3 tasks concurrently for faster ticket generation
      const result = await Promise.all([
        getCategoryPromise,
        summarizePromise,
        improvePromise,
      ]);

      console.log('result', JSON.stringify(result, null, 2));

      // setState((s) => ({
      //   ...s,
      //   generatingTicketInfo: false,
      //   ticketInfo: {
      //     product: state.currentMessage?.includes('mobile app')
      //       ? 'mobile-app'
      //       : 'platform',
      //     problemArea: category || '',
      //     subject: subject || '',
      //     description: `${improvedMessage}\n\n-------------------\n\nOriginal message:\n\n${
      //       state.currentMessage || ''
      //     }`,
      //   },
      // }));

      // setTimeout(() => {
      //   window.scrollTo({
      //     top: document.body.scrollHeight - 1100,
      //     behavior: 'smooth',
      //   });
      // }, 200);
    },
    [state.currentMessage],
  );

  return (
    <main
      className={`relative flex justify-center items-start min-h-screen bg-neutral-50 p-8 ${inter.className}`}
    >
      <Head>
        <title>Markprompt Ticket Deflector</title>
        <meta charSet="utf-8" />
      </Head>
      <div className="prose w-full px-8 pt-0 pb-16 max-w-screen-sm rounded-md shadow-xl bg-white flex flex-col relative">
        <h2>Submit a case</h2>
        <fieldset>
          <label htmlFor="description">
            <div className="mb-1 text-xs text-neutral-700">
              Describe your issue
            </div>
          </label>
          <textarea
            id="description"
            className="py-1.5 px-2 w-full h-[120px] appearance-none rounded-md border bg-white text-neutral-900 transition duration-200 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:text-neutral-500 border-neutral-200 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
            onChange={(e) =>
              setState((s) => ({ ...s, currentMessage: e.target.value }))
            }
          />
        </fieldset>
        <Button
          // disabled={!state.currentMessage}
          isLoading={state.generatingResponse}
          className="place-self-end"
          onClick={() => {
            createTicket("My API is down - it's returning a 429 error");
            // if (state.currentMessage) {
            //   submitMessage(state.currentMessage);
            // }
          }}
        >
          Submit
        </Button>
        {state.streamedMessage && (
          <>
            <h4>Suggested answer</h4>
            <Markdown
              className="max-w-full prose prose-sm"
              remarkPlugins={[remarkGfm]}
            >
              {state.streamedMessage || ''}
            </Markdown>
            <div
              className={clsx(
                'bg-white flex flex-row gap-3 items-center rounded-full shadow-md place-self-end mt-2 px-3 py-1.5 border border-neutral-100',
                {
                  'opacity-0': state.generatingResponse,
                },
              )}
            >
              <ThumbsDown className="w-4 h-5" />
              <ThumbsUp className="w-4 h-5" />
            </div>
          </>
        )}

        {!state.generatingResponse && state.streamedMessage && (
          <div>
            {state.references && (
              <>
                <p className="font-semibold text-sm mb-2">Relevant resources</p>
                <div className="flex flex-row flex-warp overflow-x-auto gap-4 items-center not-prose pb-4">
                  {state.references.map((r, i) => {
                    return (
                      <a
                        key={`reference-${i}`}
                        className="font-medium rounded-full bg-neutral-100 px-3 py-1 text-sm whitespace-nowrap hover:bg-neutral-200 transition"
                        target="_blank"
                        href={r.file.path}
                      >
                        {r.file.title.split('|')[0].trim()}
                      </a>
                    );
                  })}
                </div>
              </>
            )}
            {!state.ticketInfo && (
              <>
                <p className="font-semibold text-sm mb-2">
                  Did this not solve your issue?
                </p>
                <div className="place-self-start flex flex-row gap-4 items-center">
                  {/* <Button
                    variant="cta"
                    loading={state.generatingTicketInfo}
                    onClick={createTicket}
                  >
                    Create a ticket
                  </Button>
                  {state.generatingTicketInfo && (
                    <span className="text-sm text-neutral-500 animate-pulse">
                      Generating case info...
                    </span>
                  )} */}
                </div>
              </>
            )}
            <div>
              {state.ticketInfo && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <TicketForm
                    problemArea={state.ticketInfo.problemArea}
                    subject={state.ticketInfo.subject}
                    description={state.ticketInfo.description}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
