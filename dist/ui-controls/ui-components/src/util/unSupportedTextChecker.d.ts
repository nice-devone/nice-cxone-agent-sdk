/**
 *
 * @param messageText - string representing the HTML to be checked.
 * @returns - boolean ture if text is bad, false if text is good for what is checked
 * @example - <iframe srcdoc="<svg onload=alert(boom)>"></iframe> would return true as it is an iframe
 */
export declare const unSupportedTextChecker: (messageText: string) => boolean;
