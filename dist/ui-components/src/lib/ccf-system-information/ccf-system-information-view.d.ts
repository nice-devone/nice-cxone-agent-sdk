import { ReactNode } from 'react';
import { Theme } from '@mui/material';
import { LogLevel } from '@nice-devone/core-sdk';
import type { SystemInformation, InteractionRoutingInformation } from './ccf-system-information';
interface CcfSystemInformationViewProps {
    sysInfo: SystemInformation;
    routingInfo: InteractionRoutingInformation;
    loggingConfig: LogLevel;
    networkSpeed: number;
    isHeapPerformanceReloadToggle: boolean;
    onLoggingConfigChange: (value: LogLevel) => void;
    theme?: Theme;
    /** Optional sub-component for telemetric information section */
    telemetricInformation?: ReactNode;
    /** Optional sub-component for network latency bar */
    networkLatencyBar?: ReactNode;
}
/**
 * Presentational component for System Information
 * Receives all data as props, no Redux dependencies
 *
 * @example
 * ```tsx
 * const view = (
 *   <CcfSystemInformationView
 *     sysInfo={systemInfo}
 *     routingInfo={routingInfo}
 *     loggingConfig={LogLevel.ERROR}
 *     networkSpeed={0.5}
 *     isHeapPerformanceReloadToggle={true}
 *     onLoggingConfigChange={handleChange}
 *   />
 * );
 * ```
 */
export declare function CcfSystemInformationView({ sysInfo, routingInfo, loggingConfig, networkSpeed, isHeapPerformanceReloadToggle, onLoggingConfigChange, theme: propTheme, telemetricInformation, networkLatencyBar, }: CcfSystemInformationViewProps): JSX.Element;
export default CcfSystemInformationView;
