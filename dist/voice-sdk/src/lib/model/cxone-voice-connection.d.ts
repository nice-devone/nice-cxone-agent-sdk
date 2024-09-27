import { CXoneVoiceConnectionStatus } from '../enums/cxone-voice-connection-status';
/**
 * Interface representing the credentials required for Iris.
 */
export interface IrisCredentials {
    user: string;
    team: string;
    key: string;
}
/**
 * Interface representing a CXone voice connection.
 */
export interface CXoneVoiceConnection {
    status: CXoneVoiceConnectionStatus;
    isLoggedIn: boolean;
    credentials?: IrisCredentials;
}
