import { Router } from 'express';
import WebhookController from '@/controllers/WebhookController.js';

const router: Router = Router();

router.post('/webhook', (req, res) =>
  WebhookController.handleIncoming(req, res),
);
router.get('/webhook', (req, res) => WebhookController.verifyWebhook(req, res));

export default router;
