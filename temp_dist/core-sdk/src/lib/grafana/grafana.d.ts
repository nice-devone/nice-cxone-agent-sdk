import { UserInfo } from '@nice-devone/common-sdk';
import { AgentSettings } from '../../';
/** Used to toggle favorite agent in Index DB through SDK
 * @param agentSettings - agent settings from backend
 * @param userInfo - user info from backend
 * @param appName - application name
 * @param grafanaFaroUri - grafana faro URI for log collection
 * @example -
 * ```
 * grafanaInit(agentSettings, userInfo, appName, grafanaFaroUri);
 * ```
 */
export declare const grafanaInit: (agentSettings: AgentSettings, userInfo: UserInfo, appName: string, grafanaFaroUri: string, grafanaFaroKey?: string) => void;
