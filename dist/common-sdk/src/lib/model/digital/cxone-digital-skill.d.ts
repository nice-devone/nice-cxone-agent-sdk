import { InferType } from 'yup';
/**
 * Interface used for parsing digital skill data
 * @returns returns - digital skill information
 * @example
 * ```
 * CXoneDigitalSkill
 * ```
 */
export declare const CXoneDigitalSkillSchema: import("yup/lib/object").OptionalObjectSchema<{
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
/**
 * @remarks - Type representing a digital skill.
 */
export declare type CXoneDigitalSkill = InferType<typeof CXoneDigitalSkillSchema>;
export declare const CXoneDigitalSkillArray: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    /**
     * @remarks - The unique identifier for the skill.
     */
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The name of the skill.
     */
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) type.
     */
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    /**
     * @remarks - The digital point of contact (POC) name.
     */
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>[]>;
