/**
 * Indicates all WebRTC server connection options
 */
export interface CXoneVoiceConnectionOptions {
    webRTCType: string;
    webRTCWssUrls: Array<string>;
    webRTCServerDomain: string;
    webRTCIceUrls: Array<string>;
    webRTCDnis: string;
    noiseCancellation?: boolean;
    echoCancellation?: boolean;
}
