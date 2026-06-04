import { InferType } from 'yup';
export declare const CXoneDigitalReplyChannelSchema: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  @remarks - channel id from contact response
     */
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  @remarks - channel id from contact response
     */
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     *  @remarks - channel id from contact response
     */
    channelId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
}>>>;
export declare type CXoneDigitalReplyChannel = InferType<typeof CXoneDigitalReplyChannelSchema>;
