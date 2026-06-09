"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalChannelContactSearchArray = exports.CXoneDigitalChannelContactSearchSchema = exports.CXoneDigitalChannelArray = exports.CXoneDigitalChannelSchema = void 0;
const yup_1 = require("yup");
/**
 * Interface used for parsing get all digital channel response
 * @returns returns - list of digital channels
 * ```
 * @example
 * Array<DigitalChannel>
 * ```
 */
exports.CXoneDigitalChannelSchema = (0, yup_1.object)({
    /**
     * @remarks - A string value which represents digital channel Id.
     */
    id: (0, yup_1.string)().required(),
    /**
     * @remarks - This is current unique Id of the digital channel.
     */
    channelId: (0, yup_1.string)().required(),
    /**
     * @remarks - This value represents root originating thread Id.
     */
    originId: (0, yup_1.string)().required(),
    /**
     * @remarks - This is actual thread Id of the channel.
     */
    idOnExternalPlatform: (0, yup_1.string)(),
    /**
     * @remarks - This represents the digital channel type (chat/fb/insta etc).
     */
    type: (0, yup_1.string)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    externalPlatformId: (0, yup_1.string)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    realExternalPlatformId: (0, yup_1.string)(),
    /**
     * @remarks - This is the name of the current digital channel.
     */
    name: (0, yup_1.string)(),
    /**
     * @remarks - This provides image/avatar link of the current digital channel.
     */
    externalPlatformAvatar: (0, yup_1.string)(),
    /**
     * @remarks - This is icon type of current digital channel.
     */
    externalPlatformIcon: (0, yup_1.string)(),
    /**
     * @remarks - Unique Id of the digital channel's integration with platform.
     */
    channelIntegrationId: (0, yup_1.string)(),
    /**
     * @remarks - Flag to check reply enabled for channel or not.
     */
    hasReply: (0, yup_1.boolean)().required(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasTreeStructure: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasPostAsPlaceholder: (0, yup_1.boolean)(),
    /**
     * @remarks - This represents type of the content format for the digital channel.
     */
    contentFormat: (0, yup_1.string)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasCustomerOnThirdParty: (0, yup_1.boolean)(),
    /**
     * @remarks - A boolean value which represents the post is readonly or not.
     */
    isPostWritable: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to enable/disable message quote feature for the channel.
     */
    hasAbilityToQuoteMessage: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to enable/disable like reactions for the channel.
     */
    hasAbilityToLike: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    shouldBeNotifiedAboutReassign: (0, yup_1.boolean)(),
    /**
     * @remarks - A boolean value which represents the type of channel(public/private).
     */
    isPrivate: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isHidden: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isDeleted: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    wysiwygEnabled: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to enable/disable Tag feature for the channel.
     */
    hasAbilityToTag: (0, yup_1.boolean)(),
    /**
     * @remarks - Unique ID of the user who owns the channel(Agent Id).
     */
    ownerUserId: (0, yup_1.number)(),
    /**
     * @remarks - Flag to enable/disable publish feature for social digital channel.
     */
    hasPublishing: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to check whether digital channel can send files or not (public/private).
     */
    hasAbilityToSendFiles: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to detect the type of the channel flow (inbound/outbound).
     */
    hasOutboundFlow: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to check share feature for the digital channel.
     */
    hasAbilityToShare: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to check delete feature enabled/disabled for the channel.
     */
    hasAbilityToDelete: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to hide or show post feature on digital channel.
     */
    hasAbilityToHide: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isVisibleInSettingsChannels: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    replyPrefixMentionTemplate: (0, yup_1.string)(),
    /**
     * @remarks - This displays the nickname given for the thread on External platform.
     */
    nicknameOnExternalPlatform: (0, yup_1.string)(),
    /**
     * @remarks - A boolean value which represents the chat is live interaction type or not.
     */
    isLiveChat: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to provide end recipient change feature for the channel.
     */
    hasAbilityToChangeRecipient: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag which provides multiple end recipients enable/disable for the channel.
     */
    hasMultipleRecipient: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to check whether cc/bcc feature enabled or not for the channel.
     * Usually email contact use this feature
     */
    hasCcAndBcc: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to control the visibility of title of the channel.
     */
    hasVisibleTitle: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to provide title editable feature on the channel.
     */
    hasEditableTitle: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to show/hide the end recipients of the channel.
     */
    hasVisibleRecipients: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to control the forward message feature for the channel.
     */
    hasAbilityToForwardMessage: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canSaveResponse: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasAbilityToChangeFrom: (0, yup_1.boolean)(),
    /**
     * @remarks - This controls whether signature should be attached automatically for the reply.
     */
    isAutomaticSignatureAttached: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    isCaseBasedStorage: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to enable/disable templates for the channel's outbound reply.
     */
    hasOutboundTemplates: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasManualOutboundFlow: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    hasMultipleThreadsPerEndUser: (0, yup_1.boolean)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    translationGroup: (0, yup_1.string)(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    studioScript: (0, yup_1.string)().nullable(),
    /**
     * @remarks - TBD - need to discuss with Jan.
     */
    canAgentInviteCustomersToContact: (0, yup_1.boolean)(),
    /**
     * @remarks - Flag to indicate if user can reply to specific message.
     */
    canReplyToAnyMessage: (0, yup_1.boolean)().nullable(),
    /**
     * @remarks - flag for tracking message delivery status
     */
    isTrackingMessageDeliveryStatus: (0, yup_1.boolean)().default(false).nullable(),
});
exports.CXoneDigitalChannelArray = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneDigitalChannelSchema.fields));
/**
 * Interface used for parsing all digital channel response for contact search
 * @returns returns - list of digital channels
 * ```
 * @example
 * Array<DigitalChannel>
 * ```
 */
exports.CXoneDigitalChannelContactSearchSchema = (0, yup_1.object)({
    /**
    * @remarks - A string value which represents digital channel Id.
    */
    id: (0, yup_1.string)().required(),
    /**
    * @remarks - This is current unique Id of the digital channel.
    */
    channelId: (0, yup_1.string)().required(),
    /**
    * @remarks - This represents the digital channel type (chat/fb/insta etc).
    */
    type: (0, yup_1.string)(),
    /**
    * @remarks - name property converted into channelName
    */
    channelName: (0, yup_1.string)(),
});
exports.CXoneDigitalChannelContactSearchArray = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneDigitalChannelContactSearchSchema.fields).from('name', 'channelName'));
//# sourceMappingURL=cxone-digital-channels.js.map