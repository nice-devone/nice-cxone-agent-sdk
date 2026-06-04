import { AuthToken, CXoneSdkError } from '@nice-devone/common-sdk';
import { AuthStatus } from '../enum/auth-status';
export interface AuthResponse {
    /**
     * @remarks - authentication status
     */
    status: AuthStatus;
    /**
     * @remarks - success response/error on auth complete
     */
    response?: AuthToken | CXoneSdkError;
}
