import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress, useTheme, CardHeader } from '@mui/material';
import { CcfBox, CcfNoResultFoundIcon, CcfTypography, CcfCard } from '@nice-devone/ui-controls';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ccfMessageTemplatesStyles from './ccf-message-templates.styles';
import { getAllMessageTemplates, getLoadingStatus, updatePreviewOutboundTemplate, } from '../../ccf-app-space.slice';
import { Box } from '@mui/system';
import { updateSelectedMessageTemplate } from './ccf-outbound-template-preview/ccf-outbound-template-preview.slice';
export var MessageTemplateTypes;
(function (MessageTemplateTypes) {
    MessageTemplateTypes["TEXT_TEMPLATE"] = "TEXT_TEMPLATE";
    MessageTemplateTypes["MENU"] = "MENU";
})(MessageTemplateTypes || (MessageTemplateTypes = {}));
/**
 * CcfMessagetemplates - use to list all message templates
 * @param props -?-CcfMessagetemplates
 * @example <CcfMessagetemplates />
 */
export function CcfMessageTemplates(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const replyContainerRef = useRef(null);
    const allMessageTemplates = useSelector(getAllMessageTemplates);
    const isMessageTemplatesLoading = useSelector(getLoadingStatus);
    const [filteredMessageTemplates, setFilteredMessageTemplates] = useState([]);
    useEffect(() => {
        if (allMessageTemplates.length) {
            filterMessageTemplates(props.searchQuery);
        }
    }, [allMessageTemplates]);
    useEffect(() => {
        filterMessageTemplates(props.searchQuery);
    }, [props.searchQuery]);
    /**
     * Filter function to filter the replies based on search value
     * @param searchValue - string
     * @example - filterMessages
     */
    const filterMessageTemplates = (searchValue) => {
        if (!allMessageTemplates.length && !searchValue) {
            setFilteredMessageTemplates(allMessageTemplates);
            return;
        }
        const filteredMsgs = allMessageTemplates === null || allMessageTemplates === void 0 ? void 0 : allMessageTemplates.filter((msgTemplate) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            const { elements } = (_b = (_a = msgTemplate === null || msgTemplate === void 0 ? void 0 : msgTemplate.messageContent) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : {};
            const hasNestedElements = (_d = (_c = elements === null || elements === void 0 ? void 0 : elements[0]) === null || _c === void 0 ? void 0 : _c.elements) !== null && _d !== void 0 ? _d : [];
            return (((msgTemplate === null || msgTemplate === void 0 ? void 0 : msgTemplate.category) &&
                ((_e = msgTemplate === null || msgTemplate === void 0 ? void 0 : msgTemplate.category) === null || _e === void 0 ? void 0 : _e.toUpperCase().indexOf(searchValue.toUpperCase())) > -1) ||
                (elements && ((_g = (_f = elements[0]) === null || _f === void 0 ? void 0 : _f.template) === null || _g === void 0 ? void 0 : _g.toUpperCase().indexOf(searchValue.toUpperCase())) > -1) ||
                (((_j = (_h = hasNestedElements === null || hasNestedElements === void 0 ? void 0 : hasNestedElements[1]) === null || _h === void 0 ? void 0 : _h.template) === null || _j === void 0 ? void 0 : _j.toUpperCase().indexOf(searchValue.toUpperCase())) > -1));
        });
        setFilteredMessageTemplates(filteredMsgs.sort((msgA, msgB) => { var _a, _b; return (((_a = msgA.category) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || '').localeCompare(((_b = msgB.category) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || ''); }));
    };
    /**
     * cardClickHandler - used to select the message template
     * @param msgTemplate - ExternalPlatformTemplate
     * @example cardClickHandler()
     */
    const cardClickHandler = (msgTemplate) => {
        dispatch(updatePreviewOutboundTemplate(true));
        dispatch(updateSelectedMessageTemplate(msgTemplate));
    };
    const messageTemplatesStyles = ccfMessageTemplatesStyles(theme);
    let lastCategory = '';
    /**
     * Function to extract template text based on the element type
     * @param messageData - ExternalPlatformTemplate
     * @example extractTemplateText(messageData)
     */
    const extractTemplateText = (messageData) => {
        var _a, _b, _c, _d, _e;
        if ((_c = (_b = (_a = messageData === null || messageData === void 0 ? void 0 : messageData.messageContent) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.elements) === null || _c === void 0 ? void 0 : _c.length) {
            const element = messageData.messageContent.payload.elements[0];
            if (element.type === MessageTemplateTypes.TEXT_TEMPLATE) {
                return element.template;
            }
            else if (element.type === MessageTemplateTypes.MENU) {
                return (_e = (_d = element.elements) === null || _d === void 0 ? void 0 : _d[1]) === null || _e === void 0 ? void 0 : _e.template;
            }
        }
        return '';
    };
    /**
     * Function to get message body
     * @example getMessageBody()
     */
    const getMessageBody = () => {
        return ((filteredMessageTemplates === null || filteredMessageTemplates === void 0 ? void 0 : filteredMessageTemplates.length) > 0 ? (_jsx(CcfBox, Object.assign({ component: "div" }, { children: filteredMessageTemplates.map((msgData, index) => (_jsxs(CcfBox, Object.assign({ component: "div" }, { children: [lastCategory !== (msgData === null || msgData === void 0 ? void 0 : msgData.category) && (_jsx(CcfBox, Object.assign({ sx: messageTemplatesStyles.category }, { children: (lastCategory = (msgData === null || msgData === void 0 ? void 0 : msgData.category) ? msgData === null || msgData === void 0 ? void 0 : msgData.category : '') }))), _jsxs(CcfCard, Object.assign({ sx: messageTemplatesStyles.replyCard, onClick: () => cardClickHandler(msgData), "data-testid": "list-item", variant: "outlined" }, { children: [_jsx(CardHeader, { sx: messageTemplatesStyles.quickReplyHeader, title: msgData === null || msgData === void 0 ? void 0 : msgData.template }), _jsx(CcfTypography, Object.assign({ sx: messageTemplatesStyles.replyContent }, { children: extractTemplateText(msgData) }))] }), index)] })))) }))) : ((filteredMessageTemplates === null || filteredMessageTemplates === void 0 ? void 0 : filteredMessageTemplates.length) <= 0 && (_jsx(CcfBox, Object.assign({ component: "div", "data-testid": "no-data-found", sx: messageTemplatesStyles.noMatchFound, style: { flexDirection: 'column' } }, { children: _jsx(CcfBox, { children: _jsx(CcfNoResultFoundIcon, { sx: messageTemplatesStyles.noResultFoundIcon }) }) })))));
    };
    return (_jsx(Box, Object.assign({ sx: messageTemplatesStyles.messageTemplatesContainer, ref: replyContainerRef }, { children: _jsx(CcfBox, Object.assign({ sx: messageTemplatesStyles.messageTemplatesContainer.cardsContainer }, { children: isMessageTemplatesLoading ? (_jsx(CcfBox, Object.assign({ sx: messageTemplatesStyles.messageTemplatesContainer.loader }, { children: _jsx(CircularProgress, {}) }))) : getMessageBody() })) })));
}
//# sourceMappingURL=ccf-message-templates.js.map