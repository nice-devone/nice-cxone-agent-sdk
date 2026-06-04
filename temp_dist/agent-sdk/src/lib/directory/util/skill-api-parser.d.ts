import { AgentSkill, HttpResponse, Skills } from '@nice-devone/common-sdk';
import { SkillAgentsApiResponse } from '../interface/skill-agent-assignment';
/**
 * This class to parse api response
 */
export declare class SkillApiParser {
    private validationUtils;
    /**
       * Method to parse agent permissions response
       *
       * @param permissions - permissions response
       * @returns - parsed permissions
       * @example -
       * ```
       * parsePermissions(permissions)
       * ```
       */
    parseAgentSkills(response: HttpResponse): AgentSkill[];
    /**
       * Method to parse permissions response
       *
       * @param permissions - permissions response
       * @returns - parsed permissions
       * @example -
       * ```
       * parsePermissions(permissions)
       * ```
       */
    parseAllSkillsList(response: HttpResponse): Skills[];
    /**
       * Used to parse the skill details response from the api response data
       * @param response - http response object from the api
       * @example -
       * ```
       * parseSkillDetails(response);
       * ```
       */
    parseSkillDetails(response: HttpResponse): Skills;
    /**
     * Parses the raw API response from the CMA v16.0 skills/agents endpoint.
     * @param response - Raw HTTP response from the API
     * @returns Parsed SkillAgentsApiResponse with safe defaults for missing fields
     * @example
     * ```
     * parseSkillAgentsResponse(response);
     * ```
     */
    parseSkillAgentsResponse(response: HttpResponse): SkillAgentsApiResponse;
    /**
     * Splits a CMA "LastName, FirstName" agent name string into its parts.
     * @param agentName - Agent name in "LastName, FirstName" format
     * @returns Object containing `firstName` and `lastName`
     * @example
     * ```
     * parseAgentNameToParts('Smith, John'); // { lastName: 'Smith', firstName: 'John' }
     * ```
     */
    static parseAgentNameToParts(agentName: string): {
        firstName: string;
        lastName: string;
    };
}
