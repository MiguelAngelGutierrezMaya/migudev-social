import whatsappService from '@services/whatsappService.js';
import facebookService from '@services/facebookService.js';
import { WebhookMessage, FacebookComment } from '@/types/index.js';
import { logInfo } from '@/utils/Logger.js';

/**
 * Handles incoming messages from different platforms
 */
class MessageHandler {
  /**
   * Process incoming messages from WhatsApp
   * @param message - The WhatsApp message object
   */
  async handleIncomingMessage(message: WebhookMessage): Promise<void> {
    if (message?.type === 'text') {
      const incomingMessage = message.text?.body;

      if (this.isGreeting(incomingMessage ?? '')) {
        await this.sendWelcomeMessage(message.from, message.id);
      } else {
        const response = `Echo: ${incomingMessage}`;
        await whatsappService.sendMessage(message.from, response, message.id);
      }

      await whatsappService.markAsRead(message.id);
    }
  }

  /**
   * Check if the message is a greeting
   * @param message - The message to check
   * @returns True if the message is a greeting, false otherwise
   */
  isGreeting(message: string): boolean {
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
   * Send a welcome message to the user
   * @param to - The recipient's WhatsApp ID
   * @param messageId - The ID of the message to mark as read
   */
  async sendWelcomeMessage(to: string, messageId: string): Promise<void> {
    const welcomeMessage =
      `Hello, welcome to our software service online` +
      `\n\nWe are a software development company that specializes in building custom software` +
      `solutions for businesses. could i help you with anything?`;
    logInfo('Sending welcome message', {
      to,
      messageId,
      welcomeMessage,
    });
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
    await whatsappService.markAsRead(messageId);
  }

  /**
   * Process incoming comments from Facebook
   * @param comment - The Facebook comment object
   */
  async handleFacebookComment(comment: FacebookComment): Promise<void> {
    if (comment?.message) {
      const response = `Thank you for your comment: ${comment.from.name}`;
      await facebookService.sendComment(comment.from.id, comment.id, response);
      await facebookService.likeObject(comment.id);
    }
  }

  /**
   * Process incoming comments from Instagram
   * @param message - The Instagram comment object
   */
  // async handleInstagramComment(message: WebhookMessage): Promise<void> {
  //   const comment = message as InstagramComment;
  //   logInfo('Processing Instagram comment', { commentId: comment.id });
  //   await facebookService.replyToInstagramComment(comment);
  // }
}

export default new MessageHandler();
