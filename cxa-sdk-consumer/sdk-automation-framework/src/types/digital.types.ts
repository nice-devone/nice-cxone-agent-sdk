// src/types/digital.types.ts

/** Digital contact (case) */
export interface DigitalContact {
  caseId: string;
  channelId: string;
  status: DigitalContactStatus;
  direction: 'inbound' | 'outbound';
  customerName?: string;
  channel?: DigitalChannel;
  messages: DigitalMessage[];
  createdAt: string;
  updatedAt: string;
}

export type DigitalContactStatus = 'new' | 'open' | 'pending' | 'escalated' | 'resolved' | 'closed';

/** Digital message within a contact */
export interface DigitalMessage {
  id: string;
  caseId: string;
  direction: 'inbound' | 'outbound';
  messageContent: {
    type: 'TEXT' | 'RICH_LINK' | 'LIST_PICKER' | 'QUICK_REPLIES' | 'FILE';
    text?: string;
    payload?: Record<string, unknown>;
  };
  authorName?: string;
  createdAt: string;
}

/** Payload for replying to a digital contact */
export interface DigitalReplyPayload {
  messageContent: {
    type: 'TEXT';
    payload: {
      text: string;
    };
  };
  thread: {
    idOnExternalPlatform: string;
  };
  recipients: string[];
}

/** Digital channel */
export interface DigitalChannel {
  id: string;
  name: string;
  type: 'chat' | 'email' | 'sms' | 'facebook' | 'twitter' | 'whatsapp' | 'custom';
  isActive: boolean;
}
