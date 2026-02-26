import { dropdownOptions } from '@nice-devone/ui-controls';
/**
 * Props for the component ccf-agent-copilot-filter
 */
export interface CcfAgentCopilotFilterProps {
    filterOptions: dropdownOptions[];
    setFilterTargetValue: (value: HTMLElement | null) => void;
}
/** Component to render Agent Copilot Filters
 * @example CcfAgentCopilotFilter()
 */
export declare const CcfAgentCopilotFilter: (props: CcfAgentCopilotFilterProps) => JSX.Element;
