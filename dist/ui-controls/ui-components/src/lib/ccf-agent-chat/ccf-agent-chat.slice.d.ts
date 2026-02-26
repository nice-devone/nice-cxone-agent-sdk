import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { AgentHiveUserAvailabilityRequest, AgentHiveOutboundMessageDetails, OutboundMessage, AgentHiveUserSubscriptionRequest, ConversationsCategory } from '@nice-devone/user-chat-sdk';
import { Favorites, GroupResponse, Member, ThreadMessageGroup, ActiveChatDetails, RecentChatThreads, MessagePayload } from './common/interfaces';
import { AGENT_CHAT_STATUS } from './ccf-agent-chat-icons/ccf-agent-chat-icon-list';
export declare const AGENT_HIVE_FEATURE_KEY = "agentHive";
export interface users {
    /**
     * A string value which represents user Id
     */
    userId: string;
    /**
     * A string value which represents user state.
     */
    userState: string;
    /**
     * A string value which represents user first name.
     */
    firstName: string;
    /**
     * A string value which represents user last name.
     */
    lastName: string;
    /**
     * A string value which represents user email address.
     */
    emailAddress: string;
    /**
     * A string value which represents user role.
     */
    role: string | null;
}
export interface groupMembers {
    /**
     * A string value which represents user Id.
     */
    userId: string;
    /**
     * A string value which represents user name.
     */
    userName: string;
}
export interface groups {
    threadId?: string;
    /**
     * string value represents groupId
     */
    groupId?: string;
    /**
     * string value represents group name
     */
    groupName?: string;
    /**
     * array value represents group members
     */
    members?: groupMembers[];
    /**
     * optional value to check the category
     */
    category?: ConversationsCategory | string;
}
export interface groupChatDetails {
    /**
     * List of members for a group
     */
    members?: groupMembers[];
    /**
     * A string value represents name of group
     */
    groupName: string;
}
export interface groupMember {
    /**
     * A string value which represents user Id.
     */
    userId: string;
    /**
     * A string value which represents user state.
     */
    userState: string;
    /**
     * A string value which represents user name.
     */
    userName: string;
    /**
     * A string value which represents user first name.
     */
    firstName: string;
    /**
     * A string value which represents user last name.
     */
    lastName: string;
    /**
     * A string value which represents user email address.
     */
    emailAddress: string;
    /**
     * A string value which represents user role.
     */
    role: string;
    /**
     * A string value which represents roleuuid.
     */
    roleuuid: string;
    /**
     * A string value which represents user status.
     */
    status: string;
    /**
     * A string value which represents thread Id.
     */
    threadId?: string;
}
/**
 * Interface for favoriteMember
 */
export interface favoriteMember {
    /**
     * id of the member
     */
    id: string;
    /**
     * member details
     */
    members: string[];
    /**
     * boolean value to set the favorite user
     */
    markFavourite: boolean;
}
export interface outboundMessages {
    thread: {
        idOnExternalPlatform: string;
    };
    messageContent: {
        type: string;
        payload: {
            text: string;
        };
    };
    recipients: Array<{
        idOnExternalPlatform: string;
        name: string;
        isPrimary: boolean;
        isPrivate: boolean;
    }>;
    endUsers?: Array<{
        idOnExternalPlatform: string;
        name: string;
        isPrimary: boolean;
        isPrivate: boolean;
    }>;
    direction: string;
    createdAtWithMilliseconds: string;
}
export interface AttachmentType {
    attachmentId?: string;
    id: string;
    name: string;
    size: number;
    mimeType: string;
    uploaded: boolean;
    url: string;
    isInline?: boolean;
    isForwardedAttachment?: boolean;
}
export interface ConversationInteractionItem {
    attachments: AttachmentType[];
    inlineImages?: AttachmentType[];
}
export interface addUsers {
    /**
     * A string value which represents filter values.
     */
    filter: string;
    /**
     * A string value which represents fields.
     */
    fileds: string;
    /**
     * A string value which represents skip.
     */
    skip: string;
    /**
     * A string value which represents top.
     */
    top: string;
}
export interface userAvailability {
    /**
     * A string value which represents id.
     */
    [id: string]: AGENT_CHAT_STATUS;
}
/**
 * Interface for thread interaction details
 */
export interface ThreadInteraction {
    [threadId: string]: {
        /**
         * Interaction data for the thread
         */
        interactionData?: Array<AttachmentType>;
    };
}
/**
 * Interface for properties of agent hive
 * @example - userList
 */
export interface AgentHive {
    recentThreads: RecentChatThreads[];
    /**
    * user list
    */
    userList: users[];
    /**
     * Group chat
     */
    groupChat: groupChatDetails[];
    /**
     * Group List
     */
    groupList: GroupResponse;
    /**
     * Group List
     */
    searchedGroupList: GroupResponse;
    /**
     * Group member details
     */
    groupMemberDetails: groupMember[];
    /**
     * All Favorite members
     */
    favorites: Favorites[];
    /**
    * Favorite member
    */
    favoriteMember: favoriteMember[];
    /**
    * Add Users
    */
    addUsers: addUsers[];
    /**
     * User availability
     */
    userAvailability: userAvailability;
    /**
     * thread messages
     */
    threadMessages: any;
    /**
   * thread messages
   */
    unreadMessages: any;
    /**
     * outbound messages
     */
    outboundMessages?: OutboundMessage;
    /**
    * outbound messages
    */
    isOutboundMessages?: boolean;
    /**
     * selected chat
     */
    activeChat: ActiveChatDetails;
    /**
     * channel id
     */
    channelId?: string;
    /**
     * contentSearchState
     */
    contentSearchState: boolean;
    /**
     * search text
     */
    searchText: string;
    /**
     * selected members to add to group
     */
    selectedMembers: groupMember[];
    /**
     * Open the editor
     */
    isEditorOpen: boolean;
    /**
     * Showing loader icon
     */
    isLoader: boolean;
    /**
     * scrollToken
     */
    scrollToken: boolean;
    /**
    * isStandalone
    */
    isStandalone: boolean;
    /**
     * apiCall
     */
    apiCall: boolean;
    /**
     * Notification list
     */
    notify: {
        [key: string]: {
            unReadCount: number;
        };
    };
    /**
     * Selected searched details
     */
    selectedDetail: {
        [key: string]: string;
    };
    /**
     * Conversation interaction details
     */
    conversationInteraction?: {
        [conversationId: string]: ConversationInteractionItem;
    };
    groupActivities: {
        [key: string]: GroupActionMessage[];
    };
}
export interface GroupActionMessage {
    id: string;
    messageContent: MessagePayload;
    attachments?: AttachmentType[];
    createdAt: string;
    isGroupAction: boolean;
    readAt?: string | null;
}
export interface GroupActivityPayload extends Partial<GroupActionMessage> {
    timeStamp?: string;
}
/**
 * Use to get the initial agent hive data
 * @returns - initial agent hive data
 * @example
 * ```
 * getInitialAgentHiveState();
 * ```
 */
export declare const getInitialAgentHiveState: () => AgentHive;
/**
 * Used to fetch all the users
 * @example
 * ```
 * dispatch(getAllUsers());
 * ```
 */
export declare const getAllUsers: import("@reduxjs/toolkit").AsyncThunk<void, {
    searchValue: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to get the channel id
 * @example
 * ```
 * dispatch(getChannelId({ userId }));
 * ```
 */
export declare const getChannelId: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to initialize UserHub Sync
 * @example
 * ```
 * dispatch(initUserHubSync(userId));
 * ```
 */
export declare const initUserHubSync: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to create a group chat
 * @example
 * ```
 * dispatch(createGroupChat());
 * ```
 */
export declare const createGroupChat: import("@reduxjs/toolkit").AsyncThunk<void, {
    members: {
        userId: string;
        userName: string;
    }[];
    groupName: string;
    userId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to add a member to group chat
 * @example
 * ```
 * dispatch(addMemberGroupChat());
 * ```
 */
export declare const addMemberGroupChat: import("@reduxjs/toolkit").AsyncThunk<void, {
    members: groupMembers[];
    groupId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to remove a member from group chat
 * @example
 * ```
 * dispatch(removeMemberGroupChat());
 * ```
 */
export declare const removeMemberGroupChat: import("@reduxjs/toolkit").AsyncThunk<void, {
    members: string[];
    groupId: string;
    leaveGroup?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to rename group chat
 * @example
 * ```
 * dispatch(renameGroupChat());
 * ```
 */
export declare const renameGroupChat: import("@reduxjs/toolkit").AsyncThunk<void, {
    groupName: string;
    groupId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to fetch all the group chat
 * @example
 * ```
 * dispatch(getAllGroupChat());
 * ```
 */
export declare const getAllGroupChat: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
    searchValue?: string | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to get all member details of the group
 * @example
 * ```
 * dispatch(groupMemberDetails());
 * ```
 */
export declare const groupMemberDetails: import("@reduxjs/toolkit").AsyncThunk<void, {
    groupId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to mark/unmark favorite members
 * @example
 * ```
 * dispatch(removeFavoriteMember());
 * ```
 */
export declare const removeFavoriteMember: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
    memberId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to get all favorite members
 * @example
 * ```
 * dispatch(getAllFavorites());
 * ```
 */
export declare const getAllFavorites: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to get all favorite members
 * @example
 * ```
 * dispatch(markUserAsFavorite(userId, memberId));
 * ```
 */
export declare const markUserAsFavorite: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
    member: Member;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to update user availability
 * @example
 * ```
 * dispatch(updateUserAvailability());
 * ```
 */
export declare const updateUserAvailability: import("@reduxjs/toolkit").AsyncThunk<void, AgentHiveUserAvailabilityRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to update user availability
 * @example
 * ```
 * dispatch(updateUserAvailability());
 * ```
 */
export declare const updateUserSubscription: import("@reduxjs/toolkit").AsyncThunk<void, AgentHiveUserSubscriptionRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to upload attachment for agent hive
 * @example
 * ```
 * dispatch(uploadAttachmentFile({ content, mimeType, attachmentId }));
 * ```
 */
export declare const uploadAttachmentFile: (content: string, type: string, id: string, state: {
    agentHive: {
        activeChat?: {
            groupDetail?: {
                threadId?: string;
            };
            memberDetail?: {
                threadId?: string;
            };
        };
        threadMessages?: {
            threadMessages?: Array<{
                threadId?: string;
                upload?: boolean;
            }>;
        };
    };
}) => void;
/**
 * Used to download all attachments for agent hive
 * @example
 * ```
 * dispatch(downloadAllAttachments({ attachments }));
 * ```
 */
export declare const downloadAllAttachments: import("@reduxjs/toolkit").AsyncThunk<any, {
    attachments: AttachmentType[];
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to add users
 * @example
 * ```
 * dispatch(addUsers());
 * ```
 */
export declare const addUsers: import("@reduxjs/toolkit").AsyncThunk<void, {
    addUsers: string[];
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateFileToBeUploadedForThread: import("@reduxjs/toolkit").AsyncThunk<void, {
    fileList: FileList;
    uuidList?: string[] | undefined;
    isForwardedAttachment?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used for outbound messages
 * @example
 * ```
 * dispatch(sendConversationReply());
 * ```
 */
export declare const sendConversationReply: import("@reduxjs/toolkit").AsyncThunk<import("yup/lib/object").AssertsShape<{
    threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    messageContent: import("yup/lib/object").OptionalObjectSchema<{
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        payload: import("yup/lib/object").OptionalObjectSchema<{
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        payload: import("yup/lib/object").OptionalObjectSchema<{
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        text: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>;
    createdAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    direction: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    user: import("yup/lib/object").OptionalObjectSchema<{
        id: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        incontactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        agentId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>; /**
         * A string value which represents user Id
         */
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        imageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        publicImageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        id: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        incontactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        agentId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        imageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        publicImageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>;
    authorUser: import("yup/lib/object").OptionalObjectSchema<{
        id: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        incontactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        agentId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        imageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        publicImageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        id: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        incontactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        agentId: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        emailAddress: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        firstName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        surname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        nickname: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        imageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        publicImageUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>;
    attachments: import("yup").ArraySchema<import("yup/lib/object").OptionalObjectSchema<{
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>; /**
         * A string value which represents filter values.
         */
        isInline: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        sizeInBytes: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        antivirusScanStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>; /**
        * user list
        */
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        sizeInBytes: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        antivirusScanStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<{
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        sizeInBytes: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        antivirusScanStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[], import("yup/lib/object").AssertsShape<{
        id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        sizeInBytes: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        antivirusScanStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[]>;
    tags: import("yup").ArraySchema<import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>, import("yup/lib/types").AnyObject, string[], string[]>;
    replyToMessage: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    recipients: import("yup").ArraySchema<import("yup/lib/object").OptionalObjectSchema<{
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<{
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[], import("yup/lib/object").AssertsShape<{
        idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        name: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>[]>;
    id: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>, {
    outboundMessages: OutboundMessage;
    category?: string | undefined;
    groupId?: string | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to fetch all messages from the thread
 * @example
 * ```
 * dispatch(getThreadMessages());
 * ```
 */
export declare const getThreadMessages: import("@reduxjs/toolkit").AsyncThunk<void, {
    threadId: string;
    skip: number;
    searchContent?: string | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to fetch unread messages for a user
 * @example
 * ```
 * dispatch(getIUnreadMessages({ userId }));
 * ```
 */
export declare const getUnreadMessages: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to clear unread messages for a user and thread
 * @example
 * ```
 * dispatch(clearUnreadMessages({ userId, threadId }));
 * ```
 */
export declare const clearUnreadMessages: import("@reduxjs/toolkit").AsyncThunk<void, {
    receiverId: string;
    threadId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to fetch all recent chat threads
 * @example
 * ```
 * dispatch(fetchRecentChatThreads());
 * ```
 */
export declare const fetchRecentChatThreads: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to fetch messages for user
 * @example
 * ```
 * dispatch(fetchUserMessages());
 * ```
 */
export declare const fetchUserMessages: import("@reduxjs/toolkit").AsyncThunk<void, {
    threadMessages: string[];
    skip: number;
    searchContent?: string | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to check if the id is present in sections (favorites, groups, or direct messages)
 * @param id - id to check in sections
 * @returns - boolean value indicating if the id is present in sections
 * @example - checkIdInSections(id: string);
 */
export declare const checkIdInSections: (state: any, id: string | undefined, isDirectMessage: boolean) => boolean;
/**
 * Fetches the groupName from IndexedDB where the threadId matches the provided argument.
 * @param threadId - The threadId to search for.
 * @returns - The groupName if found, otherwise undefined.
 * @example - getGroupNameByThreadId(threadId: string);
 */
export declare const getGroupNameByThreadId: (threadId: string) => Promise<string | undefined>;
/**
 * Fetches the groupName from IndexedDB where the users matches the provided argument.
 * @param users - The users to search for.
 * @returns - The groupName if found, otherwise undefined.
 * @example - getGroupNameByUsers(users: string[]);
 */
export declare const getGroupNameByUsers: (users: string[]) => Promise<string | undefined>;
/**
 * Generates a random string of 5 characters using Math.random.
 * @returns - A random 5-character string.
 * @example - generateRandomString();
 */
export declare const generateRandomString: () => string;
/**
 * Used for outbound messages
 * @example
 * ```
 * dispatch(sendConversationReply());
 * ```
 */
export declare const updateMessagesAndNotification: import("@reduxjs/toolkit").AsyncThunk<void, {
    inBoundMessages: AgentHiveOutboundMessageDetails;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const agentHiveSlice: import("@reduxjs/toolkit").Slice<AgentHive, {
    setNotify: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => void;
    addNotify: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => void;
    removeNotifyMember: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<AgentHive>;
    setAllUsers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        userList: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setOutboundMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isOutboundMessages: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setAllGroups: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupList: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setSearchedGroupList: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        searchedGroupList: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateGroupChatName: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupChat: {
            groupName: any;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            push(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            concat(...items: ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            concat(...items: (import("immer/dist/internal").WritableDraft<groupChatDetails> | ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>)[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            join(separator?: string | undefined): string;
            reverse(): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            shift(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            slice(start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            sort(compareFn?: ((a: import("immer/dist/internal").WritableDraft<groupChatDetails>, b: import("immer/dist/internal").WritableDraft<groupChatDetails>) => number) | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount: number, ...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            unshift(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            indexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            every<S extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U, thisArg?: any): U[];
            filter<S_1 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_1, thisArg?: any): S_1[];
            filter(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_1, initialValue: U_1): U_1;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_2, initialValue: U_2): U_2;
            find<S_2 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (this: void, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_2, thisArg?: any): S_2 | undefined;
            find(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            findIndex(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): number;
            fill(value: import("immer/dist/internal").WritableDraft<groupChatDetails>, start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            copyWithin(target: number, start: number, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            entries(): IterableIterator<[number, import("immer/dist/internal").WritableDraft<groupChatDetails>]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            includes(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): boolean;
            flatMap<U_3, This = undefined>(callback: (this: This, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
            flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateGroupChatMembers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupChat: {
            members: any;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            push(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            concat(...items: ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            concat(...items: (import("immer/dist/internal").WritableDraft<groupChatDetails> | ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>)[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            join(separator?: string | undefined): string;
            reverse(): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            shift(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            slice(start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            sort(compareFn?: ((a: import("immer/dist/internal").WritableDraft<groupChatDetails>, b: import("immer/dist/internal").WritableDraft<groupChatDetails>) => number) | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount: number, ...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            unshift(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            indexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            every<S extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U, thisArg?: any): U[];
            filter<S_1 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_1, thisArg?: any): S_1[];
            filter(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_1, initialValue: U_1): U_1;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_2, initialValue: U_2): U_2;
            find<S_2 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (this: void, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_2, thisArg?: any): S_2 | undefined;
            find(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            findIndex(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): number;
            fill(value: import("immer/dist/internal").WritableDraft<groupChatDetails>, start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            copyWithin(target: number, start: number, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            entries(): IterableIterator<[number, import("immer/dist/internal").WritableDraft<groupChatDetails>]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            includes(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): boolean;
            flatMap<U_3, This = undefined>(callback: (this: This, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
            flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setGroupMemberDetails: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupMemberDetails: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    addGroupActionMessage: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => void;
    setAllFavorites: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        favorites: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateFavoritesList: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        favorites: {
            members: any[];
        }[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    removeFavoriteMember: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        favorites: {
            members: import("immer/dist/internal").WritableDraft<Member>[];
        }[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateAddUsers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        addUsers: {
            addUsers: any;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
            push(...items: import("immer/dist/internal").WritableDraft<addUsers>[]): number;
            concat(...items: ConcatArray<import("immer/dist/internal").WritableDraft<addUsers>>[]): import("immer/dist/internal").WritableDraft<addUsers>[];
            concat(...items: (import("immer/dist/internal").WritableDraft<addUsers> | ConcatArray<import("immer/dist/internal").WritableDraft<addUsers>>)[]): import("immer/dist/internal").WritableDraft<addUsers>[];
            join(separator?: string | undefined): string;
            reverse(): import("immer/dist/internal").WritableDraft<addUsers>[];
            shift(): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
            slice(start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            sort(compareFn?: ((a: import("immer/dist/internal").WritableDraft<addUsers>, b: import("immer/dist/internal").WritableDraft<addUsers>) => number) | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            splice(start: number, deleteCount?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            splice(start: number, deleteCount: number, ...items: import("immer/dist/internal").WritableDraft<addUsers>[]): import("immer/dist/internal").WritableDraft<addUsers>[];
            unshift(...items: import("immer/dist/internal").WritableDraft<addUsers>[]): number;
            indexOf(searchElement: import("immer/dist/internal").WritableDraft<addUsers>, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: import("immer/dist/internal").WritableDraft<addUsers>, fromIndex?: number | undefined): number;
            every<S_3 extends import("immer/dist/internal").WritableDraft<addUsers>>(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => value is S_3, thisArg?: any): this is S_3[];
            every(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => void, thisArg?: any): void;
            map<U_4>(callbackfn: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_4, thisArg?: any): U_4[];
            filter<S_4 extends import("immer/dist/internal").WritableDraft<addUsers>>(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => value is S_4, thisArg?: any): S_4[];
            filter(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<addUsers>[];
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>, initialValue: import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduce<U_5>(callbackfn: (previousValue: U_5, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_5, initialValue: U_5): U_5;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>, initialValue: import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduceRight<U_6>(callbackfn: (previousValue: U_6, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_6, initialValue: U_6): U_6;
            find<S_5 extends import("immer/dist/internal").WritableDraft<addUsers>>(predicate: (this: void, value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, obj: import("immer/dist/internal").WritableDraft<addUsers>[]) => value is S_5, thisArg?: any): S_5 | undefined;
            find(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, obj: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
            findIndex(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, obj: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): number;
            fill(value: import("immer/dist/internal").WritableDraft<addUsers>, start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            copyWithin(target: number, start: number, end?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            entries(): IterableIterator<[number, import("immer/dist/internal").WritableDraft<addUsers>]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<import("immer/dist/internal").WritableDraft<addUsers>>;
            includes(searchElement: import("immer/dist/internal").WritableDraft<addUsers>, fromIndex?: number | undefined): boolean;
            flatMap<U_7, This_1 = undefined>(callback: (this: This_1, value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_7 | readonly U_7[], thisArg?: This_1 | undefined): U_7[];
            flat<A_1, D_1 extends number = 1>(this: A_1, depth?: D_1 | undefined): FlatArray<A_1, D_1>[];
            [Symbol.iterator](): IterableIterator<import("immer/dist/internal").WritableDraft<addUsers>>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateUserAvailability: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        userAvailability: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setAllThreads: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        threads: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setUnreadMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        unreadMessages: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setThreadMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        threadMessages: {
            threadMessages: any;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateOutboundMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        outboundMessages: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setRecentChatThreads: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        recentThreads: any;
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setChannelId: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        channelId: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setActiveChat: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        activeChat: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateSearchText: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        searchText: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setSelectedMembers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        selectedMembers: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setEditorVisible: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isEditorOpen: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setLoaderVisible: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isLoader: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setScrollToken: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        scrollToken: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setIsStandalone: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isStandalone: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setContentSearchState: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        contentSearchState: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setApiCall: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        apiCall: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setSelectedDetail: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        selectedDetail: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateMembersDetails: (state: import("immer/dist/internal").WritableDraft<AgentHive>) => {
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    addSelectedMembers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        selectedMembers: any[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    /**
       * Used to update the attachments state
       * @param state - file upload state
       * @param action - reducer action
       * @example -
       * ```
       * // For thread-based (existing pattern)
       * dispatch(updateAttachments({
       *   threadId: '123',
       *   attachments: parsedList,
       * }))
       *
       * // For conversation-based (new pattern like assignment panel)
       * dispatch(updateAttachments({
       *   conversationId: '456',
       *   threadId: '123',
       *   attachments: parsedList,
       * }))
       * ```
       */
    updateAttachments(state: import("immer/dist/internal").WritableDraft<AgentHive>, action: PayloadAction<{
        threadId: string;
        clearEditor?: boolean;
        attachments: AttachmentType[];
    }>): import("immer/dist/internal").WritableDraft<AgentHive>;
    /**
      * Used to remove the attachment based on the attachment id received
      * @param state - file upload state
      * @param action - reducer action
      * @example -
      * ```
      * dispatch(removeAttachment(123456));
      * ```
      */
    removeAttachment(state: import("immer/dist/internal").WritableDraft<AgentHive>, action: PayloadAction<string>): import("immer/dist/internal").WritableDraft<AgentHive>;
    /**
         * Used to update attachment upload status and url
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(updateAttachmentStatusAndUrl({id: 123456, url: "url"}));
         * ```
         */
    updateAttachmentStatusAndUrl(state: import("immer/dist/internal").WritableDraft<AgentHive>, action: PayloadAction<{
        id: string;
        url: string;
        imageId?: string;
        isInline?: boolean;
    }>): import("immer/dist/internal").WritableDraft<AgentHive>;
}, "agentHive">;
export declare const agentHiveReducer: import("redux").Reducer<AgentHive, AnyAction>;
export declare const agentHiveActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setNotify: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => void;
    addNotify: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => void;
    removeNotifyMember: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => import("immer/dist/internal").WritableDraft<AgentHive>;
    setAllUsers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        userList: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setOutboundMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isOutboundMessages: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setAllGroups: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupList: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setSearchedGroupList: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        searchedGroupList: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateGroupChatName: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupChat: {
            groupName: any;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            push(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            concat(...items: ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            concat(...items: (import("immer/dist/internal").WritableDraft<groupChatDetails> | ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>)[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            join(separator?: string | undefined): string;
            reverse(): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            shift(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            slice(start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            sort(compareFn?: ((a: import("immer/dist/internal").WritableDraft<groupChatDetails>, b: import("immer/dist/internal").WritableDraft<groupChatDetails>) => number) | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount: number, ...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            unshift(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            indexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            every<S extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U, thisArg?: any): U[];
            filter<S_1 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_1, thisArg?: any): S_1[];
            filter(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_1, initialValue: U_1): U_1;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_2, initialValue: U_2): U_2;
            find<S_2 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (this: void, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_2, thisArg?: any): S_2 | undefined;
            find(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            findIndex(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): number;
            fill(value: import("immer/dist/internal").WritableDraft<groupChatDetails>, start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            copyWithin(target: number, start: number, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            entries(): IterableIterator<[number, import("immer/dist/internal").WritableDraft<groupChatDetails>]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            includes(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): boolean;
            flatMap<U_3, This = undefined>(callback: (this: This, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
            flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateGroupChatMembers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupChat: {
            members: any;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            push(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            concat(...items: ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            concat(...items: (import("immer/dist/internal").WritableDraft<groupChatDetails> | ConcatArray<import("immer/dist/internal").WritableDraft<groupChatDetails>>)[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            join(separator?: string | undefined): string;
            reverse(): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            shift(): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            slice(start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            sort(compareFn?: ((a: import("immer/dist/internal").WritableDraft<groupChatDetails>, b: import("immer/dist/internal").WritableDraft<groupChatDetails>) => number) | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            splice(start: number, deleteCount: number, ...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            unshift(...items: import("immer/dist/internal").WritableDraft<groupChatDetails>[]): number;
            indexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): number;
            every<S extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U, thisArg?: any): U[];
            filter<S_1 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_1, thisArg?: any): S_1[];
            filter(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_1, initialValue: U_1): U_1;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => import("immer/dist/internal").WritableDraft<groupChatDetails>, initialValue: import("immer/dist/internal").WritableDraft<groupChatDetails>): import("immer/dist/internal").WritableDraft<groupChatDetails>;
            reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: import("immer/dist/internal").WritableDraft<groupChatDetails>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_2, initialValue: U_2): U_2;
            find<S_2 extends import("immer/dist/internal").WritableDraft<groupChatDetails>>(predicate: (this: void, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => value is S_2, thisArg?: any): S_2 | undefined;
            find(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
            findIndex(predicate: (value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, obj: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => unknown, thisArg?: any): number;
            fill(value: import("immer/dist/internal").WritableDraft<groupChatDetails>, start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            copyWithin(target: number, start: number, end?: number | undefined): import("immer/dist/internal").WritableDraft<groupChatDetails>[];
            entries(): IterableIterator<[number, import("immer/dist/internal").WritableDraft<groupChatDetails>]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            includes(searchElement: import("immer/dist/internal").WritableDraft<groupChatDetails>, fromIndex?: number | undefined): boolean;
            flatMap<U_3, This = undefined>(callback: (this: This, value: import("immer/dist/internal").WritableDraft<groupChatDetails>, index: number, array: import("immer/dist/internal").WritableDraft<groupChatDetails>[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
            flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<import("immer/dist/internal").WritableDraft<groupChatDetails>>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): import("immer/dist/internal").WritableDraft<groupChatDetails> | undefined;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setGroupMemberDetails: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        groupMemberDetails: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    addGroupActionMessage: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => void;
    setAllFavorites: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        favorites: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateFavoritesList: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        favorites: {
            members: any[];
        }[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    removeFavoriteMember: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        favorites: {
            members: import("immer/dist/internal").WritableDraft<Member>[];
        }[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateAddUsers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        addUsers: {
            addUsers: any;
            length: number;
            toString(): string;
            toLocaleString(): string;
            pop(): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
            push(...items: import("immer/dist/internal").WritableDraft<addUsers>[]): number;
            concat(...items: ConcatArray<import("immer/dist/internal").WritableDraft<addUsers>>[]): import("immer/dist/internal").WritableDraft<addUsers>[];
            concat(...items: (import("immer/dist/internal").WritableDraft<addUsers> | ConcatArray<import("immer/dist/internal").WritableDraft<addUsers>>)[]): import("immer/dist/internal").WritableDraft<addUsers>[];
            join(separator?: string | undefined): string;
            reverse(): import("immer/dist/internal").WritableDraft<addUsers>[];
            shift(): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
            slice(start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            sort(compareFn?: ((a: import("immer/dist/internal").WritableDraft<addUsers>, b: import("immer/dist/internal").WritableDraft<addUsers>) => number) | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            splice(start: number, deleteCount?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            splice(start: number, deleteCount: number, ...items: import("immer/dist/internal").WritableDraft<addUsers>[]): import("immer/dist/internal").WritableDraft<addUsers>[];
            unshift(...items: import("immer/dist/internal").WritableDraft<addUsers>[]): number;
            indexOf(searchElement: import("immer/dist/internal").WritableDraft<addUsers>, fromIndex?: number | undefined): number;
            lastIndexOf(searchElement: import("immer/dist/internal").WritableDraft<addUsers>, fromIndex?: number | undefined): number;
            every<S_3 extends import("immer/dist/internal").WritableDraft<addUsers>>(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => value is S_3, thisArg?: any): this is S_3[];
            every(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => void, thisArg?: any): void;
            map<U_4>(callbackfn: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_4, thisArg?: any): U_4[];
            filter<S_4 extends import("immer/dist/internal").WritableDraft<addUsers>>(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => value is S_4, thisArg?: any): S_4[];
            filter(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<addUsers>[];
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduce(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>, initialValue: import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduce<U_5>(callbackfn: (previousValue: U_5, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_5, initialValue: U_5): U_5;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduceRight(callbackfn: (previousValue: import("immer/dist/internal").WritableDraft<addUsers>, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => import("immer/dist/internal").WritableDraft<addUsers>, initialValue: import("immer/dist/internal").WritableDraft<addUsers>): import("immer/dist/internal").WritableDraft<addUsers>;
            reduceRight<U_6>(callbackfn: (previousValue: U_6, currentValue: import("immer/dist/internal").WritableDraft<addUsers>, currentIndex: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_6, initialValue: U_6): U_6;
            find<S_5 extends import("immer/dist/internal").WritableDraft<addUsers>>(predicate: (this: void, value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, obj: import("immer/dist/internal").WritableDraft<addUsers>[]) => value is S_5, thisArg?: any): S_5 | undefined;
            find(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, obj: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
            findIndex(predicate: (value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, obj: import("immer/dist/internal").WritableDraft<addUsers>[]) => unknown, thisArg?: any): number;
            fill(value: import("immer/dist/internal").WritableDraft<addUsers>, start?: number | undefined, end?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            copyWithin(target: number, start: number, end?: number | undefined): import("immer/dist/internal").WritableDraft<addUsers>[];
            entries(): IterableIterator<[number, import("immer/dist/internal").WritableDraft<addUsers>]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<import("immer/dist/internal").WritableDraft<addUsers>>;
            includes(searchElement: import("immer/dist/internal").WritableDraft<addUsers>, fromIndex?: number | undefined): boolean;
            flatMap<U_7, This_1 = undefined>(callback: (this: This_1, value: import("immer/dist/internal").WritableDraft<addUsers>, index: number, array: import("immer/dist/internal").WritableDraft<addUsers>[]) => U_7 | readonly U_7[], thisArg?: This_1 | undefined): U_7[];
            flat<A_1, D_1 extends number = 1>(this: A_1, depth?: D_1 | undefined): FlatArray<A_1, D_1>[];
            [Symbol.iterator](): IterableIterator<import("immer/dist/internal").WritableDraft<addUsers>>;
            [Symbol.unscopables](): {
                copyWithin: boolean;
                entries: boolean;
                fill: boolean;
                find: boolean;
                findIndex: boolean;
                keys: boolean;
                values: boolean;
            };
            at(index: number): import("immer/dist/internal").WritableDraft<addUsers> | undefined;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateUserAvailability: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        userAvailability: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setAllThreads: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        threads: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setUnreadMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        unreadMessages: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setThreadMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        threadMessages: {
            threadMessages: any;
        };
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateOutboundMessages: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        outboundMessages: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setRecentChatThreads: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        recentThreads: any;
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setChannelId: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        channelId: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setActiveChat: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        activeChat: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateSearchText: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        searchText: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setSelectedMembers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        selectedMembers: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setEditorVisible: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isEditorOpen: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setLoaderVisible: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isLoader: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setScrollToken: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        scrollToken: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setIsStandalone: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        isStandalone: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setContentSearchState: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        contentSearchState: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setApiCall: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        apiCall: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    setSelectedDetail: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        selectedDetail: any;
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    updateMembersDetails: (state: import("immer/dist/internal").WritableDraft<AgentHive>) => {
        selectedMembers: import("immer/dist/internal").WritableDraft<groupMember>[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    addSelectedMembers: (state: import("immer/dist/internal").WritableDraft<AgentHive>, action: {
        payload: any;
        type: string;
    }) => {
        selectedMembers: any[];
        recentThreads: import("immer/dist/internal").WritableDraft<RecentChatThreads>[];
        userList: import("immer/dist/internal").WritableDraft<users>[];
        groupChat: import("immer/dist/internal").WritableDraft<groupChatDetails>[];
        groupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        searchedGroupList: import("immer/dist/internal").WritableDraft<GroupResponse>;
        groupMemberDetails: import("immer/dist/internal").WritableDraft<groupMember>[];
        favorites: import("immer/dist/internal").WritableDraft<Favorites>[];
        favoriteMember: import("immer/dist/internal").WritableDraft<favoriteMember>[];
        addUsers: import("immer/dist/internal").WritableDraft<addUsers>[];
        userAvailability: import("immer/dist/internal").WritableDraft<userAvailability>;
        threadMessages: any;
        unreadMessages: any;
        outboundMessages?: import("immer/dist/internal").WritableDraft<OutboundMessage> | undefined;
        isOutboundMessages?: boolean | undefined;
        activeChat: import("immer/dist/internal").WritableDraft<ActiveChatDetails>;
        channelId?: string | undefined;
        contentSearchState: boolean;
        searchText: string;
        isEditorOpen: boolean;
        isLoader: boolean;
        scrollToken: boolean;
        isStandalone: boolean;
        apiCall: boolean;
        notify: import("immer/dist/internal").WritableDraft<{
            [key: string]: {
                unReadCount: number;
            };
        }>;
        selectedDetail: import("immer/dist/internal").WritableDraft<{
            [key: string]: string;
        }>;
        conversationInteraction?: import("immer/dist/internal").WritableDraft<{
            [conversationId: string]: ConversationInteractionItem;
        }> | undefined;
        groupActivities: import("immer/dist/internal").WritableDraft<{
            [key: string]: GroupActionMessage[];
        }>;
    };
    /**
       * Used to update the attachments state
       * @param state - file upload state
       * @param action - reducer action
       * @example -
       * ```
       * // For thread-based (existing pattern)
       * dispatch(updateAttachments({
       *   threadId: '123',
       *   attachments: parsedList,
       * }))
       *
       * // For conversation-based (new pattern like assignment panel)
       * dispatch(updateAttachments({
       *   conversationId: '456',
       *   threadId: '123',
       *   attachments: parsedList,
       * }))
       * ```
       */
    updateAttachments(state: import("immer/dist/internal").WritableDraft<AgentHive>, action: PayloadAction<{
        threadId: string;
        clearEditor?: boolean;
        attachments: AttachmentType[];
    }>): import("immer/dist/internal").WritableDraft<AgentHive>;
    /**
      * Used to remove the attachment based on the attachment id received
      * @param state - file upload state
      * @param action - reducer action
      * @example -
      * ```
      * dispatch(removeAttachment(123456));
      * ```
      */
    removeAttachment(state: import("immer/dist/internal").WritableDraft<AgentHive>, action: PayloadAction<string>): import("immer/dist/internal").WritableDraft<AgentHive>;
    /**
         * Used to update attachment upload status and url
         * @param state - file upload state
         * @param action - reducer action
         * @example -
         * ```
         * dispatch(updateAttachmentStatusAndUrl({id: 123456, url: "url"}));
         * ```
         */
    updateAttachmentStatusAndUrl(state: import("immer/dist/internal").WritableDraft<AgentHive>, action: PayloadAction<{
        id: string;
        url: string;
        imageId?: string;
        isInline?: boolean;
    }>): import("immer/dist/internal").WritableDraft<AgentHive>;
}, "agentHive">;
/**
 * USe to get the agent hive state
 * @param rootState - agent hive state
 * @example
 * ```
 *  createSelector(getAgentHiveState, (state) => state.userList)
 * ```
 */
export declare const getAgentHiveState: (rootState: {
    [AGENT_HIVE_FEATURE_KEY]: AgentHive;
}) => AgentHive;
/**
 * get editor status
 */
export declare const getEditorStatus: ((state: {
    agentHive: AgentHive;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get loader status
 */
export declare const getLoaderVisible: ((state: {
    agentHive: AgentHive;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get scrollToken status
 */
export declare const getScrollToken: ((state: {
    agentHive: AgentHive;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get isStandalone status
 */
export declare const getIsStandalone: ((state: {
    agentHive: AgentHive;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get apiCall status
 */
export declare const getApiCall: ((state: {
    agentHive: AgentHive;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get User Availability
 */
export declare const getUserAvailability: ((state: {
    agentHive: AgentHive;
}) => userAvailability) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => userAvailability & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get list of users
 */
export declare const getUsers: ((state: {
    agentHive: AgentHive;
}) => users[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => users[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get list of favorites
 */
export declare const getFavorites: ((state: {
    agentHive: AgentHive;
}) => Favorites[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => Favorites[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get list of groups
 */
export declare const getGroups: ((state: {
    agentHive: AgentHive;
}) => GroupResponse) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => GroupResponse & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get list of groups
 */
export declare const getSearchedGroups: ((state: {
    agentHive: AgentHive;
}) => GroupResponse) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => GroupResponse & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get messages of threads
 */
export declare const getThreadMessage: ((state: {
    agentHive: AgentHive;
}) => ThreadMessageGroup[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => ThreadMessageGroup[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get unread messages
 */
export declare const getUnreadMessagesState: ((state: {
    agentHive: AgentHive;
}) => any) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => any> & {
    clearCache: () => void;
};
/**
 * get members of group
 */
export declare const getGroupDetails: ((state: {
    agentHive: AgentHive;
}) => groupChatDetails[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => groupChatDetails[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get active chat is group or not
 */
export declare const getActiveChat: ((state: {
    agentHive: AgentHive;
}) => ActiveChatDetails) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => ActiveChatDetails & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Get group activity  object
 */
export declare const getGroupActivities: ((state: {
    agentHive: AgentHive;
}) => {
    [key: string]: GroupActionMessage[];
}) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => {
    [key: string]: GroupActionMessage[];
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get channelId from state
 * @returns The channelId value from the agent hive state
 * @example
 * ```
 * const channelId = useSelector(getChannelIdState);
 * ```
 */
export declare const getChannelIdState: ((state: {
    agentHive: AgentHive;
}) => string | undefined) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get content search state
 */
export declare const getContentSearchState: ((state: {
    agentHive: AgentHive;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get group member details
 */
export declare const getGroupMemberDetails: ((state: {
    agentHive: AgentHive;
}) => groupMember[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => groupMember[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get search text
 */
export declare const getConversationSearchText: ((state: {
    agentHive: AgentHive;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Get conversation interaction data
 * @returns The conversationInteraction object containing attachments and thread data organized by conversationId
 * @example
 * ```
 * const conversationInteraction = useSelector(getConversationInteraction);
 * // Access attachments: conversationInteraction[conversationId][threadId].attachments
 * ```
 */
export declare const getConversationInteraction: ((state: {
    agentHive: AgentHive;
}) => {
    [conversationId: string]: ConversationInteractionItem;
}) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => {
    [conversationId: string]: ConversationInteractionItem;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get selected members
 */
export declare const getSelectedMembers: ((state: {
    agentHive: AgentHive;
}) => groupMember[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => groupMember[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get recent threads
 */
export declare const getRecentThreads: ((state: {
    agentHive: AgentHive;
}) => RecentChatThreads[]) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => RecentChatThreads[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get the Notification
 */
export declare const getNotify: ((state: {
    agentHive: AgentHive;
}) => {
    [key: string]: {
        unReadCount: number;
    };
}) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => {
    [key: string]: {
        unReadCount: number;
    };
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * get selected details
 */
export declare const getSelectedDetail: ((state: {
    agentHive: AgentHive;
}) => {
    [key: string]: string;
}) & import("reselect").OutputSelectorFields<(args_0: AgentHive) => {
    [key: string]: string;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
