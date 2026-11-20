import { CcfAuthenticationProps } from "./ccf-authentication-props";
/**
 * model interface for agent copilot properties
 */
export interface AgentCopilotProps {
    /**
     * contactId of the chat/call
     */
    contactId?: string;
    /**
     * unique identifier for agent assist
     */
    agentAssistId?: string;
    /**
     * flag to show/hide copy action
     */
    showCopyAction?: boolean;
    /**
     * flag to show/hide insert action
     */
    showInsertAction?: boolean;
    /**
     * flag to show/hide send action
     */
    showSendAction?: boolean;
    /**
     * flag to show/hide final summary card
     */
    showFinalSummaryCard?: boolean;
    /**
     * flag to show/hide interaction sidebar
     */
    showInteractionSidebar?: boolean;
    /**
     * flag to show/hide logout action
     */
    showLogoutAction?: boolean;
    /**
     * flag to indicate bootstrap data readiness for the Copilot MFE
     */
    isInitialCopilotDataReady?: boolean;
    /**
     * Controls AppBar visibility, false for cxAgent, true when MFE/Embedded
     */
    showAppBar?: boolean;
    /**
     * Minimum width of the MFE container
     */
    minWidth?: string;
    /**
     * Maximum width of the MFE container
     */
    maxWidth?: string;
    /**
     * authentication data for CCF application
     */
    appAuthData?: CcfAuthenticationProps;
    /**
     * When false, all interactive elements in the copilot panel are non-interactive.
     * Set to false when contactStatus is 'closed' or 'disconnected'.
     */
    isContactActive?: boolean;
}
