import { Router } from 'express';
import WhatsAppWebhookController from '@/controllers/WhatsAppWebhookController.js';

const router: Router = Router();

router.post('/webhook', (req, res) =>
  WhatsAppWebhookController.handleIncoming(req, res),
);
router.get('/webhook', (req, res) =>
  WhatsAppWebhookController.verifyWebhook(req, res),
);

export default router;
