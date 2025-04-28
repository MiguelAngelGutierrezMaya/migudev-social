import config from '@/config/env.js';
import { Media } from './Media.js';

/**
 * Represents a video media object
 */
export class Video implements Media {
  /**
   * Builds the video media object
   * @returns The video media object
   */
  buildDataToSend(data: Record<string, unknown>): Record<string, unknown> {
    return {
      video: {
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
      mediaUrl: config.VIDEO_URL,
      caption: 'Welcome to the Migudev, please watch the video',
    };
  }
}
