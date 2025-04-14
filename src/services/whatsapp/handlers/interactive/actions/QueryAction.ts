import { ActionHandler } from './ActionHandler.js';
import WhatsAppService from '@/services/whatsapp/WhatsappService.js';

/**
 * Handles query actions
 */
export class QueryAction implements ActionHandler {
  /**
   * Executes the query action
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  async execute(to: string, messageId: string): Promise<void> {
    const response = `Here is the query of the service`;
    await WhatsAppService.sendMessage(to, response, messageId);
  }
}
