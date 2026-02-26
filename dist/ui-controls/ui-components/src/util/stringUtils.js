const phoneNumberFormat = '(###) ###-####';
const substitutionChar = '#';
/**
 * function to capitilize first letter of string.
 * @returns String in first letter capital
 * @example
 * ```
 * capitalizeFirstLetter("string")
 * ```
 */
export const capitalizeFirstLetter = (str) => {
    if (str === null || str === void 0 ? void 0 : str.length)
        return str.charAt(0).toUpperCase() + str.slice(1);
    else
        return str;
};
/**
 * function to return the expected length of a phone number
 * @returns phone number length
 * @example
 * ```
 * getPhoneNumberFormatSize()
 * ```
 */
export const getPhoneNumberFormatSize = () => {
    const characters = phoneNumberFormat.split('').filter(char => char === substitutionChar);
    return characters.length;
};
/**
 * function to format a phone number
 * @returns (###) ###-####
 * @example
 * ```
 * formatPhoneNumber("string")
 * ```
 */
export const formatPhoneNumber = (inputNumber) => {
    let arrIndex = null;
    let formatedNumber = '';
    let inputNumberPosition = 0;
    let numberArray;
    // Verify if we have the expected number of characters to format the number.
    if (inputNumber.length === getPhoneNumberFormatSize() &&
        inputNumber.toLowerCase() !== 'restricted') {
        numberArray = phoneNumberFormat.split('');
        for (arrIndex = 0; arrIndex < numberArray.length; arrIndex++) {
            if (numberArray[arrIndex].toString() === substitutionChar) {
                formatedNumber += inputNumber.charAt(inputNumberPosition++);
            }
            else {
                formatedNumber += numberArray[arrIndex].toString();
            }
        }
    }
    else {
        formatedNumber = inputNumber;
    }
    return formatedNumber;
};
/**
 * function to compare two strings
 * @returns true/false
 * @example stringCompareIgnoreCase(a,b)
 */
export const stringCompareIgnoreCase = (variable1, variable2) => (variable1 && variable2 && variable1.toLowerCase() === variable2.toLowerCase()) || false;
//# sourceMappingURL=stringUtils.js.map