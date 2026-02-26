import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { CcfAppToastMessage } from '@nice-devone/ui-controls';
import { toast } from 'react-toastify';
import { DigitalContactStatus, DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import { uuid } from 'uuidv4';
export const OUTBOUND_TEMPLATE_PREVIEW_KEY = 'outboundTemplatePreview';
export const initialOutboundTemplate = {
    selectedMessageTemplate: {},
    isTemplateSent: false,
    templateEditableContent: {},
};
/**
 * Used to send OB message template
 */
export const sendOBMessageTemplate = createAsyncThunk('outboundTemplatePreview/sendOBMessageTemplate', (replyDetails, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const contactDetails = replyDetails.contactDetails;
    const recipient = {
        idOnExternalPlatform: (_c = (_b = (_a = contactDetails.case) === null || _a === void 0 ? void 0 : _a.authorEndUserIdentity) === null || _b === void 0 ? void 0 : _b.idOnExternalPlatform) !== null && _c !== void 0 ? _c : replyDetails.customerName,
        name: '',
        isPrimary: true,
        isPrivate: false,
    };
    const replyPayload = {
        messageContent: replyDetails.messageContent,
        recipients: [recipient],
    };
    if (replyDetails.elevatedFrom && replyDetails.elevatedInteractionId) {
        replyPayload.contact = {
            elevation: {
                interaction: { id: replyDetails.elevatedInteractionId },
                fromProvider: replyDetails.elevatedFrom,
            },
        };
    }
    if (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.digitalSkillId) {
        replyPayload.contact = Object.assign(Object.assign({}, replyPayload.contact), { skillId: contactDetails.digitalSkillId });
    }
    contactDetails
        .reply(replyPayload, (_d = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.channel) === null || _d === void 0 ? void 0 : _d.id, uuid())
        .then(() => {
        var _a;
        if (((_a = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.case) === null || _a === void 0 ? void 0 : _a.status) === DigitalContactStatus.DRAFT) {
            toast.success(_jsx(CcfAppToastMessage, { type: "success", messageKey: "sendMessageSuccess" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
                className: 'publicMessageToast',
            });
        }
        dispatch(updateIsTemplateSent(true));
    })
        .catch((err) => {
        var _a, _b, _c, _d, _e;
        const errorMessage = (_e = (_d = (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message;
        const isElevationError = errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.toLowerCase().includes('elevation not possible');
        const messageKey = isElevationError ? 'outboundElevationFailed' : 'initiateWhatsappContactError';
        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: messageKey }), {
            autoClose: 2000,
            containerId: 'AppToastContainer',
            className: 'publicMessageToast',
        });
        dispatch(updateIsTemplateSent(false));
    });
}));
/**
 * Function to  create template editable content
 *  @param selectedTemplate - selected Template
 *  @example createTemplateEditableContent(selectedTemplate)
 */
const createTemplateEditableContent = (selectedTemplate) => {
    var _a, _b;
    const payload = (_a = selectedTemplate === null || selectedTemplate === void 0 ? void 0 : selectedTemplate.messageContent) === null || _a === void 0 ? void 0 : _a.payload;
    let elements = [];
    if (payload === null || payload === void 0 ? void 0 : payload.elements) {
        if (((_b = payload.elements[0]) === null || _b === void 0 ? void 0 : _b.type) === DigitalMessageContentTypes.MENU) {
            elements = payload.elements[0].elements || [];
        }
        else {
            elements = payload.elements;
        }
    }
    let currentTemplateEditableContent = {};
    if (elements === null || elements === void 0 ? void 0 : elements.length) {
        elements.forEach((element) => {
            // Dev Note: In case of MENU element type, element may not have template value. Hence added the check here.
            if (!element.template)
                return;
            const placeHolderArray = element.template.match(/{{(.*?)}}/g);
            const contentList = [];
            contentList.push(element.template);
            if (placeHolderArray === null || placeHolderArray === void 0 ? void 0 : placeHolderArray.length) {
                placeHolderArray.forEach((str, i) => {
                    contentList[i + 1] = contentList[i]
                        .split(str)
                        .join(`<div className="placeholder"><TextField placeholder=${str.replace(/\s/g, '')} /></div>`);
                });
            }
            currentTemplateEditableContent = Object.assign(Object.assign({}, currentTemplateEditableContent), { [element.id]: contentList[contentList.length - 1] });
        });
    }
    return currentTemplateEditableContent;
};
export const obMessageTemplateSlice = createSlice({
    name: OUTBOUND_TEMPLATE_PREVIEW_KEY,
    initialState: initialOutboundTemplate,
    reducers: {
        /**
         * Updated isTemplateSent state value
         * @param state - IsTemplateSent
         * @param action - PayloadAction<true>
         * @example - `dispatch(updateIsTemplateSent(true))`
         */
        updateIsTemplateSent(state, action) {
            return Object.assign(Object.assign(Object.assign({}, state), state.selectedMessageTemplate), { isTemplateSent: action.payload });
        },
        /**
         * Updated selectedMessageTemplate state value
         * @param state - OutboundTemplate
         * @param action - PayloadAction<ExternalPlatformTemplate>
         * @example - `dispatch(updateSelectedMessageTemplate(@param))`
         */
        updateSelectedMessageTemplate(state, action) {
            const selectedTemplate = action.payload;
            const currentTemplateEditableContent = selectedTemplate
                ? createTemplateEditableContent(selectedTemplate)
                : {};
            return Object.assign(Object.assign({}, state), { selectedMessageTemplate: action.payload ? action.payload : {}, templateEditableContent: currentTemplateEditableContent });
        },
        /**
         * Updated updateTemplateVariables state value on selected variable change
         * @param state - app space state
         * @param action - PayloadAction<SelectedVariableDetails>
         * @example - `dispatch(updateTemplateVariables(SelectedVariableDetails))`
         */
        updateTemplateVariables: (state, action) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const variableDetails = action.payload;
            const templateElements = (_d = (_c = (_b = (_a = state.selectedMessageTemplate) === null || _a === void 0 ? void 0 : _a.messageContent) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.elements) !== null && _d !== void 0 ? _d : [];
            const elementList = ((_e = templateElements[0]) === null || _e === void 0 ? void 0 : _e.type) === DigitalMessageContentTypes.MENU ? (_f = templateElements[0]) === null || _f === void 0 ? void 0 : _f.elements : templateElements;
            const currentElement = elementList === null || elementList === void 0 ? void 0 : elementList.find((element) => {
                return element.id === variableDetails.elementId;
            });
            const updatedElement = Object.assign(Object.assign({}, currentElement), { variables: Object.assign(Object.assign({}, currentElement.variables), { [variableDetails.key]: variableDetails.value }) });
            if (((_g = templateElements[0]) === null || _g === void 0 ? void 0 : _g.type) === DigitalMessageContentTypes.MENU) {
                state.selectedMessageTemplate = Object.assign(Object.assign({}, state.selectedMessageTemplate), { messageContent: Object.assign(Object.assign({}, state.selectedMessageTemplate.messageContent), { payload: Object.assign(Object.assign({}, state.selectedMessageTemplate.messageContent.payload), { elements: Object.assign(Object.assign({}, state.selectedMessageTemplate.messageContent.payload.elements), { 0: Object.assign(Object.assign({}, state.selectedMessageTemplate.messageContent.payload.elements[0]), { elements: (elementList !== null && elementList !== void 0 ? elementList : []).map((element) => element.id === variableDetails.elementId ? updatedElement : element) }) }) }) }) });
            }
            else {
                state.selectedMessageTemplate = Object.assign(Object.assign({}, state.selectedMessageTemplate), { messageContent: Object.assign(Object.assign({}, state.selectedMessageTemplate.messageContent), { payload: Object.assign(Object.assign({}, state.selectedMessageTemplate.messageContent.payload), { elements: (elementList !== null && elementList !== void 0 ? elementList : []).map((element) => element.id === variableDetails.elementId ? updatedElement : element) }) }) });
            }
        },
    },
});
export const OBMessageTemplateReducer = obMessageTemplateSlice.reducer;
export const OBMessageTemplateActions = obMessageTemplateSlice.actions;
export const { updateSelectedMessageTemplate, updateTemplateVariables, updateIsTemplateSent } = OBMessageTemplateActions;
/**
 * Function to get get outbound Message template state
 * @param rootState - MessageTemplate type
 * @returns It message template
 * @example - const obTemplate = getOBMessageTemplate(rootState)
 */
const getOBMessageTemplate = (rootState) => {
    return rootState[OUTBOUND_TEMPLATE_PREVIEW_KEY];
};
/**
 * Function to get selected outbound Message template
 * @returns It returns outbound Message template type data
 * @example - const getSelectedTemplateDetails
 */
export const getSelectedTemplateDetails = createSelector(getOBMessageTemplate, (state) => state.selectedMessageTemplate);
/**
 * Function to get template sent or not
 * @returns It returns template sent or not
 * @example - const getIsTemplateSent
 */
export const getIsTemplateSent = createSelector(getOBMessageTemplate, (state) => state.isTemplateSent);
/**
 * Function to get template editable content
 * @returns It returns template editable content
 * @example - const getTemplateEditableContent
 */
export const getTemplateEditableContent = createSelector(getOBMessageTemplate, (state) => state.templateEditableContent);
//# sourceMappingURL=ccf-outbound-template-preview.slice.js.map