import axios from 'axios';
import config from '@config/env.js';
import { logError } from '@/utils/Logger.js';

/**
 * Service for handling Facebook and Instagram API interactions
 */
class FacebookService {
  private URL: string;
  private API_VERSION: string;
  private API_TOKEN: string;

  constructor() {
    this.URL = 'https://graph.facebook.com';
    this.API_VERSION = config.API_VERSION;
    this.API_TOKEN = config.API_TOKEN;
  }

  /**
   * Send a response to a Facebook/Instagram message
   * @param pageId - The Facebook Page ID
   * @param commentId - The comment ID to reply to
   * @param message - The message to send
   */
  async sendComment(
    pageId: string,
    commentId: string,
    message: string,
  ): Promise<void> {
    try {
      await axios({
        method: 'POST',
        url: `${this.URL}/${this.API_VERSION}/${commentId}/comments`,
        headers: {
          Authorization: `Bearer ${this.API_TOKEN}`,
        },
        data: {
          message,
        },
      });
    } catch (error) {
      logError('Error sending comment:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  /**
   * Like a comment or post
   * @param objectId - The ID of the object to like (post or comment)
   */
  async likeObject(objectId: string): Promise<void> {
    try {
      await axios({
        method: 'POST',
        url: `${this.URL}/${this.API_VERSION}/${objectId}/likes`,
        headers: {
          Authorization: `Bearer ${this.API_TOKEN}`,
        },
      });
    } catch (error) {
      logError('Error liking object:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }
}

export default new FacebookService();
