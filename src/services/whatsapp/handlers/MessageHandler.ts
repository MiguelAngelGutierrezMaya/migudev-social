import { WebhookMessage, WebhookSender } from '@/types/index.js';

export interface MessageHandler {
  execute(message: WebhookMessage, senderInfo?: WebhookSender): Promise<void>;
}
