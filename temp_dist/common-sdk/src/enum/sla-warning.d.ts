/**
 * Enum for SLA Indicator type
 * normal means the SLA time is above 50%
 * warning means the SLA time is less than equal to 50%
 * critical means the SLA time has expired
 */
export declare enum SLAIndicatorType {
    NORMAL = "normal",
    WARNING = "warning",
    CRITICAL = "critical"
}
