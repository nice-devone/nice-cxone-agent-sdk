/// <reference types="react" />
import { EventContentArg } from '@fullcalendar/react';
import { AgentSchedule } from '@nice-devone/core-sdk';
import { CcfTranslationKey } from '@nice-devone/i18n';
/**
 * @remarks - AgentScheduleForDisplay extends agentsSchedule and adds few optional properties namely display, className, desccription,
 * borderHighlightColor for customization of events and shifts.
 */
export interface AgentScheduleForDisplay extends AgentSchedule {
    /**
     * @remarks - controls which preset rendering style events use, Possible values: auto, block, list-item, background, inverse-background, none
     */
    display?: string;
    /**
     * @remarks - determines which HTML classNames will be attached to the rendered event.
     */
    className?: string;
    /**
     * @remarks - shift/activity notes
     */
    description?: string;
    /**
      * @remarks - left-aligned highlighted activity color
      */
    borderHighlightColor?: string;
    /**
     * @remarks - shift/activity notes(max 500 characters)
     */
    isWEMEvent?: boolean;
    /**
    * @remarks - variable to identify if IEX event
    */
    isIEXEvent?: boolean;
}
export interface CcfSchedulerProps {
    events: AgentScheduleForDisplay[];
    initialView?: string;
    height?: string | number;
    nowIndicator?: boolean;
    headerToolbar?: any;
    dayMaxEvents?: number;
    slotDuration?: string;
    scrollTime?: string;
    firstDay?: number;
    allDaySlot?: boolean;
    allDayText?: CcfTranslationKey;
    /**
     * @remarks - renderScheduleContent used for rendering the event details
    **/
    renderScheduleContent?: (eventArgs: EventContentArg) => JSX.Element | '';
}
export declare const CcfScheduler: import("react").ForwardRefExoticComponent<CcfSchedulerProps & import("react").RefAttributes<unknown>>;
