import { HttpResponse } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { DialPhoneRequest } from '../model/dial-phone-request';
import { SendDtmfRequest } from '../model/send-dtmf-request';
/**
 * Class to handling voice controls
 */
export declare class VoiceService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private acdSession;
    private isAddContactInProgress;
    private TRANSFER_VOICE_MAIL_SKILL;
    /**
     * @example
     * ```
     * const voiceSvc = new VoiceService();
     * ```
     */
    constructor();
    /**
     * Method to place an outbound call
     * @param contactDetails - it contains properties like phone no, skill id and parentContactId
     * @example -
     * ```
     * dialPhone(contactDetails);
     * ```
     */
    dialPhone(dialPhoneRequest: DialPhoneRequest): Promise<HttpResponse>;
    /**
     * Method to send the dtmf
     * @param sendDtmfRequest - it contains properties like dtmf sequence, tone duration and tone spacing
     * @example
     * ```
     * sendDtmf(sendDtmfRequest);
     * ```
     */
    sendDtmf(sendDtmfRequest: SendDtmfRequest): Promise<HttpResponse>;
    /**
     * Method to make a consult to agent
     * @param agentId - agent id
     * @example
     * ```
     * consultAgent(12345)
     * ```
     */
    consultAgent(agentId: number): Promise<HttpResponse>;
    /** Method to make the conference call
     * @example -
     * ```
     * conferenceCall();
     * ```
     */
    conferenceCall(): Promise<HttpResponse>;
    /**
    * This method to make a call with agent
    * @param agentId - agent Id
    * @param parentContactId - existing call contact id
    * @example -
    * ```
    * dialAgent('23344','234234324');
    * ```
    */
    dialAgent(agentId: string, parentContactId: string): Promise<HttpResponse>;
    /**
     * This method to make a call with another skill
     * @param skillId - skill Id
     * @example -
     * ```
     * dialSkill(23344);
     * ```
     */
    dialSkill(skillId: number): Promise<HttpResponse>;
    /**
     *  This method to transfer call
     *
     *  @example -
     * ```
     * transferContact();
     * ```
     */
    transferContact(): Promise<HttpResponse>;
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
     *  This method will be triggered when requested for a new contact
     *
     *  @example -
     * ```
     * requestInteraction();
     * ```
     */
    requestInteraction(routabilityObject: string): Promise<HttpResponse>;
    /**
     *  Method to transfer voicemail to skill
     *
     *  @example -
     * ```
     * transferVoicemailSkill("123", "234");
     * ```
     */
    transferVoicemailSkill(contactId: string, skillId: number): Promise<HttpResponse>;
    /** Method to hold the conference call
     * @example -
     * ```
     * conferenceHold();
     * ```
     */
    conferenceHold(conferenceNo: string): Promise<HttpResponse>;
    /** Method to resume the conference call
     * @example -
     * ```
     * conferenceResume();
     * ```
     */
    conferenceResume(conferenceNo: string): Promise<HttpResponse>;
    /** Method to join in to the conference call
     * @example -
     * ```
     * conferenceJoin();
     * ```
     */
    conferenceJoin(contactId: string, conferenceNo: string): Promise<HttpResponse>;
    /** Send the continue reskill API
     * @example -
     * ```
     * sendContinueReskill();
     * ```
     */
    sendContinueReskill(continueReskill: boolean): Promise<HttpResponse>;
}
