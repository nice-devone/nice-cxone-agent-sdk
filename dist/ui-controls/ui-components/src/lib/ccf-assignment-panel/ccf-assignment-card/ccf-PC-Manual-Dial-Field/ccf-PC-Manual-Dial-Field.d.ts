/// <reference types="react" />
import { PCDeliveryType } from '../../../../enums/delivery-type';
declare type testSetterFunction = (foo: boolean) => void;
/**
 * Interface CcfPersonalConnectionPreviewProps
 * params -
 * phoneNumber - phoneNumber to check for matching. only used if(isManual)
 * isManual - bool for if this is manual or not
 * deliveryType - delivery type enum
 * setCallButton - call button sets the button to be enabled when manual dial matches
 *                  This has an alternate type specifically for testing.
 */
export interface CcfPersonalConnectionPreviewProps {
    phoneNumber: string;
    pcDeliveryType: PCDeliveryType;
    setCallButtonIsDisabled: React.Dispatch<React.SetStateAction<boolean>> | testSetterFunction;
}
/**
 * CcfPCManualDialField - used for the text field of manual PC dialing.
 * @param props - CcfPCManualDialFieldProps
 * @example <CcfPCManualDialField />
 */
export declare function CcfPCManualDialField(props: CcfPersonalConnectionPreviewProps): JSX.Element;
export default CcfPCManualDialField;
