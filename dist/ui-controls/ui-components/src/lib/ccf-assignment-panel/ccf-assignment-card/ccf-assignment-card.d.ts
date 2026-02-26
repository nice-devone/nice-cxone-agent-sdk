import { ContactData } from '@nice-devone/common-sdk';
import { AnimationText } from '../ccf-interaction/ccf-interaction';
export interface CcfAssignmentCardProps {
    renderInFooter?: boolean;
    contact: ContactData;
    dataFromAssignmentCard?: (text: AnimationText, shouldShow: boolean) => void;
}
export declare const CcfAssignmentCard: (props: CcfAssignmentCardProps) => JSX.Element;
export default CcfAssignmentCard;
