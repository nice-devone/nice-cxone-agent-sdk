export interface CcfAgentStateAvatarProps {
    agentCurrentStatus: string;
    initials: string;
}
/**
 * Component displays Avatar for intials and with agent state badge
 * @param props -CcfAgentStateAvatarProps
 * @returns Avatar component with badge for agent state
 * @example `<CcfAgentStateAvatar agentCurrentStatus={agentCurrentStatus} initials={initials} />`
 */
export declare function CcfAgentStateAvatar(props: CcfAgentStateAvatarProps): JSX.Element;
export default CcfAgentStateAvatar;
