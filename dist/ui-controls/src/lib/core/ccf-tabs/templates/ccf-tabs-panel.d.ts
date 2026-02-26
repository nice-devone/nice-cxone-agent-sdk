import React from 'react';
export interface CcfTabPanelProps {
    children?: React.ReactElement;
    label?: string;
    icon?: React.ReactElement;
    tooltip?: string;
    disabled?: boolean;
}
/**
 *
 * @param param0 - CcfTabPanelProps
 * @example <CcfTabsPanel />
 * @returns
 */
export declare function CcfTabsPanel({ children }: CcfTabPanelProps): JSX.Element;
export default CcfTabsPanel;
