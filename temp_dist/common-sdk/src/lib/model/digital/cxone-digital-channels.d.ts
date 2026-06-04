import { InferType } from 'yup';
/**
 * Interface used for parsing get all digital channel response
 * @returns returns - list of digital channels
 * ```
 * @example
 * Array<DigitalChannel>
 * ```
 */
export declare const CXoneDigitalChannelSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>;
export declare type CXoneDigitalChannel = InferType<typeof CXoneDigitalChannelSchema>;
export declare const CXoneDigitalChannelArray: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
}>>[]>;
/**
 * Interface used for parsing all digital channel response for contact search
 * @returns returns - list of digital channels
 * ```
 * @example
 * Array<DigitalChannel>
 * ```
 */
export declare const CXoneDigitalChannelContactSearchSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type CXoneDigitalChannelContactSearch = InferType<typeof CXoneDigitalChannelContactSearchSchema>;
export declare const CXoneDigitalChannelContactSearchArray: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
    * @remarks - name property converted into channelName
    */
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[]>;
