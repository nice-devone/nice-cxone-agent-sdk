import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { CcfHeader, CcfLoader, useTranslator, CcfDirectoryIcon } from '@nice-devone/ui-controls';
import { getApplicationDirection, getSelectedMenuName } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { useEffect, useState } from 'react';
import ccfDirectoryStyles from './ccf-directory.styles';
/**
 * Component for ccf full view directory
 * @example - <CCfFullViewDirectory />
 * @returns
 */
export function CcfFullViewDirectory() {
    const [translate] = useTranslator();
    const theme = useTheme();
    const directoryStyles = ccfDirectoryStyles(theme);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const appDirection = useSelector(getApplicationDirection);
    const [Directory, setDirectory] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const selectedMenu = useSelector(getSelectedMenuName);
    //load when click on left nav item
    useEffect(() => {
        if (selectedMenu === Navigation.DIRECTORY) {
            // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
            const renderDirectory = () => __awaiter(this, void 0, void 0, function* () {
                const directory = yield import('../ccf-directory/ccf-directory');
                const Directory = directory.CcfDirectory;
                setDirectory(_jsx(Directory, { isFullView: isSmView ? false : true }));
            });
            renderDirectory();
        }
    }, [selectedMenu]);
    return (_jsxs(Box, Object.assign({ component: 'section', sx: directoryStyles.fullViewDirectoryCard }, { children: [_jsx(Box, Object.assign({ sx: directoryStyles.directoryHeader }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfDirectoryIcon, { viewBox: '-2 -2 24 24' }), headerText: translate('directory'), RightIcon: false, showDragIcon: true, direction: appDirection }) })), Directory] })));
}
export default CcfFullViewDirectory;
//# sourceMappingURL=ccf-full-view-directory.js.map