import { CcfTranslationKey } from '@nice-devone/i18n';
/**
 * CcfCustomerCard Activity Template JSON - Used as template for activity
 * @param props -?-translation
 * @example - templateJSON(translation)
 */
export declare const templateRelatedJSON: (translation: (input: CcfTranslationKey) => string) => {
    type: string;
    '@odata.type': string;
    id: string;
    body: ({
        type: string;
        id: string;
        $data: string;
        spacing: string;
        items: {
            type: string;
            id: string;
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
                    };
                };
            };
            columns: ({
                type: string;
                $when: string;
                width: number;
                items: ({
                    type: string;
                    id: string;
                    columns: ({
                        type: string;
                        items: {
                            type: string;
                            text: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        horizontalAlignment?: undefined;
                        height?: undefined;
                        selectAction?: undefined;
                        isVisible?: undefined;
                        spacing?: undefined;
                        id?: undefined;
                        verticalContentAlignment?: undefined;
                    } | {
                        type: string;
                        items: {
                            type: string;
                            text: string;
                            spacing: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        horizontalAlignment: string;
                        height: string;
                        selectAction: {
                            type: string;
                            tooltip: string;
                            url?: undefined;
                            data?: undefined;
                        };
                        isVisible?: undefined;
                        spacing?: undefined;
                        id?: undefined;
                        verticalContentAlignment?: undefined;
                    } | {
                        type: string;
                        isVisible: string;
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
                        horizontalAlignment?: undefined;
                        height?: undefined;
                        verticalContentAlignment?: undefined;
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
                        horizontalAlignment?: undefined;
                        height?: undefined;
                        isVisible?: undefined;
                        verticalContentAlignment?: undefined;
                    } | {
                        type: string;
                        spacing: string;
                        id: string;
                        verticalContentAlignment: string;
                        items: {
                            type: string;
                            id: string;
                            weight: string;
                            text: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        selectAction: {
                            type: string;
                            tooltip: string;
                            url: string;
                            data: {
                                intent: string;
                                data: {
                                    url: string;
                                    label: string;
                                    id: string;
                                    type: string;
                                };
                                type?: undefined;
                                isRelatesto?: undefined;
                                isLinked?: undefined;
                            };
                        };
                        horizontalAlignment?: undefined;
                        height?: undefined;
                        isVisible?: undefined;
                    })[];
                    horizontalAlignment: string;
                } | {
                    type: string;
                    id: string;
                    columns: ({
                        type: string;
                        items: {
                            type: string;
                            text: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        id?: undefined;
                        horizontalAlignment?: undefined;
                        height?: undefined;
                    } | {
                        type: string;
                        id: string;
                        items: {
                            type: string;
                            id: string;
                            weight: string;
                            text: string;
                            spacing: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        horizontalAlignment: string;
                        height: string;
                    } | {
                        type: string;
                        id: string;
                        items: {
                            type: string;
                            weight: string;
                            text: string;
                            spacing: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        horizontalAlignment: string;
                        height: string;
                    })[];
                    horizontalAlignment?: undefined;
                } | {
                    type: string;
                    columns: ({
                        type: string;
                        items: {
                            type: string;
                            text: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        horizontalAlignment?: undefined;
                        height?: undefined;
                    } | {
                        type: string;
                        items: {
                            type: string;
                            weight: string;
                            text: string;
                            spacing: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        horizontalAlignment: string;
                        height: string;
                    })[];
                    id?: undefined;
                    horizontalAlignment?: undefined;
                })[];
            } | {
                type: string;
                $when: string;
                items: ({
                    type: string;
                    columns: ({
                        type: string;
                        spacing: string;
                        selectAction: {
                            type: string;
                            url: string;
                            data: {
                                intent: string;
                                data: string;
                                isLinked: string;
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
                        }[];
                        width: string;
                        verticalContentAlignment?: undefined;
                    } | {
                        type: string;
                        spacing: string;
                        id: string;
                        verticalContentAlignment: string;
                        items: {
                            type: string;
                            id: string;
                            weight: string;
                            text: string;
                            horizontalAlignment: string;
                            isSubtle: boolean;
                        }[];
                        width: string;
                        selectAction: {
                            type: string;
                            tooltip: string;
                            url: string;
                            data: {
                                intent: string;
                                data: {
                                    url: string;
                                    label: string;
                                    id: string;
                                    type: string;
                                };
                                isLinked?: undefined;
                            };
                        };
                    })[];
                    id?: undefined;
                    items?: undefined;
                } | {
                    type: string;
                    id: string;
                    items: {
                        type: string;
                        $data: string;
                        isVisible: boolean;
                        items: ({
                            type: string;
                            selectAction: {
                                type: string;
                                url: string;
                                data: {
                                    intent: string;
                                    data: string;
                                };
                            };
                            horizontalAlignment: string;
                            verticalAlignment: string;
                            bleed: boolean;
                            $when?: undefined;
                            columns?: undefined;
                        } | {
                            type: string;
                            $when: string;
                            columns: ({
                                type: string;
                                id: string;
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
                                    wrap: boolean;
                                }[];
                                selectAction: {
                                    type: string;
                                    tooltip: string;
                                };
                                width: string;
                                horizontalAlignment: string;
                                height: string;
                                id?: undefined;
                            })[];
                            selectAction?: undefined;
                            horizontalAlignment?: undefined;
                            verticalAlignment?: undefined;
                            bleed?: undefined;
                        })[];
                    }[];
                    columns?: undefined;
                })[];
                width?: undefined;
            })[];
            horizontalAlignment: string;
            verticalAlignment: string;
            bleed: boolean;
        }[];
        selectAction?: undefined;
        horizontalAlignment?: undefined;
        verticalAlignment?: undefined;
        bleed?: undefined;
    } | {
        type: string;
        selectAction: {
            type: string;
            url: string;
            data: {
                intent: string;
                data: string;
            };
        };
        horizontalAlignment: string;
        verticalAlignment: string;
        bleed: boolean;
        id?: undefined;
        $data?: undefined;
        spacing?: undefined;
        items?: undefined;
    })[];
    width: string;
    $schema: string;
    version: string;
};
