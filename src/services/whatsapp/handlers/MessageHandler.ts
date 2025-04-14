import {
  WhatsAppWebhookMessage,
  WhatsAppWebhookSender,
} from '@/services/whatsapp/types/index.js';

/**
 * Interface for message handlers
 */
export interface MessageHandler {
  /**
   * Execute the message handler
   * @param message - The message to execute
   * @param senderInfo - The sender information
   * @returns A promise that resolves to void
   */
  execute(
    message: WhatsAppWebhookMessage,
    senderInfo?: WhatsAppWebhookSender,
  ): Promise<void>;
}
