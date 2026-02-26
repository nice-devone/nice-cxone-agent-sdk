import { CcfTranslationKey } from '@nice-devone/i18n';
import { AGENT_CHAT_STATUS } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
/**
 * Generates a background color for an avatar based on the input name
 * @param name - The name used to generate a consistent avatar background color
 * @returns A hex color code selected from a predefined color palette
 * @example
 * const avatarColor = generateColorFromName('John Doe');
 * // Returns a consistent color based on the name
 */
export declare const generateColorFromName: (name: string) => string;
/**
     * Helper function to get the icon based on status
     * @param status - status: available
     * @example - getStatusIcon('available')
     */
export declare const getStatusIcon: (status: AGENT_CHAT_STATUS | undefined) => JSX.Element;
declare type TranslatorFunction = (input: CcfTranslationKey, extraArgs?: {
    format: (string | number)[];
}) => string;
/**
 * Function to getStateName
 * @param getStateName -agentStateName: string
 * @example getStateName('available')
 * returns localized state
 */
export declare const getStateName: (state: string, translate?: TranslatorFunction) => string;
export {};
