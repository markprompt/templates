/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DEFAULT_SUBMIT_CHAT_OPTIONS,
  submitChat,
  submitChatGenerator,
} from '@markprompt/core';

import { loggedToast } from '@/lib/toast';

export const getWeatherInCity = async ({
  city,
}: {
  city: string;
}): Promise<string> => {
  try {
    loggedToast.loading(`Retrieving weather info for ${city}.`);

    const owmRes = await fetch(`/api/get-weather`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ city }),
    });

    if (!owmRes.ok) {
      const error = await owmRes.text();
      return `Unable to retrieve weather: ${error}`;
    }

    const owmJson = await owmRes.json();

    const { apiUrl } = DEFAULT_SUBMIT_CHAT_OPTIONS;

    let response = '';
    for await (const chunk of submitChatGenerator(
      [
        {
          role: 'user',
          content: `Here is a JSON object containing a response from the OpenWeatherMap API: ${JSON.stringify(
            owmJson,
          )}.\n\n====================\n\nGiven this object, please describe the weather in natural language, in a single sentence.`,
        },
      ],
      process.env.NEXT_PUBLIC_PROJECT_KEY!,
      {
        systemPrompt:
          'You are an expert technical support engineer who excel at parsing JSON.',
        doNotInjectContext: true,
        excludeFromInsights: true,
      },
    )) {
      if (chunk.content) {
        response = chunk.content || '';
      }
    }

    return response;
  } catch {
    return 'Unable to retrieve weather.';
  }
};
