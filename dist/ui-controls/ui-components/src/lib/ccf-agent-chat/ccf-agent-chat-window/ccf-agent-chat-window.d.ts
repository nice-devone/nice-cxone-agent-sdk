import { ThreadMessageGroup } from '../common/interfaces';
export interface CcfAgentChatMessages {
    messages: ThreadMessageGroup[];
}
/**
 * Component for ccf agents chat window
 * @example - <CcfAgentChatWindow />
 * @returns
 */
export declare const CcfAgentChatWindow: ({ messages }: CcfAgentChatMessages) => JSX.Element | null;
export default CcfAgentChatWindow;
