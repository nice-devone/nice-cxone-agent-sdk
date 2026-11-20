import { Team } from '@nice-devone/common-sdk';
/**
 * This class to parse team api response
 */
export class TeamApiParser {
    /**
       * Method to parse the server-side paginated teams response
       * @param response - http response object from the teams api
       * @returns - parsed teams and totalRecords
       * @example -
       * ```
       * parseTeams(response)
       * ```
       */
    parseTeams(response) {
        var _a, _b;
        const teams = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.teams;
        const teamList = [];
        if (teams && Array.isArray(teams)) {
            for (const element of teams) {
                const respObj = element;
                const team = new Team();
                team.teamId = respObj.teamId;
                team.teamName = respObj.teamName;
                team.isActive = respObj.isActive;
                team.agentCount = respObj.agentCount;
                teamList.push(team);
            }
        }
        return {
            data: teamList,
            totalRecords: typeof ((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.totalRecords) === 'number' ? response.data.totalRecords : 0,
        };
    }
}
//# sourceMappingURL=team-api-parser.js.map