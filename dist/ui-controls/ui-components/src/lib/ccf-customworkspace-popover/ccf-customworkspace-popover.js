import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { CcfCustomWorkspaceIcon, CcfPopOver, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomWorkspaces, globalActions } from '../global.app.slice';
import customWorkspaceStyles from './ccf-customworkspace-popover.styles';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
export const defaultPopOverState = {
    popOverHeader: 'Custom Workspace',
    menuItems: [
        {
            items: [],
        }
    ],
};
/**
 * Used for creating a PopOver Dialogue for Launch indicator on Navigation bar and in contact card
 * @example `<CustomWorkspacePopover />`
 * @example `<CustomWorkspacePopover htmlColor={htmlColor} viewBox={viewBox} isContact />`
 */
export const CustomWorkspacePopover = ({ anchorOrigin, transformOrigin, htmlColor, viewBox, labelComponent, }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const [popOverMenuItems, setPopOverMenuItems] = useState(defaultPopOverState);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = customWorkspaceStyles();
    /**
     * Function to handle the integration of redux data in UI component
     * Internal details - sets the Custom Workspace Labels
     * @param args - none,
     * @example setcustomworkspaceData()
     */
    const setcustomworkspaceData = () => {
        const cwData = customWorkspaces.map((cw) => ({
            id: cw.persistentPanelId + '',
            label: cw.persistentPanelLabel,
            toolTip: cw.persistentPanelLabel,
            url: cw.persistentPanelURI,
            closeOnSelection: true,
        }));
        const customWorkspaceData = {
            popOverHeader: 'Custom Workspace',
            menuItems: [
                {
                    items: [
                        ...cwData
                    ],
                }
            ],
        };
        setPopOverMenuItems(customWorkspaceData);
    };
    useEffect(() => {
        setcustomworkspaceData();
    }, [customWorkspaces]);
    /**
     * Function to handle pop over item selection
     * @param item -PopOverMenuItem
     * @param event -React.MouseEvent<HTMLElement>
     * @example - onPopOverItemSelection(item, e)
     */
    const onPopOverItemSelection = (item, _event) => () => {
        const activeItem = {
            persistentPanelId: +item.id,
            persistentPanelLabel: item.label,
            persistentPanelURI: item.url,
        };
        LocalStorageHelper.setItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE, activeItem);
        dispatch(globalActions.setActivePersistentPanel(activeItem));
    };
    return (_jsx(CcfPopOver, { disableTooltip: true, disableChildTab: true, optionList: popOverMenuItems, onPopOverItemSelection: onPopOverItemSelection, iconComponent: _jsx(CcfCustomWorkspaceIcon, { htmlColor: htmlColor, viewBox: viewBox, sx: styles.launchIcon }), labelComponent: labelComponent, anchorOrigin: anchorOrigin ||
            (isSmView
                ? { vertical: 'bottom', horizontal: 'right' }
                : { vertical: 'top', horizontal: 'right' }), style: isSmView ? { top: '-2rem' } : { marginLeft: '3rem' }, itemToolTips: true, tooltipTitle: 'customWorkspace', transformOrigin: transformOrigin }));
};
//# sourceMappingURL=ccf-customworkspace-popover.js.map