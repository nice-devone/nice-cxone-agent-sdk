import { CXoneSdkErrorType, HttpResponse } from '@nice-devone/common-sdk';
export interface GetNextEventResponse {
    events: Array<{
        [key: string]: string;
    }>;
    sessionId: string;
    data: HttpResponse;
    errorType: CXoneSdkErrorType;
}
