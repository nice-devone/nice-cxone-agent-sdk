import { AgentSettings } from '../../';
import { UserInfo } from '@nice-devone/common-sdk';
/** Start datadog RUM and Logging
* @example datadogInit()
*/
export declare const datadogInit: (agentSettings: AgentSettings, userInfo: UserInfo, appName?: string) => void;
/**
* Method to stop datadog session
* @example diconnectDatadog()
*/
export declare const disconnectDatadog: () => void;
