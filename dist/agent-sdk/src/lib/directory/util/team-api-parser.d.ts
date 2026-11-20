import { HttpResponse, Team } from '@nice-devone/common-sdk';
/**
 * This class to parse team api response
 */
export declare class TeamApiParser {
    /**
       * Method to parse the server-side paginated teams response
       * @param response - http response object from the teams api
       * @returns - parsed teams and totalRecords
       * @example -
       * ```
       * parseTeams(response)
       * ```
       */
    parseTeams(response: HttpResponse): {
        data: Team[];
        totalRecords: number;
    };
}
