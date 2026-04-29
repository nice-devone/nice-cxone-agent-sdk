import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CcfTabsPanel from './templates/ccf-tabs-panel';
import { CcfTooltip } from '../../core/ccf-tooltip/ccf-tooltip';
import CcfDivider, { DividerOrientation, DividerVariant } from '../ccf-divider/ccf-divider';
import { useTheme } from '@mui/material';
import CcfTabsStyle from './ccf-tabs.styles';
export var Variant;
(function (Variant) {
    Variant["FULL_WIDTH"] = "fullWidth";
    Variant["SCROLLABLE"] = "scrollable";
    Variant["STANDARD"] = "standard";
})(Variant || (Variant = {}));
export var Color;
(function (Color) {
    Color["PRIMARY"] = "primary";
    Color["SECONDARY"] = "secondary";
})(Color || (Color = {}));
/**
 *
 * @param currentValue - Current selected Tab
 * @param setCurrentTab - function to change the current Tab
 * @param tabClassname - To give custom classes to the Tab Component
 * @example <CcfTabs />
 * @returns CcfTabs Component
 */
export function CcfTabs(_a) {
    var { children, currentTab, setCurrentTab, textColor, indicatorColor, variant, tabClassname, classes, bottomBorder, focusFirstTab = true, ariaLabel = 'tabs' } = _a, rest = __rest(_a, ["children", "currentTab", "setCurrentTab", "textColor", "indicatorColor", "variant", "tabClassname", "classes", "bottomBorder", "focusFirstTab", "ariaLabel"]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const theme = useTheme();
    const ccfTabsStyles = CcfTabsStyle(theme);
    const focusedTabRef = React.useRef(null);
    const childrenArray = React.Children.toArray(children);
    /**
     *
     * @param event - any
     * @param newValue - any
     * @example handleChange(event,newvalue)
     */
    const handleChange = (_event, newValue) => {
        setCurrentTab(newValue);
    };
    const handleKeyPress = useCallback((event) => {
        if (event.altKey && childrenArray.length > 0) {
            switch (event.code) {
                case 'ArrowRight':
                    event.preventDefault();
                    if (activeTabIndex === (childrenArray.length - 1)) {
                        setActiveTabIndex(0);
                        setCurrentTab(0);
                    }
                    else {
                        setActiveTabIndex(activeTabIndex + 1);
                        setCurrentTab(activeTabIndex + 1);
                    }
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (activeTabIndex === 0) {
                        setActiveTabIndex(childrenArray.length - 1);
                        setCurrentTab(childrenArray.length - 1);
                    }
                    else {
                        setActiveTabIndex(activeTabIndex - 1);
                        setCurrentTab(activeTabIndex - 1);
                    }
                    break;
            }
        }
    }, [activeTabIndex, childrenArray]);
    useEffect(() => {
        var _a;
        focusFirstTab && ((_a = focusedTabRef === null || focusedTabRef === void 0 ? void 0 : focusedTabRef.current) === null || _a === void 0 ? void 0 : _a.focus());
    }, [activeTabIndex]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    return (_jsxs(_Fragment, { children: [_jsxs("section", { children: [_jsx(Tabs, Object.assign({ value: currentTab, onChange: handleChange, variant: variant, scrollButtons: variant === Variant.SCROLLABLE ? true : false, indicatorColor: indicatorColor, textColor: textColor, "aria-label": ariaLabel, classes: Object.assign({}, classes) }, rest, { children: React.Children.map(children, (child, idx) => {
                            var _a, _b;
                            const label = child === null || child === void 0 ? void 0 : child.props.label;
                            const icon = child === null || child === void 0 ? void 0 : child.props.icon;
                            const disabled = child === null || child === void 0 ? void 0 : child.props.disabled;
                            const tabTooltip = (child === null || child === void 0 ? void 0 : child.props.tooltip) || ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.label);
                            return child ? _jsx(CcfTooltip, Object.assign({ "aria-label": tabTooltip, title: tabTooltip, arrow: true, disableInteractive: true }, { children: _jsx(Tab, { disabled: disabled, classes: Object.assign({}, (_b = child === null || child === void 0 ? void 0 : child.props) === null || _b === void 0 ? void 0 : _b.classes), className: tabClassname, icon: icon, label: label, "aria-label": label, disableRipple: true, sx: Object.assign(Object.assign({}, ccfTabsStyles === null || ccfTabsStyles === void 0 ? void 0 : ccfTabsStyles.tab), ccfTabsStyles === null || ccfTabsStyles === void 0 ? void 0 : ccfTabsStyles.focussedElement), ref: (idx === activeTabIndex) ? focusedTabRef : undefined }, `${label}_${idx}`) })) : null;
                        }) })), bottomBorder && _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH })] }), React.Children.map(children, (child, idx) => {
                return idx === currentTab ? child : null;
            })] }));
}
CcfTabs.TabPanel = CcfTabsPanel;
CcfTabs.Color = Color;
CcfTabs.Variant = Variant;
CcfTabs.defaultProps = {
    textColor: 'inherit',
    indicatorColor: 'primary',
    variant: Variant.FULL_WIDTH,
};
export default CcfTabs;
//# sourceMappingURL=ccf-tabs.js.map