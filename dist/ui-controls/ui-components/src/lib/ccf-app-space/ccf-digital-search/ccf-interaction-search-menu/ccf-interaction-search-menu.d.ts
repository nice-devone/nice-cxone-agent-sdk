import * as React from 'react';
import { CcfGridValidRowModel } from '@nice-devone/ui-controls';
export interface CcfInteractionSearchMenuProps {
    details?: CcfGridValidRowModel;
}
export declare enum CcfInteractionSearchMenuAction {
    contactInfo = 0,
    assigntoMe = 1
}
/**
 * Component displays kebab menu for interaction search space
 * @returns Kebab menu for interaction search space
 * ```
 * @example
 * <CcfInteractionSearchMenu/>
 * ```
 */
export declare function CcfInteractionSearchMenu(props: CcfInteractionSearchMenuProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfInteractionSearchMenu>;
export default _default;
