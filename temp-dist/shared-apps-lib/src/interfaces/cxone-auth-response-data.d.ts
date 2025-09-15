/**
 * Interface for Auth Code data to be
 * sent to cxone-agent from MS teams integration app.
 */
export interface CXoneAuthResponseData {
    /**
     * Auth Code, to be sent to cxone-agent for calling APIs.
     */
    authCode: string | null;
}
