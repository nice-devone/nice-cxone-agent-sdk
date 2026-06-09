"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalSkillArray = exports.CXoneDigitalSkillSchema = void 0;
const yup_1 = require("yup");
/**
 * Interface used for parsing digital skill data
 * @returns returns - digital skill information
 * @example
 * ```
 * CXoneDigitalSkill
 * ```
 */
exports.CXoneDigitalSkillSchema = (0, yup_1.object)({
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: (0, yup_1.number)().required(),
    /**
     * @remarks - The name of the skill.
     */
    skillName: (0, yup_1.string)().required(),
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: (0, yup_1.string)().required(),
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: (0, yup_1.string)().required(),
});
exports.CXoneDigitalSkillArray = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneDigitalSkillSchema.fields));
//# sourceMappingURL=cxone-digital-skill.js.map