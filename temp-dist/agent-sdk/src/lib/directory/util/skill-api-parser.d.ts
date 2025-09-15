import { AgentSkill, HttpResponse, Skills } from '@nice-devone/common-sdk';
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
}
