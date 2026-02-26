import { ActionForDropdown, AgentIntegrationConfiguration } from '@nice-devone/shared-apps-lib';
export interface CcfActionEditorMultiselectDropdownProps {
    handleChange?: (...args: any[]) => void;
    handleOnOpen?: (...args: any[]) => void;
    options?: AgentIntegrationConfiguration[] | ActionForDropdown[];
    value?: string;
    label?: string;
    singleSelect?: boolean;
    selected?: unknown[];
}
/**
 * Action Editor component for multiselect dropdown
 * @param props - CcfActionEditorMultiselectDropdownProps
 * @returns component for multiselect dropdown
 * @example <CcfActionEditorMultiselectDropdown />
 */
export declare const CcfActionEditorMultiselectDropdown: (props: CcfActionEditorMultiselectDropdownProps) => JSX.Element;
export default CcfActionEditorMultiselectDropdown;
