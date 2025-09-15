import { __awaiter } from "tslib";
import { clearIndexDbStore, dbInstance, IndexDBKeyNames, IndexDBStoreNames } from '@nice-devone/core-sdk';
import { MediaType, MediaTypeId } from '@nice-devone/common-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
/**
 * Class to manage agent contact history
 */
export class CXoneAgentContactHistory {
    /**
     * Method to get acd contact history data from index db
     * @returns - acdContactHistoryData
     * @example - getACDContactHistoryData()
     *
     */
    getACDContactHistoryData() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const acdContactHistoryData = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.CONTACT_HISTORY, IndexDBKeyNames.ACD_CONTACT_HISTORY)));
            return acdContactHistoryData || {};
        });
    }
    /**
     * Method to create and return contact history object
     * @param acdContactDetails - voice call, voicemail or workitem details
     * @param mediaType - media type of the contact
     * @param icAgentId - agent id
     * @returns - contact history object
     * @example - createContactHistoryObject(contactHistoryIndexDBArgs)
     *
     */
    createContactHistoryObject(args) {
        var _a, _b;
        const { acdContactDetails, mediaType, icAgentId, dispositionData } = args;
        let isOutbound, mediaTypeId, contactTime, totalDurationSeconds, fromAddr = '', toAddr = '';
        switch (mediaType) {
            case MediaType.VOICE: {
                isOutbound = !acdContactDetails.isInbound;
                mediaTypeId = MediaTypeId.PhoneCall.toString();
                contactTime = acdContactDetails.startTime;
                totalDurationSeconds = (acdContactDetails.lastStateChangeTime.getTime() - contactTime.getTime()) / 1000;
                fromAddr = acdContactDetails.ani;
                toAddr = acdContactDetails.dnis;
                break;
            }
            case MediaType.VOICEMAIL: {
                isOutbound = !acdContactDetails.voiceMailEventData.isInbound;
                mediaTypeId = MediaTypeId.VoiceEmail.toString();
                contactTime = acdContactDetails.voiceMailEventData.startTime;
                totalDurationSeconds = (acdContactDetails.voiceMailEventData.lastStateChangeTime.getTime() - contactTime.getTime()) / 1000;
                fromAddr = acdContactDetails.voiceMailEventData.from;
                toAddr = acdContactDetails.voiceMailEventData.to;
                break;
            }
            case MediaType.WORKITEM: {
                isOutbound = false;
                mediaTypeId = MediaTypeId.WorkItem.toString();
                contactTime = acdContactDetails.workItemEventData.startTime;
                totalDurationSeconds = (acdContactDetails.workItemEventData.lastStateChangeTime.getTime() - contactTime.getTime()) / 1000;
                break;
            }
            default: {
                isOutbound = !acdContactDetails.isInbound;
                mediaTypeId = MediaTypeId.PhoneCall.toString();
                contactTime = acdContactDetails.startTime;
                totalDurationSeconds = (acdContactDetails.lastStateChangeTime.getTime() - contactTime.getTime()) / 1000;
                fromAddr = acdContactDetails.ani;
                toAddr = acdContactDetails.dnis;
                break;
            }
        }
        const dispositionTags = ((_a = dispositionData.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => ({
            TagName: tag.tagName,
        }))) || [];
        return {
            contactId: acdContactDetails.contactID,
            agentId: icAgentId,
            skillId: acdContactDetails.skill,
            skillName: acdContactDetails.skillName,
            teamId: (_b = CXoneUser.instance.getUserInfo().teamId) === null || _b === void 0 ? void 0 : _b.toString(),
            isOutbound: isOutbound,
            firstName: '',
            lastName: '',
            mediaType: mediaTypeId,
            lastUpdateTime: contactTime.toISOString(),
            contactStart: contactTime.toISOString(),
            totalDurationSeconds: totalDurationSeconds,
            fromAddr: fromAddr,
            toAddr: toAddr,
            primaryDispositionId: dispositionData.primaryDispositionId,
            dispositionNotes: dispositionData.dispositionNotes,
            tags: dispositionTags,
        };
    }
    /**
     * Method to set acd contact history data for completed contact
     * @param contactHistoryData - contact history data to be set in index DB
     * @example - setACDContactHistoryData(contactHistoryData)
     *
     */
    setACDContactHistoryData(contactHistoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.CONTACT_HISTORY, contactHistoryData, IndexDBKeyNames.ACD_CONTACT_HISTORY));
        });
    }
    /**
     * Method to clear contact history data
     * @example - clearContactHistoryData()
     *
     */
    clearContactHistoryData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield clearIndexDbStore(IndexDBStoreNames.CONTACT_HISTORY);
        });
    }
}
//# sourceMappingURL=cxone-agent-contact-history.js.map