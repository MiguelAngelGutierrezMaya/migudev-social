import { Request, Response } from 'express';
import config from '@config/env.js';
import MessageHandlerService from '@services/MessageHandlerService.js';
import { WhatsAppWebhookEntry } from '@/services/whatsapp/types/index.js';
import { logInfo, logError } from '@/utils/Logger.js';

interface WebhookBody {
  entry?: WhatsAppWebhookEntry[];
}

/**
 * Controller for handling webhook requests from Meta platforms
 */
class WhatsAppWebhookController {
  /**
   * Handle incoming webhook messages
   * @param req - Express request object
   * @param res - Express response object
   */
  async handleIncoming(
    req: Request<unknown, unknown, WebhookBody>,
    res: Response,
  ): Promise<void> {
    try {
      logInfo('Received webhook request', req.body as Record<string, unknown>);

      const entry = req.body.entry?.[0];
      const value = entry?.changes[0]?.value;

      const message = value?.messages?.[0];
      const senderInfo = value?.contacts?.[0];

      logInfo(
        'Received webhook message',
        (message ?? {}) as Record<string, unknown>,
      );
      logInfo('Sender info', (senderInfo ?? {}) as Record<string, unknown>);

      if (message) {
        await MessageHandlerService.handleIncomingWhatsAppMessage(
          message,
          senderInfo,
        );
        logInfo('Successfully processed webhook message', {
          messageId: message.id,
        });
      } else {
        logInfo('Received webhook request without message payload');
      }

      res.sendStatus(200);
    } catch (error) {
      logError('Error processing webhook message', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.sendStatus(500);
    }
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

    logInfo('Webhook verification', {
      mode,
      token,
      challenge,
    });

    if (mode === 'subscribe' && token === config.WEBHOOK_VERIFY_TOKEN) {
      logInfo('Webhook verified successfully!');
      res.status(200).send(challenge);
    } else {
      logError('Webhook verification failed');
      res.sendStatus(403);
    }
  }
}

export default new WhatsAppWebhookController();
