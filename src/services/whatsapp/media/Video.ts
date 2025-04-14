import { Media } from './Media.js';

/**
 * Represents a video media object
 */
export class Video implements Media {
  /**
   * Builds the video media object
   * @returns The video media object
   */
  build(data: Record<string, unknown>): Record<string, unknown> {
    return {
      video: {
        link: data.mediaUrl,
        caption: data.caption,
      },
    };
  }
}
