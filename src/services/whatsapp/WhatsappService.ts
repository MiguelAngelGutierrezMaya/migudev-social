import axios from 'axios';
import config from '@config/env.js';
import { logError } from '@/utils/Logger.js';
import { WhatsAppButton, WhatsAppMediaType } from './types/Messages.js';
import { MediaObjectFactory } from './factories/MediaObjectFactory.js';
import { Media } from './media/Media.js';

/**
 * Media message parameters
 */
type MediaMessageParams = {
  to: string;
  type: WhatsAppMediaType;
  mediaUrl: string;
  caption?: string;
  filename?: string;
};

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
      logError('Error sending message:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
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
      logError('Error marking message as read:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  /**
   * Send an interactive buttons message
   * @param to - The recipient's phone number
   * @param body - The message content
   * @param buttons - The buttons to send
   */
  async sendInteractiveButtons(
    to: string,
    body: string,
    buttons: WhatsAppButton[],
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
          recipient_type: 'individual',
          to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: body },
            action: {
              buttons,
            },
          },
        },
      });
    } catch (error) {
      logError('Error sending interactive buttons message:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  /**
   * Send a media message
   * @param to - The recipient's phone number
   * @param type - The type of media to send
   * @param mediaUrl - The URL of the media to send
   * @param caption - The caption of the media
   */
  async sendMediaMessage({
    to,
    type,
    mediaUrl,
    caption,
    filename,
  }: MediaMessageParams): Promise<void> {
    try {
      const mediaObject: Media = MediaObjectFactory.createMediaObject(type);

      await axios({
        method: 'POST',
        url: `${this.URL}/${this.API_VERSION}/${this.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${this.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: type,
          ...mediaObject.buildDataToSend({ mediaUrl, caption, filename }),
        },
      });
    } catch (error) {
      logError('Error sending media message:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }
}

export default new WhatsAppService();
