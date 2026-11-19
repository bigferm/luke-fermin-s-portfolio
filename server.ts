import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildDailyEdition, type DailyEditionPayload } from './server/dailyEdition.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

let cachedEdition: DailyEditionPayload | null = null;

async function getTodayEdition(forceRefresh = false): Promise<DailyEditionPayload> {
  const todayKey = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  if (!forceRefresh && cachedEdition && cachedEdition.editionDateKey === todayKey) {
    return cachedEdition;
  }

  const nextEdition = await buildDailyEdition();
  cachedEdition = nextEdition;
  return nextEdition;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.get('/api/edition', async (req, res) => {
    try {
      const force = req.query.refresh === '1';
      const edition = await getTodayEdition(force);
      res.setHeader('Cache-Control', 'no-store');
      res.json(edition);
    } catch {
      res.status(500).json({ error: 'Unable to compile daily edition' });
    }
  });

  const distDir = path.resolve(__dirname, 'dist');
  const distIndex = path.join(distDir, 'index.html');
  const useViteDev =
    process.env.DEV_SERVER === '1' ||
    process.env.NODE_ENV === 'development' ||
    !fs.existsSync(distIndex);

  if (useViteDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(distIndex);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Daily Debit server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
