import { ThreadMessageGroup } from '../common/interfaces';
interface CcfAgentChatMessages {
    messages: ThreadMessageGroup[];
}
/**
 * Component for ccf agents chat messages
 * @example - <CcfAgentChatMessage />
 * @returns
 */
export declare const CcfAgentChatContentSearch: ({ messages }: CcfAgentChatMessages) => JSX.Element;
export default CcfAgentChatContentSearch;
