/// <reference types="react" />
import { CcfCaseCustomFieldDefs } from '../ccf-interaction-space/ccf-custom-fields/ccf-custom-fields';
export interface TreeNode {
    id: string;
    value: string;
    children?: TreeNode[];
    isLeaf: boolean;
    parentId?: string | null;
}
export interface CcfTreeElementProps {
    customFields: CcfCaseCustomFieldDefs;
    enableInput: boolean;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    onTreeItemSelection(ident: string, itemId: string): any;
}
/**
 * Component to display dropdown in a heirarchical tree form
 * @returns tree element
 * @example
 * ```
 * <CcfTreeElement treeElement={props.treeElement}
 * ```
 */
export declare function CcfTreeElement({ customFields, enableInput, onTreeItemSelection, inputProps, }: CcfTreeElementProps): JSX.Element;
export default CcfTreeElement;
