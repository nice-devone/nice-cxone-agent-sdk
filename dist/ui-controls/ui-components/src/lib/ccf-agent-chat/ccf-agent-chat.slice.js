import { __awaiter, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneFileUploadRequest, NotificationTypeEnum, } from '@nice-devone/common-sdk';
import { createAsyncThunk, createSelector, createSlice, current } from '@reduxjs/toolkit';
import { AgentHiveClient, ConversationsCategory, } from '@nice-devone/user-chat-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { agentWemNotificationsActions } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { toast, ToastContainer } from 'react-toastify';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { dbInstance, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { getSelectedMenuName, globalActions } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { handleCXoneAudioVisualNotification, NotificationType } from '../ccf-settings/ccf-notification-settings.slice';
import { toBase64 } from '../../util/fileUtils';
const agentHiveClient = AgentHiveClient.instance;
const cxoneDigitalClient = CXoneDigitalClient.instance;
const logger = new CcfLogger('App.agent-hive', 'App.agent-hive-slice');
export const AGENT_HIVE_FEATURE_KEY = 'agentHive';
/**
   * Used to show error toast on failure of applying filters
   *
   * @example - showErrorToast()
*/
const showErrorToast = (messageKey) => {
    _jsx(ToastContainer, { enableMultiContainer: true, containerId: 'AppToastContainer', position: "top-center", newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, hideProgressBar: true, draggable: true });
    toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: messageKey }), {
        autoClose: 5000,
        containerId: 'AppToastContainer',
    });
};
/**
 * Use to get the initial agent hive data
 * @returns - initial agent hive data
 * @example
 * ```
 * getInitialAgentHiveState();
 * ```
 */
export const getInitialAgentHiveState = () => {
    const defaultActiveChat = {
        category: '',
    };
    return {
        userList: [],
        groupList: {},
        searchedGroupList: {},
        favorites: [],
        favoriteMember: [],
        groupMemberDetails: [],
        groupChat: [
            {
                groupName: '',
                members: [],
            }
        ],
        addUsers: [],
        userAvailability: {},
        threadMessages: {
            threadMessages: [],
        },
        unreadMessages: {},
        activeChat: defaultActiveChat,
        channelId: '',
        contentSearchState: false,
        searchText: '',
        selectedMembers: [],
        isEditorOpen: false,
        isLoader: false,
        scrollToken: false,
        isStandalone: false,
        apiCall: false,
        recentThreads: [],
        notify: {},
        selectedDetail: {},
        conversationInteraction: {},
        groupActivities: {},
    };
};
/**
 * Used to fetch all the users
 * @example
 * ```
 * dispatch(getAllUsers());
 * ```
 */
export const getAllUsers = createAsyncThunk('agentHive/getAllUsers', ({ searchValue,
//filter,
 }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveUsersService.getAllUsers(searchValue).then((response) => {
        if (response) {
            dispatch(agentHiveActions.setAllUsers(response.users));
        }
    }).catch((error) => {
        logger.error('getAllUsers', `Error while fetching users - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to get the channel id
 * @example
 * ```
 * dispatch(getChannelId({ userId }));
 * ```
 */
export const getChannelId = createAsyncThunk('agentHive/getChannelId', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield agentHiveClient.agentHiveOutboundMessageService.getChannelId();
        if (response) {
            if (response.channelId && response.tenantId) {
                LocalStorageHelper.setItem(StorageKeys.AGENT_HIVE_CHANNEL_INFO, { channelId: response.channelId, tenantId: response.tenantId });
            }
            dispatch(agentHiveActions.setChannelId(response.channelId));
        }
    }
    catch (error) {
        logger.error('getChannelId', `Error while fetching channel id - ${JSON.stringify(error)}`);
        dispatch(agentHiveActions.setChannelId(''));
    }
}));
/**
 * Used to initialize UserHub Sync
 * @example
 * ```
 * dispatch(initUserHubSync(userId));
 * ```
 */
export const initUserHubSync = createAsyncThunk('agentHive/initUserHubSync', (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield agentHiveClient.agentHiveUsersService.initUserHubSync(userId);
        logger.info('initUserHubSync', `UserHub Sync initiated for ${userId}`);
    }
    catch (error) {
        logger.error('initUserHubSync', `Error while initializing UserHub Sync - ${JSON.stringify(error)}`);
    }
}));
/**
 * Used to create a group chat
 * @example
 * ```
 * dispatch(createGroupChat());
 * ```
 */
export const createGroupChat = createAsyncThunk('agentHive/createGroupChat', ({ members, groupName, userId, }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const createRequest = { members: members, groupName: groupName };
    agentHiveClient.agentHiveGroupsService.createGroupChat(createRequest).then((response) => {
        if (response) {
            dispatch(getAllGroupChat({ userId }));
        }
    }).catch((error) => {
        logger.error('createGroupChat', `Error while creating group chat - ${JSON.stringify(error)}`);
        if (error.data.data.body.responseMessage.includes('Group already exists')) {
            showErrorToast('createDuplicateGroupError');
        }
        else if (error.data.data.body.responseMessage.includes('Require')) {
            showErrorToast('createGroupError');
        }
        else if (error.data.data.body.responseMessage.includes('Data too long')) {
            showErrorToast('renameGroupError');
        }
    });
}));
/**
 * Used to add a member to group chat
 * @example
 * ```
 * dispatch(addMemberGroupChat());
 * ```
 */
export const addMemberGroupChat = createAsyncThunk('agentHive/addMemberGroupChat', ({ members, groupId, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const memberRequest = { members: members, groupId: groupId };
    yield agentHiveClient.agentHiveGroupsService.addMemberToGroupChat(memberRequest).then((response) => {
        if (response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const state = getState();
            const groupList = state.agentHive.groupList;
            const activeChat = state.agentHive.activeChat;
            let updatedGroups;
            let updatedMembers = []; // eslint-disable-line @typescript-eslint/no-explicit-any
            if (activeChat.groupDetail) {
                updatedMembers = [
                    ...activeChat.groupDetail.members,
                    ...members.filter((newMember) => !activeChat.groupDetail.members.some((existingMember) => existingMember.userId === newMember.userId))
                ].sort((a, b) => {
                    const nameA = (a.userName || '').toLowerCase();
                    const nameB = (b.userName || '').toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                // Updating Group with latest members
                updatedGroups = groupList.groups.map((group) => group.groupId === memberRequest.groupId ? Object.assign(Object.assign({}, group), { members: updatedMembers }) : group);
                // Move the group to the top of the list
                const groupToMove = updatedGroups.find((group) => group.groupId === memberRequest.groupId);
                updatedGroups = updatedGroups.filter((group) => group.groupId !== memberRequest.groupId);
                if (groupToMove) {
                    updatedGroups = [groupToMove, ...updatedGroups];
                }
            }
            else {
                updatedGroups = [
                    ...groupList.groups,
                    { groupId: memberRequest.groupId, members: members }
                ];
            }
            const updatedGroupList = Object.assign(Object.assign({}, groupList), { groups: updatedGroups });
            //const groupDetails = updatedGroupList.groups.find((group: Groups) => group.groupId === groupId);
            dispatch(agentHiveActions.setActiveChat({ groupDetail: Object.assign(Object.assign({}, activeChat.groupDetail), { members: updatedMembers }), category: ConversationsCategory.GROUP }));
            dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, updatedGroupList), { groups: updatedGroupList.groups.slice(0, 10) })));
            dispatch(agentHiveActions.updateGroupChatMembers(updatedMembers));
            dispatch(agentHiveActions.setGroupMemberDetails(updatedMembers));
            dispatch(agentHiveActions.setSelectedMembers(updatedMembers));
        }
    }).catch((error) => {
        logger.error('addMemberGroupChat', `Error while add member to group chat - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to remove a member from group chat
 * @example
 * ```
 * dispatch(removeMemberGroupChat());
 * ```
 */
export const removeMemberGroupChat = createAsyncThunk('agentHive/removeMemberGroupChat', ({ members, groupId, leaveGroup = false, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const memberRequest = { members: members, groupId: groupId };
    yield agentHiveClient.agentHiveGroupsService
        .removeMemberFromGroupChat(memberRequest)
        .then((response) => {
        var _a, _b, _c, _d, _e, _f;
        if (response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const state = getState();
            const groupList = state.agentHive.groupList;
            const activeChat = state.agentHive.activeChat;
            if (leaveGroup) {
                const updatedGroupList = Object.assign(Object.assign({}, groupList), { groups: (_a = groupList.groups) === null || _a === void 0 ? void 0 : _a.filter((group) => group.groupId !== memberRequest.groupId) });
                dispatch(agentHiveActions.setAllGroups(updatedGroupList));
                if (updatedGroupList.groups.length > 0) {
                    const setNextActiveContact = updatedGroupList.groups[updatedGroupList.groups.length - 1];
                    dispatch(groupMemberDetails({
                        groupId: (setNextActiveContact === null || setNextActiveContact === void 0 ? void 0 : setNextActiveContact.groupId) || '',
                    }));
                    // dispatch(
                    //   agentHiveActions.setActiveChat({
                    //     ...setNextActiveContact,
                    //     category: 'groups',
                    //   })
                    // );
                    dispatch(agentHiveActions.setActiveChat({ groupDetail: setNextActiveContact, category: ConversationsCategory.GROUP }));
                    const msg = {
                        threadMessages: [],
                    };
                    dispatch(agentHiveActions.setThreadMessages(msg));
                    dispatch(getThreadMessages({ threadId: (setNextActiveContact === null || setNextActiveContact === void 0 ? void 0 : setNextActiveContact.threadId) || '', skip: 0 }));
                    const selectedDetail = {
                        selectCategory: 'groups',
                        selectedId: ((_b = setNextActiveContact === null || setNextActiveContact === void 0 ? void 0 : setNextActiveContact.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_c = setNextActiveContact === null || setNextActiveContact === void 0 ? void 0 : setNextActiveContact.groupDetail) === null || _c === void 0 ? void 0 : _c.groupId),
                    };
                    dispatch(agentHiveActions.setSelectedDetail(selectedDetail));
                }
            }
            else {
                const updatedMembers = (_d = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _d === void 0 ? void 0 : _d.members.filter((member) => !members.includes(member.userId));
                const updatedGroupList = Object.assign(Object.assign({}, groupList), { groups: (_e = groupList.groups) === null || _e === void 0 ? void 0 : _e.map((group) => group.groupId === groupId
                        ? Object.assign(Object.assign({}, group), { members: updatedMembers }) : group) });
                // Move the group to the top of the list
                let groupsVar = updatedGroupList.groups;
                const groupToMove = groupsVar.find((group) => group.groupId === memberRequest.groupId);
                groupsVar = groupsVar.filter((group) => group.groupId !== memberRequest.groupId);
                if (groupToMove) {
                    updatedGroupList.groups = [groupToMove, ...groupsVar];
                }
                const updatedActiveChat = ((_f = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _f === void 0 ? void 0 : _f.groupId) === groupId
                    ? Object.assign(Object.assign({}, activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail), { members: updatedMembers }) : activeChat;
                dispatch(agentHiveActions.setActiveChat({ groupDetail: updatedActiveChat, category: ConversationsCategory.GROUP }));
                dispatch(agentHiveActions.setAllGroups(updatedGroupList));
                dispatch(agentHiveActions.setGroupMemberDetails(updatedMembers));
                dispatch(agentHiveActions.setSelectedMembers(updatedMembers));
            }
        }
    })
        .catch((error) => {
        logger.error('removeMemberGroupChat', `Error while removing member from group chat - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to rename group chat
 * @example
 * ```
 * dispatch(renameGroupChat());
 * ```
 */
export const renameGroupChat = createAsyncThunk('agentHive/renameGroupChat', ({ groupName, groupId }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveGroupsService.renameGroupChat(groupId, groupName).then((response) => {
        var _a;
        if (response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const state = getState();
            const groupList = state.agentHive.groupList;
            const activeChat = state.agentHive.activeChat;
            const updatedGroupList = Object.assign(Object.assign({}, groupList), { groups: groupList.groups.map((group) => group.groupId === groupId
                    ? Object.assign(Object.assign({}, group), { groupName: groupName }) : group) });
            // Move the group to the top of the list
            let groupsVar = updatedGroupList.groups;
            const groupToMove = groupsVar.find((group) => group.groupId === groupId);
            groupsVar = groupsVar.filter((group) => group.groupId !== groupId);
            if (groupToMove) {
                updatedGroupList.groups = [groupToMove, ...groupsVar];
            }
            dispatch(agentHiveActions.setAllGroups(updatedGroupList));
            if (((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.groupId) === groupId) {
                const selectedGroup = updatedGroupList.groups.find((group) => group.groupId === groupId);
                dispatch(agentHiveActions.setActiveChat({ groupDetail: selectedGroup, category: ConversationsCategory.GROUP }));
            }
            // dispatch(agentHiveActions.updateGroupChatName(groupName));
        }
    }).catch((error) => {
        logger.error('renameGroupChat', `Error while rename group chat - ${JSON.stringify(error)}`);
        showErrorToast('renameGroupError');
    });
}));
/**
 * Used to fetch all the group chat
 * @example
 * ```
 * dispatch(getAllGroupChat());
 * ```
 */
export const getAllGroupChat = createAsyncThunk('agentHive/getAllGroupChat', ({ userId, searchValue }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveGroupsService.getAllGroupChats(userId, searchValue).then((response) => {
        var _a;
        if (response) {
            if (searchValue) {
                dispatch(agentHiveActions.setSearchedGroupList(response));
            }
            else {
                const limitedGroups = Object.assign(Object.assign({}, response), { groups: (_a = response.groups) === null || _a === void 0 ? void 0 : _a.slice(0, 10) });
                dispatch(agentHiveActions.setAllGroups(limitedGroups));
            }
        }
    }).catch((error) => {
        logger.error('getAllGroupChat', `Error while fetching all group chats - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to get all member details of the group
 * @example
 * ```
 * dispatch(groupMemberDetails());
 * ```
 */
export const groupMemberDetails = createAsyncThunk('agentHive/groupMemberDetails', ({ groupId }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveGroupsService.groupMemberDetails(groupId).then((response) => {
        var _a, _b, _c;
        if (response) {
            const formattedMembers = response.members.map((member) => {
                var _a;
                return ({
                    userId: member.userId,
                    firstName: member.firstName,
                    lastName: member.lastName,
                    userState: member.userState,
                    threadId: (_a = member.threadId) !== null && _a !== void 0 ? _a : '',
                    userName: `${member.firstName} ${member.lastName}`,
                });
            });
            formattedMembers.sort((a, b) => {
                const nameA = (a.userName || '').toLowerCase();
                const nameB = (b.userName || '').toLowerCase();
                return nameA.localeCompare(nameB);
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const state = getState(); // Replace `any` with your root state type
            const groupList = state.agentHive.groupList;
            const activeChat = state.agentHive.activeChat;
            const searchedGroupList = state.agentHive.searchedGroupList;
            const updatedGroupList = Object.assign(Object.assign({}, groupList), { groups: (_a = groupList === null || groupList === void 0 ? void 0 : groupList.groups) === null || _a === void 0 ? void 0 : _a.map((group) => group.groupId === groupId ? Object.assign(Object.assign({}, group), { members: formattedMembers }) : group) });
            if (((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _b === void 0 ? void 0 : _b.groupId) === groupId) {
                const updatedActiveChat = Object.assign(Object.assign({}, activeChat), { groupDetail: Object.assign(Object.assign({}, activeChat.groupDetail), { members: formattedMembers }) });
                dispatch(agentHiveActions.setActiveChat(updatedActiveChat));
            }
            else {
                let chat = updatedGroupList.groups.find((group) => {
                    return group.groupId === groupId;
                });
                if (!chat) {
                    const updatedSearchedGroupList = Object.assign(Object.assign({}, searchedGroupList), { groups: (_c = searchedGroupList === null || searchedGroupList === void 0 ? void 0 : searchedGroupList.groups) === null || _c === void 0 ? void 0 : _c.map((group) => group.groupId === groupId ? Object.assign(Object.assign({}, group), { members: formattedMembers }) : group) });
                    chat = updatedSearchedGroupList.groups.find((group) => {
                        return group.groupId === groupId;
                    });
                }
                if (chat) {
                    dispatch(agentHiveActions.setActiveChat({ groupDetail: chat, category: ConversationsCategory.GROUP }));
                }
            }
            dispatch(agentHiveActions.setSelectedMembers(formattedMembers));
            dispatch(agentHiveActions.setAllGroups(updatedGroupList));
            dispatch(agentHiveActions.setGroupMemberDetails(formattedMembers));
            const userInfo = CXoneUser.instance.getUserInfo();
            const formattedMemberUserIds = formattedMembers.map((member) => member.userId);
            dispatch(updateUserSubscription({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId, subscribe: true, agentIds: formattedMemberUserIds }));
        }
    }).catch((error) => {
        logger.error('groupMemberDetails', `Error while fetching all group chats - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to mark/unmark favorite members
 * @example
 * ```
 * dispatch(removeFavoriteMember());
 * ```
 */
export const removeFavoriteMember = createAsyncThunk('agentHive/removeFavoriteMember', ({ userId, memberId, }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const removeFavRequest = { userId, memberId };
    agentHiveClient.agentHiveFavoritesService.removeFavoriteMember(removeFavRequest).then((response) => {
        if (response) {
            dispatch(agentHiveActions.removeFavoriteMember(memberId));
        }
    }).catch((error) => {
        // dispatch(agentHiveActions.removeFavoriteMember(memberId));
        logger.error('removeFavoriteMember', `Error while marking favorites member - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to get all favorite members
 * @example
 * ```
 * dispatch(getAllFavorites());
 * ```
 */
export const getAllFavorites = createAsyncThunk('agentHive/getAllFavorites', ({ userId }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveFavoritesService.getAllFavorites(userId).then((response) => {
        if (response) {
            const transformedFavorites = [{
                    members: response.members.map((member) => ({
                        userId: member.userId,
                        firstName: member.firstName,
                        lastName: member.lastName,
                        userState: member.userState,
                    })),
                }];
            dispatch(agentHiveActions.setAllFavorites(transformedFavorites));
        }
    }).catch((error) => {
        logger.error('getAllFavorites', `Error while fetching all favorites members - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to get all favorite members
 * @example
 * ```
 * dispatch(markUserAsFavorite(userId, memberId));
 * ```
 */
export const markUserAsFavorite = createAsyncThunk('agentHive/markUserAsFavorite', ({ userId, member }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveFavoritesService.markUserAsFavorite(userId, member.userId).then((response) => {
        if (response) {
            const updateFavoriteList = {
                userId: member.userId,
                firstName: member.firstName,
                lastName: member.lastName,
                userState: member.userState,
                name: member.name,
            };
            dispatch(agentHiveActions.updateFavoritesList(updateFavoriteList));
        }
    }).catch((error) => {
        logger.error('markUserAsFavorite', `Error while fetching all favorites members - ${JSON.stringify(error)}`);
        showErrorToast('markFavoriteError');
    });
}));
/**
 * Used to update user availability
 * @example
 * ```
 * dispatch(updateUserAvailability());
 * ```
 */
export const updateUserAvailability = createAsyncThunk('agentHive/updateUserAvailability', ({ id, userState }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveUsersService.updateUserAvailability({ id, userState }).then(() => {
        dispatch(agentHiveActions.updateUserAvailability({ [id]: userState }));
    }).catch((error) => {
        logger.error('updateUserAvailability', `Error while update user availability - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to update user availability
 * @example
 * ```
 * dispatch(updateUserAvailability());
 * ```
 */
export const updateUserSubscription = createAsyncThunk('agentHive/updateUserSubscription', ({ userId, subscribe, agentIds }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveUsersService.updateUserSubscription({ userId, subscribe, agentIds }).then().catch((error) => {
        logger.error('updateUserSubscription', `Error while update user availability - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to upload attachment for agent hive
 * @example
 * ```
 * dispatch(uploadAttachmentFile({ content, mimeType, attachmentId }));
 * ```
 */
export const uploadAttachmentFile = (content, type, id, state) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        const fileUploadRequest = new CXoneFileUploadRequest();
        fileUploadRequest.content = content;
        fileUploadRequest.mimeType = type;
        const agentHiveUserService = agentHiveClient.agentHiveUsersService;
        const threadId = ((_b = (_a = state.agentHive.activeChat) === null || _a === void 0 ? void 0 : _a.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_d = (_c = state.agentHive.activeChat) === null || _c === void 0 ? void 0 : _c.memberDetail) === null || _d === void 0 ? void 0 : _d.threadId);
        if (threadId && ((_f = (_e = state.agentHive.threadMessages) === null || _e === void 0 ? void 0 : _e.threadMessages) === null || _f === void 0 ? void 0 : _f.length)) {
            const thread = state.agentHive.threadMessages.threadMessages.find((msgGroup) => msgGroup.threadId === threadId);
            if (thread && thread.upload) {
                agentHiveUserService.upload(fileUploadRequest, id)
                    .then((response) => {
                    thunkDispatch(agentHiveActions.updateAttachmentStatusAndUrl({ id: response.uId, url: response.url, imageId: response.id }));
                })
                    .catch((error) => {
                    logger.error('uploadAttachment', 'Error while uploading file' + error.toString());
                });
            }
        }
    }
    catch (error) {
        logger.error('uploadAttachmentFile', `Error while uploading file - ${JSON.stringify(error)}`);
        throw error;
    }
};
/**
 * Used to download all attachments for agent hive
 * @example
 * ```
 * dispatch(downloadAllAttachments({ attachments }));
 * ```
 */
export const downloadAllAttachments = createAsyncThunk('agentHive/downloadAllAttachments', ({ attachments, }, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const state = getState();
        const threadId = ((_b = (_a = state.agentHive.activeChat) === null || _a === void 0 ? void 0 : _a.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_d = (_c = state.agentHive.activeChat) === null || _c === void 0 ? void 0 : _c.memberDetail) === null || _d === void 0 ? void 0 : _d.threadId);
        if (threadId && ((_f = (_e = state.agentHive.threadMessages) === null || _e === void 0 ? void 0 : _e.threadMessages) === null || _f === void 0 ? void 0 : _f.length)) {
            const thread = state.agentHive.threadMessages.threadMessages.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (msgGroup) => msgGroup.threadId === threadId);
            if (thread && thread.downloadAllAttachments) {
                const response = yield thread.downloadAllAttachments(attachments);
                return response;
            }
        }
    }
    catch (error) {
        logger.error('downloadAllAttachments', `Error while downloading all attachments - ${JSON.stringify(error)}`);
        throw error;
    }
}));
/**
 * Used to add users
 * @example
 * ```
 * dispatch(addUsers());
 * ```
 */
export const addUsers = createAsyncThunk('agentHive/addUsers', ({ addUsers, }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveGroupsService.createGroupChat().then((response) => {
        if (response) {
            dispatch(agentHiveActions.updateAddUsers(addUsers));
        }
    }).catch((error) => {
        logger.error('createGroupChat', `Error while creating group chat - ${JSON.stringify(error)}`);
    });
}));
let thunkDispatch;
export const updateFileToBeUploadedForThread = createAsyncThunk('agentHive/updateFilesToBeUploadedForThread', (data, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l, _m;
    thunkDispatch = dispatch;
    const state = getState();
    const { agentHive } = state;
    const selectedThreadId = ((_h = (_g = agentHive.activeChat) === null || _g === void 0 ? void 0 : _g.groupDetail) === null || _h === void 0 ? void 0 : _h.threadId) || ((_k = (_j = agentHive.activeChat) === null || _j === void 0 ? void 0 : _j.memberDetail) === null || _k === void 0 ? void 0 : _k.threadId) || ((_m = (_l = agentHive.activeChat) === null || _l === void 0 ? void 0 : _l.memberDetail) === null || _m === void 0 ? void 0 : _m.userId) || '';
    const parsedList = yield parseFileListAndUpload(data.fileList, agentHive, data.uuidList);
    // In case of forwarded attachment set isForwardedAttachment prop to true
    if (data.isForwardedAttachment) {
        parsedList.forEach((attachment) => {
            attachment.isForwardedAttachment = true;
        });
    }
    dispatch(agentHiveActions.updateAttachments({ threadId: selectedThreadId, attachments: parsedList }));
}));
/**
 * Used to parse FileList into attachmentType array
 * @param fileList - file list that needs to be parsed
 * @example -
 * ```
 * const attachmentList = await parseFileList(fileList);
 * ```
 */
const parseFileListAndUpload = (fileList, state, uuidList) => __awaiter(void 0, void 0, void 0, function* () {
    const files = [];
    for (const [index, file] of Array.from(fileList).entries()) {
        const fileSizeInMB = Math.ceil(file.size / 1024 / 1024);
        if (fileSizeInMB <= 25 && fileSizeInMB > 0) {
            // if file size is less than equal to 25 MB and greater than 0 bytes then only file will be uploaded
            const base64String = yield toBase64(file);
            /**
             * inline images will be stored after normal attachments
             * if the index crossed the normal attachments then storin UID
             */
            let uid;
            if (uuidList) {
                const isInlineFile = index >= fileList.length - (uuidList === null || uuidList === void 0 ? void 0 : uuidList.length);
                if (uuidList && isInlineFile) {
                    const inlineFileIndex = index - (fileList.length - (uuidList === null || uuidList === void 0 ? void 0 : uuidList.length));
                    uid = uuidList[inlineFileIndex];
                }
            }
            const nFile = {
                attachmentId: uid,
                id: `${file.name}${Date.now()}`,
                name: file.name,
                size: file.size,
                mimeType: file.type,
                uploaded: false,
                url: '',
                isInline: Boolean(uid),
            };
            conversationUploadAttachment(base64String, nFile.mimeType, nFile.id, state);
            files.push(nFile);
        }
        else {
            if (fileSizeInMB === 0) {
                thunkDispatch(globalActions.setToastMsg({ msg: '0MB' }));
                logger.error('parseFileListAndUpload', 'File size for ' + file.name + ' is of 0 bytes which has not met the allowed limit');
            }
            else {
                thunkDispatch(globalActions.setToastMsg({ msg: '25MB' }));
                logger.error('parseFileListAndUpload', 'File size for ' + file.name + ' exceeded than allowed limit of 25MB');
            }
        }
    }
    return files;
});
/**
 * Used to upload attachment
 * @param content - base64 file string
 * @param type - attachment type
 * @param id - attachment id
 * @param state - assignment state
 * @example -
 * ```
 * uploadAttachment(base64String, nFile.mimeType, nFile.id);
 * ```
 */
const conversationUploadAttachment = (content, type, id, state) => {
    var _a, _b, _c, _d, _e, _f;
    const fileUploadRequest = new CXoneFileUploadRequest();
    fileUploadRequest.content = content;
    fileUploadRequest.mimeType = type;
    const threadId = ((_b = (_a = state === null || state === void 0 ? void 0 : state.activeChat) === null || _a === void 0 ? void 0 : _a.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_d = (_c = state === null || state === void 0 ? void 0 : state.activeChat) === null || _c === void 0 ? void 0 : _c.memberDetail) === null || _d === void 0 ? void 0 : _d.threadId) || ((_f = (_e = state === null || state === void 0 ? void 0 : state.activeChat) === null || _e === void 0 ? void 0 : _e.memberDetail) === null || _f === void 0 ? void 0 : _f.userId);
    if (threadId) {
        agentHiveClient.agentHiveUsersService
            .upload(fileUploadRequest, id)
            .then((response) => {
            thunkDispatch(agentHiveActions.updateAttachmentStatusAndUrl({ id: response.uId, url: response.url, imageId: response.id }));
        })
            .catch((error) => {
            logger.error('uploadAttachment', 'Error while uploading file' + error.toString());
        });
    }
};
/**
 * Used for outbound messages
 * @example
 * ```
 * dispatch(sendConversationReply());
 * ```
 */
export const sendConversationReply = createAsyncThunk('agentHive/sendConversationReply', ({ outboundMessages, category, groupId, // Default to empty string if not provided
 }, { dispatch, getState, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    try {
        const response = yield agentHiveClient.agentHiveOutboundMessageService.outboundMessages(outboundMessages);
        if (response) {
            const userInfo = CXoneUser.instance.getUserInfo();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const state = getState();
            const threadId = ((_p = (_o = state.agentHive.activeChat) === null || _o === void 0 ? void 0 : _o.groupDetail) === null || _p === void 0 ? void 0 : _p.threadId) || ((_r = (_q = state.agentHive.activeChat) === null || _q === void 0 ? void 0 : _q.memberDetail) === null || _r === void 0 ? void 0 : _r.threadId) || ((_t = (_s = state.agentHive.activeChat) === null || _s === void 0 ? void 0 : _s.memberDetail) === null || _t === void 0 ? void 0 : _t.userId);
            if (category === ConversationsCategory.GROUP && outboundMessages.recipients.length >= 1) {
                const groupList = state.agentHive.groupList;
                const updatedGroupList = Object.assign(Object.assign({}, groupList), { groups: groupList.groups.map((group) => group.groupId === groupId
                        ? Object.assign(Object.assign({}, group), { threadId: response.threadIdOnExternalPlatform }) : group) });
                dispatch(agentHiveActions.setAllGroups(updatedGroupList));
            }
            const updateMessage = JSON.parse(JSON.stringify(state.agentHive.threadMessages) || '');
            if (!updateMessage.threadMessages || updateMessage.threadMessages.length === 0) {
                const threadMessagesData = {
                    data: [response],
                };
                updateMessage.threadMessages = [threadMessagesData];
            }
            else {
                updateMessage.threadMessages = updateMessage.threadMessages.map((message) => (Object.assign(Object.assign({}, message), { data: [response, ...message.data] })));
            }
            dispatch(agentHiveActions.setOutboundMessages(true));
            dispatch(agentHiveActions.setThreadMessages(updateMessage));
            dispatch(agentHiveActions.updateOutboundMessages(outboundMessages));
            dispatch(fetchRecentChatThreads({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
            dispatch(agentHiveActions.updateAttachments({ threadId: threadId, clearEditor: true, attachments: [] }));
            return response;
        }
        return rejectWithValue({ message: 'No response from API' });
    }
    catch (error) {
        const err = error;
        const errorCode = (_y = (_x = (_w = (_v = (_u = err === null || err === void 0 ? void 0 : err.data) === null || _u === void 0 ? void 0 : _u.data) === null || _v === void 0 ? void 0 : _v.body) === null || _w === void 0 ? void 0 : _w.errors) === null || _x === void 0 ? void 0 : _x[0]) === null || _y === void 0 ? void 0 : _y.errorCode;
        const contactNumber = (_4 = (_3 = (_2 = (_1 = (_0 = (_z = err === null || err === void 0 ? void 0 : err.data) === null || _z === void 0 ? void 0 : _z.data) === null || _0 === void 0 ? void 0 : _0.body) === null || _1 === void 0 ? void 0 : _1.errors) === null || _2 === void 0 ? void 0 : _2[0]) === null || _3 === void 0 ? void 0 : _3.parameters) === null || _4 === void 0 ? void 0 : _4.contactNumber;
        if (errorCode === 'messagesInContactLimitReached' && contactNumber) {
            yield cxoneDigitalClient.digitalContactManager.digitalContactService.changeCustomerContactStatus(contactNumber, 'closed');
            dispatch(sendConversationReply({ outboundMessages: outboundMessages, category: category, groupId: groupId || '' }));
        }
        return rejectWithValue(err);
    }
}));
/**
 * Used to fetch all messages from the thread
 * @example
 * ```
 * dispatch(getThreadMessages());
 * ```
 */
export const getThreadMessages = createAsyncThunk('agentHive/getThreadMessages', ({ threadId, skip, searchContent, }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    if (threadId === '' || threadId === null) {
        const msg = {
            threadMessages: [],
        };
        dispatch(agentHiveActions.setThreadMessages(msg));
        dispatch(agentHiveActions.setLoaderVisible(false));
        return;
    }
    const top = 15;
    agentHiveClient.agentHiveOutboundMessageService.getThreadMessages(threadId, skip, top, searchContent).then((response) => {
        if (response) {
            const msg = {
                threadMessages: [response],
            };
            const hasMoreMessages = (response === null || response === void 0 ? void 0 : response.scrollToken) !== '';
            dispatch(agentHiveActions.setOutboundMessages(false));
            dispatch(agentHiveActions.setScrollToken(hasMoreMessages));
            dispatch(agentHiveActions.setLoaderVisible(false));
            dispatch(agentHiveActions.setThreadMessages(msg));
            dispatch(agentHiveActions.setApiCall(false));
        }
    }).catch((error) => {
        dispatch(agentHiveActions.setLoaderVisible(false));
        dispatch(agentHiveActions.setScrollToken(false));
        dispatch(agentHiveActions.setApiCall(false));
        logger.error('getThreadMessages', `Error while fetching all thread messages - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to fetch unread messages for a user
 * @example
 * ```
 * dispatch(getIUnreadMessages({ userId }));
 * ```
 */
export const getUnreadMessages = createAsyncThunk('agentHive/getUnreadMessages', ({ userId }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveOutboundMessageService.getUnreadMessages(userId).then((response) => {
        if (response) {
            dispatch(agentHiveActions.setUnreadMessages(response));
        }
    }).catch((error) => {
        logger.error('getIUnreadMessages', `Error while fetching unread messages - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to clear unread messages for a user and thread
 * @example
 * ```
 * dispatch(clearUnreadMessages({ userId, threadId }));
 * ```
 */
export const clearUnreadMessages = createAsyncThunk('agentHive/clearUnreadMessages', ({ receiverId, threadId }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveOutboundMessageService.clearUnreadMessages(receiverId, threadId)
        .then(() => {
        dispatch(agentHiveActions.setUnreadMessages({}));
    })
        .catch((error) => {
        logger.error('clearUnreadMessages', `Error while clearing unread messages - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to fetch all recent chat threads
 * @example
 * ```
 * dispatch(fetchRecentChatThreads());
 * ```
 */
export const fetchRecentChatThreads = createAsyncThunk('agentHive/fetchRecentChatThreads', ({ userId }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    agentHiveClient.agentHiveOutboundMessageService.fetchRecentChatThreads(userId).then((response) => {
        if (response) {
            dispatch(agentHiveActions.setRecentChatThreads(response));
        }
    }).catch((error) => {
        logger.error('fetchRecentChatThreads', `Error while fetching all threads - ${JSON.stringify(error)}`);
    });
}));
let previousSearchContent;
let previousSkip = 0;
let previousThreadMessages = [];
/**
 * Used to fetch messages for user
 * @example
 * ```
 * dispatch(fetchUserMessages());
 * ```
 */
export const fetchUserMessages = createAsyncThunk('agentHive/fetchUserMessages', ({ threadMessages, skip, searchContent, }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const top = 15;
    agentHiveClient.agentHiveOutboundMessageService.fetchUserMessages(threadMessages, skip, top, searchContent).then((response) => {
        var _a, _b, _c;
        if (response) {
            const hasMoreMessages = response.scrollToken !== '';
            dispatch(agentHiveActions.setScrollToken(hasMoreMessages));
            dispatch(agentHiveActions.setLoaderVisible(false));
            dispatch(agentHiveActions.setOutboundMessages(false));
            if (searchContent) {
                const msgs = {
                    threadMessages: [],
                };
                dispatch(agentHiveActions.setThreadMessages(msgs));
                let mergedMessages = [];
                const isSameSearch = previousSearchContent === searchContent;
                const isNextPage = skip > previousSkip;
                if (isSameSearch && isNextPage) {
                    mergedMessages = [{ hits: response.hits, data: [...((_b = (_a = previousThreadMessages[0]) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : []), ...((_c = response.data) !== null && _c !== void 0 ? _c : [])], scrollToken: response.scrollToken }];
                }
                else {
                    mergedMessages = [response];
                }
                // Store for next invocation
                previousSearchContent = searchContent;
                previousSkip = skip;
                previousThreadMessages = mergedMessages;
                const msg = {
                    threadMessages: mergedMessages,
                };
                dispatch(agentHiveActions.setThreadMessages(msg));
            }
            else {
                const msg = {
                    threadMessages: [response],
                };
                dispatch(agentHiveActions.setThreadMessages(msg));
            }
            dispatch(agentHiveActions.setApiCall(false));
        }
    }).catch((error) => {
        const msg = {
            threadMessages: [],
        };
        dispatch(agentHiveActions.setScrollToken(false));
        dispatch(agentHiveActions.setLoaderVisible(false));
        dispatch(agentHiveActions.setOutboundMessages(false));
        dispatch(agentHiveActions.setThreadMessages(msg));
        dispatch(agentHiveActions.setApiCall(false));
        dispatch(agentHiveActions.setContentSearchState(false));
        logger.error('fetchUserMessages', `Error while fetching user messages - ${JSON.stringify(error)}`);
    });
}));
/**
 * Used to check if the id is present in sections (favorites, groups, or direct messages)
 * @param id - id to check in sections
 * @returns - boolean value indicating if the id is present in sections
 * @example - checkIdInSections(id: string);
 */
export const checkIdInSections = (state, id, isDirectMessage) => {
    var _a, _b, _c, _d, _e;
    const groupList = (_b = (_a = state.agentHive) === null || _a === void 0 ? void 0 : _a.groupList) === null || _b === void 0 ? void 0 : _b.groups;
    const favorites = (_d = (_c = state.agentHive) === null || _c === void 0 ? void 0 : _c.favorites[0]) === null || _d === void 0 ? void 0 : _d.members;
    const directMessages = (_e = state.agentHive) === null || _e === void 0 ? void 0 : _e.recentThreads;
    if (isDirectMessage) {
        if (favorites === null || favorites === void 0 ? void 0 : favorites.some((member) => (member === null || member === void 0 ? void 0 : member.userId) === id)) {
            return true;
        }
        if (directMessages === null || directMessages === void 0 ? void 0 : directMessages.some((thread) => (thread === null || thread === void 0 ? void 0 : thread.threadId) === id)) {
            return true;
        }
    }
    else {
        if (groupList === null || groupList === void 0 ? void 0 : groupList.some((group) => (group === null || group === void 0 ? void 0 : group.threadId) === id)) {
            return true;
        }
    }
    return false;
};
/**
 * Fetches the groupName from IndexedDB where the threadId matches the provided argument.
 * @param threadId - The threadId to search for.
 * @returns - The groupName if found, otherwise undefined.
 * @example - getGroupNameByThreadId(threadId: string);
 */
export const getGroupNameByThreadId = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbInstance();
        const groupDetailsFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.CONVERSATIONS, IndexDBKeyNames.CONVERSATIONS_GROUPS))) || [];
        const groupDetails = groupDetailsFromDB === null || groupDetailsFromDB === void 0 ? void 0 : groupDetailsFromDB.find((group) => group.threadId === threadId);
        return groupDetails === null || groupDetails === void 0 ? void 0 : groupDetails.groupName;
    }
    catch (error) {
        console.error('Error fetching group details:', error);
        return undefined;
    }
});
/**
 * Fetches the groupName from IndexedDB where the users matches the provided argument.
 * @param users - The users to search for.
 * @returns - The groupName if found, otherwise undefined.
 * @example - getGroupNameByUsers(users: string[]);
 */
export const getGroupNameByUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbInstance();
        const groupDetailsFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.CONVERSATIONS, IndexDBKeyNames.CONVERSATIONS_GROUPS))) || [];
        const matchingGroup = groupDetailsFromDB === null || groupDetailsFromDB === void 0 ? void 0 : groupDetailsFromDB.filter(el => el.threadId === undefined).find((group) => users.every(userId => { var _a; return (_a = group.members) === null || _a === void 0 ? void 0 : _a.some(member => member === userId); }));
        if (!matchingGroup) {
            return undefined;
        }
        return matchingGroup.groupName;
    }
    catch (error) {
        console.error('Error fetching group details:', error);
        return undefined;
    }
});
/**
 * Generates a random string of 5 characters using Math.random.
 * @returns - A random 5-character string.
 * @example - generateRandomString();
 */
export const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 7);
};
/**
 * Used for outbound messages
 * @example
 * ```
 * dispatch(sendConversationReply());
 * ```
 */
export const updateMessagesAndNotification = createAsyncThunk('agentHive/updateMessagesAndNotification', ({ inBoundMessages, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = getState();
    const userInfo = CXoneUser.instance.getUserInfo();
    const activeChat = state.agentHive.activeChat;
    const notify = state.agentHive.notify;
    const updateMessage = JSON.parse(JSON.stringify(state.agentHive.threadMessages) || '');
    const userIdForMessage = ((_5 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.authorUser) === null || _5 === void 0 ? void 0 : _5.incontactId) || ((_6 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.user) === null || _6 === void 0 ? void 0 : _6.incontactId);
    const threadId = inBoundMessages.threadIdOnExternalPlatform;
    /**
     * Used for get the group name
     * @example
     * ```
     * getGroupName();
     * ```
     */
    const getGroupName = () => __awaiter(void 0, void 0, void 0, function* () {
        var _20, _21;
        let name;
        if (threadId) {
            name = yield getGroupNameByThreadId(threadId !== null && threadId !== void 0 ? threadId : '');
        }
        if (!name) {
            const users = [
                (_20 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.authorUser) === null || _20 === void 0 ? void 0 : _20.incontactId,
                ...(((_21 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.recipients) === null || _21 === void 0 ? void 0 : _21.map(({ idOnExternalPlatform }) => idOnExternalPlatform)) || [])
            ];
            name = yield getGroupNameByUsers(users);
        }
        return name;
    });
    const groupName = yield getGroupName();
    const selectedMenu = getSelectedMenuName(state);
    let isActiveChat = false;
    if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.GROUP) {
        if (((_7 = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _7 === void 0 ? void 0 : _7.threadId) === threadId) {
            if (!updateMessage.threadMessages || updateMessage.threadMessages.length === 0) {
                const threadMessagesData = {
                    data: [inBoundMessages],
                };
                updateMessage.threadMessages = [threadMessagesData];
            }
            else {
                updateMessage.threadMessages = updateMessage.threadMessages.map((message) => (Object.assign(Object.assign({}, message), { data: [inBoundMessages, ...message.data] })));
            }
            dispatch(agentHiveActions.setOutboundMessages(true));
            dispatch(agentHiveActions.setThreadMessages(updateMessage));
            isActiveChat = true;
        }
    }
    else if (((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.FAVORITES || (activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.DIRECT) && ((inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.recipients) && inBoundMessages.recipients.length < 2)) {
        if (activeChat.memberDetail.userId === userIdForMessage) {
            if (!updateMessage.threadMessages || updateMessage.threadMessages.length === 0) {
                const threadMessagesData = {
                    data: [inBoundMessages],
                };
                updateMessage.threadMessages = [threadMessagesData];
            }
            else {
                updateMessage.threadMessages = updateMessage.threadMessages.map((message) => (Object.assign(Object.assign({}, message), { data: [inBoundMessages, ...message.data] })));
            }
            dispatch(agentHiveActions.setOutboundMessages(true));
            dispatch(agentHiveActions.setThreadMessages(updateMessage));
            isActiveChat = true;
        }
    }
    const isNotConversationsMenu = selectedMenu !== Navigation.AGENT_CHAT;
    if (!isActiveChat || (isActiveChat && isNotConversationsMenu && !state.agentHive.isStandalone)) {
        const isDirectMessage = (inBoundMessages.recipients && inBoundMessages.recipients.length < 2);
        const id = isDirectMessage ? userIdForMessage : threadId;
        const isNewId = !checkIdInSections(state, id, isDirectMessage !== null && isDirectMessage !== void 0 ? isDirectMessage : false);
        let updatedNotify = Object.assign({}, notify);
        if (id !== undefined) {
            updatedNotify = Object.assign(Object.assign({}, notify), { [id]: {
                    unReadCount: (((_8 = notify[id]) === null || _8 === void 0 ? void 0 : _8.unReadCount) || 0) + 1,
                } });
            dispatch(agentHiveActions.setNotify(JSON.parse(JSON.stringify(updatedNotify))));
        }
        const messageNotify = {};
        messageNotify.id = (inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.threadIdOnExternalPlatform) ? (inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.threadIdOnExternalPlatform) + generateRandomString() : '';
        messageNotify.message = (_9 = inBoundMessages.messageContent.text) !== null && _9 !== void 0 ? _9 : '';
        messageNotify.subject = ((_11 = (_10 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.recipients) === null || _10 === void 0 ? void 0 : _10.length) !== null && _11 !== void 0 ? _11 : 0) < 2 ? `${(_13 = (_12 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.authorUser) === null || _12 === void 0 ? void 0 : _12.firstName) !== null && _13 !== void 0 ? _13 : ''} ${(_15 = (_14 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.authorUser) === null || _14 === void 0 ? void 0 : _14.surname) !== null && _15 !== void 0 ? _15 : ''}`.trim()
            : groupName !== null && groupName !== void 0 ? groupName : `${(_17 = (_16 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.authorUser) === null || _16 === void 0 ? void 0 : _16.firstName) !== null && _17 !== void 0 ? _17 : ''} ${(_19 = (_18 = inBoundMessages === null || inBoundMessages === void 0 ? void 0 : inBoundMessages.authorUser) === null || _18 === void 0 ? void 0 : _18.surname) !== null && _19 !== void 0 ? _19 : ''}`.trim();
        messageNotify.receivedDateTime = inBoundMessages.createdAt ? new Date(inBoundMessages.createdAt) : new Date();
        messageNotify.msgRead = false;
        messageNotify.validUntil = 0;
        messageNotify.receivedTime = inBoundMessages.createdAt ? new Date(inBoundMessages.createdAt).getTime() : new Date().getTime();
        messageNotify.expTimer = 0;
        messageNotify.notificationType = NotificationTypeEnum.ConversationNotification;
        dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.NEW_AGENT_MESSAGE, payload: [messageNotify] }));
        dispatch(agentWemNotificationsActions.processAndSetConversationsNotifications([messageNotify]));
        isNewId && isDirectMessage && dispatch(fetchRecentChatThreads({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
        isNewId && !isDirectMessage && dispatch(getAllGroupChat({ userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId }));
    }
}));
export const agentHiveSlice = createSlice({
    name: AGENT_HIVE_FEATURE_KEY,
    initialState: getInitialAgentHiveState(),
    reducers: {
        setNotify: (state, action) => {
            state.notify = action.payload;
        },
        addNotify: (state, action) => {
            const { key, value } = action.payload;
            state.notify[key] = value;
        },
        removeNotifyMember: (state, action) => {
            const notify = state.notify;
            const keyToRemove = action.payload;
            if (notify[keyToRemove]) {
                const _a = notify, _b = keyToRemove, _ = _a[_b], updatedNotify = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                return Object.assign(Object.assign({}, state), { notify: updatedNotify });
            }
            return state;
        },
        setAllUsers: (state, action) => {
            return Object.assign(Object.assign({}, state), { userList: action.payload });
        },
        setOutboundMessages: (state, action) => {
            return Object.assign(Object.assign({}, state), { isOutboundMessages: action.payload });
        },
        setAllGroups: (state, action) => {
            return Object.assign(Object.assign({}, state), { groupList: action.payload });
        },
        setSearchedGroupList: (state, action) => {
            return Object.assign(Object.assign({}, state), { searchedGroupList: action.payload });
        },
        updateGroupChatName: (state, action) => {
            return Object.assign(Object.assign({}, state), { groupChat: Object.assign(Object.assign({}, state.groupChat), { groupName: action.payload }) });
        },
        updateGroupChatMembers: (state, action) => {
            return Object.assign(Object.assign({}, state), { groupChat: Object.assign(Object.assign({}, state.groupChat), { members: action.payload }) });
        },
        setGroupMemberDetails: (state, action) => {
            return Object.assign(Object.assign({}, state), { groupMemberDetails: action.payload });
        },
        addGroupActionMessage: (state, action) => {
            var _a;
            const { threadId, groupId, timeStamp } = action.payload;
            const createdAt = timeStamp;
            const groupAction = {
                id: Date.now().toString(),
                messageContent: action.payload,
                createdAt,
                isGroupAction: true,
            };
            const key = threadId || groupId;
            if (!key)
                return;
            if (!state.groupActivities[key]) {
                state.groupActivities[key] = [];
            }
            const alreadyExists = state.groupActivities[key].some((msg) => {
                var _a, _b;
                return ((_a = msg.messageContent) === null || _a === void 0 ? void 0 : _a.action) === ((_b = groupAction.messageContent) === null || _b === void 0 ? void 0 : _b.action) &&
                    msg.createdAt === groupAction.createdAt;
            });
            if (!alreadyExists) {
                state.groupActivities[key].push(groupAction);
            }
            const existingThreads = current(((_a = state.threadMessages) === null || _a === void 0 ? void 0 : _a.threadMessages) || []);
            const updatedThreads = existingThreads.map((thread) => {
                var _a, _b;
                if (((_b = (_a = thread.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.threadIdOnExternalPlatform) === threadId) {
                    return Object.assign(Object.assign({}, thread), { data: [...thread.data, groupAction] });
                }
                return thread;
            });
            state.threadMessages = Object.assign(Object.assign({}, state.threadMessages), { threadMessages: updatedThreads });
        },
        setAllFavorites: (state, action) => {
            return Object.assign(Object.assign({}, state), { favorites: action.payload });
        },
        updateFavoritesList: (state, action) => {
            var _a;
            const updateFavotireList = [...(((_a = state.favorites[0]) === null || _a === void 0 ? void 0 : _a.members) || []), action.payload];
            return Object.assign(Object.assign({}, state), { favorites: [{ members: updateFavotireList }] });
        },
        removeFavoriteMember: (state, action) => {
            const favs = state.favorites[0].members.filter((fav) => fav.userId !== action.payload);
            return Object.assign(Object.assign({}, state), { favorites: [{ members: favs }] });
        },
        updateAddUsers: (state, action) => {
            return Object.assign(Object.assign({}, state), { addUsers: Object.assign(Object.assign({}, state.addUsers), { addUsers: action.payload }) });
        },
        updateUserAvailability: (state, action) => {
            return Object.assign(Object.assign({}, state), { userAvailability: Object.assign(Object.assign({}, state.userAvailability), action.payload) });
        },
        setAllThreads: (state, action) => {
            return Object.assign(Object.assign({}, state), { threads: action.payload });
        },
        setUnreadMessages: (state, action) => {
            return Object.assign(Object.assign({}, state), { unreadMessages: action.payload });
        },
        setThreadMessages: (state, action) => {
            var _a, _b, _c, _d, _e, _f;
            const newMessages = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.threadMessages;
            const existingMessages = ((_b = state === null || state === void 0 ? void 0 : state.threadMessages) === null || _b === void 0 ? void 0 : _b.threadMessages) || [];
            // check if the new messages are empty or have no threadIdOnExternalPlatform
            if (((_d = (_c = newMessages[0]) === null || _c === void 0 ? void 0 : _c.data[0]) === null || _d === void 0 ? void 0 : _d.threadIdOnExternalPlatform) === '' || ((_f = (_e = newMessages[0]) === null || _e === void 0 ? void 0 : _e.data[0]) === null || _f === void 0 ? void 0 : _f.threadIdOnExternalPlatform) === null || (newMessages.length === 0)) {
                return Object.assign(Object.assign({}, state), { threadMessages: {
                        threadMessages: [],
                    } });
            }
            // check if the new messages are from a different thread
            else if (existingMessages === null || existingMessages === void 0 ? void 0 : existingMessages.some((thread) => {
                var _a, _b, _c, _d, _e, _f;
                return ((_d = (((_a = thread === null || thread === void 0 ? void 0 : thread.data) === null || _a === void 0 ? void 0 : _a[0]) &&
                    ((_c = (_b = newMessages === null || newMessages === void 0 ? void 0 : newMessages[0]) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c[0]) && (thread === null || thread === void 0 ? void 0 : thread.data[0]))) === null || _d === void 0 ? void 0 : _d.threadIdOnExternalPlatform) !== ((_f = (_e = newMessages[0]) === null || _e === void 0 ? void 0 : _e.data[0]) === null || _f === void 0 ? void 0 : _f.threadIdOnExternalPlatform);
            })) {
                return Object.assign(Object.assign({}, state), { threadMessages: {
                        threadMessages: newMessages,
                    } });
            }
            // check if the new messages are from the same thread
            else {
                const updatedMessages = existingMessages.map((thread) => {
                    const matchingThread = newMessages.find((newThread) => newThread.threadId === thread.threadId);
                    if (matchingThread) {
                        return Object.assign(Object.assign({}, thread), { data: [...thread.data, ...matchingThread.data] });
                    }
                    return thread;
                });
                const newThreads = newMessages.filter((newThread) => !existingMessages.some((existingThread) => existingThread.data[0].threadId === newThread.threadId));
                const finalMergedThreads = !state.isOutboundMessages ? [
                    ...updatedMessages,
                    ...newThreads
                ] : newMessages;
                return Object.assign(Object.assign({}, state), { threadMessages: {
                        threadMessages: finalMergedThreads,
                    } });
            }
        },
        updateOutboundMessages: (state, action) => {
            return Object.assign(Object.assign({}, state), { outboundMessages: action.payload });
        },
        setRecentChatThreads: (state, action) => {
            return Object.assign(Object.assign({}, state), { recentThreads: action.payload });
        },
        setChannelId: (state, action) => {
            return Object.assign(Object.assign({}, state), { channelId: action.payload });
        },
        setActiveChat: (state, action) => {
            return Object.assign(Object.assign({}, state), { activeChat: action.payload });
        },
        updateSearchText: (state, action) => {
            return Object.assign(Object.assign({}, state), { searchText: action.payload });
        },
        setSelectedMembers: (state, action) => {
            return Object.assign(Object.assign({}, state), { selectedMembers: action.payload });
        },
        setEditorVisible: (state, action) => {
            return Object.assign(Object.assign({}, state), { isEditorOpen: action.payload });
        },
        setLoaderVisible: (state, action) => {
            return Object.assign(Object.assign({}, state), { isLoader: action.payload });
        },
        setScrollToken: (state, action) => {
            return Object.assign(Object.assign({}, state), { scrollToken: action.payload });
        },
        setIsStandalone: (state, action) => {
            return Object.assign(Object.assign({}, state), { isStandalone: action.payload });
        },
        setContentSearchState: (state, action) => {
            return Object.assign(Object.assign({}, state), { contentSearchState: action.payload });
        },
        setApiCall: (state, action) => {
            return Object.assign(Object.assign({}, state), { apiCall: action.payload });
        },
        setSelectedDetail: (state, action) => {
            return Object.assign(Object.assign({}, state), { selectedDetail: action.payload });
        },
        updateMembersDetails: (state) => {
            const members = state.groupMemberDetails;
            return Object.assign(Object.assign({}, state), { selectedMembers: members });
        },
        addSelectedMembers: (state, action) => {
            const newMembers = action.payload;
            const uniqueMembersToAdd = newMembers.filter((newMember) => !state.selectedMembers.some((existingMember) => existingMember.userId === newMember.userId));
            if (uniqueMembersToAdd.length > 0) {
                return Object.assign(Object.assign({}, state), { selectedMembers: [
                        ...state.selectedMembers,
                        ...uniqueMembersToAdd
                    ] });
            }
            return state;
        },
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
        updateAttachments(state, action) {
            var _a, _b, _c, _d, _e, _f;
            const { threadId, clearEditor, attachments } = action.payload;
            // Clear all attachments if clearEditor is true
            if (clearEditor) {
                if ((_a = state.conversationInteraction) === null || _a === void 0 ? void 0 : _a[threadId]) {
                    state.conversationInteraction[threadId].attachments = [];
                }
                const thread = (_c = (_b = state.threadMessages) === null || _b === void 0 ? void 0 : _b.threadMessages) === null || _c === void 0 ? void 0 : _c.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (msgGroup) => msgGroup.threadId === threadId);
                if (thread) {
                    thread.attachments = [];
                }
                return state;
            }
            if (state.conversationInteraction) {
                if (!state.conversationInteraction[threadId]) {
                    state.conversationInteraction[threadId] = { attachments: [] };
                }
                // Check if adding new attachments would exceed the limit
                const currentCount = ((_d = state.conversationInteraction[threadId].attachments) === null || _d === void 0 ? void 0 : _d.length) || 0;
                const newCount = attachments.length;
                if (currentCount + newCount > 10) {
                    showErrorToast('maximumAttachmentsCount');
                    return state;
                }
                state.conversationInteraction[threadId].attachments =
                    state.conversationInteraction[threadId].attachments
                        ? state.conversationInteraction[threadId].attachments.concat(attachments)
                        : attachments;
            }
            else {
                const thread = (_f = (_e = state.threadMessages) === null || _e === void 0 ? void 0 : _e.threadMessages) === null || _f === void 0 ? void 0 : _f.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any  
                (msgGroup) => msgGroup.threadId === threadId);
                if (thread) {
                    thread.attachments = thread.attachments
                        ? thread.attachments.concat(attachments)
                        : attachments;
                }
            }
            return state;
        },
        /**
          * Used to remove the attachment based on the attachment id received
          * @param state - file upload state
          * @param action - reducer action
          * @example -
          * ```
          * dispatch(removeAttachment(123456));
          * ```
          */
        removeAttachment(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const threadId = ((_b = (_a = state.activeChat) === null || _a === void 0 ? void 0 : _a.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_d = (_c = state.activeChat) === null || _c === void 0 ? void 0 : _c.memberDetail) === null || _d === void 0 ? void 0 : _d.threadId) || ((_f = (_e = state.activeChat) === null || _e === void 0 ? void 0 : _e.memberDetail) === null || _f === void 0 ? void 0 : _f.userId);
            if (!threadId)
                return state;
            // Remove from conversationInteraction if it exists
            if ((_h = (_g = state.conversationInteraction) === null || _g === void 0 ? void 0 : _g[threadId]) === null || _h === void 0 ? void 0 : _h.attachments) {
                state.conversationInteraction[threadId].attachments =
                    state.conversationInteraction[threadId].attachments.filter((item) => item.id !== action.payload);
            }
            // Remove from threadMessages
            if ((_k = (_j = state.threadMessages) === null || _j === void 0 ? void 0 : _j.threadMessages) === null || _k === void 0 ? void 0 : _k.length) {
                const thread = state.threadMessages.threadMessages.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (msgGroup) => msgGroup.threadId === threadId);
                if ((_l = thread === null || thread === void 0 ? void 0 : thread.attachments) === null || _l === void 0 ? void 0 : _l.length) {
                    thread.attachments = thread.attachments.filter((item) => item.id !== action.payload);
                }
            }
            return state;
        },
        /**
             * Used to update attachment upload status and url
             * @param state - file upload state
             * @param action - reducer action
             * @example -
             * ```
             * dispatch(updateAttachmentStatusAndUrl({id: 123456, url: "url"}));
             * ```
             */
        updateAttachmentStatusAndUrl(state, action) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            // Get threadId from active chat
            const threadId = ((_b = (_a = state.activeChat) === null || _a === void 0 ? void 0 : _a.groupDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_d = (_c = state.activeChat) === null || _c === void 0 ? void 0 : _c.memberDetail) === null || _d === void 0 ? void 0 : _d.threadId) || ((_f = (_e = state.activeChat) === null || _e === void 0 ? void 0 : _e.memberDetail) === null || _f === void 0 ? void 0 : _f.userId);
            if (!threadId)
                return state;
            if (state.conversationInteraction && ((_g = state.conversationInteraction[threadId]) === null || _g === void 0 ? void 0 : _g.attachments)) {
                state.conversationInteraction[threadId].attachments = (_h = state.conversationInteraction[threadId]) === null || _h === void 0 ? void 0 : _h.attachments.map((item) => {
                    var _a, _b;
                    return item.id === action.payload.id
                        ? Object.assign(Object.assign({}, item), { uploaded: true, url: (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.url, isInline: (_b = action === null || action === void 0 ? void 0 : action.payload) === null || _b === void 0 ? void 0 : _b.isInline }) : item;
                });
            }
            if (state.conversationInteraction && ((_k = (_j = state.conversationInteraction[threadId]) === null || _j === void 0 ? void 0 : _j.inlineImages) === null || _k === void 0 ? void 0 : _k.length)) {
                state.conversationInteraction[threadId].inlineImages = (_m = (_l = state.conversationInteraction[threadId]) === null || _l === void 0 ? void 0 : _l.inlineImages) === null || _m === void 0 ? void 0 : _m.map((item) => item.id === action.payload.id
                    ? Object.assign(Object.assign({}, item), { uploaded: true, url: action.payload.url, imageId: action.payload.imageId, isInline: true }) : item);
            }
            return state;
        },
    },
});
export const agentHiveReducer = agentHiveSlice.reducer;
export const agentHiveActions = agentHiveSlice.actions;
/**
 * USe to get the agent hive state
 * @param rootState - agent hive state
 * @example
 * ```
 *  createSelector(getAgentHiveState, (state) => state.userList)
 * ```
 */
export const getAgentHiveState = (rootState) => rootState[AGENT_HIVE_FEATURE_KEY];
/**
 * get editor status
 */
export const getEditorStatus = createSelector(getAgentHiveState, (state) => state.isEditorOpen);
/**
 * get loader status
 */
export const getLoaderVisible = createSelector(getAgentHiveState, (state) => state.isLoader);
/**
 * get scrollToken status
 */
export const getScrollToken = createSelector(getAgentHiveState, (state) => state.scrollToken);
/**
 * get isStandalone status
 */
export const getIsStandalone = createSelector(getAgentHiveState, (state) => state.isStandalone);
/**
 * get apiCall status
 */
export const getApiCall = createSelector(getAgentHiveState, (state) => state.apiCall);
/**
 * get User Availability
 */
export const getUserAvailability = createSelector(getAgentHiveState, (state) => state.userAvailability);
/**
 * get list of users
 */
export const getUsers = createSelector(getAgentHiveState, (state) => state.userList);
/**
 * get list of favorites
 */
export const getFavorites = createSelector(getAgentHiveState, (state) => state.favorites);
/**
 * get list of groups
 */
export const getGroups = createSelector(getAgentHiveState, (state) => state.groupList);
/**
 * get list of groups
 */
export const getSearchedGroups = createSelector(getAgentHiveState, (state) => state.searchedGroupList);
/**
 * get messages of threads
 */
export const getThreadMessage = createSelector(getAgentHiveState, (state) => state.threadMessages.threadMessages);
/**
 * get unread messages
 */
export const getUnreadMessagesState = createSelector(getAgentHiveState, (state) => state.unreadMessages);
/**
 * get members of group
 */
export const getGroupDetails = createSelector(getAgentHiveState, (state) => state.groupChat);
/**
 * get active chat is group or not
 */
export const getActiveChat = createSelector(getAgentHiveState, (state) => state.activeChat);
/**
 * Get group activity  object
 */
export const getGroupActivities = createSelector(getAgentHiveState, (state) => state.groupActivities);
/**
 * get channelId from state
 * @returns The channelId value from the agent hive state
 * @example
 * ```
 * const channelId = useSelector(getChannelIdState);
 * ```
 */
export const getChannelIdState = createSelector(getAgentHiveState, (state) => state.channelId);
/**
 * get content search state
 */
export const getContentSearchState = createSelector(getAgentHiveState, (state) => state.contentSearchState);
/**
 * get group member details
 */
export const getGroupMemberDetails = createSelector(getAgentHiveState, (state) => state.groupMemberDetails);
/**
 * get search text
 */
export const getConversationSearchText = createSelector(getAgentHiveState, (state) => state.searchText);
/**
 * Get conversation interaction data
 * @returns The conversationInteraction object containing attachments and thread data organized by conversationId
 * @example
 * ```
 * const conversationInteraction = useSelector(getConversationInteraction);
 * // Access attachments: conversationInteraction[conversationId][threadId].attachments
 * ```
 */
export const getConversationInteraction = createSelector(getAgentHiveState, (state) => (state === null || state === void 0 ? void 0 : state.conversationInteraction) || {});
/**
 * get selected members
 */
export const getSelectedMembers = createSelector(getAgentHiveState, (state) => state.selectedMembers);
/**
 * get recent threads
 */
export const getRecentThreads = createSelector(getAgentHiveState, (state) => state.recentThreads);
/**
 * get the Notification
 */
export const getNotify = createSelector(getAgentHiveState, (state) => state.notify);
/**
 * get selected details
 */
export const getSelectedDetail = createSelector(getAgentHiveState, (state) => state.selectedDetail);
//# sourceMappingURL=ccf-agent-chat.slice.js.map