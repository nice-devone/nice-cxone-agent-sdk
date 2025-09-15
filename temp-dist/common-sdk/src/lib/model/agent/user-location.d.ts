export declare enum ModeOfOperation {
    FULLY_AUTO = "FullyAuto",
    FULLY_MANUAL = "FullyManual",
    AUTO_PREVIEW_ONLY = "AutoPreviewOnly",
    AUTO_PREVIEW_ADJUST = "AutoPreviewAdjust"
}
export interface Location {
    id: string;
    locationName: string;
    matchedLocation: boolean;
}
/**
 * @remarks -  The user location
 */
export declare class UserLocation {
    modeOfOperation: string;
    locations: Location[];
    /**
       * @remarks -  Parse the user location
       * @param data - The data to parse
       * @example
       * ```
       * parse(data)
       * ```
       */
    parse(data: UserLocation): void;
}
