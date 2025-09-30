export interface VoiceTranscriptionWebSocketResponse {
    topic: string;
    vendorList: string[];
    mediaType: string;
    busNo: number;
    messageType: string;
    version: string;
    data: VoiceTranscriptionData;
    traceId: string;
}
export interface VoiceTranscriptionData {
    transcriptionEventId: string;
    contactId: string;
    busNo: number;
    tenantId: string;
    agentUUId: string;
    masterId: string;
    participantId: string;
    messageBody: string;
    messageMetaData: {
        completeUtterance: boolean;
    };
    agentAssistAppConfig: {
        scriptParams: string;
    };
    messageIsCompletedUtterance: boolean;
    agentId: number;
    mediaType: string;
    transcriptionSrNo: number;
    languageCode: string;
    channelTag: string | null;
    createdtimestamp: string;
    audioProcessed: string;
    transcriptionProvider: string;
    words: VoiceTranscriptionWords[];
}
export interface VoiceTranscriptionWords {
    words: VoiceTranscriptionWord[];
}
export interface VoiceTranscriptionWord {
    startTime: {
        seconds: number;
        nanos: number;
    };
    endTime: {
        seconds: number;
        nanos: number;
    };
    word: string;
    confidence: number;
    speakerTag: number;
}
