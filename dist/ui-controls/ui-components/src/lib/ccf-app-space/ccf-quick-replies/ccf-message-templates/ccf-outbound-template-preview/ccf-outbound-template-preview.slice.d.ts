import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { ExternalPlatformTemplate, ExternalPlatformTemplateMessageContent } from '@nice-devone/common-sdk';
/**
   * This interface is for external platform template state
   */
export interface ExternalPlatformTemplatePreview {
    /**
     * @remarks - selected message template
     */
    selectedMessageTemplate: ExternalPlatformTemplate;
    /**
     * @remarks - flag for template is sent or not
     */
    isTemplateSent: boolean;
    /**
   * @remarks - template editable content
   */
    templateEditableContent: TemplateEditableContent;
}
/**
   * This interface is template editable content
   */
export interface TemplateEditableContent {
    [elementId: string]: string;
}
/**
 * This interface is for selected variable details
 */
export interface SelectedVariableDetails {
    /**
     * @remarks - variable key
     */
    key: string;
    /**
     * @remarks - variable value
     */
    value: string;
    /**
     * @remarks - element id
     */
    elementId: string;
}
/**
 * This interface is for reply details
 */
export interface ReplyDetails {
    /**
     * @remarks - selected contact details
     */
    contactDetails: CXoneDigitalContact;
    /**
     * @remarks - Template message content
     */
    messageContent: ExternalPlatformTemplateMessageContent;
    /**
     * @remarks - displays customer name/number
     */
    customerName: string;
    /**
     * @remarks - interaction id of parent contact in case of elevation
     */
    elevatedInteractionId: string;
    /**
     * @remarks - denotes whether the contact is elevated from ACD or DFO
     */
    elevatedFrom: string;
}
export declare const OUTBOUND_TEMPLATE_PREVIEW_KEY = "outboundTemplatePreview";
export declare const initialOutboundTemplate: ExternalPlatformTemplatePreview;
/**
 * Used to send OB message template
 */
export declare const sendOBMessageTemplate: import("@reduxjs/toolkit").AsyncThunk<void, ReplyDetails, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    /**
     * @remarks - interaction id of parent contact in case of elevation
     */
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown; /**
     * @remarks - denotes whether the contact is elevated from ACD or DFO
     */
    rejectedMeta?: unknown;
}>;
export declare const obMessageTemplateSlice: import("@reduxjs/toolkit").Slice<ExternalPlatformTemplatePreview, {
    /**
     * Updated isTemplateSent state value
     * @param state - IsTemplateSent
     * @param action - PayloadAction<true>
     * @example - `dispatch(updateIsTemplateSent(true))`
     */
    updateIsTemplateSent(state: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplatePreview>, action: PayloadAction<boolean>): {
        isTemplateSent: boolean;
        category: string | null;
        messageContent: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplateMessageContent>;
        template: string;
        selectedMessageTemplate: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>;
        templateEditableContent: import("immer/dist/internal").WritableDraft<TemplateEditableContent>;
    };
    /**
     * Updated selectedMessageTemplate state value
     * @param state - OutboundTemplate
     * @param action - PayloadAction<ExternalPlatformTemplate>
     * @example - `dispatch(updateSelectedMessageTemplate(@param))`
     */
    updateSelectedMessageTemplate(state: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplatePreview>, action: PayloadAction<ExternalPlatformTemplate | null>): {
        selectedMessageTemplate: ExternalPlatformTemplate;
        templateEditableContent: TemplateEditableContent;
        isTemplateSent: boolean;
    };
    /**
     * Updated updateTemplateVariables state value on selected variable change
     * @param state - app space state
     * @param action - PayloadAction<SelectedVariableDetails>
     * @example - `dispatch(updateTemplateVariables(SelectedVariableDetails))`
     */
    updateTemplateVariables: (state: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplatePreview>, action: PayloadAction<SelectedVariableDetails>) => void;
}, "outboundTemplatePreview">;
export declare const OBMessageTemplateReducer: import("redux").Reducer<ExternalPlatformTemplatePreview, import("redux").AnyAction>;
export declare const OBMessageTemplateActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Updated isTemplateSent state value
     * @param state - IsTemplateSent
     * @param action - PayloadAction<true>
     * @example - `dispatch(updateIsTemplateSent(true))`
     */
    updateIsTemplateSent(state: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplatePreview>, action: PayloadAction<boolean>): {
        isTemplateSent: boolean;
        category: string | null;
        messageContent: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplateMessageContent>;
        template: string;
        selectedMessageTemplate: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplate>;
        templateEditableContent: import("immer/dist/internal").WritableDraft<TemplateEditableContent>;
    };
    /**
     * Updated selectedMessageTemplate state value
     * @param state - OutboundTemplate
     * @param action - PayloadAction<ExternalPlatformTemplate>
     * @example - `dispatch(updateSelectedMessageTemplate(@param))`
     */
    updateSelectedMessageTemplate(state: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplatePreview>, action: PayloadAction<ExternalPlatformTemplate | null>): {
        selectedMessageTemplate: ExternalPlatformTemplate;
        templateEditableContent: TemplateEditableContent;
        isTemplateSent: boolean;
    };
    /**
     * Updated updateTemplateVariables state value on selected variable change
     * @param state - app space state
     * @param action - PayloadAction<SelectedVariableDetails>
     * @example - `dispatch(updateTemplateVariables(SelectedVariableDetails))`
     */
    updateTemplateVariables: (state: import("immer/dist/internal").WritableDraft<ExternalPlatformTemplatePreview>, action: PayloadAction<SelectedVariableDetails>) => void;
}, "outboundTemplatePreview">;
export declare const updateSelectedMessageTemplate: import("@reduxjs/toolkit").ActionCreatorWithPayload<ExternalPlatformTemplate | null, "outboundTemplatePreview/updateSelectedMessageTemplate">, updateTemplateVariables: import("@reduxjs/toolkit").ActionCreatorWithPayload<SelectedVariableDetails, "outboundTemplatePreview/updateTemplateVariables">, updateIsTemplateSent: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "outboundTemplatePreview/updateIsTemplateSent">;
/**
 * Function to get selected outbound Message template
 * @returns It returns outbound Message template type data
 * @example - const getSelectedTemplateDetails
 */
export declare const getSelectedTemplateDetails: ((state: {
    outboundTemplatePreview: ExternalPlatformTemplatePreview;
}) => ExternalPlatformTemplate) & import("reselect").OutputSelectorFields<(args_0: ExternalPlatformTemplatePreview) => ExternalPlatformTemplate & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to get template sent or not
 * @returns It returns template sent or not
 * @example - const getIsTemplateSent
 */
export declare const getIsTemplateSent: ((state: {
    outboundTemplatePreview: ExternalPlatformTemplatePreview;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: ExternalPlatformTemplatePreview) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to get template editable content
 * @returns It returns template editable content
 * @example - const getTemplateEditableContent
 */
export declare const getTemplateEditableContent: ((state: {
    outboundTemplatePreview: ExternalPlatformTemplatePreview;
}) => TemplateEditableContent) & import("reselect").OutputSelectorFields<(args_0: ExternalPlatformTemplatePreview) => TemplateEditableContent & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
