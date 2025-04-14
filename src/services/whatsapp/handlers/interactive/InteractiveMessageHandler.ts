import { MessageHandler } from '@/services/whatsapp/handlers/MessageHandler.js';
import {
  WhatsAppWebhookMessage,
  WhatsAppWebhookSender,
} from '@/services/whatsapp/types/index.js';
import WhatsAppService from '@/services/whatsapp/WhatsappService.js';
import { InteractiveHandlerFactory } from './factories/InteractiveHandlerFactory.js';

/**
 * Handles interactive messages
 */
export class InteractiveMessageHandler implements MessageHandler {
  /**
   * Handles interactive messages
   * @param message - The message to handle
   * @param _ - The sender information (not used)
   */
  async execute(
    message: WhatsAppWebhookMessage,
    _?: WhatsAppWebhookSender,
  ): Promise<void> {
    const option = message.interactive?.button_reply?.id;

    if (option) {
      await this.handleMenuOption(message.from, option, message.id);
      await WhatsAppService.markAsRead(message.id);
    }
  }

  /**
   * Handles menu options
   * @param option - The option to handle
   */
  private async handleMenuOption(
    to: string,
    option: string,
    messageId: string,
  ): Promise<void> {
    const action = InteractiveHandlerFactory.createAction(option);
    await action.execute(to, messageId);
  }
}
