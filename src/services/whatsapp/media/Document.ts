import config from '@/config/env.js';
import { Media } from './Media.js';

export class Document implements Media {
  /**
   * Build the document media object
   * @param data - The data to build the document media object
   * @returns The document media object
   */
  buildDataToSend(data: Record<string, unknown>): Record<string, unknown> {
    return {
      document: {
        link: data.mediaUrl,
        caption: data.caption,
        filename: data.filename,
      },
    };
  }

  /**
   * Generate the data to send
   * @returns The data to send
   */
  generateDataToSend(): Record<string, unknown> {
    return {
      mediaUrl: config.PDF_URL,
      caption: 'Welcome to the Migudev, please download the document',
      filename: 'migudev-pdf.pdf',
    };
  }
}
