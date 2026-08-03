// src/types/contact.types.ts

/** Voice / general contact */
export interface Contact {
  id: string;
  contactId: string;
  type: ContactType;
  status: ContactStatus;
  direction: 'inbound' | 'outbound';
  skillId: string;
  skillName?: string;
  agentId?: string;
  phoneNumber?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
}

export type ContactType = 'voice' | 'chat' | 'email' | 'sms' | 'social';
export type ContactStatus = 'active' | 'holding' | 'conferencing' | 'dialing' | 'queued' | 'ended' | 'disconnected';

/** Payload to create / initiate a contact */
export interface CreateContactPayload {
  type: ContactType;
  skillId: string;
  phoneNumber?: string;
  direction?: 'inbound' | 'outbound';
}

/** Payload to update contact metadata */
export interface UpdateContactPayload {
  status?: ContactStatus;
  agentId?: string;
  notes?: string;
}

/** Contact note */
export interface ContactNote {
  id: string;
  contactId: string;
  note: string;
  createdBy: string;
  createdAt: string;
}
