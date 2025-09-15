"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceMailContactEventYup = void 0;
const yup_1 = require("yup");
/**
 * Used to transform the value to null if the value is an empty string
 * @param currentValue -
 * @param originalValue -
 * @example
 */
exports.VoiceMailContactEventYup = (0, yup_1.object)({
    contactId: (0, yup_1.string)().required(),
    createdDate: (0, yup_1.date)()
        .required()
        .transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    })
        .nullable(true),
    customData: (0, yup_1.string)().optional(),
    fileDuration: (0, yup_1.number)()
        .required()
        .positive()
        .transform((currentValue, originalValue) => {
        return originalValue === '' ? 0 : currentValue;
    })
        .integer(),
    fileName: (0, yup_1.string)().required(),
    finalState: (0, yup_1.boolean)().required(),
    from: (0, yup_1.string)().optional(),
    isInbound: (0, yup_1.boolean)().required(),
    label: (0, yup_1.string)().optional(),
    lastStateChangeTime: (0, yup_1.date)().required(),
    masterID: (0, yup_1.string)().required(),
    omniGroupId: (0, yup_1.string)().optional(),
    parentContactId: (0, yup_1.string)().optional(),
    requireDisposition: (0, yup_1.boolean)().optional(),
    screenPopUrl: (0, yup_1.string)().required(),
    skill: (0, yup_1.string)().optional(),
    skillName: (0, yup_1.string)().optional(),
    startTime: (0, yup_1.date)().required(),
    status: (0, yup_1.string)().required(),
    to: (0, yup_1.string)().optional(),
    type: (0, yup_1.string)().optional(),
    voiceMailType: (0, yup_1.string)().optional(),
}).camelCase();
//# sourceMappingURL=voicemail-contact-event.js.map