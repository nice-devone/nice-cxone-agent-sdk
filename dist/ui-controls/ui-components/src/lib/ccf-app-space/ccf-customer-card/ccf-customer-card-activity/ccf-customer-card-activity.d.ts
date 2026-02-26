import { ActivityDataRecords } from '../ccf-customer-card.slice';
import React from 'react';
export interface CcfCustomerCardActivityProps {
    dnis?: string;
    setIsActivityDisabled?: (data: boolean) => void;
}
/**
 * Interface for holding dispostion values of current contact
 */
export interface CcfDispositionValues {
    dispositionName: string;
    dispositionNotes: string;
    tags: string;
}
/**
 * Interface for the time fields for calculating duration in CRM
 */
export interface timeDurationCalculation {
    startTime: Date;
    endTime: Date;
}
export interface CcfChannelType {
    type: string;
    value: string;
}
/**
 * Interface for the PinActivityrecords which holds the fields of the activity
 */
export interface PinActivityrecords extends ActivityDataRecords {
    /**
     * @remarks - relatesto property of the record
     */
    relatesTo?: boolean;
}
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export declare function CcfCustomerCardActivity(props: CcfCustomerCardActivityProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CcfCustomerCardActivity>;
export default _default;
