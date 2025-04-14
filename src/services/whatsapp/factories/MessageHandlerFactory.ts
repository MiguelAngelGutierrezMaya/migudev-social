import { WhatsAppWebhookMessage } from '@/services/whatsapp/types/index.js';
import { MessageHandler } from '@/services/whatsapp/handlers/MessageHandler.js';
import { TextMessageHandler } from '@/services/whatsapp/handlers/TextMessageHandler.js';
import { InteractiveMessageHandler } from '@/services/whatsapp/handlers/interactive/InteractiveMessageHandler.js';
import { logError } from '@/utils/Logger.js';

/**
 * Factory class for creating message handlers based on WhatsApp message types.
 * Implements the Factory Pattern to dynamically create appropriate handlers.
 */
export class MessageHandlerFactory {
  /**
   * Static registry of message handlers.
   * Maps message types to their corresponding handler classes.
   * @private
   */
  private static handlers: Record<string, new () => MessageHandler> = {
    text: TextMessageHandler,
    interactive: InteractiveMessageHandler,
  };

  /**
   * Creates a message handler instance based on the message type.
   * @param message - The WhatsApp webhook message to be handled
   * @returns An instance of the appropriate message handler
   * @throws {Error} When no handler is found for the message type
   *
   * @example
   * ```typescript
   * const message = { type: 'text', ... };
   * const handler = MessageHandlerFactory.createHandler(message);
   * await handler.execute(message);
   * ```
   */
  static createHandler(message: WhatsAppWebhookMessage): MessageHandler {
    const HandlerClass = this.handlers[message.type];

    if (!HandlerClass) {
      logError('No handler found for message type', { type: message.type });
      throw new Error(`Unsupported message type: ${message.type}`);
    }

    return new HandlerClass();
  }
}
