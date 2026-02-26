/// <reference types="react" />
import { ContactData } from '@nice-devone/common-sdk';
/**
 * Interface CcfAssignmentAcceptRejectProps
 * params -
 * handleReject - function to be triggered for reject click
 * handleAccept - function to be triggered for accept click
 * rejectAnimationForDigitalContact - Function to show reject animation for incoming digital contact
 * contact - Contact displayed in assignment card
 */
export interface CcfAssignmentAcceptRejectProps {
    handleReject: (e: React.SyntheticEvent) => void;
    handleAccept: (e: React.SyntheticEvent) => void;
    rejectAnimationForDigitalContact?: () => void;
    contact: ContactData;
}
/**
 * CcfContactAcceptReject - Is used to display the accept and reject buttons in the assignment card
 * @param props -?-CcfAssignmentAcceptRejectProps
 * @example <CcfContactAcceptReject />
 */
export declare function CcfContactAcceptReject(props: CcfAssignmentAcceptRejectProps): JSX.Element;
export default CcfContactAcceptReject;
