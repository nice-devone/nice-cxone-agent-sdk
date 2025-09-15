import { CXoneSdkError, Team } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
import { TeamsAgentRequest } from '../../acd/model/teams-agent-request';
/**
 * Class to perform get agents by team id
 */
export declare class TeamService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    private validationUtils;
    /**
       * Create instance of CXoneAuth
       * ```
       * @example
       * const TeamService = new TeamService();
       * ```
       */
    constructor();
    /**
       * Used to get the agent list details based on the team id
       * @param teamId - team id to fetch the agent details
       * @example -
       * ```
       * this.TeamService.getTeamById("123456");
       * ```
       */
    getTeamById(fetchAgentByTeamIdReq: TeamsAgentRequest): Promise<Team | CXoneSdkError>;
    /**
       * Used to get the agent list details based on the team id
       * @param response - agent list unfiltered based on team id
       * @param filterParam - pagination details
       * @example -
       * ```
       *
       * ```
       */
    private searchAgents;
    /**
       * Used to get team details based on team id
       * @param teamId - team id to fetch details
       * @example -
       * ```
       * this.TeamService.getTeamDetailsById("123456");
       * ```
       */
    getTeamDetailsById(teamId?: string): Promise<Team | CXoneSdkError>;
}
