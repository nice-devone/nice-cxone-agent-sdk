import { AuthToken } from './auth-token';
export interface AuthState {
    isTokenValid: boolean;
    authToken?: AuthToken;
}
