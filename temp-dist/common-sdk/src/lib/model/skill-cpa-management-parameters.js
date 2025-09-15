"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillDeliveryCPAManagementYupSchema = void 0;
const yup_1 = require("yup");
exports.SkillDeliveryCPAManagementYupSchema = (0, yup_1.object)({
    abandonMessagePath: (0, yup_1.string)().required(),
    abandonMsgMode: (0, yup_1.number)().required(),
    abandonTimeout: (0, yup_1.number)().required(),
    agentNoResponseSeconds: (0, yup_1.number)().notRequired(),
    agentOverrideOptionAnsweringMachine: (0, yup_1.boolean)().required(),
    agentOverrideOptionBadNumber: (0, yup_1.boolean)().required(),
    agentOverrideOptionFax: (0, yup_1.boolean)().required(),
    agentResponseUtteranceMinimumSeconds: (0, yup_1.number)().notRequired(),
    agentVoiceThreshold: (0, yup_1.number)().notRequired(),
    ansMachineDetMode: (0, yup_1.number)().required(),
    ansMachineMsg: (0, yup_1.string)().required(),
    ansMachineOverrideSeconds: (0, yup_1.number)().required(),
    customerLiveSilenceSeconds: (0, yup_1.number)().notRequired(),
    customerVoiceThreshold: (0, yup_1.number)().notRequired(),
    enableCPALogging: (0, yup_1.boolean)().notRequired(),
    exceptions: (0, yup_1.array)().required(),
    machineEndSilenceSeconds: (0, yup_1.number)().notRequired(),
    machineEndTimeoutSeconds: (0, yup_1.number)().notRequired(),
    machineMinimumWithAgentSeconds: (0, yup_1.number)().notRequired(),
    machineMinimumWithoutAgentSeconds: (0, yup_1.number)().notRequired(),
    preConnectCPAEnabled: (0, yup_1.boolean)().required(),
    preConnectCPARecording: (0, yup_1.boolean)().notRequired(),
    treatProgressAsRinging: (0, yup_1.boolean)().required(),
    utteranceMinimumSeconds: (0, yup_1.number)().notRequired(),
}).camelCase();
//# sourceMappingURL=skill-cpa-management-parameters.js.map