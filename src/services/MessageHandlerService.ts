import { WebhookMessage, WebhookSender } from '@/types/index.js';
import { logError } from '@/utils/Logger.js';
import { MessageHandlerFactory as WhatsAppMessageHandlerFactory } from '@/services/whatsapp/factories/MessageHandlerFactory.js';

/**
 * Handles incoming messages from different platforms
 */
class MessageHandlerService {
  /**
   * Process incoming messages from WhatsApp
   * @param message - The WhatsApp message object
   */
  async handleIncomingWhatsAppMessage(
    message: WebhookMessage,
    senderInfo?: WebhookSender,
  ): Promise<void> {
    try {
      const handler = WhatsAppMessageHandlerFactory.createHandler(message);
      await handler.execute(message, senderInfo);
    } catch (error) {
      logError('Error handling message', {
        error: error instanceof Error ? error.message : 'Unknown error',
        messageType: message.type,
        messageId: message.id,
      });
      throw error;
    }
  }
}

export default new MessageHandlerService();
