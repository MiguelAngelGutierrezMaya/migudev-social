export interface WebhookMessage {
  from: string;
  id: string;
  type: string;
  text?: {
    body: string;
  };
}

export interface WebhookEntry {
  changes: Array<{
    value: {
      messages?: WebhookMessage[];
      contacts?: WebhookSender[];
    };
  }>;
}

export interface FacebookComment {
  id: string;
  from: {
    id: string;
    name: string;
  };
  message: string;
  post_id?: string;
  parent_id?: string;
  created_time: string;
}

export interface InstagramComment {
  id: string;
  username: string;
  text: string;
  media_id?: string;
  parent_id?: string;
  timestamp: string;
}

export interface WebhookSender {
  profile: {
    wa_id: string;
    name: string;
  };
}
