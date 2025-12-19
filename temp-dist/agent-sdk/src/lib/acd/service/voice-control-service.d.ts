import { HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to handling voice controls
 */
export declare class VoiceControlService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private acdSession;
    /**
     * @example
     * ```
     * const voiceControlSvc = new VoiceControlService();
     * ```
     */
    constructor();
    /**
     * Method to hold the active contact
     * @param contactId - Active contactId
     * @example
     * ```
     * holdContact(123);
     * ```
     */
    holdContact(contactId: string): Promise<HttpResponse>;
    /**
     * Method to resume the holding contact
     * @param contactId - holding contactId
     * @example
     * ```
     * resumeContact(123);
     * ```
     */
    resumeContact(contactId: string): Promise<HttpResponse>;
    /**
     * Method to mute the agent
     * @example
     * ```
     * muteAgent();
     * ```
     */
    muteAgent(): Promise<HttpResponse>;
    /**
     * Method to unmute the agent
     * @example
     * ```
     * unmuteAgent();
     * ```
     */
    unmuteAgent(): Promise<HttpResponse>;
    /**
     * Method to mask a call
     * @param contactId - contact Id
     * @example -
     * ```
     * maskCall(contactId);
     * ```
     */
    maskCall(contactId: string): Promise<HttpResponse>;
    /**
     * Method to stop masking a call
     * @param contactId - contact Id
     * @example -
     * ```
     * unmaskCall(contactId);
     * ```
     */
    unmaskCall(contactId: string): Promise<HttpResponse>;
    /**
     * Method to record a call
     * @param contactId - contact Id
     * @example -
     * ```
     * recordCall(contactId);
     * ```
     */
    recordCall(contactId: string): Promise<HttpResponse>;
    /**
     * Method to stop call recording
     * @param contactId - contact Id
     * @example -
     * ```
     * stopCallRecording(contactId);
     * ```
     */
    stopCallRecording(contactId: string): Promise<HttpResponse>;
    /**
     * This method to end the contact
     * @param contactId -  contact id
     * @example
     * ```
     * endContact(23423423);
     * ```
     */
    endContact(contactId: string): Promise<HttpResponse>;
    /**
     *  Method to transfer voicemail
     *
     *  @example -
     * ```
     * transferVoicemailContact("123", "234");
     * ```
     */
    transferVoicemailContact(contactId: string, agentId: string): Promise<HttpResponse>;
    /**
     * This method will play a voicemail contact audio at the specified position
     * @param contactId -  contact id
     * @param playTimeStamp - Include date/time in audio playback
     * @param position -  Position of the wav file at a specified second
     * @example
     * ```
     * playVoiceMail(23423423, true, 50);
     * ```
     *
     */
    playVoiceMail(contactId: string, playTimeStamp: boolean, position: number): Promise<HttpResponse>;
}
