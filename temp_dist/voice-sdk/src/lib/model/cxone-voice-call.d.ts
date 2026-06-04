import { CXoneVoiceCallStatus } from '../enums/cxone-voice-call-status';
/**
 * Interface representing a CXone voice call.
 */
export interface CXoneVoiceCall {
    status: CXoneVoiceCallStatus;
    contactId: string;
    localStream?: MediaStream;
    remoteStream?: MediaStream;
    audioCode?: object;
    call?: object;
}
