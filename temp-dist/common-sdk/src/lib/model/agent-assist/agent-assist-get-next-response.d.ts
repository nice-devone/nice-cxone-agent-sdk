import { MediaType } from '../../../enum/media-type';
/**
 * GetNextAgentAssistEvent is the response object for the Agent Assist get-next response.
 */
export interface GetNextAgentAssistEvent {
    webSocketUri: string;
    contactId: string;
    subscriptions: string[];
    mediaType: MediaType;
    providerId?: string;
    agentAssistType?: string;
    providerType?: string;
    profileName?: string;
    customerId?: string;
}
