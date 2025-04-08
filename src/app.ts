import express, { Request, Response } from 'express';
import config from '@config/env.js';
import webhookRoutes from '@routes/webhookRoutes.js';
import { logInfo } from './utils/Logger.js';

const app = express();
app.use(express.json());

app.use('/', webhookRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(config.PORT, () => {
  logInfo(`Server is listening on port: ${config.PORT}`);
});
