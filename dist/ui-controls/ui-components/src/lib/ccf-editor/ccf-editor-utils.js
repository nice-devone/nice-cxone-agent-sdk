import { __awaiter } from "tslib";
import { DigitalContactStatus } from '@nice-devone/common-sdk';
import { dbInstance, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { colorData } from '@nice-devone/ui-controls';
import { styleMap } from './ccf-rich-text-editor/ccf-rich-text-editor.styles';
import { SEND_MESSAGE } from './ccf-approval-menu/ccf-approval-menu';
import { getForwardedAttachments, updateFileToBeUploaded } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CcfContactEditorAction } from './ccf-contact-editor.slice';
const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-editor-utils');
const colorStyleMap = colorData.reduce((acc, { group, id, property, value }) => (Object.assign(Object.assign({}, acc), { [`${group}_${id}`]: { [property]: value } })), {});
export const CUSTOM_STYLE_MAP = Object.assign(Object.assign({}, colorStyleMap), styleMap);
/**
 * Remove OB email contact from local storage on send/discard
 * @example
 * ```
 * removeObContactFromStorage();
 * ```
 */
export const removeObContactFromStorage = (caseId, selectedDigitalContactDetails) => {
    let currentObContact = LocalStorageHelper.getItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, true);
    currentObContact = currentObContact && currentObContact.length > 0 && currentObContact.filter((contact) => contact.caseId !== selectedDigitalContactDetails.caseId);
    if (currentObContact && currentObContact.length > 0) {
        LocalStorageHelper.setItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS, currentObContact);
    }
    else {
        LocalStorageHelper.removeItem(StorageKeys.OUTBOUND_DIGITAL_CONTACTS);
        // Need to remove current focused contact value of a draft contact from LocalStorage 
        const currentFocusedContact = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) ? LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) : null;
        if (currentFocusedContact && caseId === currentFocusedContact) {
            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_ID);
            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE);
        }
    }
};
/**
 * update local storage after send/discard actions.
 * @example
 * ```
 * uploadLSForEditor();
 * ```
 */
export const uploadLSForEditor = (selectedDigitalContactDetails, digitalContactUserSavedProperties) => {
    LocalStorageHelper.removeItem('digital_attachments_' + selectedDigitalContactDetails.caseId);
    const updatedDigitalSavedProps = Object.assign({}, digitalContactUserSavedProperties);
    delete updatedDigitalSavedProps[selectedDigitalContactDetails.caseId];
    if (updatedDigitalSavedProps && Object.keys(updatedDigitalSavedProps).length > 0) {
        LocalStorageHelper.setItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS, updatedDigitalSavedProps);
    }
    else {
        LocalStorageHelper.removeItem(StorageKeys.DIGITAL_CONTACT_USER_SAVED_PROPS);
    }
};
/**
 * Used to update the index db with the interaction failed messages
 * @param xTraceId - unique draft message id from client side
 * @param caseId - contact id
 * @example
 * ```
 * updateIndexDbWithFailedMessage(xTraceId, caseId, sendReplyObj);
 * ```
 */
// TODO: Will remove the eslint disable as part of upcoming eslint backlog revamp story
// eslint-disable-next-line
export const updateIndexDbWithFailedMessage = (xTraceId, caseId, messageAuthor, wysiwygEnabled, parentId, sendReplyObj, draftMessageForApproval, fromAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbInstance();
    const currentFailedMessageObject = {
        sendReplyObj,
        xTraceId,
        parentId,
        messageAuthor,
        draftMessageForApproval,
        wysiwygEnabled,
        fromAddress,
    };
    let interactionFailedMessages = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.INTERACTION_FAILED_MESSAGES));
    if (interactionFailedMessages && Object.keys(interactionFailedMessages).length) {
        if (interactionFailedMessages[caseId]) {
            interactionFailedMessages[caseId].push(currentFailedMessageObject);
        }
        else {
            interactionFailedMessages[caseId] = [currentFailedMessageObject];
        }
    }
    else {
        interactionFailedMessages = {
            [caseId]: [currentFailedMessageObject],
        };
    }
    db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIGITAL, interactionFailedMessages, IndexDBKeyNames.INTERACTION_FAILED_MESSAGES);
});
/**
 * Used to remove the failed message from the index db when not needed
 * @param caseId - contact id
 * @param xTraceId - unique draft message id from client side
 * @example
 * ```
 * removeFailedMessageFromIndexDb(caseId, failedXTraceId);
 * ```
 */
export const removeFailedMessageFromIndexDb = (caseId, xTraceId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbInstance();
    const interactionFailedMessages = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.INTERACTION_FAILED_MESSAGES));
    if (interactionFailedMessages && interactionFailedMessages[caseId]) {
        const matchIndex = interactionFailedMessages[caseId].findIndex((failedMessageObject) => failedMessageObject.xTraceId === xTraceId);
        interactionFailedMessages[caseId].splice(matchIndex, 1);
    }
    db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIGITAL, interactionFailedMessages, IndexDBKeyNames.INTERACTION_FAILED_MESSAGES);
});
/**
   * Method to get payload, that used to insert into editor
   * @returns - Payload object, editor accepts
   * @example - getInsertContactEditorPayload(caseId: string, data: string)
   * @param  caseId - represents current interaction id
   * @param data - string to be inserted to editor
   * @param messageDraftId - message draft id
   */
export const getInsertContactEditorPayload = (caseId, data, messageDraftId = '') => {
    return {
        caseId: caseId,
        fieldsToUpdate: {
            subject: '',
            sender: '',
            receiverTo: '',
            receiverCc: '',
            receiverBcc: '',
            isEditorOpen: true,
            lexicalEditorState: data,
            messageDraftId: messageDraftId,
        },
    };
};
/**
 * Used to get all failed messages to send from indexdb
 * @example
 * ```
 * getAllFailedMessageFromIndexDb();
 * ```
 */
export const getAllFailedMessageFromIndexDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbInstance();
    const interactionFailedMessages = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.INTERACTION_FAILED_MESSAGES));
    return interactionFailedMessages;
});
/**
 * enum typedoc for message draft status translation
 */
export var ApprovalBannerStatus;
(function (ApprovalBannerStatus) {
    /**
      * @remarks - enum for pending approval status
    */
    ApprovalBannerStatus["PENDING"] = "pendingApproval";
    /**
      * @remarks - enum for message approval denied status
    */
    ApprovalBannerStatus["DENIED"] = "approvalDenied";
})(ApprovalBannerStatus || (ApprovalBannerStatus = {}));
/**
    * checks if new value is different from the one stored in local storage
    * @param storageKey - local storage key
    * @param valueToCompare - new value
    * @example hasEqualValueInLocalStorage ('some-storage-key', [])
    * @returns boolean true or false
   */
export const hasEqualValueInLocalStorage = (storageKey, valueToCompare) => {
    const valueFromLocalStorage = LocalStorageHelper === null || LocalStorageHelper === void 0 ? void 0 : LocalStorageHelper.getItem(storageKey);
    let stringifiedValueToCompare = '';
    try {
        stringifiedValueToCompare = JSON.stringify(valueToCompare);
    }
    catch (_a) {
        stringifiedValueToCompare = '';
    }
    if (valueToCompare && Object.keys(valueToCompare).length > 0 && stringifiedValueToCompare !== valueFromLocalStorage) {
        return false;
    }
    return true;
};
/**
  * @param userRolePermissions - local storage key
  * @param selectedDigitalContactDetails - new value
  * @example getInitialSkill (userRolePermissions, selectedDigitalContactDetails)
  * @returns boolean true or false
 */
export const getInitialSkill = (userRolePermissions, selectedDigitalContactDetails) => {
    const initialSelectedSkill = (userRolePermissions === null || userRolePermissions === void 0 ? void 0 : userRolePermissions.canReply) || selectedDigitalContactDetails.status === DigitalContactStatus.DRAFT
        ? { id: 'sendMessage', name: SEND_MESSAGE }
        : { id: '', name: '' };
    return initialSelectedSkill;
};
/**
 * Function to upload/ retain attachments into the editor (non-thunk version).
 * @param caseId - ID of the case
 * @param attachments - Array of attachments to upload
 * @param uuidForInlineImages - Optional array of UUIDs for inline images
 * @param shouldProceedWithUpload - Optional ref to control upload
 * @param isForwardedAttachment - Optional flag for forwarded attachments
 * @example -
 * ```
 * retainAttachmentIntoEditor({ caseId, attachments, uuidForInlineImages, shouldProceedWithUpload, isForwardedAttachment, dispatch });
 *
 * ```
 */
export const retainAttachmentIntoEditor = ({ caseId, attachments, dispatch, uuidForInlineImages, shouldProceedWithUpload, isForwardedAttachment, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (attachments && attachments.length > 0) {
        dispatch(CcfContactEditorAction.updateIsUploadingAttachment({ caseId, isUploadingAttachment: true }));
        const fileList = new DataTransfer();
        for (const attachment of attachments) {
            try {
                const file = yield getForwardedAttachments(attachment);
                fileList.items.add(file);
            }
            catch (error) {
                ccfLogger.error('retainAttachmentIntoEditor', JSON.stringify(error));
            }
        }
        const proceedWithUpload = shouldProceedWithUpload !== null && shouldProceedWithUpload !== void 0 ? shouldProceedWithUpload : { current: true };
        if (((_a = fileList === null || fileList === void 0 ? void 0 : fileList.files) === null || _a === void 0 ? void 0 : _a.length) > 0 && (proceedWithUpload === null || proceedWithUpload === void 0 ? void 0 : proceedWithUpload.current)) {
            dispatch(updateFileToBeUploaded({
                fileList: fileList.files,
                isForwardedAttachment: isForwardedAttachment ? isForwardedAttachment : false,
                uuidList: uuidForInlineImages,
            }));
        }
        dispatch(CcfContactEditorAction.updateIsUploadingAttachment({ caseId, isUploadingAttachment: false }));
    }
});
/**
 * Generic function to Update only the provided fields of a target editor state object with values
 * from a Partial object, while skipping any fields whose values are undefined
 * @param targetContactEditorState - The state object whose fields should be updated.
 * @param updates - A partial object containing only the fields that should be
 * updated. Any key with a value of `undefined` will be ignored
 * @example
 * ```
 * updateFields(state[caseId], { isSendButtonEnabled: false, istextAddedInEditor: false });
 * ```
*/
export function updateFields(targetContactEditorState, updates) {
    for (const [contactEditorKey, contactEditorValue] of Object.entries(updates)) {
        if (contactEditorValue === undefined)
            continue; // Skip optional/undefined values
        // get typed key to use as index for state object
        const typedKey = contactEditorKey;
        if (typedKey in targetContactEditorState) {
            // Immer allow's state mutation
            targetContactEditorState[typedKey] = contactEditorValue;
        }
    }
}
//# sourceMappingURL=ccf-editor-utils.js.map