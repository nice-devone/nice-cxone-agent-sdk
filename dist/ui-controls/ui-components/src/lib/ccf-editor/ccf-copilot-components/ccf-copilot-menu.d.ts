/**
 * These are the action types for email action
 */
export declare enum MenuOptionsValue {
    SIMPLIFY = "Simplify",
    EXPAND = "Expand",
    REPHRASE = "Rephrase",
    COPILOT_SEARCH = "Copilot Search"
}
/**
 * These are the tooltip and translation keys for email action
 */
export declare enum MenuOptionsDisplayData {
    SIMPLIFY = "simplify",
    EXPAND = "expand",
    REPHRASE = "rephrase",
    COPILOT_SEARCH = "copilotSearch",
    COPILOT_EMAIL_SIMPLIFY = "copilotEmailSimplify",
    COPILOT_EMAIL_EXPAND_FEATURE_TOGGLE = "copilotEmailExpand",
    COPILOT_EMAIL_REPHRASE = "copilotEmailRephrase",
    COPILOT_EMAIL_SEARCH = "copilotEmailSearch"
}
/**
 * interface for copilot menu props
 * @param caseId - case id
 */
interface CcfCopilotMenuProps {
    caseId: string;
}
/**
 * Component for ccf copilot menu
 * @returns copilot menu in editor toolbar
 * @example -
 * ```
 * <CcfCopilotMenu/>
 * ```
 */
export default function CcfCopilotMenu({ caseId }: CcfCopilotMenuProps): JSX.Element;
export {};
