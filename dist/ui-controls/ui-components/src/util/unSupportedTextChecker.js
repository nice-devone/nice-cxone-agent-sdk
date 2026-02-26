/**
 *
 * @param messageText - string representing the HTML to be checked.
 * @returns - boolean ture if text is bad, false if text is good for what is checked
 * @example - <iframe srcdoc="<svg onload=alert(boom)>"></iframe> would return true as it is an iframe
 */
export const unSupportedTextChecker = (messageText) => {
    var _a;
    return (((_a = messageText === null || messageText === void 0 ? void 0 : messageText.indexOf) === null || _a === void 0 ? void 0 : _a.call(messageText, '<iframe')) > -1);
    // || (messageText?.indexOf?.('<img') > -1); Commenting img tag as it its causing issue on whatsapp channel 
};
//# sourceMappingURL=unSupportedTextChecker.js.map