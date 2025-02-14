/**
 * This class to provide basic validation methods
 */
export declare class ValidationUtils {
    /**
     * This method to check value is not null or undefined
     * @param value  - any type of value
     * @example -
     * ```
     * isNotNullOrUndefined('data');
     * ```
     *
     * @returns  - true/false
     */
    isNotNullOrUndefined(value: any): boolean;
    /**
     * This method to check value is not null or empty
     * @param value  - any type of value
     * @example -
     * ```
     * isNotNullOrEmpty('data');
     * ```
     *
     * @returns  - true/false
     */
    isNotNullOrEmpty(value: any): boolean;
    /**
     * This method to check value is array is empty or not
     * @param value  - any type of value
     * @example -
     * ```
     * isNotNullOrEmptyArray(['abc','xyz']);
     * ```
     *
     * @returns  - true/false
     */
    isNotNullOrEmptyArray(value: any): boolean;
    /**
     * This method to check value is number or not
     * @param value  - any type of value
     * @example -
     * ```
     * isNumber(3);
     * ```
     *
     * @returns  - true/false
     */
    isNumber(value: any): boolean;
    /**
     * This method to check null or empty value
     * @param value  - any type of value
     * @example - isNullOrEmpty('');
     * @returns  - true/false
     */
    isNullOrEmpty(value: any): boolean;
    /**
     * This method to check whether object is valid or not
     * @param value  - any type of value
     * @example - isValidObject(sampleObject);
     * @returns  - true/false
     */
    isValidObject(value: any): boolean;
    /**
     * This method to check whether object is valid JSON or not
     * @param value  - any type of value
     * @example - isJSON(sampleObject);
     * @returns  - true/false
     */
    isJSON(target: any): boolean;
    /**
     * Checks the value is valid email address or not
     * @param value  - accepts string
     * @example -
     * ```
     * validateEmail(test@test.com);
     * ```
     *
     * @returns  - true/false
     */
    validateEmail(value: string): boolean;
    /**
     * Checks the value is number or not for Directory search
     * @param value  - accepts string
     * @example -
     * ```
     * validateNumber(77);
     * ```
     *
     * @returns  - true/false
     */
    validateNumberForDirectory(value: string): boolean;
    /**
     * Validates whether the provided email address conforms to a basic RFC-compliant format.
     *
     * The email address must have the following characteristics:
     * - A local part (before the `@` symbol) that does not contain whitespace or the `@` symbol.
     * - A domain part (after the `@` symbol) that:
     *   - Starts with an alphanumeric character.
     *   - May contain alphanumeric characters, dots (`.`), and hyphens (`-`) in the middle.
     *   - Does not start or end with a special character.
     * - A top-level domain (after the last `.`) that consists of at least two alphabetic characters.
     *
     * @param value - The email address to validate.
     * @returns boolean - `true` if the email address is valid according to the specified criteria; otherwise, `false`.
     * @example -
     *
     * validateRFCSupportedEmail(rishav.kumar\@nice.com);
     */
    validateRFCSupportedEmail(value: string): boolean;
    /**
     * This method to check if the input is a valid URL
     * @param value  - accepts string
     * @example -
     * ```
     * isValidURL('https://www.example.com');
     * ```
     * @returns  - true/false
     */
    isValidURL(value?: string): boolean;
    /**
     * Method to validate the token expiry
     * @param accessToken - access token
     * @returns  - true/false
     * @example -
     * ```
     * validateToken(accessToken);
     * ```
     */
    validateToken(accessToken: string): boolean;
}
