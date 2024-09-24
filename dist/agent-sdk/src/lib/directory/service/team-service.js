import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, Team } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, HttpClient, ApiUriConstants, ValidationUtils, } from '@nice-devone/core-sdk';
/**
 * Class to perform get agents by team id
 */
export class TeamService {
    /**
       * Create instance of CXoneAuth
       * ```
       * @example
       * const TeamService = new TeamService();
       * ```
       */
    constructor() {
        this.logger = new Logger('SDK', 'TeamService');
        this.utilService = new HttpUtilService();
        this.validationUtils = new ValidationUtils();
        this.auth = CXoneAuth.instance;
    }
    /**
       * Used to get the agent list details based on the team id
       * @param teamId - team id to fetch the agent details
       * @example -
       * ```
       * this.TeamService.getTeamById("123456");
       * ```
       */
    getTeamById(fetchAgentByTeamIdReq) {
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        const cxOneConfig = this.auth.getCXoneConfig();
        const url = cxOneConfig.acdApiBaseUri + ApiUriConstants.GET_AGENT_WITH_TEAM_ID.replace('{teamId}', fetchAgentByTeamIdReq.teamId);
        return new Promise((resolve, reject) => {
            if (this.validationUtils.isNotNullOrEmpty(fetchAgentByTeamIdReq.teamId)) {
                HttpClient.get(url, reqInit).then((response) => {
                    const team = new Team();
                    team.parse(response.data.teams[0]);
                    this.logger.info('getByTeamId', 'agent details using team id' + team);
                    resolve(this.searchAgents(team, fetchAgentByTeamIdReq.searchText || '', fetchAgentByTeamIdReq.offset || -1, fetchAgentByTeamIdReq.limit || -1));
                }, (error) => {
                    this.logger.error('getByTeamId', 'Error while getting agent details using team ID' + error.toString());
                    reject(error);
                });
            }
            else {
                this.logger.error('getByTeamId', 'team id is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'team id is empty'));
            }
        });
    }
    /**
       * Used to get the agent list details based on the team id
       * @param response - agent list unfiltered based on team id
       * @param filterParam - pagination details
       * @example -
       * ```
       *
       * ```
       */
    searchAgents(team, searchText, offset, limit) {
        var _a, _b;
        const agentInTeamList = [];
        if (searchText.length > 0 && ((_a = team.agents) === null || _a === void 0 ? void 0 : _a.length)) {
            team.agents = team.agents.filter(list => list.firstName.toUpperCase().startsWith(searchText.toUpperCase()) || list.lastName.toUpperCase().startsWith(searchText.toUpperCase()));
        }
        for (let i = offset - 1; i < limit + offset - 1; i++) {
            // to filter the data as per the pagination offset and limit from the data set
            ((_b = team.agents) === null || _b === void 0 ? void 0 : _b.length) &&
                agentInTeamList.push(team.agents[i]);
        }
        team.agents = agentInTeamList;
        if (team.agents) {
            team.agents = team.agents.filter(item => item); // removed undefined from list if any
        }
        return team;
    }
    /**
       * Used to get team details based on team id
       * @param teamId - team id to fetch details
       * @example -
       * ```
       * this.TeamService.getTeamDetailsById("123456");
       * ```
       */
    getTeamDetailsById(teamId) {
        var _a;
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        const cxOneConfig = this.auth.getCXoneConfig();
        teamId = teamId ? teamId : (_a = CXoneUser.instance.getUserInfo().teamId) === null || _a === void 0 ? void 0 : _a.toString();
        return new Promise((resolve, reject) => {
            if (teamId) {
                const url = cxOneConfig.acdApiBaseUri + ApiUriConstants.GET_TEAM_WITH_TEAM_ID.replace('{teamId}', teamId);
                HttpClient.get(url, reqInit).then((response) => {
                    const team = new Team();
                    team.parse(response.data.teams[0]);
                    this.logger.info('getTeamByTeamId', 'team details using team id' + team);
                    resolve(team);
                }, (error) => {
                    this.logger.error('getTeamByTeamId', 'Error while getting team details using team ID' + error.toString());
                    reject(error);
                });
            }
            else {
                this.logger.error('getTeamByTeamId', 'team id is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'team id is empty'));
            }
        });
    }
}
//# sourceMappingURL=team-service.js.map