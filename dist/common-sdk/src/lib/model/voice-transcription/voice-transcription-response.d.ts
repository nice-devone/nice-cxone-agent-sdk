import { AgentAssistBaseResponse } from '../agent-assist/agent-assist-base-response';
import { VoiceTranscriptionWebSocketResponse } from './interfaces/voice-transcription-web-socket-response';
/**
 * Represents the WebSocket response for voice transcription.
 */
export declare class VoiceTranscriptionResponse extends AgentAssistBaseResponse {
    body: VoiceTranscriptionWebSocketResponse;
    /**
     * Initializes a new instance of the VoiceTranscriptionWebSocketResponse class.
     * @example
     * const voiceTranscriptionWebSocketResponse = new VoiceTranscriptionWebSocketResponse();
     */
    constructor(response: AgentAssistBaseResponse);
}
