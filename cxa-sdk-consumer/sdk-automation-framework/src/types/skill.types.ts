// src/types/skill.types.ts

/** Agent skill / queue */
export interface Skill {
  skillId: string;
  skillName: string;
  mediaType: 'phone' | 'chat' | 'email' | 'voicemail' | 'workitem';
  isOutbound: boolean;
  isActive: boolean;
  agentCount?: number;
  queueCount?: number;
  campaignId?: string;
}
