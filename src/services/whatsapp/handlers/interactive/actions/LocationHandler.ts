import { ActionHandler } from './ActionHandler.js';
import WhatsAppService from '@/services/whatsapp/WhatsappService.js';

/**
 * Handles location requests
 */
export class LocationHandler implements ActionHandler {
  /**
   * Executes the location handler
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  async execute(to: string, messageId: string): Promise<void> {
    const response = `Here is the location of the service: https://www.google.com/maps/place/19.4326018,-99.133209`;
    await WhatsAppService.sendMessage(to, response, messageId);
  }
}
