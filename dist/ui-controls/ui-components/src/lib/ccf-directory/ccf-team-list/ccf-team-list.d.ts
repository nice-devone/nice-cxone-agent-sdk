import { Team } from '@nice-devone/common-sdk';
/**
 * Component to be used for directory item
 * @param props - team
 * @example <CcfDirectoryTeams />
 * @returns
 */
declare const CcfDirectoryTeams: (props: {
    team: Team;
    getTeamIdFromTeams: any;
    setOffsetIndexForAgent: (offset: number) => void;
}) => JSX.Element;
export default CcfDirectoryTeams;
