/// <reference types="react" />
import { ContactData } from '@nice-devone/common-sdk';
/**
 * Interface CcfPcAcceptRequeueRescheduleProps
 * params -
 * handleRequeue - function to be triggered for requeue click
 * handleAccept - function to be triggered for accept click
 * rejectAnimationForDigitalContact - Function to show reject animation for incoming digital contact
 * contact - Contact displayed in assignment card
 */
export interface CcfPcAcceptRequeueRescheduleProps {
    handleRequeue: (e: React.SyntheticEvent) => void;
    handleAccept: (e: React.SyntheticEvent) => void;
    isAcceptDisabled: boolean;
    isManualDial?: boolean;
    rejectAnimationForDigitalContact: () => void;
    contact: ContactData;
}
/**
 * CcfPcAcceptRequeueReschedule - Is used to display the accept and requeue buttons in the assignment card
 * @param props -?-CcfPcAcceptRequeueRescheduleProps
 * @example <CcfPcAcceptRequeueReschedule />
 */
export declare function CcfPcAcceptRequeueReschedule(props: CcfPcAcceptRequeueRescheduleProps): JSX.Element;
export default CcfPcAcceptRequeueReschedule;
