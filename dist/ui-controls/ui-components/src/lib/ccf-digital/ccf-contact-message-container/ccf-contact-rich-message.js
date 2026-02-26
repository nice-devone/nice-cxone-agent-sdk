import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfRichLink, CcfRichListPicker, CcfRichPluginMessage, CcfRichTimePickerMessage } from '@nice-devone/ui-controls';
import { DigitalMessageContentTypes } from '@nice-devone/common-sdk';
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import parse from 'html-react-parser';
/**
 * Renders the single rich chat message
 * @param props - CcfContactRichMessageProps
 * @example <CcfRichContactMessage />
 * @returns
 */
const CcfRichContactMessage = (props) => {
    var _a, _b;
    const { message } = props;
    const messageType = (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.type;
    const fallbackText = (_b = message === null || message === void 0 ? void 0 : message.messageContent) === null || _b === void 0 ? void 0 : _b.fallbackText;
    /**
     * Renders the rich chat message based on type
     * @param props - renderMessageContent
     * @example <renderMessageContent />
     * @returns rich message
     */
    const renderMessageContent = () => {
        switch (messageType) {
            case DigitalMessageContentTypes.RICH_LINK:
                return (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfRichLink", richFallbackText: parse(fallbackText) }, { children: _jsx(CcfRichLink, Object.assign({}, props)) })));
            case DigitalMessageContentTypes.LIST_PICKER:
            case DigitalMessageContentTypes.QUICK_REPLIES:
                return (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfRichListPicker", richFallbackText: parse(fallbackText) }, { children: _jsx(CcfRichListPicker, Object.assign({}, props)) })));
            case DigitalMessageContentTypes.PLUGIN:
                return (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfRichPluginMessage", richFallbackText: parse(fallbackText) }, { children: _jsx(CcfRichPluginMessage, Object.assign({}, props)) })));
            case DigitalMessageContentTypes.TIME_PICKER:
                return (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfRichTimePickerMessage", richFallbackText: parse(fallbackText) }, { children: _jsx(CcfRichTimePickerMessage, Object.assign({}, props)) })));
            default:
                return parse(fallbackText);
        }
    };
    return _jsxs(_Fragment, { children: [" ", renderMessageContent()] });
};
export default CcfRichContactMessage;
//# sourceMappingURL=ccf-contact-rich-message.js.map