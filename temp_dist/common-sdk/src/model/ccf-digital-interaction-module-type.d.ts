export interface DigitalChannelMessage {
    id: string;
    idOnExternalPlatform: string;
    threadId: string;
    messageContent: {
        type: string;
        payload: {
            text: string;
        };
    };
    reactionStatistics: {
        likes: number;
        shares: number;
        isLikedByChannel: boolean;
        isSharedByChannel: boolean;
    };
    createdAt: Date;
    direction: string;
    authorUser: {
        id: number;
        incontactId: string;
        emailAddress: string;
        loginUsername: string;
        firstName: string;
        surname: string;
        isBotUser: false;
        isSurveyUser: false;
    };
    authorEndUserIdentity: null;
    isDeletedOnExternalPlatform: boolean;
    isHiddenOnExternalPlatform: boolean;
    isRead: boolean;
    attachments: string[];
    tags: [
        {
            id: number;
            title: string;
            color: string;
        },
        {
            id: number;
            title: string;
            color: string;
        }
    ];
    sentiment: string;
    contentRemoved: null;
    authorNameRemoved: null;
    replyToMessage: null;
    readAt: null;
    tweetId: string;
    messageId: string;
    isOwn: boolean;
}
export interface DigitalInteractionDataType {
    id: string;
    channelId: string;
    originId: string;
    idOnExternalPlatform: string;
    type: string;
    externalPlatformId: string;
    realExternalPlatformId: string;
    name: string;
    externalPlatformAvatar: string;
    externalPlatformIcon: string;
    channelIntegrationId: string;
    hasReply: boolean;
    hasTreeStructure: boolean;
    hasPostAsPlaceholder: boolean;
    contentFormat: string;
    hasCustomerOnThirdParty: boolean;
    isPostWritable: boolean;
    hasAbilityToQuoteMessage: boolean;
    hasAbilityToLike: boolean;
    shouldBeNotifiedAboutReassign: boolean;
    isPrivate: boolean;
    isHidden: boolean;
    wysiwygEnabled: boolean;
    hasAbilityToTag: boolean;
    ownerUserId: number;
    hasPublishing: boolean;
    hasAbilityToSendFiles: boolean;
    hasOutboundFlow: boolean;
    hasAbilityToShare: boolean;
    hasAbilityToDelete: boolean;
    hasAbilityToHide: boolean;
    isVisibleInSettingsChannels: boolean;
    replyPrefixMentionTemplate: string;
    nicknameOnExternalPlatform: string;
    isLiveChat: boolean;
    hasAbilityToChangeRecipient: boolean;
    hasMultipleRecipient: boolean;
    hasCcAndBcc: boolean;
    hasVisibleTitle: boolean;
    hasEditableTitle: boolean;
    hasVisibleRecipients: boolean;
    hasAbilityToForwardMessage: boolean;
    canSaveResponse: boolean;
    originalTweetContent: DigitalChannelMessage;
    agentReply: DigitalChannelMessage[];
    otherReplies: DigitalChannelMessage[];
    isDispositionCompleted: boolean;
}
