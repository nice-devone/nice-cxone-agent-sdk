import { CallContactEvent, CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
import { CXoneContact, CallControlButton } from '@nice-devone/agent-sdk';
/**
 * Class to perform the business logic for show / hide and enable / disable the voice contact buttons
 */
export declare class CXoneVoiceContact extends CXoneContact {
    agentMuted: boolean;
    private isMuteVisible;
    private isMaskVisible;
    private isRecordVisible;
    private hideInboundHangup;
    private voiceControlService;
    callControlButton: CallControlButton;
    callType: string;
    ani: string;
    dnis: string;
    label: string;
    disconnectCode: string;
    externalId: string;
    deliveryType: string;
    screenPopUrl: string;
    screenPopUrlVariables: {
        [key: string]: string;
    }[];
    customData: string;
    timeZones: string;
    otherInformation: string;
    otherInformationNewFormat: string;
    blendingToSkillName: string;
    parentContactId: string;
    isInbound: boolean;
    isLogging: boolean;
    isLinked: boolean;
    complianceRecord: boolean;
    finalState: boolean;
    originalState: boolean;
    allowDispositions: boolean;
    confirmationRequired: boolean;
    ansMachineOverride: boolean;
    ansMachineOverrideEndTime: string;
    timeout: number;
    omniGroupId: string;
    masterID: string;
    lastStateChangeTime: Date;
    requireDisposition: boolean;
    interactionId: string;
    isRequireManualAccept: boolean;
    customerCardUrl: string;
    customerName: string;
    voiceBioHubPatronId: string;
    /**
     * @example
     * ```
     * const cxoneVoiceContact = new CXoneVoiceContact();
     * ```
     */
    constructor();
    /**
     * Update the class properties and button state for the consult call
     * @param callContactEvent - call contact event
     * @example
     * ```
     * this.updateCallControls(callContactEvent)
     * ```
     */
    updateCallControls(callContactEvent?: CallContactEvent): void;
    /**
     * Update the class properties and button state for the consult call
     * @param callContactEvent - Call contact event
     * @example
     * ```
     * this.updateConsultCallControls(callContactEvent);
     * ```
     */
    updateConsultCallControls(callContactEvent?: CallContactEvent): void;
    /**
     * Get agentMute value from mute event to update mute button state
     * @param isAgentMuted - boolean
     * @example
     * ```
     * this.updateMuteState(false)
     * ```
     */
    updateMuteState(isAgentMuted: boolean): void;
    /**
     * Get isLogging value from record event to update record button state
     * @param isLogging - boolean
     * @example
     * ```
     * this.updateVoiceCallRecordState(true)
     * ```
     */
    updateVoiceCallRecordState(isLogging: boolean): void;
    /**
     * Method to check the agent has mute, record and mask permission
     * @example
     * ```
     * this.updateAgentPreference()
     * ```
     */
    updateAgentPreference(): void;
    /**
     * Method to initiate the button states
     */
    private initiateButtonStates;
    /**
     * Method to set state of the call controls when status is Active
     */
    private updateCallControlButtonsOnActive;
    /**
     * Method to set state of the call controls when status is holding
     */
    private updateCallControlButtonsOnHold;
    /**
     * Method to set state of the call controls on mute
     */
    private updateCallControlButtonsOnMute;
    /**
     * Method to set state of the call controls when status is masking
     */
    private updateCallControlButtonsOnMask;
    /**
     * Method to set state of the Record button when isLogging is true
     */
    private updateCallControlButtonsOnRecord;
    /**
     * Method to set state of the call control when status is incoming
     */
    private updateCallControlButtonsOnIncoming;
    /**
     * This method to set all call buttons visibility false when status is disconnected
     */
    private updateCallControlButtonsOnEnd;
    /**
     * This method to set all call buttons visibility true and enable false when status is disconnected in ACW state
     */
    private updateCallControlButtonsOnACWState;
    /**
     * This method to update the call control if consult call is started/running
     * @example - updateControlsOnConsultCallStarted()
     */
    updateControlsOnConsultCallStarted(): void;
    /**
     * Method to perform the logic for enable / disable the call controls
     */
    private updateCallControlButtons;
    /**
     * Method to handle the controls for the second call contact
     */
    private updateMultiCallControlButtons;
    /**
     * Update call controls
     * @example
     * ```
     * this.updateButtonState();
     * ```
     */
    updateButtonState(): void;
    /**
     * assign the event properties to CXoneVoiceContact class property
     */
    private assignToCurrentContact;
    /**
     * Method to validate the contact has hold button then invoke the holdContact method
     * @example
     * ```
     * hold('123')
     * ```
     */
    hold(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has hold button then invoke the resumeContact method.
     * @example
     * ```
     * resume('123');
     * ```
     */
    resume(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has mute button then invoke the muteAgent method.
     * @example
     * ```
     * mute();
     * ```
     */
    mute(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has unmute acccess then invoke the unmute method.
     * @example
     * ```
     * unmute();
     * ```
     */
    unmute(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has mask button then invoke the maskCall method.
     * @example
     * ```
     * mask();
     * ```
     */
    mask(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has unmask access then invoke the unmask method.
     * @example
     * ```
     * unmask();
     * ```
     */
    unmask(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has record button then invoke the recordCall method.
     * @example
     * ```
     * record();
     * ```
     */
    record(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has end button then invoke the endContact method.
     * @example
     * ```
     * end('123');
     * ```
     */
    end(): Promise<HttpResponse | CXoneSdkError>;
}
