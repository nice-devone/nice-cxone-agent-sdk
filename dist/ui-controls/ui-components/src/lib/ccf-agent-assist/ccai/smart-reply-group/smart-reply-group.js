import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SmartReplyCard } from '../smart-reply-card/smart-reply-card';
import { useTheme } from '@mui/material';
import smartReplyGroupStyles from './smart-reply-group.styles';
import { SmartReplyIcon } from '../../constants/ccai-icons';
import { useTranslator } from '@nice-devone/ui-controls';
/**
 * Smart Reply Group component
 * @example - <SmartReplyGroup />
 */
export function SmartReplyGroup(props) {
    var _a;
    const [translate] = useTranslator();
    const theme = useTheme();
    const smartReplyGroupSx = smartReplyGroupStyles(theme);
    const combinedSmartReplyTagStyles = Object.assign(Object.assign({}, smartReplyGroupSx.tag), smartReplyGroupSx.smartReply);
    return (_jsxs("div", Object.assign({ style: smartReplyGroupSx.mainFlexContainer }, { children: [_jsxs("div", Object.assign({ style: smartReplyGroupSx.smartReplyTitleContainer }, { children: [_jsx("div", Object.assign({ style: smartReplyGroupSx.smartReplyIcon }, { children: _jsx(SmartReplyIcon, { imageSize: 20 }) })), _jsx("span", Object.assign({ style: combinedSmartReplyTagStyles }, { children: translate('smartReply') }))] })), _jsx("div", Object.assign({ style: smartReplyGroupSx.smartReplyListContainer }, { children: _jsx("div", Object.assign({ style: smartReplyGroupSx.smartReplyListFlexBox }, { children: (_a = props.suggestion) === null || _a === void 0 ? void 0 : _a.articles.map((article, index) => (_jsx(SmartReplyCard, { article: article }, index))) })) }))] })));
}
//# sourceMappingURL=smart-reply-group.js.map