import React from 'react';
import type { AgentContactHistory } from './ccf-agent-card-contact-history';
export interface DispositionModalViewProps {
    modalData: AgentContactHistory;
    handleClose: () => void;
    channelIcon: React.ReactNode;
    disposition?: string;
    dispositionNotes?: string;
    skill: boolean;
    skillDropdownComponent?: React.ReactNode;
    buttonLabel?: string;
    selectSkillWarning: boolean;
    outboundSkill: {
        skillId: number;
        skillName: string;
    }[];
    voiceCall: () => void;
}
/**
 * DispositionModalView - Presentational component for disposition modal.
 *
 * @param props - DispositionModalViewProps
 * @example
 * ```tsx
 * <DispositionModalView
 *   modalData={{
 *     contactId: '123',
 *     contactName: 'John Doe',
 *     skill: 'Support',
 *     statusUpdatedDateTime: '2025-12-10T10:00:00Z',
 *     interactionDuration: '00:05:12',
 *     tags: ['VIP', 'Callback'],
 *     mediaType: MediaType.VOICE,
 *   } as unknown as AgentContactHistory}
 *   handleClose={() => {}}
 *   channelIcon={<span aria-hidden="true" />}
 *   disposition='Resolved'
 *   dispositionNotes='Customer was satisfied.'
 *   skill={true}
 *   skillDropdownComponent={null}
 *   buttonLabel='callback'
 *   selectSkillWarning={false}
 *   outboundSkill={[{ skillId: 1, skillName: 'Support' }]}
 *   voiceCall={() => {}}
 * />
 * ```
 */
export declare const DispositionModalView: React.FC<DispositionModalViewProps>;
