import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Link, Typography, CardMedia, CardContent, useTheme, Box, } from '@mui/material';
import { useEffect, useRef } from 'react';
import { CcfRichLinkStyle } from './ccf-rich-link.style';
/**
 * Renders the Rich Link message chat message
 * @param props - CcfContactRichMessageProps
 * @example <CcfRichLink />
 * @returns Rich Link message
 */
export const CcfRichLink = (props) => {
    var _a, _b, _c, _d;
    const theme = useTheme();
    const classes = CcfRichLinkStyle(theme);
    const { message, messageActionMenu } = props;
    const payload = (_a = message.messageContent) === null || _a === void 0 ? void 0 : _a.payload;
    const richLink = useRef(null);
    useEffect(() => {
        var _a, _b, _c;
        // updating the style of parent element to avoid extra padding and background color 
        if (richLink && (richLink === null || richLink === void 0 ? void 0 : richLink.current) && ((_a = richLink === null || richLink === void 0 ? void 0 : richLink.current) === null || _a === void 0 ? void 0 : _a.parentElement)) {
            richLink.current.parentElement.style.padding = '0';
            richLink.current.parentElement.style.backgroundColor = (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.paper;
        }
    }, []);
    return (_jsx(Box, Object.assign({ ref: richLink }, { children: _jsxs(Card, Object.assign({ sx: classes.card }, { children: [payload.media && (_jsx(CardMedia, { sx: classes.media, image: (_b = payload.media) === null || _b === void 0 ? void 0 : _b.url, title: (_c = payload.media) === null || _c === void 0 ? void 0 : _c.fileName })), _jsxs(Box, Object.assign({ sx: classes.headerBox }, { children: [_jsx(Link, Object.assign({ href: payload.url, target: "_blank", rel: "noopener noreferrer", underline: "hover", sx: classes.link }, { children: _jsx(CardContent, Object.assign({ sx: classes.cardContent }, { children: _jsx(Typography, Object.assign({ sx: classes.title }, { children: (_d = payload.title) === null || _d === void 0 ? void 0 : _d.content })) })) })), messageActionMenu ? messageActionMenu : null] }))] })) })));
};
//# sourceMappingURL=ccf-rich-link.js.map