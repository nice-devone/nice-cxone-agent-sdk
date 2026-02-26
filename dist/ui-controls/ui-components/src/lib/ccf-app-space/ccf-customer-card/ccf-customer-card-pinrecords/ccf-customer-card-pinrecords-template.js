/* eslint-disable no-template-curly-in-string */
/**
 * CcfCustomerCard Activity Template JSON - Used as template for activity
 * @param props -?-translation
 * @example
 */
export const templateJSON = (translation) => {
    return {
        'type': 'AdaptiveCard',
        '@odata.type': '#microsoft.graph.user',
        'id': 'ccfAppSpaceActivityContainer',
        '$data': '${result}',
        'body': [
            {
                'type': 'Container',
                '$data': '${$root.selectedActivityData.result[0].pinRecords}',
                'id': 'ccfAppSpaceActivityCardContainer',
                'items': [
                    {
                        'type': 'ColumnSet',
                        'id': 'cardContent${$index}',
                        'isVisible': true,
                        '$when': '${id != null}',
                        'columns': [
                            {
                                'type': 'Column',
                                'spacing': 'Small',
                                'items': [
                                    {
                                        'type': 'Container',
                                        'items': [
                                            {
                                                'type': 'ColumnSet',
                                                'id': '${if(fields == null || count(fields) == 0, \'activityCard\',\'relatedActivityCard\')}',
                                                'selectAction': {
                                                    'type': 'Action.Execute',
                                                    'url': '${url}',
                                                    '$when': '${$root.relatesToEnableRowOpenURL == true}',
                                                    'data': {
                                                        'intent': 'openUrl',
                                                        'data': { 'url': '${$root.selectedActivityData.result[0].system.baseUrl}${url}', 'label': '${label}', 'id': '${id}', 'type': '${type}' },
                                                    },
                                                },
                                                'columns': [
                                                    // NOTE : THIS COLUMN CONSTRUCTS THE CURRENT INTERACTION PINNED RECORD
                                                    {
                                                        'type': 'Column',
                                                        '$when': '${count(fields) == 0 || fields == null}',
                                                        'width': 40,
                                                        'items': [
                                                            {
                                                                'type': 'ColumnSet',
                                                                'id': 'cardTitleColumnSet',
                                                                'columns': [
                                                                    {
                                                                        'type': 'Column',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'text': `${translation('ccfActivityId')}`,
                                                                                'horizontalAlignment': 'Left',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    {
                                                                        'type': 'Column',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'text': '${id}',
                                                                                'spacing': 'None',
                                                                                'horizontalAlignment': 'Left',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'stretch',
                                                                        'horizontalAlignment': 'Center',
                                                                        'height': 'stretch',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'tooltip': '${id} ',
                                                                        },
                                                                    },
                                                                    // NOTE : RELATES TO
                                                                    {
                                                                        'isVisible': '${$root.relatesToPinnedRecords[id].isVisible == true}',
                                                                        'type': 'Column',
                                                                        'spacing': 'Small',
                                                                        'id': '${$root.relatesToPinnedRecords[id].elementAttributeOfID}',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'url': '${url}',
                                                                            'tooltip': '${$root.relatesToPinnedRecords[id].tooltipMessage}',
                                                                            'data': {
                                                                                'intent': 'relatesTo',
                                                                                'id': '${id}',
                                                                                'type': '${type}',
                                                                                'crm': '${$root.relatesToPinnedRecords[id].crm}',
                                                                                'isRelatesToEnabled': '${$root.relatesToPinnedRecords[id].isRelatesToEnabled}',
                                                                                'configurationId': '${$root.relatesToPinnedRecords[id].configurationId}',
                                                                                'workflowId': '${$root.relatesToPinnedRecords[id].workflowId}',
                                                                            },
                                                                        },
                                                                        'items': [
                                                                            {
                                                                                'type': 'Input.Toggle',
                                                                                'valueOn': 'true',
                                                                                'valueOff': 'false',
                                                                                'label': ' ',
                                                                                'isRequired': false,
                                                                                'errorMessage': '',
                                                                                'fallback': 'drop',
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    // NOTE : LINK
                                                                    {
                                                                        'type': 'Column',
                                                                        'spacing': 'Small',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'url': '${url}',
                                                                            'data': {
                                                                                'intent': 'linkData',
                                                                                'data': '${id}',
                                                                                'isLinked': '${linked}',
                                                                            },
                                                                            'tooltip': '${if(linked == \'true\', \'Linked\',\'Link\')}',
                                                                        },
                                                                        'id': '${if(linkable, \'toggleIcon\',\'toggleIcon\')}',
                                                                        'items': [
                                                                            {
                                                                                'type': 'Input.Toggle',
                                                                                'value': '${linked}',
                                                                                'valueOn': 'true',
                                                                                'valueOff': 'false',
                                                                                'label': ' ',
                                                                                'isRequired': false,
                                                                                'errorMessage': '',
                                                                                'fallback': 'drop',
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    // NOTE : CRM BADGE
                                                                    {
                                                                        'type': 'Column',
                                                                        'spacing': 'Small',
                                                                        'id': 'crmIcon',
                                                                        'verticalContentAlignment': 'Center',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'id': 'crmEntityName',
                                                                                'weight': 'Bolder',
                                                                                'text': '${label}',
                                                                                'horizontalAlignment': 'Center',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'tooltip': '${label} ',
                                                                            'url': '${url}',
                                                                            'data': {
                                                                                'intent': 'openUrl',
                                                                                'data': { 'url': '${$root.selectedActivityData.result[0].system.baseUrl}${url}', 'label': '${label}', 'id': '${id}', 'type': '${type}' },
                                                                            },
                                                                        },
                                                                    }
                                                                ],
                                                                'horizontalAlignment': 'Left',
                                                            },
                                                            {
                                                                'type': 'ColumnSet',
                                                                'id': 'cardTitleColumnSet',
                                                                'columns': [
                                                                    {
                                                                        'type': 'Column',
                                                                        '$when': '${priority != null}',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'text': `${translation('ccfActivityPriority')}`,
                                                                                'horizontalAlignment': 'Left',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    {
                                                                        'type': 'Column',
                                                                        '$when': '${priority != null}',
                                                                        'id': 'caseStatusPink',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'id': 'caseStatusRed',
                                                                                'weight': 'Bolder',
                                                                                'text': '${priority}',
                                                                                'spacing': 'None',
                                                                                'horizontalAlignment': 'Left',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                        'horizontalAlignment': 'Center',
                                                                        'height': 'stretch',
                                                                    },
                                                                    {
                                                                        'type': 'Column',
                                                                        'id': 'positive',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'weight': 'Bolder',
                                                                                'text': '${if(state == null, \'\',state)}',
                                                                                'spacing': 'None',
                                                                                'horizontalAlignment': 'Right',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'stretch',
                                                                        'horizontalAlignment': 'Center',
                                                                        'height': 'stretch',
                                                                    }
                                                                ],
                                                            },
                                                            {
                                                                'type': 'ColumnSet',
                                                                '$when': '${assignedTo != null}',
                                                                'columns': [
                                                                    {
                                                                        'type': 'Column',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'text': `${translation('ccfActivityAssignedTo')}`,
                                                                                'horizontalAlignment': 'Left',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    {
                                                                        'type': 'Column',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'weight': 'Bolder',
                                                                                'text': '${assignedTo}',
                                                                                'spacing': 'None',
                                                                                'horizontalAlignment': 'Left',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                        'horizontalAlignment': 'Center',
                                                                        'height': 'stretch',
                                                                    }
                                                                ],
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        'type': 'Column',
                                                        '$when': '${fields != null && count(fields) > 0}',
                                                        'items': [
                                                            {
                                                                'type': 'ColumnSet',
                                                                'columns': [
                                                                    // NOTE : THIS COLUMN CONSTRUCTS THE RELATES TO
                                                                    {
                                                                        'isVisible': '${$root.relatesToPinnedRecords[id].isVisible == true}',
                                                                        'type': 'Column',
                                                                        'spacing': 'Small',
                                                                        'id': '${$root.relatesToPinnedRecords[id].elementAttributeOfID}',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'url': '${url}',
                                                                            'tooltip': '${$root.relatesToPinnedRecords[id].tooltipMessage}',
                                                                            'data': {
                                                                                'intent': 'relatesTo',
                                                                                'id': '${id}',
                                                                                'type': '${type}',
                                                                                'crm': '${$root.relatesToPinnedRecords[id].crm}',
                                                                                'isRelatesToEnabled': '${$root.relatesToPinnedRecords[id].isRelatesToEnabled}',
                                                                                'configurationId': '${$root.relatesToPinnedRecords[id].configurationId}',
                                                                                'workflowId': '${$root.relatesToPinnedRecords[id].workflowId}',
                                                                            },
                                                                        },
                                                                        'items': [
                                                                            {
                                                                                'type': 'Input.Toggle',
                                                                                'valueOn': 'true',
                                                                                'valueOff': 'false',
                                                                                'label': ' ',
                                                                                'isRequired': false,
                                                                                'errorMessage': '',
                                                                                'fallback': 'drop',
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    {
                                                                        'type': 'Column',
                                                                        'spacing': 'Small',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'url': '${url}',
                                                                            'data': {
                                                                                'intent': 'linkData',
                                                                                'data': '${id}',
                                                                                'isLinked': '${linked}',
                                                                            },
                                                                            'tooltip': '${if(linked == \'true\', \'Linked\',\'Link\')}',
                                                                        },
                                                                        'id': 'toggleIcon',
                                                                        'items': [
                                                                            {
                                                                                'type': 'Input.Toggle',
                                                                                'value': '${linked}',
                                                                                'valueOn': 'true',
                                                                                'valueOff': 'false',
                                                                                'label': ' ',
                                                                                'isRequired': false,
                                                                                'errorMessage': '',
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                    },
                                                                    {
                                                                        'type': 'Column',
                                                                        'spacing': 'Small',
                                                                        'id': 'crmIcon',
                                                                        'verticalContentAlignment': 'Center',
                                                                        'items': [
                                                                            {
                                                                                'type': 'TextBlock',
                                                                                'id': 'crmEntityName',
                                                                                'weight': 'Bolder',
                                                                                'text': '${label}',
                                                                                'horizontalAlignment': 'Center',
                                                                                'isSubtle': true,
                                                                            }
                                                                        ],
                                                                        'width': 'auto',
                                                                        'selectAction': {
                                                                            'type': 'Action.Execute',
                                                                            'tooltip': '${label} ',
                                                                            'url': '${url}',
                                                                            'data': {
                                                                                'intent': 'openUrl',
                                                                                'data': { 'url': '${$root.selectedActivityData.result[0].system.baseUrl}${url}', 'label': '${label}', 'id': '${id}', 'type': '${type}' },
                                                                            },
                                                                        },
                                                                    }
                                                                ],
                                                            },
                                                            {
                                                                'type': 'Container',
                                                                'id': 'keyValueContainer',
                                                                'items': [
                                                                    {
                                                                        'type': 'Container',
                                                                        '$data': '${fields}',
                                                                        'isVisible': true,
                                                                        'items': [
                                                                            {
                                                                                'type': 'ColumnSet',
                                                                                'selectAction': {
                                                                                    'type': 'Action.Execute',
                                                                                    'url': '${url}',
                                                                                    'data': {
                                                                                        'intent': 'openUrl',
                                                                                        'data': '${$root.selectedActivityData.result[0].system.baseUrl}${url}',
                                                                                    },
                                                                                },
                                                                                'horizontalAlignment': 'Left',
                                                                                'verticalAlignment': 'Top',
                                                                                'bleed': true,
                                                                            },
                                                                            {
                                                                                'type': 'ColumnSet',
                                                                                '$when': '${label != null}',
                                                                                'columns': [
                                                                                    {
                                                                                        'type': 'Column',
                                                                                        'id': 'keyColumn',
                                                                                        'items': [
                                                                                            {
                                                                                                'type': 'TextBlock',
                                                                                                'text': '${label}: ',
                                                                                                'horizontalAlignment': 'Left',
                                                                                                'isSubtle': true,
                                                                                                'weight': 'Bolder',
                                                                                            }
                                                                                        ],
                                                                                        'width': 'auto',
                                                                                    },
                                                                                    {
                                                                                        'type': 'Column',
                                                                                        'items': [
                                                                                            {
                                                                                                'type': 'TextBlock',
                                                                                                'text': '${if(value == null, \'\',value)} ',
                                                                                                'spacing': 'None',
                                                                                                'horizontalAlignment': 'Left',
                                                                                                'isSubtle': true,
                                                                                                'wrap': false,
                                                                                            }
                                                                                        ],
                                                                                        'selectAction': {
                                                                                            'type': 'Action.Execute',
                                                                                            'tooltip': '${if(value == null, \'\',value)} ',
                                                                                        },
                                                                                        'width': 'auto',
                                                                                        'horizontalAlignment': 'Center',
                                                                                        'height': 'stretch',
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
                                                'horizontalAlignment': 'Left',
                                                'verticalAlignment': 'Top',
                                                'bleed': true,
                                            }
                                        ],
                                    },
                                    {
                                        'type': 'ColumnSet',
                                        'selectAction': {
                                            'type': 'Action.Execute',
                                            'url': '${url}',
                                            'data': {
                                                'intent': 'openUrl',
                                                'data': '${$root.selectedActivityData.result[0].system.baseUrl}${url}',
                                            },
                                        },
                                        'horizontalAlignment': 'Left',
                                        'verticalAlignment': 'Top',
                                        'bleed': true,
                                    }
                                ],
                                'width': 'stretch',
                            }
                        ],
                    }
                ],
            }
        ],
        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
        'version': '1.5',
    };
};
//# sourceMappingURL=ccf-customer-card-pinrecords-template.js.map