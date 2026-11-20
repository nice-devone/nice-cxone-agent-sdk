import { CXoneSdkError, Team } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
import { TeamsAgentRequest } from '../../acd/model/teams-agent-request';
/**
 * Class to perform get agents by team id
 */
export declare class TeamService {
    private static readonly TEAM_FETCH_MAX_ATTEMPTS;
    private static readonly TEAM_FETCH_RETRY_DELAYS_MS;
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    private validationUtils;
    private apiParser;
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
    /**
       * Used to fetch teams. Retries up to `TEAM_FETCH_MAX_ATTEMPTS` times on failure before
       * throwing the last error.
       * @param skip - number of records to skip (0-based)
       * @param top - page size
       * @param updatedSince - ISO date string; the caller always passes EPOCH since teams never poll
       * @param searchString - optional search string
       * @example -
       * ```
       * this.TeamService.getTeams(0, 25, new Date(0).toISOString(), 'ank');
       * ```
       */
    getTeams(skip: number, top: number, updatedSince: string, searchString?: string): Promise<{
        data: Team[];
        totalRecords: number;
    }>;
    /**
     * Resolves after `ms` milliseconds — used to space out getTeams' retry attempts.
     * @param ms - delay in milliseconds
     * @example -
     * ```
     * await this.delay(500);
     * ```
     */
    private delay;
}
