import { EventContentArg } from '@fullcalendar/react';
/**
 * Tooltip handler for commitment details
 * @example <CommitmentDetail />
 */
export declare const CommitmentDetail: (props: {
    eventArgs: EventContentArg;
}) => JSX.Element;
/**
 * Commitment list
 * @example useCcfCommitmentList()
 */
export declare const useCcfCommitmentList: () => {
    title: string;
    start: Date;
    end: Date;
    backgroundColor: string;
    id: string;
    notes: string;
    extendedProps: {
        callbackId: number;
        target: string;
        agentId: number;
        skillId: number;
        dialNumber: string;
        origNumber: string;
        firstName: string;
        lastName: string;
        notes: string;
        callbackTime: Date;
    };
}[];
