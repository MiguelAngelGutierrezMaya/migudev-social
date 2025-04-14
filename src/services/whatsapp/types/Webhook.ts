export interface WhatsAppWebhookEntry {
  changes: Array<{
    value: {
      messages?: WhatsAppWebhookMessage[];
      contacts?: WhatsAppWebhookSender[];
    };
  }>;
}

export interface WhatsAppWebhookMessage {
  from: string;
  id: string;
  type: string;
  text?: {
    body: string;
  };
  interactive?: WhatsAppWebhookInteractiveMessage;
}

export interface WhatsAppWebhookSender {
  profile: {
    name: string;
  };
  wa_id: string;
}

export interface WhatsAppWebhookInteractiveMessage {
  type: string;
  button_reply: {
    id: string;
    title: string;
  };
}
