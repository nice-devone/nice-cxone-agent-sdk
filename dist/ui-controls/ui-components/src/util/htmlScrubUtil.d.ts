/**
 *
 * @param domString - string representing the HTML to be sanitized.
 * @param tagName - Tag that you want to remove. ex. 'script' or 'div'
 * @example - domString may be user provided html and tagName would be 'script' since you want to remove the ability to run
 * 		unsanctioned scripts
 * @returns
 */
export declare const removeDomElements: (domString: string, tagName: string) => string;
