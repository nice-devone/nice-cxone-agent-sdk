import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useEffect, useState } from 'react';
import { CcfHeader, CcfLoader, CcfSrDeskIcon } from '@nice-devone/ui-controls';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import lvDeskStyles from '../lv-desk.styles';
import { getSelectedMenuName, getApplicationDirection } from '../../../global.app.slice';
import { Navigation } from '../../../../enums/navigation-menus';
/**
 * Wrapper container of LVDesk used in load Nav items from left side nav bar
 * Referenced from:
 * - libs/react/ui-components/src/lib/ccf-settings/ccf-full-view-settings.tsx:37
 * - libs/react/ui-components/src/lib/ccf-app-space/ccf-agent-contact-history/ccf-agent-full-view-contact-history.tsx:16
 * - libs/react/ui-components/src/lib/ccf-app-space/ccf-full-view-queue-counter.tsx:16
 * - libs/react/ui-components/src/lib/ccf-directory/ccf-full-view-directory.tsx:15
 * @example
 * ```
 * <LvDeskFullViewContainer />
 * ```
 */
export function LvDeskFullViewContainer() {
    var _a, _b;
    const theme = useTheme();
    const deskStyles = lvDeskStyles(theme);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const appDirection = useSelector(getApplicationDirection);
    const selectedMenu = useSelector(getSelectedMenuName);
    const [Desk, setDesk] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    /**
     * load when click on left nav item
     */
    useEffect(() => {
        if (selectedMenu === Navigation.LVDESK) {
            // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
            const renderDesk = () => __awaiter(this, void 0, void 0, function* () {
                const desk = yield import('../lv-desk');
                const LvDesk = desk.LvDeskHome;
                setDesk(_jsx(LvDesk, { showEccOnFail: true }));
            });
            renderDesk();
        }
    }, [selectedMenu]);
    return (_jsxs(Box, Object.assign({ component: 'section', sx: deskStyles.fullViewDeskCard }, { children: [_jsx(Box, Object.assign({ sx: deskStyles.deskHeader }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfSrDeskIcon, { viewBox: "2 -1 21 21", htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText }), direction: appDirection, headerText: 'Desk' }) })), _jsx(Box, Object.assign({ sx: Object.assign({ overflow: 'auto', height: '100%' }, (!isSmView && { padding: '0' })) }, { children: Desk }))] })));
}
export default LvDeskFullViewContainer;
//# sourceMappingURL=lv-desk-full-view-container.js.map