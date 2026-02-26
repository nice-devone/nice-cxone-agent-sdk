import { Tabs } from '@nice-devone/common-sdk';
interface PropTypes extends Tabs {
    closeTab: (tabNumber: string) => void;
}
/**
 * Tab panel for interaction spcae
 * @example - <CcfDigitalContactTabPanel />
 */
export declare const CcfDigitalContactTabPanel: (props: PropTypes) => JSX.Element;
export {};
