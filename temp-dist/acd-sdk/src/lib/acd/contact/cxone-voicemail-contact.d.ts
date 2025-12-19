import { VoiceMailContactEvent, CXoneSdkError, HttpResponse } from '@nice-devone/common-sdk';
import { CXoneContact, VoiceMailControlButton } from '@nice-devone/agent-sdk';
/**
 * Class to perform the business logic for show / hide and enable / disable the voice contact buttons
 */
export declare class CXoneVoiceMailContact extends CXoneContact {
    voiceMailEventData: VoiceMailContactEvent;
    private voiceControlService;
    voiceMailControlButton: VoiceMailControlButton;
    /**
    * @remarks - represent model for last state change time
    */
    lastStateChangeTime: Date;
    /**
     * @remarks - represent model for final state
     */
    finalState: boolean;
    /**
     * @remarks - represent model for from
     */
    from: string;
    /**
     * @remarks - represent model for has voicemail auto played
     */
    initialHasPlayed: boolean;
    /**
     * Update the class properties and button state for the vm
     * @param voiceMailContactEvent - vm contact event
     * @example
     * ```
     * this.updateVoiceMailControls(voiceMailContactEvent)
     * ```
     */
    updateVoiceMailControls(voiceMailContactEvent?: VoiceMailContactEvent): void;
    /**
     * Method to initiate the button states
     */
    private initiateButtonStates;
    /**
     * Method to set state of the vm controls when status is Active
     */
    private updateVoiceMailControlButtonsOnActive;
    /**
     * Method to set state of the vm controls when status is holding
     */
    private updateVoiceMailControlButtonsOnHold;
    /**
     * Method to set state of the call control when status is incoming
     */
    private updateVoiceMailControlButtonsOnIncoming;
    /**
     * This method to set all call buttons visibility false when status is disconnected
     */
    private updateVoiceMailControlButtonsOnEnd;
    /**
     * This method to set all call buttons visibility true and enable false when status is disconnected in ACW state
     */
    private updateVoiceMailControlButtonsOnACWState;
    /**
     * Method to perform the logic for enable / disable the vm controls
     */
    private updateVoiceMailControlButtons;
    /**
     * Update vm controls
     * @example
     * ```
     * this.updateButtonState();
     * ```
     */
    updateButtonState(): void;
    /**
     * assign the event properties to CXoneVoiceMailContact class property
     */
    private updateCurrentContactInfo;
    /**
     * Method to validate the contact has pause button then invoke the holdContact method
     * @example
     * ```
     * pause('123')
     * ```
     */
    pause(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has play button then invoke the resumeContact method.
     * @example
     * ```
     * resume('123');
     * ```
     */
    play(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to validate the contact has end button then invoke the endContact method.
     * @param forceEnd - boolean to force end the contact, this should only be used AFTER necessary API has been sent, see example.
     * @example
     * ```
     * end();
     *
     * or
     *
     * voiceMailContact.resumeVoiceMail().then(() => {
     *   voiceMailContact.end(true);
     * });
     * ```
     */
    end(forceEnd?: boolean): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to transfer a voicemail contact.
     * @param agentId - id of agent initiating the transfer
     * @example
     * ```
     * transfer('123');
     * ```
     */
    transfer(agentId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to play the voicemail audio
     * @param playTimeStamp - Include date/time in audio playback
     * @param position -  Position of the wav file at a specified second
     * @example
     * ```
     * playVoiceMail(true, 50);
     * ```
     */
    playVoiceMail(playTimeStamp: boolean, position: number): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to take the voicemail off hold
     * @example
     * ```
     * resumeVoiceMail();
     * ```
     */
    resumeVoiceMail(): Promise<HttpResponse | CXoneSdkError>;
}
