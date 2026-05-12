import React from 'react';
import { TabsProps } from '@mui/material/Tabs';
import CcfTabsPanel from './templates/ccf-tabs-panel';
export declare enum Variant {
    FULL_WIDTH = "fullWidth",
    SCROLLABLE = "scrollable",
    STANDARD = "standard"
}
export declare enum Color {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}
export interface CcfTabsProps extends TabsProps {
    children?: (React.ReactElement | undefined)[];
    currentTab: number;
    setCurrentTab: (currentTab: number) => void;
    textColor?: Color.PRIMARY | Color.SECONDARY;
    indicatorColor?: Color.PRIMARY | Color.SECONDARY;
    variant: Variant.FULL_WIDTH | Variant.SCROLLABLE | Variant.STANDARD;
    tabClassname?: string;
    bottomBorder?: boolean;
    /**
     * focusFirstTab- boolean- represents should the first tab be focused on load
     * default true
     */
    focusFirstTab?: boolean;
    /**
     * ariaLabel - string - accessibility label for the Tabs component
     * Should follow pattern : " \{ title \} categories" for consistency
     */
    ariaLabel?: string;
}
/**
 *
 * @param currentValue - Current selected Tab
 * @param setCurrentTab - function to change the current Tab
 * @param tabClassname - To give custom classes to the Tab Component
 * @example <CcfTabs />
 * @returns CcfTabs Component
 */
export declare function CcfTabs({ children, currentTab, setCurrentTab, textColor, indicatorColor, variant, tabClassname, classes, bottomBorder, focusFirstTab, ariaLabel, ...rest }: CcfTabsProps): JSX.Element;
export declare namespace CcfTabs {
    var TabPanel: typeof CcfTabsPanel;
    var Color: typeof import("./ccf-tabs").Color;
    var Variant: typeof import("./ccf-tabs").Variant;
    var defaultProps: {
        textColor: string;
        indicatorColor: string;
        variant: Variant;
    };
}
export default CcfTabs;
