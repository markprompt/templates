/* eslint-disable @typescript-eslint/no-explicit-any */
import defaults from 'defaults';
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEventHandler,
  type ReactElement,
  KeyboardEvent,
} from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { DEFAULT_SUBMIT_CHAT_OPTIONS } from '@/lib/core';

import { ConversationSelect } from './ConversationSelect';
import { ChatContext, selectProjectConversations, useChatStore } from './store';
import type { MarkpromptOptions } from '../types';
import type { View } from '../useViews';

interface ChatViewFormProps {
  activeView?: View;
  chatOptions: MarkpromptOptions['chat'];
}

type TriageResult = 'ai' | 'human';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function triage(
  message: string,
  projectKey: string,
  options: MarkpromptOptions['chat'],
): Promise<TriageResult> {
  const { apiUrl, ...resolvedOptions } = defaults(
    { ...options },
    DEFAULT_SUBMIT_CHAT_OPTIONS,
  );
  const messages = [
    {
      role: 'system',
      content: `You are a triage system that helps categorize incoming user support tickets.\n\nIf a ticket cannot be handled automatically, reply with the word "AIBOT" and nothing else. If it can, reply with the word "AIBOT" and nothing else.\n\nOnly accepted answers are "HUMAN" and "AIBOT".`,
    },
    {
      role: 'user',
      content: `I will send you a support ticket. Based on its content:\n\n- If it can be answered automatically, reply "AIBOT".\n- If not, reply "HUMAN".\n\nHere are my capabilities:\n- Provide answers based on context.\n- Perform reimbursements.\n- Check my credits.\n\nContext:\n---\nThe meaning of life is 42\n---\n\nSupport ticket question:\n
      ${message}`,
    },
  ];

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      projectKey,
      messages,
      ...resolvedOptions,
      stream: false,
    }),
  });
  if (!res.ok) {
    return 'human';
  }
  const json = await res.json();
  return json.text === 'HUMAN' ? 'human' : 'ai';
}

export function ChatViewForm(props: ChatViewFormProps): ReactElement {
  const { activeView, chatOptions } = props;
  const [prompt, setPrompt] = useState('');
  const submitChat = useChatStore((state) => state.submitChat);
  const conversations = useChatStore(selectProjectConversations);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      submitChat(prompt);
      setPrompt('');
    },
    [prompt, submitChat],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Bring form input in focus when activeView changes.
    inputRef.current?.focus();
  }, [activeView]);

  // keep abortChat up to date, but do not trigger rerenders (and effect hooks calls) when it updates
  const store = useContext(ChatContext);
  const abortChat = useRef(() => store?.getState().abort?.());

  useEffect(
    () =>
      store?.subscribe((state) => {
        abortChat.current = () => state.abort?.();
      }),
    [store],
  );

  useEffect(() => {
    // cancel pending chat requests when the view changes.
    if (activeView && activeView !== 'chat') {
      abortChat.current?.();
    }

    // cancel pending chat request when the component unmounts.
    return () => abortChat.current?.();
  }, [activeView]);

  const onEnterPress = useCallback(
    (e: KeyboardEvent<any>) => {
      if (e.keyCode == 13 && e.shiftKey == false) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="absolute w-full h-16 bg-gradient-to-t from-white to-white/0 -top-16 z-10" />
      <form className="MarkpromptForm px-4" onSubmit={handleSubmit}>
        <ReactTextareaAutosize
          maxRows={5}
          onKeyDown={onEnterPress}
          className="base-input resize-none w-full outline-none border rounded-md border-neutral-200 p-2"
          placeholder={chatOptions?.placeholder}
          autoFocus
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button
          className="py-2 base-button bg-neutral-100 border border-neutral-200 px-3 font-medium text-sm text-neutral-900 rounded-md"
          type="submit"
        >
          Send
        </button>
        <div className="MarkpromptChatActions z-10 mr-4 mt-3">
          {conversations.length > 0 && <ConversationSelect />}
        </div>
      </form>
    </div>
  );
}
