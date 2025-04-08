import whatsappService from '@services/whatsappService.js';
import facebookService from '@services/facebookService.js';
import {
  WebhookMessage,
  FacebookComment,
  InstagramComment,
} from '@/types/index.js';

/**
 * Handles incoming messages from different platforms
 */
class MessageHandler {
  /**
   * Process incoming messages from WhatsApp
   * @param message - The WhatsApp message object
   */
  async handleIncomingMessage(message: WebhookMessage): Promise<void> {
    if (message?.type === 'text' && message.text) {
      const response = `Echo: ${message.text.body}`;
      await whatsappService.sendMessage(message.from, response, message.id);
      await whatsappService.markAsRead(message.id);
    }
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
   * @param comment - The Instagram comment object
   */
  async handleInstagramComment(comment: InstagramComment): Promise<void> {
    if (comment?.text) {
      const response = `Thank you for your comment, @${comment.username}`;
      // Implementation would depend on Instagram API specifics
      console.log(
        `Would respond to Instagram comment: ${comment.id} with: ${response}`,
      );
    }
  }
}

export default new MessageHandler();
