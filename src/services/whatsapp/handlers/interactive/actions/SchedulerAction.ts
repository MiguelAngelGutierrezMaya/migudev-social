import { ActionHandler } from './ActionHandler.js';
import WhatsAppService from '@/services/whatsapp/WhatsappService.js';

/**
 * Handles scheduler actions
 */
export class SchedulerAction implements ActionHandler {
  /**
   * Executes the scheduler action
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  async execute(to: string, messageId: string): Promise<void> {
    const response = `Here is the schedule of the service`;
    await WhatsAppService.sendMessage(to, response, messageId);
  }
}
