import { AutoSummaryStatus } from '../../enum/auto-summary/auto-summary-status';
import { AutoSummaryErrorCode } from '../../enum/auto-summary/auto-summary-error-code';
export interface AutoSummaryBroadcastData {
    contactId: string;
    type: string;
    data?: any;
}
export interface AgentAssistEventData {
    Type: string;
    AppUri: string;
    AppTitle: string;
    ContactId: string;
    WebSocketUri: string;
    Subscriptions: any;
    Params: any;
    AgentAssistId: string;
    GlobalClusterSettingNameToOverrideAppUrl: string;
}
export interface AutoSummaryData {
    schemaVersion: string;
    messageType: AutoSummaryStatus;
    messageError: AutoSummaryErrorCode;
    sourceTime: string;
    agentId: string;
    agentUUID: string;
    tenantId: string;
    tenantBusNo: string;
    masterId: string;
    sessionId: string;
    agentAssistParams: {
        language: string;
        enlightenModel: string;
        aiMode: string;
    };
    languageCode: string;
    text: string;
}
