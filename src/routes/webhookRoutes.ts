import { Router } from 'express';
import webhookController from '@controllers/webhookController.js';

const router: Router = Router();

router.post('/webhook', (req, res) =>
  webhookController.handleIncoming(req, res),
);
router.get('/webhook', (req, res) => webhookController.verifyWebhook(req, res));

export default router;
