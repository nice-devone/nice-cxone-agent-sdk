import React from 'react';
/**
 * Interface for defining ref for CcfTimer Component
 */
export interface TimerRef {
    restart: (timestamp: Date) => void;
}
/**
 * Interface for defining props of CcfTimer component
 */
export interface CcfTimerProps {
    /**
     * @remarks - timestamp that defines for how long the timer will be running
     */
    expiryTimestamp: Date;
}
/**
 * Component to display timer for the selected contact
 * @param ref - TimerRef
 * ```
 * @example-
 * <CcfTimer />
 * ```
 */
export declare const CcfTimer: React.ForwardRefExoticComponent<CcfTimerProps & React.RefAttributes<TimerRef>>;
