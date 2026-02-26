import { jsx as _jsx } from "react/jsx-runtime";
import CcfErrorBoundary from '../../ccf-error-boundary/ccf-error-boundary';
import parse from 'html-react-parser';
import { CcfMultimediaMessage } from '@nice-devone/ui-controls';
/**
 * Renders the WhatsApp multimedia message
 * @param props - CcfContactRichMessageProps
 * @example <CcfContactMultimediaMessage />
 * @returns
 */
const CcfContactMultimediaMessage = (props) => {
    var _a;
    const { message } = props;
    // const messageType = message?.messageContent?.type;
    const fallbackText = (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.fallbackText;
    return (_jsx(CcfErrorBoundary, Object.assign({ componentName: "CcfContactMultimediaMessage", richFallbackText: parse(fallbackText) }, { children: _jsx(CcfMultimediaMessage, Object.assign({}, props)) })));
};
export default CcfContactMultimediaMessage;
//# sourceMappingURL=ccf-contact-multimedia-message.js.map