/// <reference types="react" />
import { Tabs } from '@nice-devone/common-sdk';
interface PropTypes extends Tabs {
    closeTab: (tabNumber: string) => void;
}
/**
 * Component to displays digital contact tab
 * @returns digital contact tab
 * @example
 * ```
 * <CcfDigitalContactTabs />
 * ```
 */
export declare function CcfDigitalContactTabs(props: PropTypes): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfDigitalContactTabs>;
export default _default;
