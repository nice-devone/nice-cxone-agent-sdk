import { jsx as _jsx } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { getPanelAppNavigationItems, globalActions, navigateToAppSpaceTab } from '../global.app.slice';
import { Navigation } from '../../enums/navigation-menus';
import { CcfTooltip, CcfTransferIcon } from '@nice-devone/ui-controls';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { CcfAssignmentAction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import contactControlStyles from '../../styles/ccf-contact-control.style';
/**
 * Component for transfer button
 * ```
 * @example-
 * <CcfTransferButton />
 * ```
 */
export const CcfTransferButton = ({ toolTipPlacement, disabled, sx }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const isBelowXl = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const contactControlIconStyles = contactControlStyles(theme);
    /**
     *
     * function to handle transfer button click
     * @example - onTransferButtonClick()
     */
    const onTransferButtonClick = () => {
        if (!isBelowXl) {
            navigateToAppSpaceTab({ dispatch: dispatch, panelAppNavigationItems: panelAppNavigationItems, navigation: Navigation.DIRECTORY });
        }
        else {
            dispatch(globalActions.setSelectedMenu({ name: 'Directory' }));
            if (isBelowMd) {
                dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
            }
        }
    };
    return (_jsx(CcfTooltip, Object.assign({ translationKey: 'transfer', title: 'transfer', arrow: true, placement: toolTipPlacement || 'top' }, { children: _jsx(IconButton, Object.assign({ "data-testid": 'consult/transfer', disableFocusRipple: true, onClick: onTransferButtonClick, disabled: disabled, sx: Object.assign(Object.assign({}, sx), contactControlIconStyles.disabled) }, { children: _jsx(CcfTransferIcon, { viewBox: '0 0 25 26' }) })) }), 'transfer'));
};
//# sourceMappingURL=ccf-transfer-button.js.map