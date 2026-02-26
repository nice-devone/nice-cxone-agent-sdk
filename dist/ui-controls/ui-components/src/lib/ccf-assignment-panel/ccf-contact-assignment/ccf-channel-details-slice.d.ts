import { CXoneDigitalChannel } from '@nice-devone/common-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
export declare const CHANNEL_DETAIL_KEY = "channelDetails";
export interface ChannelDetails {
    userHaveObChannel: boolean;
    outboundChannels: Array<CXoneDigitalChannel>;
}
export declare const channelDetailState: ChannelDetails;
export declare const getAgentOBChannels: import("@reduxjs/toolkit").AsyncThunk<void | never[], boolean, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined; /**
     * Function to set outboundChannel List
     * @param state - array
     * @param action  - PayloadAction\<[]\>
     * @returns It returns updated outboundChannel List
     * @example -setObChannelList('')
     */
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const channelDetailSlice: import("@reduxjs/toolkit").Slice<ChannelDetails, {
    /**
     * Function to set userHaveObChannel
     * @param state - boolean
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated value for userHaveOBChannel
     * @example -setUserHaveObChannel('')
     */
    setUserHaveObChannel(state: import("immer/dist/internal").WritableDraft<ChannelDetails>, action: PayloadAction<boolean>): {
        userHaveObChannel: boolean;
        outboundChannels: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>[];
    };
    /**
     * Function to set outboundChannel List
     * @param state - array
     * @param action  - PayloadAction\<[]\>
     * @returns It returns updated outboundChannel List
     * @example -setObChannelList('')
     */
    setObChannelList(state: import("immer/dist/internal").WritableDraft<ChannelDetails>, action: PayloadAction<Array<CXoneDigitalChannel>>): {
        outboundChannels: import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>[];
        userHaveObChannel: boolean;
    };
}, "channelDetails">;
export declare const ccfChannelDetailsReducer: import("redux").Reducer<ChannelDetails, import("redux").AnyAction>;
export declare const ccfChannelDetailsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set userHaveObChannel
     * @param state - boolean
     * @param action  - PayloadAction<boolean>
     * @returns It returns updated value for userHaveOBChannel
     * @example -setUserHaveObChannel('')
     */
    setUserHaveObChannel(state: import("immer/dist/internal").WritableDraft<ChannelDetails>, action: PayloadAction<boolean>): {
        userHaveObChannel: boolean;
        outboundChannels: import("immer/dist/internal").WritableDraft<import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>>[];
    };
    /**
     * Function to set outboundChannel List
     * @param state - array
     * @param action  - PayloadAction\<[]\>
     * @returns It returns updated outboundChannel List
     * @example -setObChannelList('')
     */
    setObChannelList(state: import("immer/dist/internal").WritableDraft<ChannelDetails>, action: PayloadAction<Array<CXoneDigitalChannel>>): {
        outboundChannels: import("yup/lib/object").AssertsShape<{
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
            hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
            hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
            canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
            isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        }>[];
        userHaveObChannel: boolean;
    };
}, "channelDetails">;
/**
 * Function to get Channel Details of agent
 * @param rootState - channelDetails
 * @returns It returns channel details of the agent
 * @example - const channelDetails = getChannelDetailsState(rootState)
 */
export declare const getChannelDetailsState: (rootState: {
    [CHANNEL_DETAIL_KEY]: ChannelDetails;
}) => ChannelDetails;
/**
 * Function to get boolean value for OB Channel presence
 * @param rootState - ChannelDetails
 * @returns It returns userHaveObChannel
 * @example - const channelDetails = getChannelDetailsState(rootState)
 */
export declare const userHaveObChannelSelector: ((state: {
    channelDetails: ChannelDetails;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: ChannelDetails) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to get OB channel list
 * @param rootState - ChannelDetails
 * @returns It returns OB channel list
 * @example - const channelDetails = getChannelDetailsState(rootState)
 */
export declare const ObChannelListSelector: ((state: {
    channelDetails: ChannelDetails;
}) => import("yup/lib/object").AssertsShape<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>[]) & import("reselect").OutputSelectorFields<(args_0: ChannelDetails) => import("yup/lib/object").AssertsShape<{
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
