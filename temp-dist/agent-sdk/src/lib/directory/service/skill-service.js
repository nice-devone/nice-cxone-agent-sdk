import { __awaiter } from "tslib";
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, CXoneRoutingQueueArray, SkillDeliveryParametersYupSchema, SkillDeliveryCPAManagementYupSchema as SkillCPAManagementYupSchema } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService, HttpClient, UrlUtilsService, ApiUriConstants, ValidationUtils, dbInstance, IndexDBKeyNames, IndexDBStoreNames } from '@nice-devone/core-sdk';
import { SkillApiParser } from '../util/skill-api-parser';
/**
 * Class to perform get skills
 */
export class SkillService {
    /**
       * Create instance of CXoneAuth
       * ```
       * @example
       * const skillService = new SkillService();
       * ```
       */
    constructor() {
        this.logger = new Logger('SDK', 'SkillService');
        this.utilService = new HttpUtilService();
        this.apiParser = new SkillApiParser();
        this.urlUtilsService = new UrlUtilsService();
        this.validationUtils = new ValidationUtils();
        this.GET_SKILL_NAME_BY_ROUTING_ID = '/dfo/3.0/routing-queues?size=500';
        this.GET_SKILLS_URI = '/acd-skills/v1/skills';
        this.auth = CXoneAuth.instance;
        SkillService.cachedAgentSkills = [];
    }
    /**
       * Method to return agent skills
       * @param agentId - Pass the Agent Id
       * @returns - return the agent skills details
       * ```
       * @example
       * getAgentSkills('4712')
       * ```
       */
    getAgentSkills(agentId) {
        const requiredAttributes = [
            'skillId', 'skillName', 'isOutbound', 'isDialer', 'isNaturalCalling',
            'outboundStrategy', 'priorityBlending', 'mediaTypeId', 'isRestricted',
            'isActive', 'useDisposition', 'useACW', 'useSecondaryDispositions',
            'requireDisposition', 'isNaturalCallingRunning'
        ];
        const requestParams = {
            fields: requiredAttributes.join(','),
            isSkillActive: true,
        };
        return new Promise((resolve, reject) => {
            const token = this.auth.getAuthToken();
            const user = CXoneUser.instance.getUserInfo();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const cxOneConfig = this.auth.getCXoneConfig();
            agentId = agentId ? agentId : user.icAgentId;
            let skillUrl = cxOneConfig.acdApiBaseUri + ApiUriConstants.GET_AGENT_SKILLS_URI.replace('{agentId}', agentId);
            skillUrl = this.urlUtilsService.appendQueryString(skillUrl, requestParams);
            if (this.validationUtils.isNotNullOrEmpty(agentId)) {
                HttpClient.get(skillUrl, reqInit).then((resp) => {
                    this.logger.info('getAgentSkills', 'Get Agent skills Success');
                    const skills = this.apiParser.parseAgentSkills(resp);
                    resolve(skills);
                    SkillService.cachedAgentSkills = skills;
                }, (err) => {
                    this.logger.error('getAgentSkills', 'Get Agent skills Failed ' + err.toString());
                    reject(err);
                });
            }
            else {
                this.logger.error('getAgentSkills', 'agentId is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'agentId is empty'));
            }
        });
    }
    /**
       * Method to return cached agent skills
       * @returns - return the cached agent skills details
       * @param agentId - nullable Agent Id
       * ```
       * @example
       * getCachedAgentSkills('1001') || getCachedAgentSkills()
       * ```
       */
    getCachedAgentSkills(agentId) {
        return SkillService.cachedAgentSkills.length > 0 ? SkillService.cachedAgentSkills : this.getAgentSkills(agentId);
    }
    /**
       * Used to get the skill details based on the skill id
       * @param skillId - skill id to fetch the skill details
       * @param fetchFromIndexedDB - fetch data from IndexedDB or not
       * @example -
       * ```
       * this.skillService.getSkillById("123456", false);
       * ```
       */
    getSkillById(skillId, fetchFromIndexedDB) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fetchFromIndexedDB) {
                const skillList = yield this.getAllSkillsList();
                return skillList === null || skillList === void 0 ? void 0 : skillList.find(skill => skill.skillId === parseInt(skillId));
            }
            else {
                return new Promise((resolve, reject) => {
                    if (!skillId || skillId === '0') {
                        reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'skillId is empty'));
                        return;
                    }
                    else {
                        const token = this.auth.getAuthToken();
                        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
                        const cxOneConfig = this.auth.getCXoneConfig();
                        const url = cxOneConfig.apiFacadeBaseUri + ApiUriConstants.GET_SKILL_WITH_ID_URI.replace('{skillId}', skillId);
                        HttpClient.get(url, reqInit).then((response) => {
                            const skillDetail = this.apiParser.parseSkillDetails(response);
                            this.logger.info('getSkillById', 'skill details using skill id' + skillDetail);
                            resolve(skillDetail);
                        }, (error) => {
                            this.logger.error('getSkillById', 'Error while getting skill details using skill ID' + error.toString());
                            reject(error);
                        });
                    }
                });
            }
        });
    }
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
    getAllSkillsList(mediaTypeId, startIndex, recordsToLoad, searchText, forceFetch) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const allSkillsFromIndexedDB = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.ALL_SKILLS));
            if (allSkillsFromIndexedDB && !forceFetch)
                return allSkillsFromIndexedDB;
            const requiredAttributes = [
                'skillId', 'skillName', 'mediaTypeId', 'mediaTypeName', 'isActive', 'isOutbound', 'agentResponseEnabled',
                'agentFirstResponseTime', 'agentFollowOnResponseTime', 'customerResponseEnabled', 'customerIdleTime', 'timeExtensionEnabled', 'requireDisposition', 'workItemQueueType'
            ];
            const requestParams = Object.assign(Object.assign({ fields: requiredAttributes.join(','), isActive: true, orderby: 'skillName', searchString: searchText ? searchText : '' }, ((startIndex && recordsToLoad) && { skip: startIndex, top: recordsToLoad })), (mediaTypeId && { mediaTypeId: mediaTypeId }));
            return new Promise((resolve, reject) => {
                const token = this.auth.getAuthToken();
                const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
                const cxOneConfig = this.auth.getCXoneConfig();
                let skillUrl = cxOneConfig.apiFacadeBaseUri + this.GET_SKILLS_URI;
                skillUrl = this.urlUtilsService.appendQueryString(skillUrl, requestParams);
                HttpClient.get(skillUrl, reqInit).then((resp) => __awaiter(this, void 0, void 0, function* () {
                    this.logger.info('getAllSkillsList', 'Get Agent skills Success');
                    const skills = this.apiParser.parseAllSkillsList(resp);
                    yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, skills, IndexDBKeyNames.ALL_SKILLS));
                    resolve(skills);
                }), (err) => {
                    this.logger.error('getAllSkillsList', 'Get Agent skills Failed ' + err.toString());
                    reject(err);
                });
            });
        });
    }
    /**
     * Method to get Skill Name from Routing Queue
     * @returns - API Response has routing queue information.
     * @example -
     */
    getRoutingQueueNames() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.GET_SKILL_NAME_BY_ROUTING_ID;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const resp = response.data;
                const db = yield dbInstance();
                this.logger.info('Routing Queue Details Response', 'Routing Queue Details Response Success - Number Of Routing Queue Found ->' + ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.length));
                const parsedResponseData = CXoneRoutingQueueArray.validateSync(resp.data, { stripUnknown: true });
                const routingQueue = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.ROUTING_QUEUE));
                if (!routingQueue) {
                    db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIGITAL, parsedResponseData, IndexDBKeyNames.ROUTING_QUEUE);
                }
                resolve(parsedResponseData);
            }), (err) => {
                this.logger.error('Routing Queue Details Response', 'Routing Queue Details Response Failed' + JSON.stringify(err));
                reject(err);
            });
        });
    }
    /**
       * Get the delivery preferences parameters on the skill
       * @param skillId - skill id
       * @example -
       * ```
       * this.skillService.getSkillDeliveryPreferencesById(123456);
       * ```
       */
    getSkillDeliveryParametersById(skillId) {
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        const cxOneConfig = this.auth.getCXoneConfig();
        const url = cxOneConfig.acdApiBaseUri + ApiUriConstants.GET_SKILL_DELIVERY_PREFERENCES.replace('{skillId}', skillId.toString());
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const SkillDeliveryPreferences = SkillDeliveryParametersYupSchema.cast(response.data);
                resolve(SkillDeliveryPreferences);
            }, (error) => {
                reject(error);
            });
        });
    }
    /**
       * Get the CPA management parameters on the skill
       * @param skillId - skill id
       * @example -
       * ```
       * this.skillService.getSkillCPAManagementParametersById(123456);
       * ```
       */
    getSkillCPAManagementParametersById(skillId) {
        const token = this.auth.getAuthToken();
        const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
        const cxOneConfig = this.auth.getCXoneConfig();
        const url = cxOneConfig.acdApiBaseUri + ApiUriConstants.GET_SKILL_CPA_MANAGEMENT_PARAMETERS.replace('{skillId}', skillId.toString());
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const skillCPAManagementParameters = SkillCPAManagementYupSchema.cast(response.data);
                resolve(skillCPAManagementParameters);
            }, (error) => {
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=skill-service.js.map