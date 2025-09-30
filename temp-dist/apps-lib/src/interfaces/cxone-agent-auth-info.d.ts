/**
 * Model to post cxone-agent and authentication information to parent tab
 */
export interface CxoneAgentAuthInfo {
    /**
     * Message type to be posted
     */
    messageType?: string;
    /**
     * User is authenticated or not
     */
    isAuthenticated?: boolean;
    /**
     * Current agent state
     */
    agentState?: string;
    /**
     * Logged in user initials
     */
    userInitials?: string;
    /**
     * Check if ob skill is assigned
     */
    obSkillAssigned?: boolean;
}
