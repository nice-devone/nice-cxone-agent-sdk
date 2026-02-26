import { AuthSettings } from '@nice-devone/auth-sdk';
export interface CcfAuthenticationProps {
    consumerAppName: string;
    authSettings: AuthSettings;
    authMode: string;
    codeChallengeMethod: string;
    app: string;
    appName?: string;
    appHelpUrl?: string;
    queryString?: string;
    authTarget?: string;
}
/**
 * Component to manage Global Authentication Flow
 * @param CcfAuthenticationProps - Consumer application's required auth data for GA flow
 * ```
 * @example
 *  <CcfAuthentication {...appAuthData} />
 * ```
 */
export declare function CcfAuthentication(props: CcfAuthenticationProps): JSX.Element;
export default CcfAuthentication;
