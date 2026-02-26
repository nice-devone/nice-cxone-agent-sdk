import { jsx as _jsx } from "react/jsx-runtime";
import { CcfHomeIcon, CcfCustomerCardIcon, CcfAssignementBoxIcon, CcfCalendarIcon, CcfConversationOutlineIcon, CcfDirectoryIcon, CcfQueueIcon, CcfSettingsIcon, CcfWemIcon, CcfWorkHistoryIcon, CcfScreenPopIcon, CcfQuickRepliesIcon, CcfHelpIcon, CcfSearchIcon, CcfReportingIcon, CcfConferenceIcon, } from '@nice-devone/ui-controls';
import { LaunchPopover } from '../ccf-launch-popover/ccf-launch-popover';
import { CustomWorkspacePopover } from '../ccf-customworkspace-popover/ccf-customworkspace-popover';
/**
* Used to swtich menus
* @param menuName - string
* @example - iconRenderer
*/
const iconRenderer = (menuName, htmlColor) => {
    switch (menuName.toLowerCase()) {
        case 'home':
            return (_jsx(CcfHomeIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'assignment':
            return (_jsx(CcfAssignementBoxIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'customercard':
            return (_jsx(CcfCustomerCardIcon, { htmlColor: htmlColor, viewBox: "0 -4 32 22", style: { fill: '#444d57', stroke: '#fff' } }));
        case 'contacthistory':
            return (_jsx(CcfWorkHistoryIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'search':
            return (_jsx(CcfSearchIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'quickreply':
            return (_jsx(CcfQuickRepliesIcon, { htmlColor: htmlColor }));
        case 'calendar':
            return (_jsx(CcfCalendarIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'directory':
            return (_jsx(CcfDirectoryIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'queue':
            return (_jsx(CcfQueueIcon, { htmlColor: htmlColor, viewBox: "-2 -6 24 24" }));
        case 'wem':
            return (_jsx(CcfWemIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'conversations':
            return (_jsx(CcfConversationOutlineIcon, { htmlColor: htmlColor, viewBox: "0 -4 32 32", style: { fill: '#444d57', stroke: '#fff' } }));
        case 'settings':
            return (_jsx(CcfSettingsIcon, { htmlColor: htmlColor, viewBox: "-2 -4 24 24" }));
        case 'launch':
            return (_jsx(LaunchPopover, { htmlColor: htmlColor, isRevampedIcon: false }));
        case 'screenpop':
            return (_jsx(CcfScreenPopIcon, { htmlColor: htmlColor }));
        case 'help':
            return (_jsx(CcfHelpIcon, { htmlColor: htmlColor }));
        case 'customworkspace':
            return (_jsx(CustomWorkspacePopover, { htmlColor: htmlColor, viewBox: "-4 -6 28 37" }));
        case 'reporting':
            return _jsx(CcfReportingIcon, { htmlColor: htmlColor, viewBox: "-2 -2 24 24" });
        case 'conference':
            return _jsx(CcfConferenceIcon, { htmlColor: htmlColor });
        default: return null;
    }
};
/**
  * Used to render the translated tooltip for menu
  * @param menuName - string
  * @example CcfMenuIconRenderer
  */
const CcfMenuIconRenderer = (props) => {
    return iconRenderer(props.menuName, props.htmlColor);
};
export default CcfMenuIconRenderer;
//# sourceMappingURL=ccf-menu-icon-renderer.js.map