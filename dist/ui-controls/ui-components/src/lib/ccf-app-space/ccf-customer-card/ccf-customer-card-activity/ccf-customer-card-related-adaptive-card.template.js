/* eslint-disable no-template-curly-in-string */
/**
 * CcfCustomerCard Activity Template JSON - Used as template for activity
 * @param props -?-translation
 * @example - templateJSON(translation)
 */
export const templateRelatedJSON = (translation) => {
    return {
        type: 'AdaptiveCard',
        '@odata.type': '#microsoft.graph.user',
        id: 'ccfAppSpaceActivityChildContainer',
        body: [
            {
                type: 'Container',
                id: 'ccfAppSpaceActivityCardChildContainer',
                $data: '${$root.related}',
                spacing: 'Small',
                items: [
                    {
                        type: 'ColumnSet',
                        id: '${if(fields == null || count(fields) == 0, "activityCard","relatedActivityCard")}',
                        selectAction: {
                            type: 'Action.Execute',
                            url: '${url}',
                            data: {
                                intent: 'openUrl',
                                data: { url: '${$root.system.baseUrl}${url}', label: '${label}', id: '${id}', type: '${type}' },
                            },
                        },
                        columns: [
                            //Display existing data on ticket in absence of dynamic data
                            {
                                type: 'Column',
                                $when: '${count(fields) == 0 || fields == null}',
                                width: 40,
                                items: [
                                    {
                                        type: 'ColumnSet',
                                        id: 'cardTitleColumnSet',
                                        columns: [
                                            {
                                                type: 'Column',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        text: `${translation('ccfActivityId')}`,
                                                        horizontalAlignment: 'Left',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'auto',
                                            },
                                            {
                                                type: 'Column',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        text: '${id} ',
                                                        spacing: 'None',
                                                        horizontalAlignment: 'Left',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'stretch',
                                                horizontalAlignment: 'Center',
                                                height: 'stretch',
                                                selectAction: {
                                                    type: 'Action.Execute',
                                                    tooltip: '${id} ',
                                                },
                                            },
                                            {
                                                type: 'Column',
                                                isVisible: '${if(type == "lead" || type == "systemuser", "true", "false")}',
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
                                                selectAction: {
                                                    type: 'Action.Execute',
                                                    tooltip: '${label} ',
                                                    url: '${url}',
                                                    data: {
                                                        intent: 'openUrl',
                                                        data: {
                                                            url: '${$root.system.baseUrl}${url}',
                                                            label: '${label}',
                                                            id: '${id}',
                                                            type: '${type}',
                                                        },
                                                    },
                                                },
                                            }
                                        ],
                                        horizontalAlignment: 'Left',
                                    },
                                    {
                                        type: 'ColumnSet',
                                        id: 'cardTitleColumnSet',
                                        columns: [
                                            {
                                                type: 'Column',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        text: `${translation('ccfActivityPriority')}`,
                                                        horizontalAlignment: 'Left',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'auto',
                                            },
                                            {
                                                type: 'Column',
                                                id: 'caseStatusPink',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        id: 'caseStatusRed',
                                                        weight: 'Bolder',
                                                        text: '${if(priority == null, "N/A",priority)}',
                                                        spacing: 'None',
                                                        horizontalAlignment: 'Left',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'auto',
                                                horizontalAlignment: 'Center',
                                                height: 'stretch',
                                            },
                                            {
                                                type: 'Column',
                                                id: 'positive',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        weight: 'Bolder',
                                                        text: '${if(state == null, "",state)}',
                                                        spacing: 'None',
                                                        horizontalAlignment: 'Right',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'stretch',
                                                horizontalAlignment: 'Center',
                                                height: 'stretch',
                                            }
                                        ],
                                    },
                                    {
                                        type: 'ColumnSet',
                                        columns: [
                                            {
                                                type: 'Column',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        text: `${translation('ccfActivityAssignedTo')}`,
                                                        horizontalAlignment: 'Left',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'auto',
                                            },
                                            {
                                                type: 'Column',
                                                items: [
                                                    {
                                                        type: 'TextBlock',
                                                        weight: 'Bolder',
                                                        text: '${if(assignedTo == null, "N/A",assignedTo)}',
                                                        spacing: 'None',
                                                        horizontalAlignment: 'Left',
                                                        isSubtle: true,
                                                    }
                                                ],
                                                width: 'auto',
                                                horizontalAlignment: 'Center',
                                                height: 'stretch',
                                            }
                                        ],
                                    }
                                ],
                            },
                            // Displays dynamic data on adaptive card from API response
                            {
                                type: 'Column',
                                $when: '${fields != null && count(fields) > 0}',
                                items: [
                                    {
                                        type: 'ColumnSet',
                                        columns: [
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
                                                    }
                                                ],
                                                width: 'auto',
                                            },
                                            {
                                                type: 'Column',
                                                spacing: 'Small',
                                                id: 'crmIcon',
                                                verticalContentAlignment: 'Center',
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
                                                selectAction: {
                                                    type: 'Action.Execute',
                                                    tooltip: '${label} ',
                                                    url: '${url}',
                                                    data: {
                                                        intent: 'openUrl',
                                                        data: {
                                                            url: '${$root.system.baseUrl}${url}',
                                                            label: '${label}',
                                                            id: '${id}',
                                                            type: '${type}',
                                                        },
                                                    },
                                                },
                                            }
                                        ],
                                    },
                                    {
                                        type: 'Container',
                                        id: 'keyValueContainer',
                                        items: [
                                            {
                                                type: 'Container',
                                                $data: '${fields}',
                                                isVisible: true,
                                                items: [
                                                    {
                                                        type: 'ColumnSet',
                                                        selectAction: {
                                                            type: 'Action.Execute',
                                                            url: '${url}',
                                                            data: {
                                                                intent: 'openUrl',
                                                                data: '${$root.system.baseUrl}${url}',
                                                            },
                                                        },
                                                        horizontalAlignment: 'Left',
                                                        verticalAlignment: 'Top',
                                                        bleed: true,
                                                    },
                                                    {
                                                        type: 'ColumnSet',
                                                        $when: '${label != null}',
                                                        columns: [
                                                            {
                                                                type: 'Column',
                                                                id: 'keyColumn',
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
                                                                        text: '${if(value == null, "",value)} ',
                                                                        spacing: 'None',
                                                                        horizontalAlignment: 'Left',
                                                                        isSubtle: true,
                                                                        wrap: false,
                                                                    }
                                                                ],
                                                                selectAction: {
                                                                    type: 'Action.Execute',
                                                                    tooltip: '${if(value == null, "",value)} ',
                                                                },
                                                                width: 'auto',
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
                            }
                        ],
                        horizontalAlignment: 'Left',
                        verticalAlignment: 'Top',
                        bleed: true,
                    }
                ],
            },
            {
                type: 'ColumnSet',
                selectAction: {
                    type: 'Action.Execute',
                    url: '${url}',
                    data: {
                        intent: 'openUrl',
                        data: '${$root.system.baseUrl}${url}',
                    },
                },
                horizontalAlignment: 'Left',
                verticalAlignment: 'Top',
                bleed: true,
            }
        ],
        width: 'stretch',
        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
        version: '1.5',
    };
};
//# sourceMappingURL=ccf-customer-card-related-adaptive-card.template.js.map