import { HttpResponse } from '../../http/http-response/http-response';
import { CXoneSdkErrorType } from './cxone-sdk-error-types';
/**
 * Class to handle Errors in SDK
 */
export declare class CXoneSdkError implements Error {
    errorType: CXoneSdkErrorType;
    message: string;
    data: HttpResponse | {
        [key: string]: string | boolean | number;
    };
    name: string;
    /**
     * @example new CXoneSdkError(CXoneSdkErrorType.API_ERROR)
     */
    constructor(type: CXoneSdkErrorType, message: string, data?: HttpResponse | {
        [key: string]: string | boolean | number;
    });
    /**
     * Used to get the CXoneSdkError to string format
     * @returns
     * @example -
     * ```
     * error.toString();
     * ```
     */
    toString(): string;
}
