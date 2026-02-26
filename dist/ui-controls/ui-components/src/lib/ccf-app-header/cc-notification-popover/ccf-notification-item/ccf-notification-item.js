import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Badge, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import notificationItemStyles from './ccf-notification-item.styles';
import { dbInstance, IndexDBKeyNames, IndexDBStoreNames, StorageKeys, UrlUtilsService } from '@nice-devone/core-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../../global.app.slice';
import { markACDNotification, agentWemNotificationsActions } from '../../../ccf-agent-notification/ccf-agent-notification.slice';
import { EventKeys } from '../../../../enums/event-keys';
import { getAgentProfileSettings } from '../../../ccf-agent-setting/ccf-agent-setting-slice';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { agentProfileToast } from '../../../../util/toastMessageHelper';
import { agentHiveActions, fetchUserMessages, getGroups, getRecentThreads, getThreadMessages, groupMemberDetails } from '../../../ccf-agent-chat/ccf-agent-chat.slice';
import { CcfLogger } from '@nice-devone/agent-sdk';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-notification-item');
/**-
 * component for CcfNotificationItem
 * @returns component for rendering the Notification Item
 * @example <CcfNotificationItem />
 */
const CcfNotificationItem = forwardRef(({ item }, ref) => {
    const dispatch = useDispatch();
    const { setSelectedMenu, storeWEMUrl } = globalActions;
    const theme = useTheme();
    const itemStyles = notificationItemStyles(theme);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const toastId = useRef('');
    const recents = useSelector(getRecentThreads);
    const groupList = useSelector(getGroups);
    /**
     * Function to reset WEMUrl on wem notification click
     * @example wemNotificationClickHandler("")
     */
    const wemNotificationClickHandler = () => {
        if (agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideWEM) {
            const toastInfo = {
                isError: true,
                messageKey: 'agentProfileGenericErrorToastMessage',
                toastId: toastId,
            };
            agentProfileToast(toastInfo);
            return;
        }
        const urlsUtilSvc = new UrlUtilsService();
        const wemNotificationItem = item;
        let scheduleURL = wemNotificationItem.evolveNotificationUrl;
        if (scheduleURL.length) {
            scheduleURL = urlsUtilSvc.appendQueryString(scheduleURL, {
                embeddedClient: true,
                postMsg: true,
            });
            const externalProductUrls = {
                selectedMenuPanelApp: '',
                selectedMenuQuickApp: 'WEM',
                wemUrl: scheduleURL,
            };
            localStorage.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, JSON.stringify(externalProductUrls));
            dispatch(setSelectedMenu({ name: 'WEM' }));
            dispatch(storeWEMUrl(scheduleURL));
        }
    };
    /**
     * Function to handle notification click based on type of notification
     * @example handleACDNotificationClick(item)
     */
    const acdNotificationClickHandler = () => {
        dispatch(markACDNotification(item.id));
    };
    /**
     * Function to handle conversation click based on type of notification
     * @example conversationNotificationClickHandler()
     */
    const conversationNotificationClickHandler = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        dispatch(agentWemNotificationsActions.markConversationsNotificatonRead(item.id));
        const userDetails = (_a = JSON.parse(localStorage.getItem(StorageKeys.USER_DETAILS) || '{}')) !== null && _a !== void 0 ? _a : {};
        const threadId = item.id.slice(0, -5);
        const matchedDirect = recents.find((entry) => entry.category === 'direct' && entry.threadId === threadId);
        if (matchedDirect) {
            const msgs = {
                threadMessages: [],
            };
            dispatch(agentHiveActions.setThreadMessages(msgs));
            const userId = matchedDirect.userId;
            const userState = ((_b = matchedDirect.userState) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || 'offline';
            dispatch(fetchUserMessages({ threadMessages: [userDetails.id, userId], skip: 0 }));
            dispatch(agentHiveActions.setApiCall(true));
            dispatch(agentHiveActions.setActiveChat({
                memberDetail: Object.assign(Object.assign({}, matchedDirect), { idOnExternalPlatform: userId, userState }),
                category: 'direct',
            }));
            dispatch(agentHiveActions.removeNotifyMember(userId));
            dispatch(agentHiveActions.setEditorVisible(true));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(agentHiveActions.setSelectedDetail({
                selectCategory: 'direct',
                selectedId: userId || '',
            }));
            return;
        }
        const matchedGroup = (_c = groupList === null || groupList === void 0 ? void 0 : groupList.groups) === null || _c === void 0 ? void 0 : _c.find((group) => group.threadId === threadId);
        /**
         * Opens a group chat by setting the active chat and fetching messages.
         * @param group - The group object, which can be either from the group list or conversation details.
         * @example await openGroupChat(group)
         */
        const openGroupChat = (group) => __awaiter(void 0, void 0, void 0, function* () {
            const msgs = {
                threadMessages: [],
            };
            dispatch(agentHiveActions.setThreadMessages(msgs));
            dispatch(agentHiveActions.setActiveChat({ groupDetail: group, category: 'groups' }));
            dispatch(getThreadMessages({ threadId: group.threadId || '', skip: 0 }));
            dispatch(agentHiveActions.setApiCall(true));
            if ('groupId' in group) {
                yield dispatch(groupMemberDetails({ groupId: group.groupId || '' }));
            }
            dispatch(agentHiveActions.setEditorVisible(true));
            dispatch(agentHiveActions.setLoaderVisible(true));
            dispatch(agentHiveActions.setSelectedDetail({
                selectCategory: 'groups',
                selectedId: group.threadId || group.groupId,
            }));
            dispatch(agentHiveActions.removeNotifyMember(group.threadId || ''));
        });
        if (matchedGroup) {
            yield openGroupChat(matchedGroup);
            return;
        }
        try {
            const db = yield dbInstance();
            const groups = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.CONVERSATIONS, IndexDBKeyNames.CONVERSATIONS_GROUPS))) || [];
            const groupDetailsFromDB = groups.find(group => group.threadId === threadId);
            if (groupDetailsFromDB) {
                yield openGroupChat(groupDetailsFromDB);
            }
        }
        catch (error) {
            ccfLogger.error('handleNotificationError', `Failed to fetch group details from IndexedDB: ${JSON.stringify(error)}`);
        }
    });
    /**
     * Function to handle notification click based on type of notification
     * @example handleNotificationClick("")
     */
    const handleNotificationClick = () => {
        switch (item.notificationType) {
            case 'WemNotification':
                wemNotificationClickHandler();
                break;
            case 'AgentNotification':
                acdNotificationClickHandler();
                break;
            case 'ConversationNotification':
                conversationNotificationClickHandler();
                break;
            default:
                return;
        }
    };
    /**
     * Function to handle notification click on Keydown event
     * @example handleKeyDown("")
     */
    const handleKeyDown = (event) => {
        if (event.key === EventKeys.ENTER) {
            handleNotificationClick();
        }
    };
    useImperativeHandle(ref, () => ({
        handleNotificationClick,
    }));
    return (_jsxs(Box, Object.assign({ sx: itemStyles.itemContainer, "data-testid": "handle-Notification", tabIndex: 0, onKeyDown: handleKeyDown }, { children: [_jsxs(Box, Object.assign({ sx: itemStyles.itemTitleBar }, { children: [_jsx(Typography, Object.assign({ sx: itemStyles.itemSubject }, { children: item.subject })), !item.msgRead && (_jsx("div", { children: _jsx(Badge, { overlap: "circular", variant: "dot", color: "primary" }) }))] })), _jsx(Typography, { sx: itemStyles.itemMessage, dangerouslySetInnerHTML: { __html: item.message } }), _jsxs(Box, Object.assign({ sx: itemStyles.itemReceivedTimeBar }, { children: [_jsx(Typography, Object.assign({ sx: itemStyles.itemReceivedTime }, { children: dayjs(item.receivedDateTime).fromNow() })), _jsx(Typography, Object.assign({ sx: itemStyles.itemReceivedTime }, { children: dayjs(item.receivedDateTime).format('lll') }))] }))] })));
});
export default CcfNotificationItem;
//# sourceMappingURL=ccf-notification-item.js.map