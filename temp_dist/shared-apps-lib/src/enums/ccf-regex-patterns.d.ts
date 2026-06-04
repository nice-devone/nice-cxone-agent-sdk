/**
 * Generic class to save common regex which needs to be shared between multiple apps
 */
export declare class CcfRegexPatterns {
    /**
     * Check for E164 format for the phone number
     */
    static phoneNumberFormat: RegExp;
    /**
     * string with special characters
     */
    static specialCharFormat: RegExp;
    /**
     * string with special char and alphabets in phone number
     */
    static specialPhoneCharFormat: RegExp;
}
