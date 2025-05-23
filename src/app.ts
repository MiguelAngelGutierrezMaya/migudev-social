import express from 'express';
import WebhookRoutes from '@routes/WebhookRoutes.js';
import config from '@config/env.js';
import { logInfo } from '@/utils/Logger.js';

const app = express();
app.use(express.json());

// Routes
app.use('/', WebhookRoutes);

const port = config.PORT || 3000;

/**
 * Starts the Express server and logs the port it's listening on.
 * The port is determined by the configuration or defaults to 3000.
 */
app.listen(port, () => {
  logInfo(`Server is listening on port: ${port}`);
});
