import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Tab, Tabs, useTheme } from '@mui/material';
import { CcfAddChannelIcon, CcfBox, CcfButton, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import CustomTabPanel from './customTabPanel';
import { tabGroupStyles } from './ccf-tabs-group.styles';
import { TabHeading } from './tabHeading';
import { CcfDigitalContactsTabHeading } from '../ccf-digital-contact-tabs/ccf-digital-contact-tab-heading/ccf-digital-contact-tab-heading';
import { CcfDigitalContactTabPanel } from '../ccf-digital-contact-tabs/ccf-digital-contact-tabs-panel/ccfDigitalContactTabPanel';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
import { useSelector } from 'react-redux';
/**
 * This component can be used to enhance MUI tabs as Tab group which is similar to what we see in browsers.
 * @example - <ccfTabsGroup />
 */
export const CcfTabsGroup = React.forwardRef((props, ref) => {
    const { tabs, onTabClose, showPopOver, updateSelectedTab, selectedTab, disableAddChannel, showAddChannel = true } = props;
    const tabWrapperRef = useRef(null);
    const [tabWrapperWidth, setTabWrapperWidth] = useState(0);
    const [translate] = useTranslator();
    const theme = useTheme();
    const isTabsOverflowing = tabs.length * 130 >= Math.floor(tabWrapperWidth);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const tabStyles = tabGroupStyles(theme, tabWrapperWidth, tabs.length);
    /**
     * Used to update the tabs width on window resize
     * @example - updateWidth()
     */
    const updateWidth = () => {
        if (tabWrapperRef.current) {
            setTabWrapperWidth(tabWrapperRef.current.clientWidth);
        }
    };
    useEffect(() => {
        updateWidth();
        const divElement = tabWrapperRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            setTabWrapperWidth(entries[0].contentRect.width);
        });
        if (divElement) {
            resizeObserver.observe(divElement);
        }
        document.addEventListener('resize', updateWidth);
        return () => {
            document.removeEventListener('resize', updateWidth);
            if (divElement) {
                resizeObserver.unobserve(divElement);
                resizeObserver.disconnect();
            }
        };
    }, []);
    return (_jsxs(CcfBox, Object.assign({ sx: tabStyles.tabGroup }, { children: [_jsx("div", Object.assign({ ref: tabWrapperRef }, { children: _jsxs(CcfBox, Object.assign({ sx: tabStyles.tabWrapper }, { children: [_jsx(Tabs, Object.assign({ value: selectedTab, onChange: updateSelectedTab, "aria-label": 'elevation-tabs', TabIndicatorProps: {
                                style: { display: 'none' },
                            } }, { children: tabs === null || tabs === void 0 ? void 0 : tabs.map((tab) => {
                                return (_jsx(Tab, { value: tab.id, disableRipple: true, label: _jsx(TabHeading, Object.assign({ isSelected: selectedTab === tab.id, isPreviewCase: tab.isPreviewCase }, { children: _jsx(CcfBox, Object.assign({ style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: '100%',
                                            } }, { children: _jsx(CcfDigitalContactsTabHeading, Object.assign({}, tab, { isTabsOverflowing: isTabsOverflowing })) })) })), id: `elevated-tab-${tab.id}`, "aria-controls": `elevated-tab-panel-${tab.id}` }, tab.id));
                            }) })), tabs.length > 0 && showAddChannel && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBElevation) &&
                            _jsx(CcfTooltip, Object.assign({ title: disableAddChannel ? '' : translate('addOutbound'), arrow: true, placement: 'top' }, { children: _jsx("div", Object.assign({ ref: ref }, { children: _jsx(CcfButton, Object.assign({ sx: tabStyles.addButton, onClick: showPopOver, disabled: disableAddChannel, disableRipple: true, "aria-label": translate('addOutbound') }, { children: _jsx(CcfAddChannelIcon, { style: { fill: theme.palette.text.secondary, opacity: disableAddChannel ? 0.2 : 1 }, viewBox: '3 3 18 18' }) })) })) }))] })) })), tabs === null || tabs === void 0 ? void 0 : tabs.map((tab) => {
                return (_jsx(CustomTabPanel, Object.assign({ sx: tabStyles.tabPanel, value: selectedTab, index: tab.id }, { children: _jsx(CcfDigitalContactTabPanel, Object.assign({}, tab, { closeTab: onTabClose })) }), tab.id));
            })] })));
});
export default CcfTabsGroup;
//# sourceMappingURL=ccf-tabs-group.js.map