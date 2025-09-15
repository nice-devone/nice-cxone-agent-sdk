/**
 * Declare Unavailable Code Details
 */
export declare class UnavailableCode {
    reason: string;
    isAcw: boolean;
    isActive: boolean;
    isPersonalConnection?: boolean;
    skillName?: string;
    /**
     * This method to parse unavailable codes data
     * @param data -
     * @example -
     * ```
     *parseData(data);
     * ```
     */
    parseData(data: any): void;
}
