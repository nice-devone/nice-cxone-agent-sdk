import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { memo } from 'react';
import { ContactContentBodyStyles } from '../../ccf-digital/ccf-contact-content-body/styles';
import { removeDomElements } from '../../../util/htmlScrubUtil';
import { Box, useTheme } from '@mui/material';
/**
 * Component to displays Interaction space contact content when the contact is a workitem
 * @returns
 * @example
 * ```
 * <CcfWorkitemContent />
 * ```
 */
export function CcfWorkitemContent() {
    const theme = useTheme();
    const workItemContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    if (workItemContact.payload) {
        const bodyStyle = ContactContentBodyStyles(theme);
        const sanitizedContent = removeDomElements(workItemContact.payload, 'script');
        return (_jsx(Box, { component: 'div', "data-testid": 'workItemPayload', sx: bodyStyle.contentBody, dangerouslySetInnerHTML: { __html: sanitizedContent } }));
    }
    return (_jsx("div", {}));
}
export default memo(CcfWorkitemContent);
//# sourceMappingURL=ccf-workitem-content.js.map