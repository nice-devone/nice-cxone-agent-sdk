"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceMailPlayBackEventYup = void 0;
const yup_1 = require("yup");
exports.VoiceMailPlayBackEventYup = (0, yup_1.object)({
    contactId: (0, yup_1.string)().required(),
    playBackPaused: (0, yup_1.boolean)().required(),
    playBackPosition: (0, yup_1.number)().required(),
    type: (0, yup_1.string)().required(),
    iisHost: (0, yup_1.string)().optional(),
    vcHost: (0, yup_1.string)().optional(),
}).camelCase();
//# sourceMappingURL=voicemail-playback-event.js.map