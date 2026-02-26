import { AGENT_CHAT_STATUS, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
/**
 * Generates a background color for an avatar based on the input name
 * @param name - The name used to generate a consistent avatar background color
 * @returns A hex color code selected from a predefined color palette
 * @example
 * const avatarColor = generateColorFromName('John Doe');
 * // Returns a consistent color based on the name
 */
export const generateColorFromName = (name) => {
    /**
       * Generates a hash code for a given string
       * @param str - The input string to hash
       * @returns A deterministic hash value for the input string
       * @example
       * const hash = hashCode('example');
       * // Returns a consistent hash value
       */
    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    };
    const colors = ['#00B2FF', '#FBC231', '#FF9000', '#EE67AF', '#13DFCA', '#3E3354', '#8FCE00', '#F44336', '#FAD390', '#F4EF36']; //DEV NOTE: hard coded for now, this will come from backend
    const colorIndex = hashCode(name) % colors.length;
    return colors[colorIndex];
};
/**
     * Helper function to get the icon based on status
     * @param status - status: available
     * @example - getStatusIcon('available')
     */
export const getStatusIcon = (status) => {
    if (!status)
        return agentChatIconList[AGENT_CHAT_STATUS.OFFLINE]('');
    const lowerStatus = status.toLowerCase();
    const iconMap = {
        [AGENT_CHAT_STATUS.ONLINE.toLowerCase()]: AGENT_CHAT_STATUS.ONLINE,
        [AGENT_CHAT_STATUS.OFFLINE.toLowerCase()]: AGENT_CHAT_STATUS.OFFLINE,
    };
    return agentChatIconList[iconMap[lowerStatus] || AGENT_CHAT_STATUS.OFFLINE]('');
};
/**
 * Function to getStateName
 * @param getStateName -agentStateName: string
 * @example getStateName('available')
 * returns localized state
 */
export const getStateName = (state, translate) => {
    /**
     *
     * @param translationKey - string
     * @param agentStates - DirectoryUserAgentStates
     * @example - getStateName('available', DirectoryUserAgentStates.Available);
     * @returns
     */
    const getStateName = (translationKey, agentStates) => translate ? translate(translationKey) : agentStates;
    switch (state) {
        case AGENT_CHAT_STATUS.ONLINE:
            return getStateName('online', AGENT_CHAT_STATUS.ONLINE);
        case AGENT_CHAT_STATUS.OFFLINE:
            return getStateName('offline', AGENT_CHAT_STATUS.OFFLINE);
        default:
            return getStateName('offline', AGENT_CHAT_STATUS.OFFLINE);
    }
};
//# sourceMappingURL=helper-methods.js.map