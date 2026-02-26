/**
 * CcfCustomerCard Activity Template JSON - Used as template for displaying create entity button
 * @param props -?-translation
 * @example - activityHeaderTemplateJSON()
 */
export const relatedHeaderTemplateJSON = (translation) => {
    const refreshButton = {
        'isVisible': '${$root.isSearchConfigAvailable}',
        'type': 'Column',
        'id': 'refreshButton',
        'items': [
            {
                'type': 'ActionSet',
                'spacing': 'Small',
                'actions': [
                    {
                        'type': 'Action.Execute',
                        'title': `${translation('refresh')}`,
                        'data': 'searchActivity',
                        'url': '${url}',
                        'horizontalAlignment': 'Right',
                    }
                ],
            }
        ],
    };
    const createEntityButton = {
        'isVisible': '${$root.showCreateEntityButton}',
        'type': 'Column',
        'spacing': 'Small',
        'id': 'createEntityButton',
        'selectAction': {
            'type': 'Action.Execute',
            'tooltip': `${translation('createEntity')}`,
            'data': {
                'intent': 'createEntity',
            },
        },
        'items': [
            {
                'type': 'Input.Toggle',
                'valueOn': 'true',
                'valueOff': 'false',
                'label': 'Create Entity Button Label',
                'isRequired': false,
                'errorMessage': '',
                'fallback': 'drop',
                'actions': [
                    {
                        'type': 'Action.Execute',
                        'title': `${translation('createEntity')}`,
                        'horizontalAlignment': 'Right',
                    }
                ],
            }
        ],
        'width': 'auto',
    };
    const relatedEntityContainer = [
        refreshButton
    ];
    relatedEntityContainer.unshift(createEntityButton);
    return {
        type: 'AdaptiveCard',
        '@odata.type': '#microsoft.graph.user',
        id: 'ccfAppSpaceActivityContainer',
        body: [
            {
                'type': 'Container',
                'id': 'relatedHeaderContainer',
                'items': [
                    {
                        'type': 'ColumnSet',
                        'columns': relatedEntityContainer,
                    }
                ],
            }
        ],
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.5',
    };
};
/**
 * CcfCustomerCard Activity Template JSON - Used as template for activity
 * @example - templateJSON()
 */
export const templateJSON = () => {
    return {
        type: 'AdaptiveCard',
        '@odata.type': '#microsoft.graph.user',
        id: 'ccfAppSpaceActivityContainer',
        body: [
            {
                type: 'Container',
                $data: '${$root.record}',
                id: 'ccfAppSpaceActivityCardContainer',
                items: [
                    {
                        type: 'ColumnSet',
                        separator: true,
                        id: 'ccfPaddingLR10',
                        $when: '${id != null}',
                        columns: [
                            {
                                type: 'Column',
                                spacing: 'Small',
                                items: [
                                    {
                                        type: 'TextBlock',
                                        weight: 'Bolder',
                                        text: '${if(display == null, "",display)}',
                                        horizontalAlignment: 'Left',
                                        isSubtle: true,
                                    }
                                ],
                                selectAction: {
                                    type: 'Action.Execute',
                                    tooltip: '${if(display == null, "",display)}',
                                },
                                width: 'stretch',
                            },
                            {
                                type: 'Column',
                                spacing: 'Small',
                                id: 'relatestoIcon',
                                selectAction: {
                                    type: 'Action.Execute',
                                    url: '${url}',
                                    data: {
                                        intent: 'relatestoData',
                                        data: '${id}',
                                        type: '${type}',
                                        isRelatesto: '${relatesto}',
                                    },
                                    tooltip: '${if(relatesto == "true", "Related to the current interaction","Relate to the current interaction")}',
                                },
                                items: [
                                    {
                                        type: 'Input.Toggle',
                                        value: '${relatesto}',
                                        valueOn: 'true',
                                        valueOff: 'false',
                                        label: ' ',
                                        isRequired: false,
                                        errorMessage: '',
                                        fallback: 'drop',
                                    }
                                ],
                                width: 'auto',
                                isVisible: '${if(type == "contact" || type == "account" || type == "systemuser" || type == "lead" , "true", "false")}',
                            },
                            {
                                type: 'Column',
                                spacing: 'Small',
                                selectAction: {
                                    type: 'Action.Execute',
                                    url: '${url}',
                                    data: {
                                        intent: 'linkData',
                                        data: '${id}',
                                        isLinked: '${linked}',
                                    },
                                    tooltip: '${if(linked == "true", "Linked","Link")}',
                                },
                                id: 'toggleIcon',
                                items: [
                                    {
                                        type: 'Input.Toggle',
                                        value: '${linked}',
                                        valueOn: 'true',
                                        valueOff: 'false',
                                        label: ' ',
                                        isRequired: false,
                                        errorMessage: '',
                                        fallback: 'drop',
                                    }
                                ],
                                width: 'auto',
                            },
                            {
                                type: 'Column',
                                spacing: 'Small',
                                id: 'crmIcon',
                                verticalContentAlignment: 'Center',
                                selectAction: {
                                    type: 'Action.Execute',
                                    url: '${url}',
                                    data: {
                                        intent: 'openUrl',
                                        data: {
                                            url: '${$root.system.baseUrl}${url}',
                                            label: '${label}',
                                            id: '${id}',
                                            type: '${type}',
                                            crm: '${$root.system.type}',
                                        },
                                    },
                                    tooltip: '${label} ',
                                },
                                items: [
                                    {
                                        type: 'TextBlock',
                                        id: 'crmEntityName',
                                        weight: 'Bolder',
                                        text: '${label}',
                                        horizontalAlignment: 'Center',
                                        isSubtle: true,
                                    }
                                ],
                                width: 'auto',
                            },
                            {
                                type: 'Column',
                                spacing: 'Padding',
                                id: '${if(string(count(where(related,x, x))) == "0", "ccfAppSpaceActivityChevronHidden","ccfAppSpaceActivityChevron")}',
                                selectAction: {
                                    type: 'Action.Execute',
                                    data: {
                                        intent: 'toggleVisibility',
                                        data: '${$root.index}',
                                    },
                                },
                                verticalContentAlignment: 'Center',
                                horizontalAlignment: 'Right',
                                items: [
                                    {
                                        type: 'Image',
                                        id: 'chevronDown${$root.index}',
                                        url: 'https://adaptivecards.io/content/down.png',
                                        width: '20px',
                                        altText: 'Details collapsed',
                                        isVisible: true,
                                        $when: '${expanded == "false" || !expanded}',
                                    },
                                    {
                                        type: 'Image',
                                        id: 'chevronUp${$root.index}',
                                        url: 'https://adaptivecards.io/content/up.png',
                                        width: '20px',
                                        altText: 'Details expanded',
                                        isVisible: true,
                                        $when: '${expanded == "true"}',
                                    }
                                ],
                                width: 'auto',
                            }
                        ],
                    },
                    {
                        type: 'ColumnSet',
                        isVisible: true,
                        columns: [
                            {
                                type: 'Column',
                                spacing: 'Small',
                                items: [
                                    {
                                        type: 'Container',
                                        $data: '${fields}',
                                        isVisible: true,
                                        items: [
                                            {
                                                type: 'ColumnSet',
                                                $when: '${label != null}',
                                                columns: [
                                                    {
                                                        type: 'Column',
                                                        items: [
                                                            {
                                                                type: 'TextBlock',
                                                                text: '${label}: ',
                                                                horizontalAlignment: 'Left',
                                                                isSubtle: true,
                                                                weight: 'Bolder',
                                                            }
                                                        ],
                                                        width: 'auto',
                                                    },
                                                    {
                                                        type: 'Column',
                                                        items: [
                                                            {
                                                                type: 'TextBlock',
                                                                text: '${if(value == null, "",value)}',
                                                                spacing: 'None',
                                                                horizontalAlignment: 'Left',
                                                                isSubtle: true,
                                                            }
                                                        ],
                                                        selectAction: {
                                                            type: 'Action.Execute',
                                                            tooltip: '${if(value == null, "",value)} ',
                                                        },
                                                        width: 'stretch',
                                                        horizontalAlignment: 'Center',
                                                        height: 'stretch',
                                                    }
                                                ],
                                            }
                                        ],
                                    }
                                ],
                            }
                        ],
                        horizontalAlignment: 'Left',
                        verticalAlignment: 'Top',
                        bleed: true,
                    }
                ],
            }
        ],
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.5',
    };
};
//# sourceMappingURL=ccf-customer-card-activity-adaptive-card-template.js.map