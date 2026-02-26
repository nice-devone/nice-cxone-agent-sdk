import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Interface for customer card activity props
 */
export interface CcfCustomerCardActivityProps {
    dnis?: string;
    setIsCurrentInteractionDisabled?: (data: boolean) => void;
}
/**
 * Enum to hold the values used for screenpop.
 */
export declare enum crmScreenPop {
    OPEN_URL = "openUrl",
    PEGA = "pega",
    CONT_3 = "CONT-3",
    CONT_6 = "CONT-6",
    CONT_15 = "CONT-15",
    BLANK = "_blank"
}
/**
 * CcfCustomerCardPinRecords - used to display pinned records
 * @example <CcfCustomerCardPinRecords />
 */
export declare function CcfCustomerCardPinRecords({ setIsCurrentInteractionDisabled }: CcfCustomerCardActivityProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfCustomerCardPinRecords>;
export default _default;
