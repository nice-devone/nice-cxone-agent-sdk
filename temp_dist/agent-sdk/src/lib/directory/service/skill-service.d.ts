import { AgentSkill, Skills, CXoneRoutingQueue, SkillDeliveryParameters, SkillCPAManagementParameters } from '@nice-devone/common-sdk';
import { SkillAgentRequest, SkillAgentsApiResponse } from '../interface/skill-agent-assignment';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
 * Class to perform get skills
 */
export declare class SkillService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    private apiParser;
    private urlUtilsService;
    private validationUtils;
    private GET_SKILL_NAME_BY_ROUTING_ID;
    private GET_SKILLS_URI;
    private GET_SKILLS_URI_TS;
    private static cachedAgentSkills;
    private readonly requestManager;
    private isAbortDelayDigitalApiEnabled;
    /**
       * Create instance of CXoneAuth
       * ```
       * @example
       * const skillService = new SkillService();
       * ```
       */
    constructor();
    /**
       * Method to return agent skills
       * @param agentId - Pass the Agent Id
       * @returns - return the agent skills details
       * ```
       * @example
       * getAgentSkills('4712')
       * ```
       */
    getAgentSkills(agentId?: string): Promise<AgentSkill[]>;
    /**
       * Method to return cached agent skills
       * @returns - return the cached agent skills details
       * @param agentId - nullable Agent Id
       * ```
       * @example
       * getCachedAgentSkills('1001') || getCachedAgentSkills()
       * ```
       */
    getCachedAgentSkills(agentId?: string): AgentSkill[] | Promise<AgentSkill[]>;
    /**
       * Used to get the skill details based on the skill id
       * @param skillId - skill id to fetch the skill details
       * @param fetchFromIndexedDB - fetch data from IndexedDB or not
       * @param contactId - contact id to be used to pass it to controlled get method
       * @example -
       * ```
       * this.skillService.getSkillById("123456", false);
       * ```
       */
    getSkillById(skillId: string, fetchFromIndexedDB?: boolean, contactId?: string): Promise<Skills>;
    /**
       * Method to return agent skills
       * @param mediaTypeId - Pass the media type Id
       * @param startIndex - Pass the start index
       * @param recordsToLoad - Pass the number of records to load
       * @param searchText - Pass the text string to search
       * @param forceFetch - Used to forceful API call
       * @returns - return the agent skills details
       * ```
       * @example
       * getAllSkillsList(4,1,5,'call',false)
       * ```
       */
    getAllSkillsList(mediaTypeId?: number, startIndex?: number, recordsToLoad?: number, searchText?: string, forceFetch?: boolean): Promise<Skills[]>;
    /**
     * Method to get Skill Name from Routing Queue
     * @returns - API Response has routing queue information.
     * @example -
     */
    getRoutingQueueNames(): Promise<Array<CXoneRoutingQueue>>;
    /**
       * Get the delivery preferences parameters on the skill
       * @param skillId - skill id
       * @example -
       * ```
       * this.skillService.getSkillDeliveryPreferencesById(123456);
       * ```
       */
    getSkillDeliveryParametersById(skillId: number): Promise<SkillDeliveryParameters>;
    /**
       * Get the CPA management parameters on the skill
       * @param skillId - skill id
       * @example -
       * ```
       * this.skillService.getSkillCPAManagementParametersById(123456);
       * ```
       */
    getSkillCPAManagementParametersById(skillId: number): Promise<SkillCPAManagementParameters>;
    /**
     * Fetches agents assigned to a given skill from the CMA v16.0 skills/agents endpoint.
     * @param request - SkillAgentRequest containing skillId and optional pagination/filter params
     * @returns Parsed SkillAgentsApiResponse
     * @example
     * ```
     * skillService.getAgentsForSkill({ skillId: 1234, startIndex: 0, recordsToLoad: 25 });
     * ```
     */
    getAgentsForSkill(request: SkillAgentRequest): Promise<SkillAgentsApiResponse>;
}
