import { Media } from './Media.js';
import config from '@/config/env.js';

/**
 * Represents an audio media object
 */
export class Audio implements Media {
  /**
   * Build the audio object
   * @returns The audio object
   */
  buildDataToSend(data: Record<string, unknown>): Record<string, unknown> {
    return {
      audio: {
        link: data.mediaUrl,
      },
    };
  }

  /**
   * Generate the data to send
   * @returns The data to send
   */
  generateDataToSend(): Record<string, unknown> {
    return {
      mediaUrl: config.AUDIO_URL,
      caption: 'Welcome to the Migudev, please listen to the audio',
    };
  }
}
