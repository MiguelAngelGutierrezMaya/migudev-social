import axios from 'axios';
import config from '@config/env.js';

/**
 * Service for handling WhatsApp API interactions
 */
class WhatsAppService {
  private URL: string;
  private API_VERSION: string;
  private BUSINESS_PHONE: string;
  private API_TOKEN: string;

  constructor() {
    this.URL = 'https://graph.facebook.com';
    this.API_VERSION = config.API_VERSION;
    this.BUSINESS_PHONE = config.BUSINESS_PHONE;
    this.API_TOKEN = config.API_TOKEN;
  }

  /**
   * Send a message to a WhatsApp user
   * @param to - The recipient's phone number
   * @param body - The message content
   * @param messageId - The ID of the message being replied to
   */
  async sendMessage(
    to: string,
    body: string,
    messageId: string,
  ): Promise<void> {
    try {
      await axios({
        method: 'POST',
        url: `${this.URL}/${this.API_VERSION}/${this.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${this.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          text: { body },
          context: {
            message_id: messageId,
          },
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  /**
   * Mark a message as read
   * @param messageId - The ID of the message to mark as read
   */
  async markAsRead(messageId: string): Promise<void> {
    try {
      await axios({
        method: 'POST',
        url: `${this.URL}/${this.API_VERSION}/${this.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${this.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }
}

export default new WhatsAppService();
