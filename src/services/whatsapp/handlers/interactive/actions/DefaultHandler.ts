import { ActionHandler } from './ActionHandler.js';
import WhatsAppService from '@/services/whatsapp/WhatsappService.js';

/**
 * Default handler for handling unknown or unsupported options
 */
export class DefaultHandler implements ActionHandler {
  /**
   * Executes the default handler
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  async execute(to: string, messageId: string): Promise<void> {
    const response = `I'm sorry, I don't understand that option. Please try again.`;

    await WhatsAppService.sendMessage(to, response, messageId);
  }
}
