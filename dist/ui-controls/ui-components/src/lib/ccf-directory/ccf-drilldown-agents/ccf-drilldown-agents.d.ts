import { Agent, teamDetail } from '../+state/ccf-directory.slice';
/**
 * Component to be used for directory item
 * @param props - team
 * @example <CcfDirectoryTeams />
 * @returns
 */
declare const CcfDrilldownAgents: (props: {
    isFullView: boolean;
    agentList: Agent[];
    team: teamDetail;
}) => JSX.Element;
export default CcfDrilldownAgents;
