import { AGENT_CHAT_STATUS } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { Favorites, ThreadMessageGroup, ThreadMessage, GroupResponse, RecentChatThreads } from '../common/interfaces';
interface Contact {
    userId?: string;
    id: string;
    name: string;
    status: AGENT_CHAT_STATUS;
    unRead: number;
    isGroup: boolean;
    members?: {
        name: string;
        status: AGENT_CHAT_STATUS;
        id?: string;
        unRead?: number;
        isGroup?: boolean;
    }[];
}
export interface CcfAgentChatContactsSectionProps {
    favorites: Favorites[];
    groups: GroupResponse;
    recents: RecentChatThreads[];
    messages: ThreadMessageGroup[];
    onChatSelect?: (contact: Contact, messages: ThreadMessage[]) => void;
    userId: string;
    isSmView?: boolean;
    isAppSpace?: boolean;
}
/**
 * Component for ccf agent chat contacts section
 * @example - <CcfAgentChatContactsSection />
 * @returns
 */
export declare function CcfAgentChatContactsSection(props: CcfAgentChatContactsSectionProps): JSX.Element;
export {};
