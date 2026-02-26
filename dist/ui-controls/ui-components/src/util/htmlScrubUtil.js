/**
 *
 * @param domString - string representing the HTML to be sanitized.
 * @param tagName - Tag that you want to remove. ex. 'script' or 'div'
 * @example - domString may be user provided html and tagName would be 'script' since you want to remove the ability to run
 * 		unsanctioned scripts
 * @returns
 */
export const removeDomElements = (domString, tagName) => {
    let element = null;
    let elements = null;
    const elementDiv = document.createElement('div');
    elementDiv.innerHTML = domString;
    elements = Array.prototype.slice.call(elementDiv.getElementsByTagName(tagName));
    while ((element = elements.pop()) !== undefined) {
        element.parentNode.removeChild(element);
    }
    return elementDiv.innerHTML;
};
//# sourceMappingURL=htmlScrubUtil.js.map