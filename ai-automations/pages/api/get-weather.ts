// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | { error: string }
  | {
      weather: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body = req.body;

  const owmRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${body.city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY}&units=imperial`,
    {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    },
  );

  if (!owmRes.ok) {
    const error = await owmRes.text();
    return res
      .status(400)
      .json({ error: `Unable to retrieve weather: ${error}` });
  }

  const json = await owmRes.json();

  return res.status(200).json(json);
}
