import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { classifyStatus } from './src/lib/classifier.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const envFile = readFileSync(join(__dirname, '.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && !process.env[key]) {
        process.env[key] = vals.join('=');
      }
    }
  }
} catch {
  // Ignore
}

const app = express();
app.use(express.json());

app.options('/api/classify', (_req: Request, res: Response) => { res.status(200).end(); });

app.post('/api/classify', async (req: Request, res: Response): Promise<void> => {
  const { statusText } = req.body || {};

  if (!statusText || typeof statusText !== 'string' || statusText.trim().length === 0) {
    res.status(400).json({ error: 'statusText is required.' });
    return;
  }

  if (statusText.trim().length > 2000) {
    res.status(400).json({ error: 'statusText must be under 2000 characters.' });
    return;
  }

  const result = await classifyStatus(statusText);
  res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`[dev-api] Listening on http://localhost:${PORT}`));
