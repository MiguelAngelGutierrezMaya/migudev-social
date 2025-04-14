import { Media } from './Media.js';

export class Document implements Media {
  /**
   * Build the document media object
   * @param data - The data to build the document media object
   * @returns The document media object
   */
  build(data: Record<string, unknown>): Record<string, unknown> {
    return {
      document: {
        link: data.mediaUrl,
        caption: data.caption,
        filename: 'migudev.pdf',
      },
    };
  }
}
