import { AGENT_CHAT_STATUS } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
export interface Member {
    userId: string;
    firstName: string;
    lastName: string;
    userState?: AGENT_CHAT_STATUS;
    unRead?: number;
    userName?: string;
    threadId?: string;
    name?: string;
}
export interface Favorites {
    members: Member[];
}
export interface groupMember {
    userId: string;
    id?: string;
    userName: string;
    firstName?: string;
    lastName?: string;
}
export interface Groups {
    threadId?: string;
    groupId: string;
    groupName: string;
    members?: groupMember[];
    unRead?: number;
}
export interface Links {
    next: string;
    previous: string;
    self: string;
}
export interface GroupResponse {
    responseMessage?: string | null;
    returnCode?: string | null;
    errorCode?: string | null;
    groups?: Groups[];
    links?: Links;
}
export interface Recipient {
    id: string;
    name?: string;
    type?: string;
    anonymizedAt?: string | null;
    anonymizedReason?: string | null;
    idOnExternalPlatform: string;
    isPrimary?: string;
    isPrivate?: string;
}
export interface Attachment {
    id: string;
    friendlyName: string;
    mimeType: string;
    fileName: string;
    url: string;
    securedPermanentUrl: string;
    previewUrl: string;
    isInline: boolean;
    canBeStored: boolean;
    sizeInBytes: number;
    antivirusScanStatus: 'inProgress' | 'completed' | 'failed' | string;
    blobUrl: string | null;
}
export interface ThreadMessage {
    id: string;
    idOnExternalPlatform: string;
    threadIdOnExternalPlatform: string;
    user: {
        agentId: number;
        emailAddress: string;
        firstName: string;
        id: number;
        imageUrl: string;
        incontactId: string;
        isBotUser: boolean;
        isSurveyUser: boolean;
        loginUsername: string;
        nickname: string;
        lastName: string;
        publicImageUrl: string;
        surname: string;
        userType: string | null;
    };
    recipients: Recipient[];
    threadId: string;
    messageContent: {
        type: string;
        text: string;
        fallbackText?: string;
        icon?: string;
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
    createdAt: Date | string;
    direction: string;
    authorUser: {
        id: number;
        incontactId: string;
        emailAddress: string;
        loginUsername: string;
        firstName: string;
        surname: string;
        lastName: string;
        isBotUser: false;
        isSurveyUser: false;
    };
    authorEndUserIdentity: null;
    isDeletedOnExternalPlatform: boolean;
    isHiddenOnExternalPlatform: boolean;
    isRead: boolean;
    attachments: Attachment[];
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
    readAt: string | null;
    tweetId: string;
    messageId: string;
    isOwn: boolean;
}
export interface ThreadMessageGroup {
    hits?: number;
    data: ThreadMessage[];
    scrollToken?: string;
}
export interface ActiveChatDetails {
    memberDetail?: Member;
    groupDetail?: Groups;
    category: ConversationsCategory | string;
}
export interface RecentChatThreads {
    threadId: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    category?: ConversationsCategory | string;
    groupId?: string;
    groupName?: string;
    userState?: string;
}
export interface CcfAgentChatSearchOptions {
    name?: string;
    userId?: string;
    groupId?: string;
    userState?: string;
    mode?: string;
    threadId?: string;
    category?: ConversationsCategory | string;
    filterName?: string;
}
export interface UserAvailabilityPayload {
    id: string;
    userState: 'Online' | 'Offline' | string;
}
export interface GroupMember {
    userId: string;
    id?: string;
    userName: string;
}
export interface MessagePayload {
    text?: string;
    icon?: string;
    action?: string;
    ownerUserName?: string;
    groupName?: string;
    members?: GroupMember[];
}
export interface GroupPayload {
    action: 'RENAME' | 'ADD' | 'REMOVE' | 'LEAVE' | 'CREATE';
    payload: {
        groupId: string;
        groupName: string;
        userId?: string;
        userName?: string;
        ownerUserId?: string | null;
        ownerUserName?: string | null;
        oldGroupName?: string;
        timeStamp?: string;
        members?: GroupMember[];
        threadId?: string;
    };
}
export interface UserAvailabilityEventData {
    eventType: string;
    payload: UserAvailabilityPayload | GroupPayload;
}
export interface UserAvailabilityData {
    data: UserAvailabilityEventData;
}
export declare enum GroupActionType {
    CREATE = "CREATE",
    ADD = "ADD",
    RENAME = "RENAME",
    REMOVE = "REMOVE",
    LEAVE = "LEAVE"
}
