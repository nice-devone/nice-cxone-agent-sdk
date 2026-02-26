import { jsx as _jsx } from "react/jsx-runtime";
import { selectUserInConference } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { transferCall, conferenceStatus } from './ccf-call-conference.slice';
import { CcfButtonList } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import { ConferenceStatus } from '@nice-devone/common-sdk';
/**
 * Component for leave or end conference call
 * @example - <CcfLeaveEndConference />
 * @returns
 */
const CcfLeaveEndConference = () => {
    const usersInConference = useSelector(selectUserInConference);
    const dispatch = useDispatch();
    const conferenceCurrentStatus = useSelector(conferenceStatus);
    const isDisableEndConference = conferenceCurrentStatus && conferenceCurrentStatus === ConferenceStatus.HOLD;
    /**
     * Function to dispatch transfer/leave the call
     * @example dispatchLeaveConference()
     */
    function dispatchLeaveConference() {
        dispatch(transferCall());
    }
    /**
     * Function to dispatch end call for each contact in the conference
     * @example dispatchEndCall()
     */
    function dispatchEndCall() {
        if (conferenceCurrentStatus === ConferenceStatus.JOINED || usersInConference.length >= 1) {
            usersInConference.forEach((callContact) => callContact.contact.end());
        }
    }
    return (_jsx(CcfButtonList, { items: [{ labelTranslationKey: 'leave', action: () => { dispatchLeaveConference(); } }, { labelTranslationKey: 'endCall', action: () => { dispatchEndCall(); }, isDisable: isDisableEndConference }], controlWidth: '82px', iconTooltipTranslationKey: 'conferenceMenu' }));
};
export default CcfLeaveEndConference;
//# sourceMappingURL=ccf-leave-end-conference.js.map