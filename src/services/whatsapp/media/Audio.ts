import { Media } from './Media.js';

/**
 * Represents an audio media object
 */
export class Audio implements Media {
  /**
   * Build the audio object
   * @returns The audio object
   */
  build(data: Record<string, unknown>): Record<string, unknown> {
    return {
      audio: {
        link: data.mediaUrl,
      },
    };
  }
}
