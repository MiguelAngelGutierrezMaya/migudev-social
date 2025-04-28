import config from '@/config/env.js';
import { Media } from './Media.js';

/**
 * Represents an image media object
 */
export class Image implements Media {
  /**
   * Builds the image media object
   * @param data - The data to build the image media object
   * @returns The image media object
   */
  buildDataToSend(data: Record<string, unknown>): Record<string, unknown> {
    return {
      image: {
        link: data.mediaUrl,
        caption: data.caption,
      },
    };
  }

  /**
   * Generate the data to send
   * @returns The data to send
   */
  generateDataToSend(): Record<string, unknown> {
    return {
      mediaUrl: config.IMAGE_URL,
      caption: 'Welcome to the Migudev, please see the image',
    };
  }
}
