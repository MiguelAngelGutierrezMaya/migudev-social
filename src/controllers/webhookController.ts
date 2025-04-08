import { Request, Response } from 'express';
import config from '@config/env.js';
import messageHandler from '@services/messageHandler.js';
import { WebhookMessage } from '@/types/index.js';

/**
 * Controller for handling webhook requests from Meta platforms
 */
class WebhookController {
  /**
   * Handle incoming webhook messages
   * @param req - Express request object
   * @param res - Express response object
   */
  async handleIncoming(req: Request, res: Response): Promise<void> {
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0] as
      | WebhookMessage
      | undefined;
    if (message) {
      await messageHandler.handleIncomingMessage(message);
    }
    res.sendStatus(200);
  }

  /**
   * Verify the webhook with Meta's challenge response
   * @param req - Express request object
   * @param res - Express response object
   */
  verifyWebhook(req: Request, res: Response): void {
    const mode = req.query['hub.mode'] as string | undefined;
    const token = req.query['hub.verify_token'] as string | undefined;
    const challenge = req.query['hub.challenge'] as string | undefined;

    if (mode === 'subscribe' && token === config.WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
      console.log('Webhook verified successfully!');
    } else {
      res.sendStatus(403);
    }
  }
}

export default new WebhookController();
