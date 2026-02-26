import { __awaiter } from "tslib";
import { CcfMessageType, CxaExtensionAdapter } from '@nice-devone/shared-apps-lib';
import { CcfLogger, CXoneClient } from '@nice-devone/agent-sdk';
import { MediaTypeId } from '@nice-devone/common-sdk';
import { LocalStorageHelper } from '@nice-devone/core-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
export const AGENT_SKILL_DETAILS_KEY = 'agentSkillDetails';
export const GET_AGENT_SKILLS = 'agentSkillDetails/getAgentSkills';
export const START_ACTIVITY_POLLING = 'agentSkillDetails/startActivityPolling';
export const STOP_ACTIVITY_POLLING = 'agentSkillDetails/stopActivityPolling';
export const START_AGENT_QUEUE_POLLING = 'agentSkillDetails/startAgentQueuePolling';
export const GET_SKILL_DELIVERY_PREFERENCES = 'agentSkillDetails/getSkillDeliveryPreferences';
export const GET_SKILL_CPA_MANAGEMENT_PARAMETERS = 'agentSkillDetails/getSkillCPAManagementParameters';
const logger = new CcfLogger('AgentSkillDetailsSlice');
const cxoneClient = CXoneClient.instance;
export const agentSkillDetailsInitialState = {
    agentSkills: [],
    isOutboundSkillAssigned: false,
    phoneCallOBSkillsAssigned: [],
    agentSkillsAndQueueDetails: {},
    extendedSkillDetails: {},
    digitalOBSkills: [],
};
/**
 * getAgentSkills asyncthunk used to get skills assigned to agent from sdk
 * @example - dispatch(getAgentSkills())
 */
export const getAgentSkills = createAsyncThunk(GET_AGENT_SKILLS, (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    return cxoneClient.directory.skillService
        .getAgentSkills()
        .then((skills) => {
        skills.forEach(skill => {
            if (skill.isOutbound && skill.isNaturalCallingRunning) {
                thunkAPI.dispatch(getSkillDeliveryPreferencesById(skill.skillId));
                thunkAPI.dispatch(getSkillCPAParametersById(skill.skillId));
            }
        });
        let multiSkill = false;
        const outboundSkills = skills.filter((skill) => {
            return skill.isOutbound;
        });
        if (outboundSkills && outboundSkills.length > 1) {
            multiSkill = true;
        }
        ;
        thunkAPI.dispatch(agentDirectoryActions.updateAgentMultiSkillFlag(multiSkill));
        return skills;
    })
        .catch((err) => {
        logger.error('getAgentSkills', JSON.stringify(err));
        return [];
    });
}));
/**
 * Function to start agentQueuePolling
 * @example - dispatch(startAgentQueuePolling())
 */
export const startAgentQueuePolling = createAsyncThunk(START_AGENT_QUEUE_POLLING, (agentId) => {
    cxoneClient.skillActivityQueue.startAgentQueuesPolling(agentId);
});
/**
 * Used to start the Agent Skill Activity polling
 * @example - startAgentSkillActivityPolling();
 */
export const startAgentSkillActivityPolling = createAsyncThunk(START_ACTIVITY_POLLING, (data) => {
    const skillActivityPollingRequest = {
        offset: data.offset,
        limit: data.limit,
        searchText: data.searchText,
        isOutbound: false,
    };
    cxoneClient.skillActivityQueue.startSkillActivityPolling(skillActivityPollingRequest);
    return data;
});
/**
 * Used to stop the Agent Skill Activity polling
 * @example - stopAgentSkillActivityPolling();
 */
export const stopAgentSkillActivityPolling = createAsyncThunk(STOP_ACTIVITY_POLLING, () => {
    cxoneClient.skillActivityQueue.terminateSkillActivityPolling();
});
/**
 * getSkillDeliveryPreferences asyncthunk used to get skill delivery preferences
 * @example - dispatch(getSkillDeliveryPreferencesById(skillId))
 */
export const getSkillDeliveryPreferencesById = createAsyncThunk(GET_SKILL_DELIVERY_PREFERENCES, (skillId) => __awaiter(void 0, void 0, void 0, function* () {
    const skillDeliveryParameters = yield CXoneClient.instance.directory.skillService
        .getSkillDeliveryParametersById(skillId);
    return { skillId: skillId, deliveryParameters: skillDeliveryParameters };
}));
/**
 * getSkillDeliveryPreferences asyncthunk used to get skill delivery preferences
 * @example - dispatch(getSkillDeliveryPreferencesById(skillId))
 */
export const getSkillCPAParametersById = createAsyncThunk(GET_SKILL_CPA_MANAGEMENT_PARAMETERS, (skillId) => __awaiter(void 0, void 0, void 0, function* () {
    const skillCPAManagementParameters = yield CXoneClient.instance.directory.skillService
        .getSkillCPAManagementParametersById(skillId);
    return { skillId: skillId, skillCPAManagementParameters: skillCPAManagementParameters };
}));
export const agentSkillDetailsSlice = createSlice({
    name: AGENT_SKILL_DETAILS_KEY,
    initialState: agentSkillDetailsInitialState,
    reducers: {
        /**
         * Function to set agent skills
         * @param state - agentSkills
         * @param action  - PayloadAction<string>
         * @returns It returns updated agent skills
         * @example -setAgentSkills('')
         */
        setAgentSkills(state, action) {
            const phoneCallOBSkillsAssigned = [];
            const agentSkillsAndQueueDetails = {};
            const digitalOBSkillsAssigned = [];
            if (Array.isArray(action.payload)) {
                for (const skill of action.payload) {
                    if ((skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.PhoneCall ||
                        (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.WorkItem ||
                        (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.VoiceEmail ||
                        (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.Digital) {
                        if ((skill === null || skill === void 0 ? void 0 : skill.isOutbound) && (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.PhoneCall && (skill === null || skill === void 0 ? void 0 : skill.strategy) === 'Manual') {
                            phoneCallOBSkillsAssigned.push({
                                skillId: skill === null || skill === void 0 ? void 0 : skill.skillId,
                                skillName: skill === null || skill === void 0 ? void 0 : skill.skillName,
                            });
                        }
                        else if ((skill === null || skill === void 0 ? void 0 : skill.isOutbound) &&
                            (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.Digital &&
                            (skill === null || skill === void 0 ? void 0 : skill.strategy) === 'Manual' &&
                            (skill === null || skill === void 0 ? void 0 : skill.digitalPOC) &&
                            (skill === null || skill === void 0 ? void 0 : skill.digitalPOCName)) {
                            digitalOBSkillsAssigned.push({
                                skillId: skill === null || skill === void 0 ? void 0 : skill.skillId,
                                skillName: skill === null || skill === void 0 ? void 0 : skill.skillName,
                                digitalPOC: skill === null || skill === void 0 ? void 0 : skill.digitalPOC,
                                digitalPOCName: skill === null || skill === void 0 ? void 0 : skill.digitalPOCName,
                            });
                        }
                        else {
                            agentSkillsAndQueueDetails[skill === null || skill === void 0 ? void 0 : skill.skillId] = {
                                skillId: skill === null || skill === void 0 ? void 0 : skill.skillId,
                                skillName: skill === null || skill === void 0 ? void 0 : skill.skillName,
                                queueCount: 0,
                                longestQueueTimeInSeconds: 0,
                                agentsAvailable: 0,
                                agentsUnavailable: 0,
                                agentsWorking: 0,
                                mediaType: skill === null || skill === void 0 ? void 0 : skill.typeId,
                            };
                        }
                    }
                }
            }
            return Object.assign(Object.assign({}, state), { agentSkills: action.payload, isOutboundSkillAssigned: Boolean(phoneCallOBSkillsAssigned.length), agentSkillsAndQueueDetails: agentSkillsAndQueueDetails, phoneCallOBSkillsAssigned, digitalOBSkills: digitalOBSkillsAssigned });
        },
        /**
         * Function to set agents assigned to skills in state
         * @param state - agentSkills
         * @param action  - PayloadAction<any>
         * @returns It returns current status of agent
         * @example - setAgentsAssignedToSkill(state,action)
         */
        setAgentsAssignedToSkill(state, action) {
            const allAgentSkills = action.payload.skillActivityData;
            let agentSkillsAndQueueDetails = Object.assign({}, state.agentSkillsAndQueueDetails);
            state.agentSkills.forEach((item) => {
                const agentSkillDetails = allAgentSkills && allAgentSkills.find((skill) => item.skillId === skill.skillId);
                if (agentSkillDetails) {
                    if (item.skillId in agentSkillsAndQueueDetails) {
                        const agentsData = Object.assign(Object.assign({}, agentSkillsAndQueueDetails[item.skillId]), { agentsAvailable: agentSkillDetails.agentsAvailable, agentsUnavailable: agentSkillDetails.agentsUnavailable, agentsWorking: agentSkillDetails.agentsWorking });
                        agentSkillsAndQueueDetails = Object.assign(Object.assign({}, agentSkillsAndQueueDetails), { [item.skillId]: agentsData });
                    }
                }
            });
            return Object.assign(Object.assign({}, state), { agentSkillsAndQueueDetails: agentSkillsAndQueueDetails });
        },
        /**
         * Function to set contact information in queue
         * @param state - QueueCounterState
         * @param action  -
         * @returns It returns
         * @example - setQueueAndSkillDetails()
         */
        setQueueAndSkillDetails(state, action) {
            const latestQueueInfo = action.payload;
            let agentSkillsAndQueueDetails = Object.assign({}, state.agentSkillsAndQueueDetails);
            let agentQueueDetails = {};
            const agentSkills = [...state.agentSkills];
            agentSkills === null || agentSkills === void 0 ? void 0 : agentSkills.forEach((item) => {
                switch (item.typeId) {
                    case MediaTypeId.PhoneCall:
                    case MediaTypeId.WorkItem:
                    case MediaTypeId.VoiceEmail:
                    case MediaTypeId.Digital:
                        if (!item.isOutbound) {
                            if (item.skillId in latestQueueInfo) {
                                agentQueueDetails = latestQueueInfo[item.skillId];
                                if (item.skillId in agentSkillsAndQueueDetails) {
                                    const queueData = Object.assign(Object.assign({}, agentSkillsAndQueueDetails[item.skillId]), { queueCount: agentQueueDetails.queueCount, longestQueueTimeInSeconds: +agentQueueDetails.longestQueueTimeInSeconds });
                                    agentSkillsAndQueueDetails = Object.assign(Object.assign({}, agentSkillsAndQueueDetails), { [item.skillId]: queueData });
                                }
                            }
                            else {
                                if (item.skillId in agentSkillsAndQueueDetails) {
                                    const queueData = Object.assign(Object.assign({}, agentSkillsAndQueueDetails[item.skillId]), { queueCount: 0, longestQueueTimeInSeconds: 0 });
                                    agentSkillsAndQueueDetails = Object.assign(Object.assign({}, agentSkillsAndQueueDetails), { [item.skillId]: queueData });
                                }
                            }
                        }
                        break;
                }
            });
            return Object.assign(Object.assign({}, state), { agentSkillsAndQueueDetails: agentSkillsAndQueueDetails });
        },
        /**
         * Function to return default state for middleware
         * @param state - AgentSettings
         * @returns It returns default state
         * @example -getDefaultState()
         */
        getDefaultState(state) {
            return Object.assign({}, state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAgentSkills.fulfilled, (state, action) => {
            const PHONE_CALL_OB_SKILLS = 'phone_call_ob_skills';
            const phoneCallOBSkillsAssigned = [];
            const agentSkillsAndQueueDetails = {};
            const digitalOBSkillsAssigned = [];
            if (Array.isArray(action.payload)) {
                for (const skill of action.payload) {
                    if ((skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.PhoneCall ||
                        (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.WorkItem ||
                        (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.VoiceEmail ||
                        (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.Digital) {
                        if ((skill === null || skill === void 0 ? void 0 : skill.isOutbound) && (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.PhoneCall && (skill === null || skill === void 0 ? void 0 : skill.strategy) === 'Manual') {
                            phoneCallOBSkillsAssigned.push({
                                skillId: skill === null || skill === void 0 ? void 0 : skill.skillId,
                                skillName: skill === null || skill === void 0 ? void 0 : skill.skillName,
                            });
                        }
                        else if ((skill === null || skill === void 0 ? void 0 : skill.isOutbound) &&
                            (skill === null || skill === void 0 ? void 0 : skill.typeId) === MediaTypeId.Digital &&
                            (skill === null || skill === void 0 ? void 0 : skill.strategy) === 'Manual' &&
                            (skill === null || skill === void 0 ? void 0 : skill.digitalPOC) &&
                            (skill === null || skill === void 0 ? void 0 : skill.digitalPOCName)) {
                            digitalOBSkillsAssigned.push({
                                skillId: skill === null || skill === void 0 ? void 0 : skill.skillId,
                                skillName: skill === null || skill === void 0 ? void 0 : skill.skillName,
                                digitalPOC: skill === null || skill === void 0 ? void 0 : skill.digitalPOC,
                                digitalPOCName: skill === null || skill === void 0 ? void 0 : skill.digitalPOCName,
                            });
                        }
                        else {
                            agentSkillsAndQueueDetails[skill === null || skill === void 0 ? void 0 : skill.skillId] = {
                                skillId: skill === null || skill === void 0 ? void 0 : skill.skillId,
                                skillName: skill === null || skill === void 0 ? void 0 : skill.skillName,
                                queueCount: 0,
                                longestQueueTimeInSeconds: 0,
                                agentsAvailable: 0,
                                agentsUnavailable: 0,
                                agentsWorking: 0,
                                mediaType: skill === null || skill === void 0 ? void 0 : skill.typeId,
                            };
                        }
                    }
                }
            }
            if (phoneCallOBSkillsAssigned.length > 0) {
                CxaExtensionAdapter.instance.sendMessageToExtension({
                    type: CcfMessageType.SetObSkillsAvailable,
                    data: { obSkillsAssigned: true },
                });
            }
            else {
                CxaExtensionAdapter.instance.sendMessageToExtension({
                    type: CcfMessageType.SetObSkillsAvailable,
                    data: { obSkillsAssigned: false },
                });
            }
            LocalStorageHelper.setItem(PHONE_CALL_OB_SKILLS, phoneCallOBSkillsAssigned);
            return Object.assign(Object.assign({}, state), { agentSkills: action.payload, isOutboundSkillAssigned: Boolean(phoneCallOBSkillsAssigned.length), agentSkillsAndQueueDetails: agentSkillsAndQueueDetails, phoneCallOBSkillsAssigned, digitalOBSkills: digitalOBSkillsAssigned });
        })
            .addCase(getSkillDeliveryPreferencesById.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { extendedSkillDetails: Object.assign(Object.assign({}, state.extendedSkillDetails), { [action.payload.skillId]: Object.assign(Object.assign({}, state.extendedSkillDetails[action.payload.skillId]), { deliveryParameters: action.payload.deliveryParameters }) }) });
        })
            .addCase(getSkillCPAParametersById.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { extendedSkillDetails: Object.assign(Object.assign({}, state.extendedSkillDetails), { [action.payload.skillId]: Object.assign(Object.assign({}, state.extendedSkillDetails[action.payload.skillId]), { skillCPAManagementParameters: action.payload.skillCPAManagementParameters }) }) });
        });
    },
});
export const agentSkillDetailsReducer = agentSkillDetailsSlice.reducer;
export const agentSkillDetailsActions = agentSkillDetailsSlice.actions;
/**
 * Function to get skill details of agent
 * @param rootState - AgentSkillDetails
 * @returns It returns agent skill details
 * @example - const agentSkillDetails = getSkillDetailsState(rootState)
 */
export const getSkillDetailsState = (rootState) => {
    return rootState[AGENT_SKILL_DETAILS_KEY];
};
/**
 * @param rootState - AgentSkillDetails
 * @returns - PhoneCallOBSkillsAssigned
 * @example - getPhoneCallOBSkillsAssigned
 */
export const getPhoneCallOBSkillsAssigned = (rootState) => {
    var _a;
    return (_a = rootState[AGENT_SKILL_DETAILS_KEY]) === null || _a === void 0 ? void 0 : _a.phoneCallOBSkillsAssigned;
};
/**
 * @param rootState - AgentSkillDetails
 * @returns - digitalOBSkills
 * @example - getDigitalOBSkills
 */
export const getDigitalOBSkills = (rootState) => {
    var _a;
    return (_a = rootState[AGENT_SKILL_DETAILS_KEY]) === null || _a === void 0 ? void 0 : _a.digitalOBSkills;
};
/**
 * Function to get skills of agent
 * @param rootState - AgentSkill
 * @returns It returns agent skills
 * @example - const agentSkill = getAgentSkill(rootState)
 */
export const userSkillsSelector = createSelector(getSkillDetailsState, (state) => {
    var _a, _b;
    return (_b = (_a = state === null || state === void 0 ? void 0 : state.agentSkills) === null || _a === void 0 ? void 0 : _a.slice()) === null || _b === void 0 ? void 0 : _b.sort((a, b) => {
        if (a.skillName.toUpperCase() > b.skillName.toUpperCase()) {
            return 1;
        }
        else {
            return -1;
        }
    });
});
export const isOutboundSkillSelector = createSelector(getSkillDetailsState, (state) => state.isOutboundSkillAssigned);
export const phoneOBSkillsSelector = createSelector(getPhoneCallOBSkillsAssigned, (state) => {
    const phoneCallOBSkills = state && [...state];
    phoneCallOBSkills === null || phoneCallOBSkills === void 0 ? void 0 : phoneCallOBSkills.sort((a, b) => {
        return a.skillName.localeCompare(b.skillName);
    });
    return phoneCallOBSkills;
});
export const digitalOBSkillsSelector = createSelector(getDigitalOBSkills, (state) => {
    const digitalOBSkills = state ? [...state] : [];
    digitalOBSkills.sort((a, b) => {
        return a.skillName.localeCompare(b.skillName);
    });
    return digitalOBSkills;
});
export const getAgentSkillsAndQueueDetails = createSelector(getSkillDetailsState, (state) => {
    const skillAndQueueDetails = state.agentSkillsAndQueueDetails && Object.values(state.agentSkillsAndQueueDetails);
    skillAndQueueDetails.sort((a, b) => {
        return a.skillName.localeCompare(b.skillName);
    });
    return skillAndQueueDetails;
});
export const getCountOfAllSkillFromPhoneQueue = createSelector(getSkillDetailsState, (state) => {
    return Object.values(state.agentSkillsAndQueueDetails).length;
});
export const getCountOfAllContactsFromPhoneQueue = createSelector(getSkillDetailsState, (state) => {
    let totalContactsCount = 0;
    const queueRes = state.agentSkillsAndQueueDetails;
    for (const queue in queueRes) {
        totalContactsCount += queueRes[queue].queueCount;
    }
    return totalContactsCount;
});
export const getAllSkillDetails = createSelector(getSkillDetailsState, (state) => {
    const skillQueue = {
        longestPhoneWait: 0,
        longestWorkItemWait: 0,
        longestVoiceMailWait: 0,
        longestDigitalWait: 0,
        totalPhoneContacts: 0,
        totalWorkItemContacts: 0,
        totalVoiceMailContacts: 0,
        totalDigitalContacts: 0,
        totalAllContacts: 0,
    };
    Object.values(state.agentSkillsAndQueueDetails).forEach((skill) => {
        if (skill.mediaType === MediaTypeId.PhoneCall) {
            skillQueue.totalPhoneContacts = skill.queueCount + skillQueue.totalPhoneContacts;
            skillQueue.longestPhoneWait = +skill.longestQueueTimeInSeconds > skillQueue.longestPhoneWait ? +skill.longestQueueTimeInSeconds : skillQueue.longestPhoneWait;
        }
        else if (skill.mediaType === MediaTypeId.WorkItem) {
            skillQueue.totalWorkItemContacts = skill.queueCount + skillQueue.totalWorkItemContacts;
            skillQueue.longestWorkItemWait = +skill.longestQueueTimeInSeconds > skillQueue.longestWorkItemWait ? +skill.longestQueueTimeInSeconds : skillQueue.longestWorkItemWait;
        }
        else if (skill.mediaType === MediaTypeId.VoiceEmail) {
            skillQueue.totalVoiceMailContacts = skill.queueCount + skillQueue.totalVoiceMailContacts;
            skillQueue.longestVoiceMailWait = +skill.longestQueueTimeInSeconds > skillQueue.longestVoiceMailWait ? +skill.longestQueueTimeInSeconds : skillQueue.longestVoiceMailWait;
        }
        else if (skill.mediaType === MediaTypeId.Digital) {
            skillQueue.totalDigitalContacts = skill.queueCount + skillQueue.totalDigitalContacts;
            skillQueue.longestDigitalWait = +skill.longestQueueTimeInSeconds > skillQueue.longestDigitalWait ? +skill.longestQueueTimeInSeconds : skillQueue.longestDigitalWait;
        }
    });
    skillQueue.totalAllContacts = skillQueue.totalPhoneContacts + skillQueue.totalWorkItemContacts + skillQueue.totalVoiceMailContacts + skillQueue.totalDigitalContacts;
    return skillQueue;
});
export const getLongestWaitForPhoneQueue = createSelector(getSkillDetailsState, (state) => {
    let longestWait = 0;
    const queueRes = state.agentSkillsAndQueueDetails;
    for (const queue in queueRes) {
        longestWait = +queueRes[queue].longestQueueTimeInSeconds > longestWait ? +queueRes[queue].longestQueueTimeInSeconds : longestWait;
    }
    return longestWait;
});
/**
 * Gets skill details
 * @param skillId - skill Id
 * @example - Example
 * ```
 * let extendedSkillDetails = useSelector(extendedSkillDetailsById(skillId));
 * ```
 */
export const extendedSkillDetailsById = (skillId) => createSelector(getSkillDetailsState, (state) => {
    if (skillId)
        return state === null || state === void 0 ? void 0 : state.extendedSkillDetails[skillId];
    return { deliveryParameters: {}, skillCPAManagementParameters: {} };
});
//# sourceMappingURL=ccf-agent-skill-details-slice.js.map