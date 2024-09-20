/**
 * Constants for RTIG
 */
export declare const RTIGConstants: {
    clientId: string;
    dateFormat: string;
    defaultIanaTimezone: string;
    acdPaths: {
        tokenExchange: string;
        whoAmIPath: string;
        serverTime: string;
    };
    cxonePaths: {
        permissions: string;
        tokenExchange: string;
        tokenRefresh: string;
    };
    metrics: {
        guid: string;
        tag: string;
        type: string;
        friendly_name: string;
        image_src: string;
        is_sentiment_score: boolean;
    }[];
    rangesOfMetric: {
        min: number;
        max: number;
        color: string;
        label: string;
        severity: string;
        imageSrc: string;
    }[];
    disableColor: string;
};
