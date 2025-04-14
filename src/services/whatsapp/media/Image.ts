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
  build(data: Record<string, unknown>): Record<string, unknown> {
    return {
      image: {
        link: data.mediaUrl,
        caption: data.caption,
      },
    };
  }
}
