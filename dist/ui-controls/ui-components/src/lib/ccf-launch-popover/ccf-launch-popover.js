import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { CcfPopOver, CcfPopOutArrowIcon, CcfLaunchIndicatorRevampedIcon, CcfLaunchIndicatorIcon, } from '@nice-devone/ui-controls';
import { IndicatorActionType } from '@nice-devone/common-sdk';
import { useAsyncValue } from '../../hooks/useAsyncValue';
import { Start } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import ccfLaunchPopoverStyles from './ccf-launch-popover.styles';
import { getLaunchButtonStatus, globalActions } from '../global.app.slice';
export const defaultPopOverState = {
    popOverHeader: 'No entries found',
    menuItems: [
        {
            items: [],
        }
    ],
};
/**
 * Used for creating a PopOver Dialogue for Launch indicator on Navigation bar and in contact card
 * @example `<LaunchPopover />`
 * @example `<LaunchPopover htmlColor={htmlColor} isContact />`
 */
export const LaunchPopover = ({ anchorOrigin, buttonSx, disableTooltip, transformOrigin, htmlColor, isContact, labelComponent, isDrawerOpen, toggleDrawer, parentIndicators, HamburgermenuLaunch, isQuickAppLaunchMenu, isRevampedIcon = true, contactId, }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = ccfLaunchPopoverStyles();
    const { popOverIcon, startIcon, launchIcon } = styles;
    const [popOverMenuItems, setPopOverMenuItems] = useState(defaultPopOverState);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const indicatorClient = CXoneAcdClient.instance.indicator;
    const indicators = useAsyncValue(isContact
        ? indicatorClient.contactIndicatorsEventObservable
        : indicatorClient.agentIndicatorsEventObservable);
    const relevantIndicators = useRef(indicators);
    const focusLaunchButton = useSelector(getLaunchButtonStatus);
    useEffect(() => {
        if (isContact && contactId) {
            relevantIndicators.current = (indicators === null || indicators === void 0 ? void 0 : indicators.filter(indicator => indicator.contactId === contactId
                && indicator.isEnabled)) || null;
        }
        else {
            relevantIndicators.current = (indicators === null || indicators === void 0 ? void 0 : indicators.filter(indicator => !indicator.isContactIndicator
                && indicator.isEnabled)) || null;
        }
    }, [indicators, isContact, contactId]);
    /**
     * Helper function to generate intitial values for popover state
     * @example `getInitialItems()`
     */
    const getInitialItems = () => {
        if (parentIndicators) {
            return getPopoverStateWithIndicators(parentIndicators);
        }
        if (!indicators) {
            return defaultPopOverState;
        }
        if (indicators.filter((indicator) => indicator.isEnabled).length === 0) {
            return defaultPopOverState;
        }
        const activeIndicators = indicators.filter((indicator) => {
            let showIndicator = indicator.isEnabled;
            if (isContact && showIndicator && contactId) {
                showIndicator = indicator.contactId === contactId;
            }
            return showIndicator;
        });
        return getPopoverStateWithIndicators(activeIndicators);
    };
    /**
     * Function to handle callback when required to navigate from inner pop over to parent
     * Internal details - sets the state to display parent popover
     * @param args - none,
     * @example navigateToInitialPopOverState()
     */
    const getPopoverStateWithIndicators = (indicatorsToMap) => {
        const mappedIndicators = indicatorsToMap.map((indicator) => {
            const { indicatorName, actionType, toolTip } = indicator;
            const menuItems = {
                label: indicatorName,
                icon: actionType === IndicatorActionType.SPAWNSCRIPT ||
                    actionType === IndicatorActionType.SIGNALSCRIPT ? (_jsx(Start, { sx: startIcon })) : (_jsx(CcfPopOutArrowIcon, { sx: popOverIcon })),
                type: actionType,
                closeOnSelection: true,
                toolTip,
            };
            return menuItems;
        });
        const popOverStateWithIndicators = {
            popOverHeader: '',
            menuItems: [
                {
                    items: mappedIndicators,
                }
            ],
        };
        return popOverStateWithIndicators;
    };
    /**
     * Function to handle callback when required to navigate from inner pop over to parent
     * Internal details - sets the state to display parent popover
     * @param args - none,
     * @example navigateToInitialPopOverState()
     */
    const navigateToInitialPopOverState = () => {
        const menuItems = getInitialItems();
        setPopOverMenuItems(menuItems);
    };
    /**
     * Function to handle pop over item selection
     * @param item -PopOverMenuItem
     * @param event -React.MouseEvent<HTMLElement>
     * @example - onPopOverItemSelection(item, e)
     */
    const onPopOverItemSelection = (item, event) => () => {
        var _a, _b;
        const matchingIndicator = (_a = relevantIndicators === null || relevantIndicators === void 0 ? void 0 : relevantIndicators.current) === null || _a === void 0 ? void 0 : _a.find((indicator) => indicator.indicatorName === item.label);
        if (matchingIndicator) {
            switch (item.type) {
                case IndicatorActionType.SIGNALSCRIPT:
                    indicatorClient.signalScript(matchingIndicator);
                    return;
                case IndicatorActionType.SPAWNSCRIPT:
                    indicatorClient.spawnScript(matchingIndicator);
                    return;
                case IndicatorActionType.SHOWCUSTOMFORM:
                    {
                        const windowTarget = matchingIndicator.indicatorName;
                        const customFormWindow = window.open('', windowTarget, 'width=400, height=400, top=0, left=960');
                        if (!(customFormWindow === null || customFormWindow === void 0 ? void 0 : customFormWindow.document.body.getElementsByClassName(matchingIndicator === null || matchingIndicator === void 0 ? void 0 : matchingIndicator.indicatorName)[0])) {
                            customFormWindow === null || customFormWindow === void 0 ? void 0 : customFormWindow.document.write(matchingIndicator.actionValue);
                            customFormWindow === null || customFormWindow === void 0 ? void 0 : customFormWindow.addEventListener('submit', (e) => {
                                e.preventDefault();
                                indicatorClient.onCustomFormSubmit(e, customFormWindow);
                            });
                            customFormWindow === null || customFormWindow === void 0 ? void 0 : customFormWindow.document.close();
                        }
                    }
                    (_b = matchingIndicator.customFormCallback) === null || _b === void 0 ? void 0 : _b.call(matchingIndicator, event);
                    return;
            }
            isDrawerOpen && toggleDrawer && toggleDrawer(false);
            window.open(matchingIndicator.actionValue);
        }
        return;
    };
    /**
    * send launch button click status
     * @param args - boolean
     * @example setLaunchButtonClickStatus(false)
     */
    const setLaunchButtonClickStatus = (args) => {
        dispatch(globalActions.focusLaunchButton(args));
    };
    return (_jsx(CcfPopOver, { buttonSx: buttonSx, disableTooltip: disableTooltip, optionList: popOverMenuItems, navigateToInitialPopOverState: navigateToInitialPopOverState, itemToolTips: true, tooltipArrow: true, tooltipTitle: 'launch', isQuickAppLaunchMenu: isQuickAppLaunchMenu, focusLaunchButton: focusLaunchButton, setLaunchButtonClickStatus: setLaunchButtonClickStatus, onPopOverItemSelection: onPopOverItemSelection, iconComponent: !HamburgermenuLaunch &&
            (!isRevampedIcon ? (_jsx(CcfLaunchIndicatorIcon, { htmlColor: htmlColor, viewBox: "0 2 24 24", sx: launchIcon })) : (_jsx(CcfLaunchIndicatorRevampedIcon, { htmlColor: htmlColor, viewBox: "0 0 25 25", sx: Object.assign(Object.assign({}, launchIcon), { fontSize: 'inherit' }) }))), labelComponent: labelComponent, anchorOrigin: anchorOrigin ||
            (isSmView
                ? { vertical: 'bottom', horizontal: 'right' }
                : { vertical: 'top', horizontal: 'right' }), showHoverBackground: false, style: isSmView ? { top: '0' } : { marginLeft: '2rem' }, transformOrigin: transformOrigin }));
};
//# sourceMappingURL=ccf-launch-popover.js.map