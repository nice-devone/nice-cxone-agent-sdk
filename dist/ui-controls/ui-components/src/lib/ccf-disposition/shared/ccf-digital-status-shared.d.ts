/// <reference types="react" />
interface CcfDigitalStatusSharedProps {
    renderedInOutcomesPanel?: boolean;
    isShortWindow?: boolean;
}
/**
 * Component displays Digital Disposition
 * @param statusFormParams - formData of currently selected status, handleChange function, digitalStatusRef, isDigitalContactClosed
 * @returns displays digital disposition status dropdown
 * @example <CcfDigitalStatusShared />
 */
export declare const CcfDigitalStatusShared: (statusFormParams: CcfDigitalStatusSharedProps) => JSX.Element;
declare const _default: import("react").MemoExoticComponent<(statusFormParams: CcfDigitalStatusSharedProps) => JSX.Element>;
export default _default;
