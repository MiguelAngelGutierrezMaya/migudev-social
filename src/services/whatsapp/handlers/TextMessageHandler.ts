import {
  WhatsAppMediaType,
  WhatsAppWebhookMessage,
  WhatsAppWebhookSender,
} from '@/services/whatsapp/types/index.js';
import WhatsAppService from '@/services/whatsapp/WhatsappService.js';
import { logInfo } from '@/utils/Logger.js';
import { MessageHandler } from '@/services/whatsapp/handlers/MessageHandler.js';
import {
  WhatsAppButton,
  WhatsAppButtonType,
} from '@/services/whatsapp/types/index.js';
import { SERVICES } from '@/services/whatsapp/constants/Services.js';
import { MESSAGE_TYPES } from '@/services/whatsapp/constants/MessageTypes.js';
import { MediaObjectFactory } from '../factories/MediaObjectFactory.js';

export class TextMessageHandler implements MessageHandler {
  /**
   * Execute the text message handler
   * @param message - The message to execute
   * @param senderInfo - The sender information
   * @returns A promise that resolves to void
   */
  async execute(
    message: WhatsAppWebhookMessage,
    senderInfo?: WhatsAppWebhookSender,
  ): Promise<void> {
    const incomingMessage = message.text?.body ?? '';

    if (this.isGreeting(incomingMessage)) {
      await this.sendWelcomeMessage(message.from, message.id, senderInfo);
      await this.sendWelcomeMenu(message.from);
    } else if (this.isAskingForMedia(incomingMessage)) {
      await this.sendMedia(
        message.from,
        this.getMediaFromMessage(incomingMessage),
      );
    } else {
      const response = `Echo: ${incomingMessage}`;
      await WhatsAppService.sendMessage(message.from, response, message.id);
    }

    await WhatsAppService.markAsRead(message.id);
  }

  /**
   * Check if the message is a greeting
   * @param message - The message to check
   * @returns True if the message is a greeting, false otherwise
   */
  private isGreeting(message: string): boolean {
    const greetings = [
      'hi',
      'hello',
      'hey',
      'hola',
      'greetings',
      'whats up',
      'buenas tardes',
    ];
    return greetings.some(greeting =>
      message.toLowerCase().trim().includes(greeting),
    );
  }

  /**
   * Check if the message is asking for media
   * @param message - The message to check
   * @returns True if the message is asking for media, false otherwise
   */
  private isAskingForMedia(message: string): boolean {
    const mediaTypes = Object.values(MESSAGE_TYPES);
    return mediaTypes.some(mediaType =>
      message.toLowerCase().trim().includes(mediaType),
    );
  }

  /**
   * Get the media from the message
   * @param message - The message to get the media from
   * @returns The media from the message
   */
  private getMediaFromMessage(message: string): WhatsAppMediaType {
    const mediaTypes = Object.values(MESSAGE_TYPES);
    return mediaTypes.find(mediaType =>
      message.toLowerCase().trim().includes(mediaType),
    ) as WhatsAppMediaType;
  }

  /**
   * Send a welcome message to the user
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  private async sendWelcomeMessage(
    to: string,
    messageId: string,
    senderInfo?: WhatsAppWebhookSender,
  ): Promise<void> {
    const name = this.getSenderName(senderInfo);

    const welcomeMessage =
      `Hello ${name}, welcome to our software service online` +
      `\n\nWe are a software development company that specializes in building custom software` +
      `solutions for businesses. could i help you with anything?`;
    logInfo('Sending welcome message', {
      to,
      messageId,
      welcomeMessage,
    });
    await WhatsAppService.sendMessage(to, welcomeMessage, messageId);
    await WhatsAppService.markAsRead(messageId);
  }

  /**
   * Get the sender's name
   * @param senderInfo - The sender's information
   * @returns The sender's name
   */
  private getSenderName(senderInfo?: WhatsAppWebhookSender): string {
    return senderInfo?.profile?.name ?? senderInfo?.wa_id ?? 'there';
  }

  /**
   * Send a welcome menu to the user
   * @param to - The recipient's WhatsApp ID
   */
  private async sendWelcomeMenu(to: string): Promise<void> {
    const body: string =
      'Welcome to our software service online, please choose an option';
    const typeReply: WhatsAppButtonType = 'reply';
    const buttons: WhatsAppButton[] = [
      {
        type: typeReply,
        reply: { id: SERVICES.SCHEDULE_CALL, title: 'Schedule a call' },
      },
      {
        type: typeReply,
        reply: { id: SERVICES.ABOUT_SERVICES, title: 'About our services' },
      },
      {
        type: typeReply,
        reply: { id: SERVICES.GET_LOCATION, title: 'Get location' },
      },
    ];
    logInfo('Sending welcome menu', {
      to,
      body,
      buttons,
    });
    await WhatsAppService.sendInteractiveButtons(to, body, buttons);
  }

  /**
   * Send media message to WhatsApp
   * @param to - The WhatsApp number to send the message to
   */
  async sendMedia(to: string, type: WhatsAppMediaType) {
    const mediaData = MediaObjectFactory.createMediaData(type);

    logInfo('Sending media message', {
      to,
      type,
      ...mediaData,
    });

    const { mediaUrl, ...optionalParams } = mediaData;

    await WhatsAppService.sendMediaMessage({
      to,
      type,
      mediaUrl: mediaUrl as string,
      ...optionalParams,
    });
  }
}
