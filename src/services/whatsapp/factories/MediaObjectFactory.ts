import { Media } from '@/services/whatsapp/media/Media.js';
import { WhatsAppMediaType } from '@/services/whatsapp/types/Messages.js';
import { Image as ImageMedia } from '@/services/whatsapp/media/Image.js';
import { Video as VideoMedia } from '@/services/whatsapp/media/Video.js';
import { Audio as AudioMedia } from '@/services/whatsapp/media/Audio.js';
import { Document as DocumentMedia } from '@/services/whatsapp/media/Document.js';
import { MESSAGE_TYPES } from '../constants/MessageTypes.js';

/**
 * Factory class for creating media objects
 */
export class MediaObjectFactory {
  /**
   * The media objects
   */
  private static mediaObjects: Record<WhatsAppMediaType, new () => Media> = {
    [MESSAGE_TYPES.IMAGE]: ImageMedia,
    [MESSAGE_TYPES.VIDEO]: VideoMedia,
    [MESSAGE_TYPES.AUDIO]: AudioMedia,
    [MESSAGE_TYPES.DOCUMENT]: DocumentMedia,
  } as Record<WhatsAppMediaType, new () => Media>;

  /**
   * Create a media object based on the type
   * @param type - The type of media to create
   * @returns The media object
   */
  static createMediaObject(type: WhatsAppMediaType): Media {
    const MediaClass = this.mediaObjects[type];

    if (!MediaClass) {
      throw new Error(`Unsupported media type: ${type}`);
    }

    return new MediaClass();
  }
}
