import { ConsultContextPhase, ConsultContextMode } from '@nice-devone/common-sdk';
/**
 * Interface for the ConsultContext event payload delivered in get-next-event.
 * Fired by the VC when one agent consults or conferences another, carrying
 * originating-call context and conference-roster information.
 */
export interface ConsultContextEvent {
    Type?: string;
    Phase: ConsultContextPhase;
    OriginatingContactId: string;
    ConsultingAgent: {
        AgentID: string;
    };
    ConsultMode: ConsultContextMode;
    OriginatingCall?: {
        ContactID: string;
        ParticipantType: string;
        MediaType: string;
        Status: string;
        Direction?: string;
        Skill: string;
        CustomerANI: string;
        CustomerDNIS: string;
        ContactStartTime: string;
        LastStateChange: string;
        InteractionId?: string;
    };
    ConferenceState?: {
        InConference: string;
        PrimaryCallOnHold: string;
        Participants: Record<string, string>[];
    };
}
