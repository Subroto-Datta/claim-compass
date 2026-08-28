import { classifyStatus } from '../src/lib/classifier.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { statusText } = req.body || {};

  if (!statusText || typeof statusText !== 'string' || statusText.trim().length === 0) {
    return res.status(400).json({ error: 'statusText is required and must be a non-empty string.' });
  }

  if (statusText.trim().length > 2000) {
    return res.status(400).json({ error: 'statusText must be under 2000 characters.' });
  }

  const result = await classifyStatus(statusText);
  return res.status(200).json(result);
}
