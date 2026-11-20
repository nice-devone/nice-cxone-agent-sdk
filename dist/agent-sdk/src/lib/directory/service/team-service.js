import { __awaiter } from "tslib";
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, Team } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, HttpClient, ApiUriConstants, ValidationUtils, } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../../feature-toggle/feature-toggle-services';
import { TeamApiParser } from '../util/team-api-parser';
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
        this.apiParser = new TeamApiParser();
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
        const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
        const apiUri = isTenantSegmentationEnabled ? ApiUriConstants.GET_AGENT_WITH_TEAM_ID_TS : ApiUriConstants.GET_AGENT_WITH_TEAM_ID;
        const url = cxOneConfig.acdApiBaseUri + apiUri.replace('{teamId}', fetchAgentByTeamIdReq.teamId);
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
                const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
                const apiUri = isTenantSegmentationEnabled ? ApiUriConstants.GET_TEAM_WITH_TEAM_ID_TS : ApiUriConstants.GET_TEAM_WITH_TEAM_ID;
                const url = cxOneConfig.acdApiBaseUri + apiUri.replace('{teamId}', teamId);
                HttpClient.get(url, reqInit).then((response) => {
                    var _a, _b;
                    const team = new Team();
                    const teamData = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.teams) === null || _b === void 0 ? void 0 : _b[0];
                    if (teamData) {
                        team.parse(teamData);
                    }
                    else {
                        // the guard itself is right - 26.3.2 called team.parse(undefined), which threw
                        // inside this then() and left the outer promise unsettled (getTeamName's await hung
                        // forever). Resolving a default Team is the better contract, but log it: the caller only
                        // sees an empty teamName and would otherwise have nothing to diagnose from.
                        this.logger.warn('getTeamByTeamId', `no team returned for team id ${teamId}`);
                    }
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
    getTeams(skip, top, updatedSince, searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.auth.getAuthToken();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const cxOneConfig = this.auth.getCXoneConfig();
            const url = new URL(ApiUriConstants.GET_TEAMS, cxOneConfig.acdApiBaseUri);
            url.searchParams.set('fields', 'teamId,teamName,isActive,agentCount');
            url.searchParams.set('isActive', 'true');
            if (FeatureToggleService.instance.getFeatureToggleSync("release-cxa-isDirectory-teams-flag-AW-65741" /* FeatureToggles.TEAMS_IS_DIRECTORY_FLAG_TOGGLE */)) {
                url.searchParams.set('isDirectory', 'true');
            }
            url.searchParams.set('updatedSince', updatedSince);
            url.searchParams.set('orderby', 'teamName');
            url.searchParams.set('skip', String(skip));
            url.searchParams.set('top', String(top));
            if (searchString)
                url.searchParams.set('searchString', searchString);
            let lastError;
            for (let attempt = 1; attempt <= TeamService.TEAM_FETCH_MAX_ATTEMPTS; attempt++) {
                try {
                    const response = yield HttpClient.get(url.toString(), reqInit);
                    return this.apiParser.parseTeams(response);
                }
                catch (error) {
                    lastError = error;
                    this.logger.info('getTeams', `Attempt ${attempt}/${TeamService.TEAM_FETCH_MAX_ATTEMPTS} failed: ` + (error === null || error === void 0 ? void 0 : error.toString()));
                    if (attempt < TeamService.TEAM_FETCH_MAX_ATTEMPTS) {
                        yield this.delay(TeamService.TEAM_FETCH_RETRY_DELAYS_MS[attempt - 1]);
                    }
                }
            }
            throw lastError;
        });
    }
    /**
     * Resolves after `ms` milliseconds — used to space out getTeams' retry attempts.
     * @param ms - delay in milliseconds
     * @example -
     * ```
     * await this.delay(500);
     * ```
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
// max retry attemps for GET_TEAMS, immediate retry after the 1st failure, then 5s after the 2nd.
TeamService.TEAM_FETCH_MAX_ATTEMPTS = 3;
TeamService.TEAM_FETCH_RETRY_DELAYS_MS = [0, 5000];
//# sourceMappingURL=team-service.js.map