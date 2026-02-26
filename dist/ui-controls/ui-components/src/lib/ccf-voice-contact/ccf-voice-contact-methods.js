import { __awaiter } from "tslib";
import { CcfLogger, ControlButtonText, FeatureToggleService } from '@nice-devone/agent-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CallContactEventStatus } from '@nice-devone/core-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
export const CCF_VOICE_CONTACT = 'voiceContact';
const VOICE_CONTACT_HOLD = 'voiceContact/hold';
const VOICE_CONTACT_MUTE = 'voiceContact/mute';
const VOICE_CONTACT_RECORD = 'voiceContact/record';
const VOICE_CONTACT_MASK = 'voiceContact/mask';
const VOICE_CONTACT_END = 'voiceContact/end';
const VOICE_CONTACT_DTMF_TONES = 'voiceContact/Dtmf_Tones';
const logger = new CcfLogger();
/**
 * sendDtmf asyncthunk used to send the number dialed
 * @example - dispatch(sendDtmf())
*/
export const sendDtmf = createAsyncThunk(VOICE_CONTACT_DTMF_TONES, (data) => __awaiter(void 0, void 0, void 0, function* () {
    const sendDtmf = {
        dtmfSequence: data.digit,
        toneDurationMS: (data && data.toneDurationMS) || 340,
        toneSpacingMS: (data && data.toneDurationMS) || 0,
    };
    yield CXoneAcdClient.instance.contactManager.voiceService
        .sendDtmf(sendDtmf)
        .then((success) => {
        logger.debug('[CcfVoiceContactMethods][sendDtmf]', `status: ${JSON.stringify(success.status)}`);
    })
        .catch((error) => {
        logger.debug('[CcfVoiceContactMethods][sendDtmf]', `payload: ${JSON.stringify(error)}`);
    });
}));
export const holdVoiceContact = createAsyncThunk(VOICE_CONTACT_HOLD, (callContact) => __awaiter(void 0, void 0, void 0, function* () {
    if (callContact.status === CallContactEventStatus.ACTIVE) {
        const holdContact = yield callContact.hold().catch((err) => {
            logger.error('holdButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return holdContact;
    }
    else if (callContact.status === CallContactEventStatus.HOLDING) {
        const resumingVoiceContact = yield callContact.resume().catch((err) => {
            logger.error('resumeButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return resumingVoiceContact;
    }
}));
export const muteVoiceContact = createAsyncThunk(VOICE_CONTACT_MUTE, (callContact) => __awaiter(void 0, void 0, void 0, function* () {
    if (callContact.callControlButton.mute.controlText === ControlButtonText.MUTE) {
        const muteContact = yield callContact.mute().catch((err) => {
            logger.error('muteButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return muteContact;
    }
    else {
        const unmuteContact = yield callContact.unmute().catch((err) => {
            logger.error('unMutebuttonButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return unmuteContact;
    }
}));
export const recordVoiceContact = createAsyncThunk(VOICE_CONTACT_RECORD, (callContact, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const isStopRecordFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cma-stop-recording-AW-48493" /* FeatureToggles.STOP_RECORD_FEATURE_TOGGLE */) || false;
    if (callContact.callControlButton.record.controlText === ControlButtonText.RECORD) {
        const recordingVoiceContact = yield callContact.record().catch((err) => {
            logger.error('recordCallButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return recordingVoiceContact;
    }
    else if (isStopRecordFTEnabled && callContact.callControlButton.record.controlText === ControlButtonText.RECORDING) {
        try {
            const stopRecordingVoiceContact = yield callContact.stopRecord();
            return stopRecordingVoiceContact;
        }
        catch (err) {
            logger.error('stopRecordButtonClick', 'Failed ' + JSON.stringify(err));
            return rejectWithValue(err);
        }
    }
}));
export const maskVoiceContact = createAsyncThunk(VOICE_CONTACT_MASK, (callContact) => __awaiter(void 0, void 0, void 0, function* () {
    if (callContact.callControlButton.mask.controlText === ControlButtonText.MASK) {
        const maskContact = yield callContact.mask().catch((err) => {
            logger.error('maskButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return maskContact;
    }
    else {
        const unmaskContact = yield callContact.unmask().catch((err) => {
            logger.error('unMaskButtonClick', 'Failed ' + JSON.stringify(err));
        });
        return unmaskContact;
    }
}));
export const endTheVoiceContact = createAsyncThunk(VOICE_CONTACT_END, (callContact) => __awaiter(void 0, void 0, void 0, function* () {
    const endVoiceContact = yield callContact.end().catch((err) => {
        logger.error('EndCallButtonClick', 'Failed ' + JSON.stringify(err));
    });
    return endVoiceContact;
}));
/**
 * to Check the contact is Preview Contact
 * @example - isPreviewContact(voiceContact)
*/
export const isPreviewContact = (callContact) => {
    return ((callContact === null || callContact === void 0 ? void 0 : callContact.complianceRecord) || (callContact === null || callContact === void 0 ? void 0 : callContact.confirmationRequired));
};
/**
 * to get preview skill values
 * @example - getPreviewSkillProps(voiceContact, deliveryParameters)
*/
export const getPreviewSkillProps = (callContact, deliveryParameters) => {
    if (callContact === null || callContact === void 0 ? void 0 : callContact.complianceRecord) {
        return {
            disposition: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showComplianceButtonDisposition,
            reschedule: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showComplianceButtonReschedule,
            requeue: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showComplianceButtonRequeue,
            snooze: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showComplianceButtonSnooze,
            disabled: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.complianceRecordsDisabled,
            deliveryType: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.complianceRecordsDeliveryType,
            timeout: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.complianceRecordsTimeout,
        };
    }
    else if (callContact === null || callContact === void 0 ? void 0 : callContact.confirmationRequired) {
        return {
            disposition: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showPreviewButtonDisposition,
            reschedule: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showPreviewButtonReschedule,
            requeue: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showPreviewButtonRequeue,
            snooze: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.showPreviewButtonSnooze,
            disabled: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.confirmationRequiredDisabled,
            deliveryType: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.confirmationRequiredDeliveryType,
            timeout: deliveryParameters === null || deliveryParameters === void 0 ? void 0 : deliveryParameters.confirmationRequiredTimeout,
        };
    }
    else {
        return {};
    }
};
//# sourceMappingURL=ccf-voice-contact-methods.js.map