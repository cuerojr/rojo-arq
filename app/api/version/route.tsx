// pages/api/version.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function POST(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ node: process.version });
}
