import React from 'react';
import { Tabs as TabsInterface } from '@nice-devone/common-sdk';
export interface PropsTypes {
    tabs: TabsInterface[];
    onTabClose: (tabNumber: string) => void;
    showPopOver: () => void;
    selectedTab: any;
    updateSelectedTab: (_: React.SyntheticEvent, newSelectedTab: number) => void;
    disableAddChannel: boolean;
    showAddChannel?: boolean;
}
/**
 * This component can be used to enhance MUI tabs as Tab group which is similar to what we see in browsers.
 * @example - <ccfTabsGroup />
 */
export declare const CcfTabsGroup: React.ForwardRefExoticComponent<PropsTypes & React.RefAttributes<HTMLDivElement | null>>;
export default CcfTabsGroup;
