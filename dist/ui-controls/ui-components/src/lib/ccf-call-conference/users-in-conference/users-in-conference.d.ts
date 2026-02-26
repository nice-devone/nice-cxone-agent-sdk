import { ConferenceStatus } from '@nice-devone/common-sdk';
import { Participant } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CXoneVoiceContact } from '@nice-devone/acd-sdk';
interface UsersInConferenceProps {
    users: Participant[];
}
interface HoverBoxProps {
    user: Participant;
    isSingleConsult: boolean;
    isConferenceConsult?: boolean;
    currentConferenceStatus?: ConferenceStatus;
    conferenceNo?: string;
    isConsultContact?: boolean;
    onHoldResumeClick?: (user: CXoneVoiceContact) => void;
}
/**
 * Function for showing hover box in conference
 * @param param0 - user
 * @example <HoverBox />
 * @returns
 */
export declare const HoverBox: ({ user, isSingleConsult, isConferenceConsult, currentConferenceStatus, isConsultContact, conferenceNo, onHoldResumeClick, }: HoverBoxProps) => JSX.Element;
/**
 * Component to be used to show user in conference
 * @param props - UsersInConferenceProps
 * @example - <UsersInConference />
 * @returns
 */
export declare function UsersInConference(props: UsersInConferenceProps): JSX.Element | null;
export {};
