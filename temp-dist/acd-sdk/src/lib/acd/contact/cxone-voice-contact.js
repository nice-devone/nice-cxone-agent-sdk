import { CallContactEventStatus, LocalStorageHelper, StorageKeys, } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType, PermissionKeys, } from '@nice-devone/common-sdk';
import { CXoneContact, ContactType, ControlButtonText, FeatureToggleService, VoiceControlService } from '@nice-devone/agent-sdk';
/**
 * Class to perform the business logic for show / hide and enable / disable the voice contact buttons
 */
export class CXoneVoiceContact extends CXoneContact {
    /**
     * @example
     * ```
     * const cxoneVoiceContact = new CXoneVoiceContact();
     * ```
     */
    constructor() {
        super();
        this.agentMuted = false;
        this.isMuteVisible = false;
        this.isMaskVisible = false;
        this.isRecordVisible = false;
        this.isStopRecordEnabled = false;
        this.hideInboundHangup = false;
        this.voiceControlService = new VoiceControlService();
        this.callControlButton = {};
        this.requireDisposition = false;
        this.updateAgentPreference();
    }
    /**
     * Update the class properties and button state for the consult call
     * @param callContactEvent - call contact event
     * @example
     * ```
     * this.updateCallControls(callContactEvent)
     * ```
     */
    updateCallControls(callContactEvent) {
        if (callContactEvent) {
            this.assignToCurrentContact(callContactEvent);
        }
        this.updateCallControlButtons();
    }
    /**
     * Update the class properties and button state for the consult call
     * @param callContactEvent - Call contact event
     * @example
     * ```
     * this.updateConsultCallControls(callContactEvent);
     * ```
     */
    updateConsultCallControls(callContactEvent) {
        if (callContactEvent) {
            this.assignToCurrentContact(callContactEvent);
        }
        this.updateMultiCallControlButtons();
    }
    /**
     * Get agentMute value from mute event to update mute button state
     * @param isAgentMuted - boolean
     * @example
     * ```
     * this.updateMuteState(false)
     * ```
     */
    updateMuteState(isAgentMuted) {
        this.agentMuted = isAgentMuted;
    }
    /**
     * Get isLogging value from record event to update record button state
     * @param isLogging - boolean
     * @example
     * ```
     * this.updateVoiceCallRecordState(true)
     * ```
     */
    updateVoiceCallRecordState(isLogging) {
        this.isLogging = isLogging;
    }
    /**
     * Method to check the agent has mute, record and mask permission
     * @example
     * ```
     * this.updateAgentPreference()
     * ```
     */
    updateAgentPreference() {
        this.isMuteVisible = false;
        this.isMaskVisible = false;
        this.isRecordVisible = false;
        this.isStopRecordEnabled = false;
        this.hideInboundHangup = false;
        const agentPermissions = LocalStorageHelper.getItem(StorageKeys.PERMISSIONS);
        const isStopRecordFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cma-stop-recording-AW-48493" /* FeatureToggles.STOP_RECORD_FEATURE_TOGGLE */) || false;
        if (agentPermissions) {
            const permissions = JSON.parse(agentPermissions);
            permissions.forEach((permission) => {
                switch (permission.key.toLowerCase()) {
                    case 'muteagent':
                        this.isMuteVisible = true;
                        break;
                    case 'masking':
                        this.isMaskVisible = true;
                        break;
                    case 'recordcontact':
                        this.isRecordVisible = true;
                        break;
                    case PermissionKeys.STOP_RECORDING.toLowerCase():
                        this.isStopRecordEnabled = isStopRecordFTEnabled;
                        break;
                    case 'hideinboundhangup':
                        this.hideInboundHangup = true;
                        break;
                }
            });
        }
    }
    /**
     * Method to initiate the button states
     */
    initiateButtonStates() {
        this.callControlButton = {
            hold: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.HOLD,
            },
            mute: {
                isVisible: this.isMuteVisible ? true : false,
                isEnable: true,
                controlText: ControlButtonText.MUTE,
            },
            end: {
                isVisible: !(this.isInbound && this.hideInboundHangup),
                isEnable: true,
                controlText: ControlButtonText.END,
            },
            mask: {
                isVisible: this.isMaskVisible ? true : false,
                isEnable: true,
                controlText: ControlButtonText.MASK,
            },
            record: {
                isVisible: this.isRecordVisible ? true : false,
                isEnable: true,
                controlText: ControlButtonText.RECORD,
            },
            transfer: {
                isVisible: true,
                isEnable: true,
                controlText: ControlButtonText.TRANSFER,
            },
        };
    }
    /**
     * Method to set state of the call controls when status is Active
     */
    updateCallControlButtonsOnActive() {
        this.callControlButton.hold.isEnable = true;
        this.callControlButton.mute.isEnable = true;
        this.callControlButton.mask.isEnable = true;
        this.callControlButton.record.isEnable = true;
        this.callControlButton.transfer.isEnable = true;
        this.callControlButton.end.isEnable = true;
    }
    /**
     * Method to set state of the call controls when status is holding
     */
    updateCallControlButtonsOnHold() {
        this.callControlButton.hold.isEnable = true;
        this.callControlButton.mute.isEnable = true;
        this.callControlButton.hold.controlText = ControlButtonText.RESUME;
        this.callControlButton.end.isEnable = false;
        this.callControlButton.mask.isEnable = false;
        this.callControlButton.record.isEnable = false;
    }
    /**
     * Method to set state of the call controls on mute
     */
    updateCallControlButtonsOnMute() {
        this.callControlButton.mute.isVisible = true;
        this.callControlButton.mute.isEnable = true;
        this.callControlButton.mute.controlText = ControlButtonText.UNMUTE;
        this.callControlButton.end.isEnable = false;
    }
    /**
     * Method to set state of the call controls when status is masking
     */
    updateCallControlButtonsOnMask() {
        this.callControlButton.mask.isVisible = true;
        this.callControlButton.mask.isEnable = true;
        this.callControlButton.mask.controlText = ControlButtonText.UNMASK;
        this.callControlButton.end.isEnable = false;
        this.callControlButton.hold.isEnable = false;
        this.callControlButton.record.isEnable = false;
    }
    /**
     * Method to set state of the Record button when isLogging is true
     */
    updateCallControlButtonsOnRecord() {
        this.callControlButton.record.isVisible = true;
        this.callControlButton.record.isEnable = this.isStopRecordEnabled;
        this.callControlButton.record.controlText = ControlButtonText.RECORDING;
    }
    /**
     * Method to set state of the call control when status is incoming
     */
    updateCallControlButtonsOnIncoming() {
        this.callControlButton.mute.isEnable = false;
        this.callControlButton.mask.isEnable = false;
        this.callControlButton.record.isEnable = false;
        this.callControlButton.hold.isEnable = false;
        this.callControlButton.transfer.isEnable = false;
        this.callControlButton.end.isEnable =
            this.status === CallContactEventStatus.INCOMING ? false : true;
    }
    /**
     * This method to set all call buttons visibility false when status is disconnected
     */
    updateCallControlButtonsOnEnd() {
        this.callControlButton.mute.isVisible = false;
        this.callControlButton.mask.isVisible = false;
        this.callControlButton.record.isVisible = false;
        this.callControlButton.hold.isVisible = false;
        this.callControlButton.end.isVisible = false;
        this.callControlButton.transfer.isVisible = false;
    }
    /**
     * This method to set all call buttons visibility true and enable false when status is disconnected in ACW state
     */
    updateCallControlButtonsOnACWState() {
        this.callControlButton.mute.isVisible = this.isMuteVisible ? true : false;
        this.callControlButton.mask.isVisible = this.isMaskVisible ? true : false;
        this.callControlButton.record.isVisible = this.isRecordVisible ? true : false;
        this.callControlButton.hold.isVisible = true;
        this.callControlButton.end.isVisible = !(this.isInbound && this.hideInboundHangup);
        this.callControlButton.transfer.isVisible = true;
        this.callControlButton.hold.isEnable = false;
        this.callControlButton.mute.isEnable = false;
        this.callControlButton.mask.isEnable = false;
        this.callControlButton.record.isEnable = false;
        this.callControlButton.transfer.isEnable = false;
        this.callControlButton.end.isEnable = false;
    }
    /**
     * This method to update the call control if consult call is started/running
     * @example - updateControlsOnConsultCallStarted()
     */
    updateControlsOnConsultCallStarted() {
        this.callControlButton.transfer.isEnable = false;
    }
    /**
     * Method to perform the logic for enable / disable the call controls
     */
    updateCallControlButtons() {
        if (!this.contactID)
            return;
        const status = this.status;
        const isLogging = this.isLogging;
        this.initiateButtonStates();
        if (status !== CallContactEventStatus.INCOMING &&
            status !== CallContactEventStatus.DISCONNECTED &&
            status !== CallContactEventStatus.DIALING) {
            if (status === CallContactEventStatus.ACTIVE) {
                this.updateCallControlButtonsOnActive();
            }
            if (status === CallContactEventStatus.HOLDING) {
                this.updateCallControlButtonsOnHold();
            }
            if (this.agentMuted) {
                this.updateCallControlButtonsOnMute();
            }
            if (status === CallContactEventStatus.MASKING) {
                this.updateCallControlButtonsOnMask();
            }
            if (isLogging) {
                this.updateCallControlButtonsOnRecord();
            }
            if (status === CallContactEventStatus.JOINED) {
                this.callControlButton.hold.isEnable = false;
            }
        }
        else if (status === CallContactEventStatus.DISCONNECTED && this.finalState) {
            this.updateCallControlButtonsOnEnd();
        }
        else if (status === CallContactEventStatus.DISCONNECTED && !this.finalState) {
            this.updateCallControlButtonsOnACWState();
        }
        else if (status === CallContactEventStatus.INCOMING ||
            status === CallContactEventStatus.DIALING) {
            this.updateCallControlButtonsOnIncoming();
        }
    }
    /**
     * Method to handle the controls for the second call contact
     */
    updateMultiCallControlButtons() {
        const status = this.status;
        this.initiateButtonStates();
        const isEndVisibile = !(this.isInbound && this.hideInboundHangup);
        // On Consult call enable the mute button permission basis(AW-7903)
        this.callControlButton.mute.isVisible = this.isMuteVisible ? true : false;
        this.callControlButton.mask.isVisible = false;
        this.callControlButton.record.isVisible = false;
        this.callControlButton.transfer.isVisible = false;
        //Update call controls on click on mute button in consult call(AW-7903)
        if (this.agentMuted) {
            this.updateCallControlButtonsOnMute();
        }
        if (this.isLogging) {
            this.updateCallControlButtonsOnRecord();
        }
        if (this.status === CallContactEventStatus.MASKING) {
            this.updateCallControlButtonsOnMask();
        }
        switch (status) {
            case CallContactEventStatus.DIALING:
                this.callControlButton.hold.isVisible = false;
                this.callControlButton.transfer.isVisible = true;
                this.callControlButton.end.isVisible = isEndVisibile;
                this.callControlButton.end.isEnable = true;
                break;
            case CallContactEventStatus.ACTIVE:
                this.callControlButton.hold.isVisible = true;
                this.callControlButton.hold.isEnable = true;
                this.callControlButton.hold.controlText = ControlButtonText.HOLD;
                this.callControlButton.end.isVisible = isEndVisibile;
                this.callControlButton.end.isEnable = true;
                this.callControlButton.transfer.isVisible = true;
                break;
            case CallContactEventStatus.HOLDING:
                this.callControlButton.hold.isVisible = true;
                this.callControlButton.hold.isEnable = true;
                this.callControlButton.hold.controlText = ControlButtonText.RESUME;
                this.callControlButton.end.isVisible = isEndVisibile;
                this.callControlButton.end.isEnable = false;
                this.callControlButton.transfer.isVisible = true;
                break;
            case CallContactEventStatus.JOINED:
            case CallContactEventStatus.MASKING:
                this.callControlButton.hold.isEnable = false;
                this.callControlButton.hold.isVisible = true;
                this.callControlButton.end.isVisible = isEndVisibile;
                this.callControlButton.end.isEnable = true;
                // Disabled transfer call for Conference as we cant make calls with more than 3 party
                this.callControlButton.transfer.isVisible = true;
                this.callControlButton.transfer.isEnable = false;
                this.callControlButton.mute.isVisible = this.isMuteVisible;
                this.callControlButton.mask.isVisible = this.isMaskVisible;
                this.callControlButton.record.isVisible = this.isRecordVisible;
                break;
            case CallContactEventStatus.DISCONNECTED:
                this.callControlButton.hold.isVisible = false;
                this.callControlButton.end.isVisible = false;
                break;
        }
    }
    /**
     * Update call controls
     * @example
     * ```
     * this.updateButtonState();
     * ```
     */
    updateButtonState() {
        this.updateCallControlButtons();
    }
    /**
     * assign the event properties to CXoneVoiceContact class property
     */
    assignToCurrentContact(callInfo) {
        this.contactID = callInfo.contactId;
        this.status = callInfo.status;
        this.type = ContactType.VOICE_CONTACT;
        this.skill = callInfo.skill;
        this.startTime = callInfo.startTime;
        this.lastStateChangeTime = callInfo.lastStateChangeTime;
        this.callType = callInfo.callType;
        this.ani = callInfo.ani;
        this.dnis = callInfo.dnis;
        this.label = callInfo.label;
        this.disconnectCode = callInfo.disconnectCode;
        this.externalId = callInfo.externalId;
        this.deliveryType = callInfo.deliveryType;
        this.screenPopUrl = callInfo.screenPopUrl;
        this.screenPopUrlVariables = callInfo.screenPopUrlVariables;
        this.customData = callInfo.customData;
        this.timeZones = callInfo.timeZones;
        this.otherInformation = callInfo.otherInformation;
        this.otherInformationNewFormat = callInfo.otherInformationNewFormat;
        this.blendingToSkillName = callInfo.blendingToSkillName;
        this.parentContactId = callInfo.parentContactId;
        this.isInbound = callInfo.isInbound;
        this.isLogging = !this.isStopRecordEnabled ? callInfo.isLogging : this.isLogging;
        this.isLinked = callInfo.isLinked;
        this.complianceRecord = callInfo.complianceRecord;
        this.finalState = callInfo.finalState;
        this.originalState = callInfo.originalState;
        this.allowDispositions = callInfo.allowDispositions;
        this.confirmationRequired = callInfo.confirmationRequired;
        this.ansMachineOverride = callInfo.ansMachineOverride;
        this.ansMachineOverrideEndTime = callInfo.ansMachineOverrideEndTime;
        this.timeout = callInfo.timeout;
        this.omniGroupId = callInfo.omniGroupId;
        this.masterID = callInfo.masterId;
        this.interactionId = callInfo.interactionId;
        this.isRequireManualAccept = callInfo.isRequireManualAccept;
        this.customerCardUrl = callInfo.customerCardUrl || '';
    }
    /**
     * Method to validate the contact has hold button then invoke the holdContact method
     * @example
     * ```
     * hold('123')
     * ```
     */
    hold() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.hold.isVisible &&
                this.callControlButton.hold.isEnable &&
                this.callControlButton.hold.controlText === ControlButtonText.HOLD) {
                this.voiceControlService.holdContact(this.contactID).then((resp) => {
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
     * Method to validate the contact has hold button then invoke the resumeContact method.
     * @example
     * ```
     * resume('123');
     * ```
     */
    resume() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.hold.isVisible &&
                this.callControlButton.hold.isEnable &&
                this.callControlButton.hold.controlText === ControlButtonText.RESUME) {
                this.voiceControlService.resumeContact(this.contactID).then((resp) => {
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
     * Method to validate the contact has mute button then invoke the muteAgent method.
     * @example
     * ```
     * mute();
     * ```
     */
    mute() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.mute.isVisible &&
                this.callControlButton.mute.isEnable &&
                this.callControlButton.mute.controlText === ControlButtonText.MUTE) {
                this.voiceControlService.muteAgent().then((resp) => {
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
     * Method to validate the contact has unmute acccess then invoke the unmute method.
     * @example
     * ```
     * unmute();
     * ```
     */
    unmute() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.mute.isVisible &&
                this.callControlButton.mute.isEnable &&
                this.callControlButton.mute.controlText === ControlButtonText.UNMUTE) {
                this.voiceControlService.unmuteAgent().then((resp) => {
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
     * Method to validate the contact has mask button then invoke the maskCall method.
     * @example
     * ```
     * mask();
     * ```
     */
    mask() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.mask.isVisible &&
                this.callControlButton.mask.isEnable &&
                this.callControlButton.mask.controlText === ControlButtonText.MASK) {
                this.voiceControlService.maskCall(this.contactID).then((resp) => {
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
     * Method to validate the contact has unmask access then invoke the unmask method.
     * @example
     * ```
     * unmask();
     * ```
     */
    unmask() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.mask.isVisible &&
                this.callControlButton.mask.isEnable &&
                this.callControlButton.mask.controlText === ControlButtonText.UNMASK) {
                this.voiceControlService.unmaskCall(this.contactID).then((resp) => {
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
     * Method to validate the contact has record button then invoke the recordCall method.
     * @example
     * ```
     * record();
     * ```
     */
    record() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.record.isVisible &&
                this.callControlButton.record.isEnable &&
                this.callControlButton.record.controlText === ControlButtonText.RECORD) {
                this.voiceControlService.recordCall(this.contactID).then((resp) => {
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
     * Method to validate the contact has record button then invoke the stopCallRecording method.
     * @example
     * ```
     * stopRecord();
     * ```
     */
    stopRecord() {
        return new Promise((resolve, reject) => {
            if (this.callControlButton.record.isVisible &&
                this.callControlButton.record.isEnable &&
                this.callControlButton.record.controlText === ControlButtonText.RECORDING) {
                this.voiceControlService.stopCallRecording(this.contactID).then((resp) => {
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
            if (this.callControlButton.end.isVisible &&
                this.callControlButton.end.isEnable) {
                this.voiceControlService.endContact(this.contactID).then((resp) => {
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
}
//# sourceMappingURL=cxone-voice-contact.js.map