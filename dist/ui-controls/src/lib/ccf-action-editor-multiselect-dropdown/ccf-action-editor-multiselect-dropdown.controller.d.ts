import { SelectChangeEvent } from '@mui/material';
import { ActionForDropdown, AgentIntegrationConfiguration } from '@nice-devone/shared-apps-lib';
/**
 * Class for the CcfActionEditorMultiselectDropdown component.
 */
declare class Controller {
    KEY_OF_DISPLAY_OPTION: string;
    /**
     * Function to handle logic for when the component is in single select mode.
     * @example handleOnChangeOfSelectForSingleSelect()
     */
    handleOnChangeOfSelectForSingleSelect: (selection: string | string[], selected: unknown[] | undefined, handleChange: unknown) => 0 | -1 | -2;
    /**
     * Function to handle logic for when the component is in multi select mode.
     * @example handleOnChangeOfSelectForMultiSelect()
     */
    handleOnChangeOfSelectForMultiSelect: (selections: string | string[] | undefined, value: string, options: {
        [key: string]: unknown;
    }[] | AgentIntegrationConfiguration[] | ActionForDropdown[], selected: unknown[] | undefined, handleChange: unknown) => 0 | -1 | -2;
    /**
     * Function to determine which select mode function to execute.
     * @example onChangeOfSelect()
     */
    onChangeOfSelect: (event: SelectChangeEvent<string | string[]>, value: string, singleSelect: unknown, options: AgentIntegrationConfiguration[] | ActionForDropdown[] | {
        [key: string]: unknown;
    }[], selected: unknown[], handleChange: unknown) => void;
    /**
     * Function to handle logic for when the select component is opened.
     * @example onOpenOfSelect()
     */
    onOpenOfSelect: (handleOnOpen: unknown) => 0 | -1 | -2;
    /**
     * Function to set the selection count.
     * @example determineSelectionCount()
     */
    determineSelectionCount: (selected?: unknown[]) => number;
}
declare const _default: Controller;
export default _default;
