import { WebhookMessage } from '@/types/index.js';
import { MessageHandler } from '@/services/whatsapp/handlers/MessageHandler.js';
import { TextMessageHandler } from '@/services/whatsapp/handlers/TextMessageHandler.js';
import { logError } from '@/utils/Logger.js';

export class MessageHandlerFactory {
  private static handlers: Record<string, new () => MessageHandler> = {
    text: TextMessageHandler,
  };

  static createHandler(message: WebhookMessage): MessageHandler {
    const HandlerClass = this.handlers[message.type];

    if (!HandlerClass) {
      logError('No handler found for message type', { type: message.type });
      throw new Error(`Unsupported message type: ${message.type}`);
    }

    return new HandlerClass();
  }

  static registerHandler(
    type: string,
    handler: new () => MessageHandler,
  ): void {
    this.handlers[type] = handler;
  }
}
