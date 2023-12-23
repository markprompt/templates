import { loggedToast } from '../lib/toast';

export const getWeatherInCity = async (args: string): Promise<string> => {
  try {
    const { city } = JSON.parse(args) as { city: string };

    loggedToast.loading(`Retrieving weather info for ${city}.`);

    const res = await fetch(`/api/get-weather`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ city }),
    });

    if (!res.ok) {
      const error = await res.text();
      return `Unable to retrieve weather: ${error}`;
    }

    return await res.text();
  } catch {
    return 'Unable to retrieve weather.';
  }
};
