import { CXoneDigitalChannel, CXoneDigitalSkill } from '@nice-devone/common-sdk';
import { OBChannels } from '../ccf-outbound-options';
/**
 * Filter OB channels by channel type
 * @example
 * ```
 * filterByChannelType(OBChannels.EMAIL)
 * ```
 */
export declare const filterByChannelType: (channelType: OBChannels) => (channel: CXoneDigitalChannel) => boolean;
/**
 * Filter digital OB skills by channel type
 * @example
 * ```
 * filterSkillByChannelType(OBChannels.EMAIL)
 * ```
 */
export declare const filterSkillByChannelType: (channelType: OBChannels) => (skill: CXoneDigitalSkill) => boolean;
/**
 * Filter OB channels by channel id
 * @example
 * ```
 * filterByChannelType('channelId')
 * ```
 */
export declare const filterByChannelId: (channelId: CXoneDigitalChannel['channelId']) => (channel: CXoneDigitalChannel) => boolean;
/**
 * Unified hook that returns the Phone and Digital skills
 * Returns:
 * - All phone skills
 * - All Outbound Digital Channels
 * - Filtered Email, SMS and Whatsapp Channels
 * - Flag that indicates if the user have skills/channles assigned
 * - Number of skills/channels per channel type for easy cheaking if current user has 1 or more
 * @example
 * ```
 * const outboundOptions = useGetOutboundOptions()
 * ```
 */
export default function useGetOutboundOptions(): {
    emailOBChannels: import("yup/lib/object").AssertsShape<{
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
    emailOBChannelsLength: number;
    hasEmailOBChannels: boolean;
    hasOutboundChannels: boolean;
    hasPhoneOBSkills: boolean;
    hasSmsOBChannels: boolean;
    hasWhatsappOBChannels: boolean;
    isOutboundSkillAssigned: boolean;
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
    outboundChannelsLength: number;
    phoneOBSkills: {
        skillId: number;
        skillName: string;
    }[];
    phoneOBSkillsLength: number;
    smsOBChannels: import("yup/lib/object").AssertsShape<{
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
    smsOBChannelsLength: number;
    userHaveObChannel: boolean;
    whatsappOBChannels: import("yup/lib/object").AssertsShape<{
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
    whatsappOBChannelsLength: number;
    hasDigitalOBSkills: boolean;
    digitalOBSkills: {
        skillId: number;
        skillName: string;
        digitalPOC: string;
        digitalPOCName: string;
    }[];
    digitalOBSkillsLength: number;
    emailOBSkills: {
        skillId: number;
        skillName: string;
        digitalPOC: string;
        digitalPOCName: string;
    }[];
    emailOBSkillsLength: number;
    hasEmailOBSkills: boolean;
    smsOBSkills: {
        skillId: number;
        skillName: string;
        digitalPOC: string;
        digitalPOCName: string;
    }[];
    smsOBSkillsLength: number;
    hasSmsOBSkills: boolean;
    whatsappOBSkills: {
        skillId: number;
        skillName: string;
        digitalPOC: string;
        digitalPOCName: string;
    }[];
    whatsappOBSkillsLength: number;
    hasWhatsappOBSkills: boolean;
};
