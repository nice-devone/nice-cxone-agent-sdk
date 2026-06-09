/**
 * Model Class for the CXoneCustomScreenpop
 * ```
 * const cxoneCustomScreenpop = new CXoneCustomScreenpop();
 * ```
 */
export declare class CXoneCustomScreenpop {
    /**
     * contactId
     */
    contactId: string;
    /**
     * custom event data for screenpop
     */
    data: string;
    /**
     * used to parse the data
     * @example
     * ```
     * cxoneCustomScreenpop.parse(data);
     * ```
     */
    parse(data: {
        [key: string]: string;
    }): void;
}
