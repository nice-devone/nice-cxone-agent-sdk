import { VoiceMailContactEventStatus, } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType, } from '@nice-devone/common-sdk';
import { ContactType, ControlButtonText, CXoneContact, VoiceControlService } from '@nice-devone/agent-sdk';
/**
 * Class to perform the business logic for show / hide and enable / disable the voice contact buttons
 */
export class CXoneVoiceMailContact extends CXoneContact {
    constructor() {
        super(...arguments);
        this.voiceControlService = new VoiceControlService();
        this.voiceMailControlButton = {};
        /**
         * @remarks - represent model for has voicemail auto played
         */
        this.initialHasPlayed = false;
    }
    /**
     * Update the class properties and button state for the vm
     * @param voiceMailContactEvent - vm contact event
     * @example
     * ```
     * this.updateVoiceMailControls(voiceMailContactEvent)
     * ```
     */
    updateVoiceMailControls(voiceMailContactEvent) {
        if (voiceMailContactEvent) {
            this.updateCurrentContactInfo(voiceMailContactEvent);
        }
        this.updateVoiceMailControlButtons();
    }
    /**
     * Method to initiate the button states
     */
    initiateButtonStates() {
        this.voiceMailControlButton = {
            play: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.PLAY,
            },
            pause: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.PAUSE,
            },
            back: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.BACK,
            },
            forward: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.FORWARD,
            },
            callback: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.CALLBACK,
            },
            end: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.END,
            },
            transfer: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.TRANSFER,
            },
        };
    }
    /**
     * Method to set state of the vm controls when status is Active
     */
    updateVoiceMailControlButtonsOnActive() {
        this.voiceMailControlButton.back.isEnable = true;
        this.voiceMailControlButton.callback.isEnable = true;
        this.voiceMailControlButton.end.isEnable = true;
        this.voiceMailControlButton.forward.isEnable = true;
        this.voiceMailControlButton.pause.isEnable = true;
        this.voiceMailControlButton.pause.isVisible = true;
        this.voiceMailControlButton.play.isEnable = true;
        this.voiceMailControlButton.transfer.isEnable = true;
    }
    /**
     * Method to set state of the vm controls when status is holding
     */
    updateVoiceMailControlButtonsOnHold() {
        this.voiceMailControlButton.back.isEnable = false;
        this.voiceMailControlButton.callback.isEnable = false;
        this.voiceMailControlButton.end.isEnable = false;
        this.voiceMailControlButton.forward.isEnable = false;
        this.voiceMailControlButton.pause.isEnable = false;
        this.voiceMailControlButton.play.isEnable = true;
        this.voiceMailControlButton.transfer.isEnable = false;
    }
    /**
     * Method to set state of the call control when status is incoming
     */
    updateVoiceMailControlButtonsOnIncoming() {
        this.voiceMailControlButton.back.isEnable = false;
        this.voiceMailControlButton.callback.isEnable = false;
        this.voiceMailControlButton.forward.isEnable = false;
        this.voiceMailControlButton.pause.isEnable = false;
        this.voiceMailControlButton.play.isEnable = false;
        this.voiceMailControlButton.transfer.isEnable = false;
        this.voiceMailControlButton.end.isEnable =
            this.voiceMailEventData.status === VoiceMailContactEventStatus.INCOMING ? false : true;
    }
    /**
     * This method to set all call buttons visibility false when status is disconnected
     */
    updateVoiceMailControlButtonsOnEnd() {
        this.voiceMailControlButton.back.isVisible = false;
        this.voiceMailControlButton.callback.isVisible = false;
        this.voiceMailControlButton.end.isVisible = false;
        this.voiceMailControlButton.forward.isVisible = false;
        this.voiceMailControlButton.pause.isVisible = false;
        this.voiceMailControlButton.play.isVisible = false;
        this.voiceMailControlButton.transfer.isVisible = false;
    }
    /**
     * This method to set all call buttons visibility true and enable false when status is disconnected in ACW state
     */
    updateVoiceMailControlButtonsOnACWState() {
        this.voiceMailControlButton.back.isEnable = false;
        this.voiceMailControlButton.callback.isEnable = false;
        this.voiceMailControlButton.end.isEnable = false;
        this.voiceMailControlButton.forward.isEnable = false;
        this.voiceMailControlButton.pause.isEnable = false;
        this.voiceMailControlButton.play.isEnable = false;
        this.voiceMailControlButton.transfer.isEnable = false;
    }
    /**
     * Method to perform the logic for enable / disable the vm controls
     */
    updateVoiceMailControlButtons() {
        if (!this.voiceMailEventData.contactId)
            return;
        const status = this.voiceMailEventData.status;
        this.initiateButtonStates();
        if (status !== VoiceMailContactEventStatus.INCOMING
            && status !== VoiceMailContactEventStatus.DISCARDED) {
            if (status === VoiceMailContactEventStatus.ACTIVE) {
                this.updateVoiceMailControlButtonsOnActive();
            }
            if (status === VoiceMailContactEventStatus.HOLDING) {
                this.updateVoiceMailControlButtonsOnHold();
            }
        }
        else if (status === VoiceMailContactEventStatus.DISCARDED
            && this.voiceMailEventData.finalState) {
            this.updateVoiceMailControlButtonsOnEnd();
        }
        else if (status === VoiceMailContactEventStatus.DISCARDED
            && !this.voiceMailEventData.finalState) {
            this.updateVoiceMailControlButtonsOnACWState();
        }
        else if (status === VoiceMailContactEventStatus.INCOMING) {
            this.updateVoiceMailControlButtonsOnIncoming();
        }
    }
    /**
     * Update vm controls
     * @example
     * ```
     * this.updateButtonState();
     * ```
     */
    updateButtonState() {
        this.updateVoiceMailControlButtons();
    }
    /**
     * assign the event properties to CXoneVoiceMailContact class property
     */
    updateCurrentContactInfo(vmInfo) {
        this.voiceMailEventData = vmInfo;
        this.type = ContactType.VOICEMAIL_CONTACT;
        this.skill = vmInfo.skill || '';
        this.lastStateChangeTime = vmInfo.lastStateChangeTime;
        this.finalState = vmInfo.finalState;
        this.status = vmInfo.status;
        this.contactID = vmInfo.contactId;
        this.from = vmInfo.from || '';
    }
    /**
     * Method to validate the contact has pause button then invoke the holdContact method
     * @example
     * ```
     * pause('123')
     * ```
     */
    pause() {
        return new Promise((resolve, reject) => {
            if (this.voiceMailControlButton.pause.isVisible &&
                this.voiceMailControlButton.pause.isEnable &&
                this.voiceMailControlButton.pause.controlText === ControlButtonText.PAUSE) {
                this.voiceControlService.holdContact(this.voiceMailEventData.contactId).then((resp) => {
                    resolve(resp);
                }, (err) => {
                    reject(err);
                });
            }
            else {
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Unauthorized method invocation'));
            }
        });
    }
    /**
     * Method to validate the contact has play button then invoke the resumeContact method.
     * @example
     * ```
     * resume('123');
     * ```
     */
    play() {
        return new Promise((resolve, reject) => {
            if (this.voiceMailControlButton.play.isVisible &&
                this.voiceMailControlButton.play.isEnable &&
                this.voiceMailControlButton.play.controlText === ControlButtonText.PLAY) {
                this.voiceControlService.resumeContact(this.voiceMailEventData.contactId).then((resp) => {
                    resolve(resp);
                }, (err) => {
                    reject(err);
                });
            }
            else {
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Unauthorized method invocation'));
            }
        });
    }
    /**
     * Method to validate the contact has end button then invoke the endContact method.
     * @example
     * ```
     * end('123');
     * ```
     */
    end() {
        return new Promise((resolve, reject) => {
            if (this.voiceMailControlButton.end.isVisible &&
                this.voiceMailControlButton.end.isEnable) {
                this.voiceControlService.endContact(this.voiceMailEventData.contactId).then((resp) => {
                    resolve(resp);
                }, (err) => {
                    reject(err);
                });
            }
            else {
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Unauthorized method invocation'));
            }
        });
    }
    /**
     * Method to transfer a voicemail contact.
     * @param agentId - id of agent initiating the transfer
     * @example
     * ```
     * transfer('123');
     * ```
     */
    transfer(agentId) {
        const contactId = this.contactID;
        return new Promise((resolve, reject) => {
            this.voiceControlService
                .transferVoicemailContact(contactId, agentId)
                .then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * Method to play the voicemail audio
     * @param playTimeStamp - Include date/time in audio playback
     * @param position -  Position of the wav file at a specified second
     * @example
     * ```
     * playVoiceMail(true, 50);
     * ```
     */
    playVoiceMail(playTimeStamp, position) {
        return new Promise((resolve, reject) => {
            this.voiceControlService.playVoiceMail(this.voiceMailEventData.contactId, playTimeStamp, position).then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
    /**
     * Method to take the voicemail off hold
     * @example
     * ```
     * resumeVoiceMail();
     * ```
     */
    resumeVoiceMail() {
        return new Promise((resolve, reject) => {
            this.voiceControlService.resumeContact(this.voiceMailEventData.contactId).then((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
    }
}
//# sourceMappingURL=cxone-voicemail-contact.js.map