import { SkillDeliveryParameters } from '@nice-devone/common-sdk';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
export declare const CCF_VOICE_CONTACT = "voiceContact";
/**
 * sendDtmf asyncthunk used to send the number dialed
 * @example - dispatch(sendDtmf())
*/
export declare const sendDtmf: import("@reduxjs/toolkit").AsyncThunk<void, {
    toneDurationMS?: number | undefined;
    toneSpacingMS?: number | undefined;
    digit: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const holdVoiceContact: import("@reduxjs/toolkit").AsyncThunk<void | import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, CXoneVoiceContact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const muteVoiceContact: import("@reduxjs/toolkit").AsyncThunk<void | import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, CXoneVoiceContact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const recordVoiceContact: import("@reduxjs/toolkit").AsyncThunk<void | import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, CXoneVoiceContact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const maskVoiceContact: import("@reduxjs/toolkit").AsyncThunk<void | import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, CXoneVoiceContact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const endTheVoiceContact: import("@reduxjs/toolkit").AsyncThunk<void | import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, CXoneVoiceContact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * to Check the contact is Preview Contact
 * @example - isPreviewContact(voiceContact)
*/
export declare const isPreviewContact: (callContact: CXoneVoiceContact) => boolean;
/**
 * to get preview skill values
 * @example - getPreviewSkillProps(voiceContact, deliveryParameters)
*/
export declare const getPreviewSkillProps: (callContact: CXoneVoiceContact, deliveryParameters: SkillDeliveryParameters) => {
    disposition: boolean;
    reschedule: boolean;
    requeue: boolean;
    snooze: boolean;
    disabled: boolean;
    deliveryType: number;
    timeout: number;
} | {
    disposition?: undefined;
    reschedule?: undefined;
    requeue?: undefined;
    snooze?: undefined;
    disabled?: undefined;
    deliveryType?: undefined;
    timeout?: undefined;
};
