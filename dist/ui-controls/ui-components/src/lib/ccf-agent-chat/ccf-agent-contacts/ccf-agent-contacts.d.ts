/// <reference types="react" />
import { Member, Groups, RecentChatThreads } from '../common/interfaces';
import { groupMembers } from '../ccf-agent-chat.slice';
export interface CcfAgentContactProps {
    showIndicator?: boolean;
    agent?: Member | Groups | groupMembers | RecentChatThreads;
    selected?: boolean;
}
/**
 * Component for ccf agents name
 * @example - <CcfAgentContact />
 * @returns
 */
export declare const CcfAgentContact: ({ showIndicator, agent, selected }: CcfAgentContactProps) => JSX.Element | null;
declare const _default: import("react").MemoExoticComponent<({ showIndicator, agent, selected }: CcfAgentContactProps) => JSX.Element | null>;
export default _default;
