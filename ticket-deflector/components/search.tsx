/* eslint-disable @next/next/no-img-element */
'use client';

import { Markprompt } from '@markprompt/react';

import { CHAT_DEFAULT_PROMPTS, CHAT_WELCOME_MESSAGE } from '@/lib/constants';

import { Icons } from './icons';
import { Input } from './ui/input';

export function Search() {
  return (
    <>
      <Markprompt
        apiUrl={process.env.NEXT_PUBLIC_API_URL}
        projectKey={
          process.env.NEXT_PUBLIC_MARKPROMPT_PROJECT_KEY ?? 'enter-a-key'
        }
        defaultView="search"
        display="dialog"
        chat={{
          assistantId: process.env.NEXT_PUBLIC_ASSISTANT_ID,
          enabled: true,
          avatars: {
            user: '/avatars/user.png',
            assistant: () => (
              <Icons.logo className="w-[18px] h-[18px] text-black ml-[-1.5px]" />
            ),
          },
        }}
        // feedback={{ enabled: true }}
        // references={{ display: 'end' }}
        search={{
          enabled: true,
          // askLabel: 'Ask Acme',
          // defaultView: {
          //   searchesHeading: 'Recommended for you',
          //   searches: [
          //     { title: 'Welcome to Acme', href: '/' },
          //     { title: 'Get Started', href: '/' },
          //     { title: 'Onboarding', href: '/' },
          //     { title: 'Payments', href: '/' },
          //     { title: 'User Management', href: '/' },
          //     { title: 'Acme CLI', href: '/' },
          //     { title: 'How to build an Acme app', href: '/' },
          //     { title: 'How to setup authentication', href: '/' },
          //     { title: 'How to invite users', href: '/' },
          //   ],
          // },
          // provider: {
          //   name: 'algolia',
          //   apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
          //   appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
          //   indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
          // },
          getTitle: (result) => result.content || undefined,
        }}
        close={{ visible: false }}
      >
        <button className="flex flex-col gap-4 text-sm border border-solid rounded-md px-2.5 py-1.5 w-[300px] bg-card text-muted-foreground">
          Search documentation…
        </button>
        {/* <Input>
          <Search style={{ strokeWidth: '2.5px', width: 16, height: 16 }} />
          <span>Search or ask documentation</span>
          <kbd>
            <span>⌘ K</span>
          </kbd>
        </Input> */}
      </Markprompt>
    </>
  );
}
