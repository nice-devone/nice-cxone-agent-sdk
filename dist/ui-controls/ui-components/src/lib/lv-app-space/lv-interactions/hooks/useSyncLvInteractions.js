import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncExperienceRecord, selectIsLvInteractionsSyncEnabled, } from '../../lv-app-space.slice';
import { allDigitalContactCard, getCompiledACDContacts, digitalContactSelector, voiceContactSelector, } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CallContactEventStatus, LocalStorageHelper } from '@nice-devone/core-sdk';
import useLVAppSpacePermission from '../../hooks/useLVAppSpacePermission';
import { DigitalChannelType, DigitalContactStatus, MediaType, UIStorageKeys, } from '@nice-devone/common-sdk';
import { getCreateExperienceRecordPayload, getUpdateExperienceRecordPayload, } from '../lv-interactions-utility';
import { CXoneUser } from '@nice-devone/auth-sdk';
/**
 * Hook that calls the ECC Lambda function to create a new interaction
 * @param selectedInteraction - The currently selected interaction
 * @param voiceContactDetails - Details of the voice contact
 * @example
 * ```js
 * useSyncLvInteractions(selectedInteraction, voiceContactDetails);
 * ```
 */
export default function useSyncLvInteractions() {
    const dispatch = useDispatch();
    const { isLvCustomerCardEnabled, isLvDeskEnabled } = useLVAppSpacePermission();
    const prevDigitalLengthRef = useRef(0);
    const prevACDLengthRef = useRef(0);
    const isLvInteractionsSyncEnabled = useSelector(selectIsLvInteractionsSyncEnabled);
    const allDigitalContact = useSelector(allDigitalContactCard);
    const allACDContacts = useSelector(getCompiledACDContacts);
    const digitalContactDetails = useSelector(digitalContactSelector);
    const voiceContactDetails = useSelector(voiceContactSelector);
    const userId = CXoneUser.instance.getUserInfo().userId;
    let isContactElevated;
    const hasDeskOrEccAccess = isLvCustomerCardEnabled || isLvDeskEnabled;
    /**
     *
     * @param allContacts - Array of all contacts(Digital or ACD)
     * @param prevRef - Mutable ref object to keep track of the previous length of contacts
     * @example - syncExperienceRecordHelper(allContacts, prevRef);
     */
    const syncExperienceRecordHelper = (allContacts, prevRef) => {
        if (allContacts.length > prevRef.current) {
            const latestContactAdded = allContacts.reduce((prev, current) => new Date(current.receivedInInboxTime) >= new Date(prev.receivedInInboxTime) ? current : prev);
            isContactElevated = latestContactAdded.elevatedFrom ? true : false;
            // const latestContactAdded = allContacts[allContacts.length - 1];
            const LVExperienceRecordsInLS = LocalStorageHelper.getItem(UIStorageKeys.LV_EXPERIENCE_RECORDS, true) || {};
            if (!Object.keys(LVExperienceRecordsInLS).includes(latestContactAdded.contactId)) {
                const contactId = latestContactAdded.contactId;
                if (latestContactAdded.media === MediaType.VOICE) {
                    const data = getCreateExperienceRecordPayload(voiceContactDetails, userId, false, true);
                    return data;
                }
                else {
                    if (latestContactAdded.contactStatus !== DigitalContactStatus.DRAFT) {
                        const digitalContact = Object.values(digitalContactDetails).find((digitalContact) => Object.keys(digitalContact).includes(contactId));
                        let data;
                        if (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact[contactId]) {
                            const saveTranscript = (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact[contactId].channelType) === DigitalChannelType.EMAIL.toLowerCase() || (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact[contactId].channelType) === DigitalChannelType.SMS.toLowerCase() ? true : false;
                            data = getCreateExperienceRecordPayload(digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact[contactId], userId, saveTranscript, true);
                        }
                        return data;
                    }
                }
            }
        }
        else if (allContacts.length < prevRef.current) {
            const lvExperienceRecordsInLS = LocalStorageHelper.getItem(UIStorageKeys.LV_EXPERIENCE_RECORDS, true) || {};
            const removedItem = Object.keys(lvExperienceRecordsInLS).find((item) => !allContacts.some((contact) => contact.contactId === item));
            if (Object.keys(lvExperienceRecordsInLS).length === 0) {
                LocalStorageHelper.removeItem(UIStorageKeys.LV_EXPERIENCE_RECORDS);
            }
            else {
                if (removedItem) {
                    delete lvExperienceRecordsInLS[removedItem];
                    LocalStorageHelper.setItem(UIStorageKeys.LV_EXPERIENCE_RECORDS, lvExperienceRecordsInLS);
                }
            }
        }
        return null;
    };
    useEffect(() => {
        if (!hasDeskOrEccAccess || !isLvInteractionsSyncEnabled)
            return;
        const data = syncExperienceRecordHelper(allDigitalContact, prevDigitalLengthRef);
        if (data && !isContactElevated) {
            dispatch(syncExperienceRecord(data));
        }
        prevDigitalLengthRef.current = allDigitalContact.length || 0;
    }, [allDigitalContact.length, hasDeskOrEccAccess]);
    useEffect(() => {
        if (!hasDeskOrEccAccess || !isLvInteractionsSyncEnabled)
            return;
        const data = syncExperienceRecordHelper(allACDContacts || [], prevACDLengthRef);
        if (data && !isContactElevated) {
            dispatch(syncExperienceRecord(data));
        }
        prevACDLengthRef.current = (allACDContacts === null || allACDContacts === void 0 ? void 0 : allACDContacts.length) || 0;
    }, [allACDContacts === null || allACDContacts === void 0 ? void 0 : allACDContacts.length, hasDeskOrEccAccess]);
    useEffect(() => {
        if (!hasDeskOrEccAccess || !isLvInteractionsSyncEnabled)
            return;
        if ((voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.status) === CallContactEventStatus.DISCONNECTED) {
            const latestAcdContactAdded = allACDContacts && allACDContacts.reduce((prev, current) => new Date(current.receivedInInboxTime) >= new Date(prev.receivedInInboxTime) ? current : prev);
            isContactElevated = latestAcdContactAdded && latestAcdContactAdded.elevatedFrom ? true : false;
            const data = getUpdateExperienceRecordPayload({
                detailsObject: voiceContactDetails,
                agentId: userId,
                externalInteractionId: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.interactionId,
            });
            if (data && !isContactElevated) {
                dispatch(syncExperienceRecord(data));
            }
        }
    }, [voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.status, hasDeskOrEccAccess, isLvInteractionsSyncEnabled]);
}
//# sourceMappingURL=useSyncLvInteractions.js.map