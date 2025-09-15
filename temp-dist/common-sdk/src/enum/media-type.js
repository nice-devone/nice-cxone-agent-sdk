"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTypeId = exports.MediaType = void 0;
var MediaType;
(function (MediaType) {
    MediaType["VOICE"] = "Voice";
    MediaType["DIGITAL"] = "Digital";
    MediaType["EMAIL"] = "Email";
    MediaType["VOICEMAIL"] = "Voice Mail";
    MediaType["WORKITEM"] = "Work Item";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var MediaTypeId;
(function (MediaTypeId) {
    MediaTypeId[MediaTypeId["Email"] = 1] = "Email";
    MediaTypeId[MediaTypeId["ChatItem"] = 3] = "ChatItem";
    MediaTypeId[MediaTypeId["PhoneCall"] = 4] = "PhoneCall";
    MediaTypeId[MediaTypeId["VoiceEmail"] = 5] = "VoiceEmail";
    MediaTypeId[MediaTypeId["WorkItem"] = 6] = "WorkItem";
    MediaTypeId[MediaTypeId["Digital"] = 9] = "Digital";
})(MediaTypeId = exports.MediaTypeId || (exports.MediaTypeId = {}));
//# sourceMappingURL=media-type.js.map