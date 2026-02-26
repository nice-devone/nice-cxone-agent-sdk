import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux';
import { getAriaLiveAnnouncer } from '../global.app.slice';
import { CcfTypography } from '@nice-devone/ui-controls';
/**
 * Component to announce aria live status to screen reader
 * @example
 * <CcfAriaLiveAnnouncer />
 *  * @returns a wrapper containing aria live message and role
 */
export function CcfAriaLiveAnnouncer() {
    const { ariaMessage = '', politeness = 'polite', translateConfig } = useSelector(getAriaLiveAnnouncer);
    const { key, extraArgs } = translateConfig || {};
    /**
     * Content structure:
     * - With `key`: `{ translationKey : 'searchResultsRefreshed' , extraArgs : { format :[10,'result'..] } }`
     * - Without `key`: `{ children: 'page refreshed' }`
     * */
    const content = key ? Object.assign({ translationKey: key }, extraArgs && { extraArgs }) : { children: ariaMessage };
    return (_jsx(Box, Object.assign({ component: "div", role: 'status', "aria-live": politeness, sx: visuallyHidden }, { children: _jsx(CcfTypography, Object.assign({}, content, { role: "status" })) })));
}
export default memo(CcfAriaLiveAnnouncer);
//# sourceMappingURL=ccf-aria-live-announcer.js.map