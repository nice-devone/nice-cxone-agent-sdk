import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Divider, Typography, Radio, Box, useTheme, } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { CcfRichListPickerStyle } from './ccf-rich-list-picker.style';
/**
 * Renders the Rich List Picker chat message
 * @param props - CcfContactRichMessageProps
 * @example <CcfRichLink />
 * @returns List picker
 */
export const CcfRichListPicker = (props) => {
    var _a;
    const theme = useTheme();
    const classes = CcfRichListPickerStyle(theme);
    const { message, messageActionMenu } = props;
    const payload = (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.payload;
    const richList = useRef(null);
    useEffect(() => {
        var _a, _b, _c;
        // updating the style of parent element to avoid extra padding and background color 
        if (richList && (richList === null || richList === void 0 ? void 0 : richList.current) && ((_a = richList === null || richList === void 0 ? void 0 : richList.current) === null || _a === void 0 ? void 0 : _a.parentElement)) {
            richList.current.parentElement.style.padding = '0';
            richList.current.parentElement.style.backgroundColor = (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.paper;
        }
    }, []);
    return (_jsxs(Box, Object.assign({ sx: classes.container, ref: richList }, { children: [_jsxs(Box, Object.assign({ sx: classes.titleBox }, { children: [_jsx(Typography, Object.assign({ component: "h3", sx: classes.title }, { children: payload.text.content })), messageActionMenu !== null && messageActionMenu !== void 0 ? messageActionMenu : null] })), _jsx(List, Object.assign({ sx: classes.list }, { children: payload.actions.map((action, index) => {
                    var _a, _b, _c;
                    return (_jsxs(React.Fragment, { children: [_jsx(Divider, { sx: classes.divider }), _jsxs(ListItem, Object.assign({ sx: classes.listItem }, { children: [_jsxs(Box, Object.assign({ component: 'span', style: classes.itemText }, { children: [(action === null || action === void 0 ? void 0 : action.icon) && ((_a = action === null || action === void 0 ? void 0 : action.icon) === null || _a === void 0 ? void 0 : _a.url) && (_jsx("img", { src: (_b = action === null || action === void 0 ? void 0 : action.icon) === null || _b === void 0 ? void 0 : _b.url, alt: (_c = action === null || action === void 0 ? void 0 : action.icon) === null || _c === void 0 ? void 0 : _c.fileName, style: classes.icon })), _jsx(ListItemText, { primary: _jsx(Typography, Object.assign({ component: 'span', style: classes.itemTextPrimary }, { children: action.text })) })] })), (action === null || action === void 0 ? void 0 : action.description) && (_jsx(ListItemText, { secondary: _jsx(Typography, Object.assign({ component: 'span', style: classes.itemTextSecondary }, { children: action === null || action === void 0 ? void 0 : action.description })) })), _jsx(ListItemSecondaryAction, { children: _jsx(Radio, { edge: "end", size: "small", disabled: true, sx: classes.radioButton }) })] }))] }, index));
                }) }))] })));
};
//# sourceMappingURL=ccf-rich-list-picker.js.map