// src/types/session.types.ts

/** Agent session */
export interface AgentSession {
  sessionId: string;
  agentId: string;
  stationId?: string;
  stationPhoneNumber?: string;
  status: AgentSessionStatus;
  startTime: string;
  lastHeartbeat?: string;
}

export type AgentSessionStatus =
  | 'active'
  | 'joining'
  | 'ended'
  | 'disconnected'
  | 'join_failed';

/** Payload to start a session */
export interface StartSessionPayload {
  stationId?: string;
  stationPhoneNumber?: string;
}

/** Payload to end a session */
export interface EndSessionPayload {
  forceLogoff?: boolean;
  endContacts?: boolean;
  ignorePersonalQueue?: boolean;
}

/** Agent state object */
export interface AgentState {
  agentId: string;
  state: string;
  reason?: string;
  cxoneState?: string;
  startTime?: string;
}
