/**
 * Interface for Agent schedule
 */
export interface AgentSchedule {
    /**
     * @remarks - title of the shift/activity
     */
    title: string;
    /**
     * @remarks - shift/activity start DateTime
     */
    start: Date;
    /**
     * @remarks - shift/activity end DateTime
     */
    end: Date;
    /**
     * @remarks - hex color code for background for shift/activity
     */
    backgroundColor: string;
    /**
     * @remarks - uuid
     */
    id: string;
    /**
     * @remarks - shift/activity notes(max 500 characters)
     */
    notes: string;
}
/**
 * Interface for Agent shift
 */
export interface AgentScheduleShift {
    /**
     * @remarks - shift id
     */
    id: string;
    /**
     * @remarks - a list of activity intervals within a shift
     */
    activityIntervals: Array<ActivityIntervals>;
    /**
     * @remarks - base activity details
     */
    baseActivityCode: ActivityCode;
    /**
     * @remarks - ISO start DateTime
     */
    start: Date;
    /**
     * @remarks - ISO end DateTime
     */
    end: Date;
    /**
     * @remarks - shift notes(max 500 characters)
     */
    shiftNotes: string;
}
/**
 * Interface for Activity Intervals
 */
export interface ActivityIntervals {
    /**
     * @remarks - uuid
     */
    id: string;
    /**
     * @remarks - activity notes(max 500 characters)
     */
    activityNotes: string;
    /**
     * @remarks - activity details
     */
    activityCode: ActivityCode;
    /**
     * @remarks - priority
     */
    priority: number;
    /**
     * @remarks - activity start DateTime
     */
    start: Date;
    /**
     * @remarks - activity end DateTime
     */
    end: Date;
}
/**
 * Interface for Activity Code
 */
export interface ActivityCode {
    /**
     * @remarks - uuid
     */
    id: string;
    /**
     * @remarks - title of the shift/activity
     */
    title: string;
    /**
     * @remarks - priority
     */
    priority: number;
    /**
     * @remarks - activity details i.e. title, color
     */
    activityCodeCategory: ActivityCodeCategory;
}
/**
 * Interface for Activity Code Category
 */
export interface ActivityCodeCategory {
    /**
     * @remarks - uuid
     */
    id: string;
    /**
     * @remarks - hex color code for background
     */
    color: string;
}
