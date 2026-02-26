/// <reference types="react" />
import { Tabs } from '@nice-devone/common-sdk';
interface PropTypes extends Tabs {
    closeTab: (tabNumber: string) => void;
}
/**
 * Component to displays Interaction space contact content
 * @returns
 * @example
 * ```
 * <CcfContactContent />
 * ```
 */
export declare function CcfContactContent(props: PropTypes): JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof CcfContactContent>;
export default _default;
