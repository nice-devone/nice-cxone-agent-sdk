"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatedFrom = exports.InteractionType = void 0;
/**
 * Type of the interaction shown in Assignment Panel
 */
var InteractionType;
(function (InteractionType) {
    InteractionType["VOICE"] = "Voice";
    InteractionType["VOICEMAIL"] = "Voice Mail";
    InteractionType["WORKITEM"] = "Work Item";
    InteractionType["DIGITAL"] = "Digital";
    InteractionType["ELEVATED"] = "Elevated";
    InteractionType["PERSONALQUEUE"] = "PersonalQueue";
})(InteractionType = exports.InteractionType || (exports.InteractionType = {}));
/**
 * Enum for setting the type of elevation occured from
 */
var ElevatedFrom;
(function (ElevatedFrom) {
    ElevatedFrom["ACD"] = "acd";
    ElevatedFrom["DFO"] = "dfo";
    ElevatedFrom["EM"] = "em";
    ElevatedFrom["SELF"] = "self";
})(ElevatedFrom = exports.ElevatedFrom || (exports.ElevatedFrom = {}));
//# sourceMappingURL=interaction-data.js.map