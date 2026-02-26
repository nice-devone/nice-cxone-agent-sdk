/// <reference types="react" />
import { Tabs } from '@nice-devone/common-sdk';
interface PropTypes extends Tabs {
    closeTab: (tabNumber: string) => void;
}
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor wrapper
 * ```
 * @example
 * <CcfRichEditorWrapper/>
 * ```
 */
export declare function CcfContactEditor(props: PropTypes): JSX.Element | null;
declare const _default: import("react").MemoExoticComponent<typeof CcfContactEditor>;
export default _default;
