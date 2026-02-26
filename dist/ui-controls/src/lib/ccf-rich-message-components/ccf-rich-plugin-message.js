import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, ListItem, Divider, Typography, Box, useTheme, Button, } from '@mui/material';
import { CXoneRichMessageActionType } from '@nice-devone/common-sdk';
import React, { useEffect, useRef } from 'react';
import { CcfRichPluginMessageStyle } from './ccf-rich-plugin-message.style';
/**
 * Renders the Rich Plugin chat message
 * @param props - CcfContactRichMessageProps
 * @example <CcfRichPluginMessage />
 * @returns List picker
 */
export const CcfRichPluginMessage = (props) => {
    var _a, _b, _c;
    const theme = useTheme();
    const classes = CcfRichPluginMessageStyle(theme);
    const { message, messageActionMenu } = props;
    const payload = (_c = (_b = (_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.elements[0]) === null || _c === void 0 ? void 0 : _c.elements;
    const richMessage = useRef(null);
    useEffect(() => {
        var _a, _b, _c;
        // updating the style of parent element to avoid extra padding and background color 
        if (richMessage && (richMessage === null || richMessage === void 0 ? void 0 : richMessage.current) && ((_a = richMessage === null || richMessage === void 0 ? void 0 : richMessage.current) === null || _a === void 0 ? void 0 : _a.parentElement)) {
            richMessage.current.parentElement.style.padding = '0';
            richMessage.current.parentElement.style.backgroundColor = (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.paper;
            richMessage.current.parentElement.style.maxWidth = '70%';
        }
    }, []);
    return (_jsxs(Box, Object.assign({ sx: classes.container, ref: richMessage }, { children: [_jsxs(Box, Object.assign({ sx: classes.headerBox }, { children: [payload.map((element) => (_jsx(Box, { children: element.type === CXoneRichMessageActionType.TITLE && (_jsx(Typography, Object.assign({ component: "h3", sx: classes.title }, { children: element.text }))) }))), messageActionMenu !== null && messageActionMenu !== void 0 ? messageActionMenu : null] })), _jsxs(List, Object.assign({ sx: classes.list }, { children: [_jsx(Divider, { sx: classes.divider }), _jsx(ListItem, Object.assign({ sx: classes.subHeader }, { children: _jsx(Typography, Object.assign({ component: "h6", sx: classes.subHeaderText }, { children: payload.map((element, index) => element.type === CXoneRichMessageActionType.TEXT && (_jsx(React.Fragment, { children: `${element.text} ` }, index))) })) })), payload.map((action, index) => action.type === CXoneRichMessageActionType.BUTTON && (_jsxs(React.Fragment, { children: [_jsx(Divider, { sx: classes.divider }), _jsx(ListItem, Object.assign({ sx: classes.listItem }, { children: _jsx(React.Fragment, { children: _jsx(Button, Object.assign({ disabled: true, variant: "outlined", sx: classes.button }, { children: _jsx(Typography, Object.assign({ component: 'span', sx: classes.buttonText }, { children: action.text })) })) }, index) }))] }, index)))] }))] })));
};
//# sourceMappingURL=ccf-rich-plugin-message.js.map