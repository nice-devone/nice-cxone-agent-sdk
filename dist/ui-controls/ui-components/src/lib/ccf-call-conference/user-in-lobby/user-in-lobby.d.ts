import { AgentDetails } from '@nice-devone/common-sdk';
import { Participant } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
export interface userProps {
    user: Participant;
    dispatchSwitchUserAction: () => void;
    dispatchAddUserToConference: () => void;
    showActionButton: boolean;
    animate: boolean;
    agentDetail?: AgentDetails;
}
/**
 * Component to be used to show user in Lobby
 * @param props - userProps
 * @example - <UserInLobby />
 * @returns
 */
export declare const UserInLobby: (props: userProps) => JSX.Element;
