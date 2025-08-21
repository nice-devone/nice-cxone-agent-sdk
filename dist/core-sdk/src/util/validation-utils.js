import * as linkify from 'linkifyjs';
import { SecurityHelper } from './security-helper';
/**
 * This class to provide basic validation methods
 */
export class ValidationUtils {
    constructor() {
        this.securityHelper = new SecurityHelper();
    }
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
    isNotNullOrUndefined(value) {
        if (value !== 'null' && value !== null && value !== 'undefined' && value !== undefined) {
            return true;
        }
        return false;
    }
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
    isNotNullOrEmpty(value) {
        if (this.isNotNullOrUndefined(value) && value !== '') {
            return true;
        }
        return false;
    }
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
    isNotNullOrEmptyArray(value) {
        if (value === undefined || value === null || value === ''
            || typeof value !== 'object' || !this.isNumber(value.length) || value.length === 0) {
            return false;
        }
        return true;
    }
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
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    /**
     * This method to check null or empty value
     * @param value  - any type of value
     * @example - isNullOrEmpty('');
     * @returns  - true/false
     */
    isNullOrEmpty(value) {
        return (value === undefined || value === null || value === '');
    }
    /**
     * This method to check whether object is valid or not
     * @param value  - any type of value
     * @example - isValidObject(sampleObject);
     * @returns  - true/false
     */
    isValidObject(value) {
        return value !== null && typeof value === 'object' && Object.keys(value).length > 0;
    }
    /**
     * This method to check whether object is valid JSON or not
     * @param value  - any type of value
     * @example - isJSON(sampleObject);
     * @returns  - true/false
     */
    isJSON(target) {
        try {
            const parsedData = JSON.parse(target);
            return (parsedData && typeof parsedData === 'object');
        }
        catch (_error) {
            return false;
        }
    }
    /**
     * Checks the value is valid email address or not
     * @param emailAddress  - accepts string
     * @example - validateEmail(test\@test.com);
     * @returns  - true/false
     *
     * * REGEX Explanation:
     *
     * Local Part (before the \@ symbol):
     * - ^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+ // Must start with an alphanumeric character or special character (e.g., !#$%&'*+/=?^_`\{|\}~-).
     * - (\.[a-zA-Z0-9!#$%&'*+/=?^_\`\{|\}~-]+)* --- Optional additional parts separated by periods.
     * - \@ // The required \@ symbol separating local and domain parts.
     
     * Domain Part (after the \@ symbol):
     * - ((\[[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\])| // Allows for an IP address in square brackets.
     * - (([a-zA-Z0-9-])+\.)+ // Must start with an alphanumeric character and can contain hyphens and periods.
     * - ([a-zA-Z0-9]\{2,4\})+$/ // TLD (top-level domain) must be 2 to 4 alphanumeric characters long.
     */
    validateEmail(emailAddress) {
        return (/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9][a-zA-Z0-9-.]*[a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,15})+)$/).test(emailAddress);
    }
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
    validateNumberForDirectory(value) {
        const nonPhoneRegex = /[^0-9().,#*+\-[\] ]/g;
        const hasDigitsRegex = /\d+/g;
        if (value && !nonPhoneRegex.test(value)) {
            const numericString = value.replace(/[^\d*#+]/g, '');
            if (hasDigitsRegex.test(numericString))
                return true;
        }
        return false;
    }
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
    validateRFCSupportedEmail(value) {
        return (/^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/.test(value));
    }
    /**
     * This method to check if the input is a valid URL
     * @param value  - accepts string
     * @example -
     * ```
     * isValidURL('https://www.example.com');
     * ```
     * @returns  - true/false
     */
    isValidURL(value) {
        return !!(value && linkify.find(value).length);
    }
    /**
     * Method to validate the token expiry
     * @param accessToken - access token
     * @returns  - true/false
     * @example -
     * ```
     * validateToken(accessToken);
     * ```
     */
    validateToken(accessToken) {
        const decodedTokenPayload = this.securityHelper.parseJwt(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedTokenPayload.exp > currentTime;
    }
}
//# sourceMappingURL=validation-utils.js.map