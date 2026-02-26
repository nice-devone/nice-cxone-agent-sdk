import { CcfTranslationKey } from '@nice-devone/i18n';
/**
 * Represents an interface for refresh button container properties
 */
interface RefreshContainerItem {
    type: string;
    id?: string;
    items: Array<{
        type: string;
        spacing?: string;
        actions?: Array<{
            type: string;
            title?: string;
            data?: string | {
                intent: string;
            };
            url?: string;
            horizontalAlignment?: string;
        }>;
        valueOn?: string;
        valueOff?: string;
        label?: string;
        isRequired?: boolean;
        errorMessage?: string;
        fallback?: string;
    }>;
    spacing?: string;
    selectAction?: {
        type: string;
        data: {
            intent: string;
        };
    };
    width?: string;
    isVisible?: string;
}
/**
 * CcfCustomerCard Activity Template JSON - Used as template for displaying create entity button
 * @param props -?-translation
 * @example - activityHeaderTemplateJSON()
 */
export declare const relatedHeaderTemplateJSON: (translation: (input: CcfTranslationKey) => string) => {
    type: string;
    '@odata.type': string;
    id: string;
    body: {
        type: string;
        id: string;
        items: {
            type: string;
            columns: RefreshContainerItem[];
        }[];
    }[];
    $schema: string;
    version: string;
};
/**
 * CcfCustomerCard Activity Template JSON - Used as template for activity
 * @example - templateJSON()
 */
export declare const templateJSON: () => {
    type: string;
    '@odata.type': string;
    id: string;
    body: {
        type: string;
        $data: string;
        id: string;
        items: ({
            type: string;
            separator: boolean;
            id: string;
            $when: string;
            columns: ({
                type: string;
                spacing: string;
                items: {
                    type: string;
                    weight: string;
                    text: string;
                    horizontalAlignment: string;
                    isSubtle: boolean;
                }[];
                selectAction: {
                    type: string;
                    tooltip: string;
                    url?: undefined;
                    data?: undefined;
                };
                width: string;
                id?: undefined;
                isVisible?: undefined;
                verticalContentAlignment?: undefined;
                horizontalAlignment?: undefined;
            } | {
                type: string;
                spacing: string;
                id: string;
                selectAction: {
                    type: string;
                    url: string;
                    data: {
                        intent: string;
                        data: string;
                        type: string;
                        isRelatesto: string;
                        isLinked?: undefined;
                    };
                    tooltip: string;
                };
                items: {
                    type: string;
                    value: string;
                    valueOn: string;
                    valueOff: string;
                    label: string;
                    isRequired: boolean;
                    errorMessage: string;
                    fallback: string;
                }[];
                width: string;
                isVisible: string;
                verticalContentAlignment?: undefined;
                horizontalAlignment?: undefined;
            } | {
                type: string;
                spacing: string;
                selectAction: {
                    type: string;
                    url: string;
                    data: {
                        intent: string;
                        data: string;
                        isLinked: string;
                        type?: undefined;
                        isRelatesto?: undefined;
                    };
                    tooltip: string;
                };
                id: string;
                items: {
                    type: string;
                    value: string;
                    valueOn: string;
                    valueOff: string;
                    label: string;
                    isRequired: boolean;
                    errorMessage: string;
                    fallback: string;
                }[];
                width: string;
                isVisible?: undefined;
                verticalContentAlignment?: undefined;
                horizontalAlignment?: undefined;
            } | {
                type: string;
                spacing: string;
                id: string;
                verticalContentAlignment: string;
                selectAction: {
                    type: string;
                    url: string;
                    data: {
                        intent: string;
                        data: {
                            url: string;
                            label: string;
                            id: string;
                            type: string;
                            crm: string;
                        };
                        type?: undefined;
                        isRelatesto?: undefined;
                        isLinked?: undefined;
                    };
                    tooltip: string;
                };
                items: {
                    type: string;
                    id: string;
                    weight: string;
                    text: string;
                    horizontalAlignment: string;
                    isSubtle: boolean;
                }[];
                width: string;
                isVisible?: undefined;
                horizontalAlignment?: undefined;
            } | {
                type: string;
                spacing: string;
                id: string;
                selectAction: {
                    type: string;
                    data: {
                        intent: string;
                        data: string;
                        type?: undefined;
                        isRelatesto?: undefined;
                        isLinked?: undefined;
                    };
                    tooltip?: undefined;
                    url?: undefined;
                };
                verticalContentAlignment: string;
                horizontalAlignment: string;
                items: {
                    type: string;
                    id: string;
                    url: string;
                    width: string;
                    altText: string;
                    isVisible: boolean;
                    $when: string;
                }[];
                width: string;
                isVisible?: undefined;
            })[];
            isVisible?: undefined;
            horizontalAlignment?: undefined;
            verticalAlignment?: undefined;
            bleed?: undefined;
        } | {
            type: string;
            isVisible: boolean;
            columns: {
                type: string;
                spacing: string;
                items: {
                    type: string;
                    $data: string;
                    isVisible: boolean;
                    items: {
                        type: string;
                        $when: string;
                        columns: ({
                            type: string;
                            items: {
                                type: string;
                                text: string;
                                horizontalAlignment: string;
                                isSubtle: boolean;
                                weight: string;
                            }[];
                            width: string;
                            selectAction?: undefined;
                            horizontalAlignment?: undefined;
                            height?: undefined;
                        } | {
                            type: string;
                            items: {
                                type: string;
                                text: string;
                                spacing: string;
                                horizontalAlignment: string;
                                isSubtle: boolean;
                            }[];
                            selectAction: {
                                type: string;
                                tooltip: string;
                            };
                            width: string;
                            horizontalAlignment: string;
                            height: string;
                        })[];
                    }[];
                }[];
            }[];
            horizontalAlignment: string;
            verticalAlignment: string;
            bleed: boolean;
            separator?: undefined;
            id?: undefined;
            $when?: undefined;
        })[];
    }[];
    $schema: string;
    version: string;
};
export {};
