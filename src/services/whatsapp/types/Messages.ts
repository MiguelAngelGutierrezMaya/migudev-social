export type WhatsAppButtonType = 'reply' | 'call' | 'url';

export interface WhatsAppButton {
  type: WhatsAppButtonType;
  reply: {
    id: string;
    title: string;
  };
}

export type WhatsAppMediaType = 'image' | 'video' | 'audio' | 'document';
