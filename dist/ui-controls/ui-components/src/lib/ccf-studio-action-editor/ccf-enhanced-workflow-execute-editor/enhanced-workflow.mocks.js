export const LISTOFAWECONFIGDEMODATA = {
    'version': '1.0',
    'configs': [
        {
            'name': 'Phone Search Configuration',
            'configId': '97914225-d898-47ad-a807-4ccf090f830a',
            'workflowId': '486a786f-4bb6-49d3-82a3-2bea4f984530',
            'workflowType': 'Search',
            'workflowSubtype': 'PhoneNumberSearch',
            'dynamicDataMappingId': '06eb7aab-6457-4ff5-aa99-172fceaa9c07',
            'crmName': 'Salesforce',
            'workflowInputPayload': { phoneNumber: 4005150009 },
            'phoneNumber': '+1234567890',
            'emailAddress': 'user@domain.com',
            'screenPop': 'phonePopAction',
            'entities': [
                {
                    'entityName': 'Contact',
                    'entityAPIName': 'Contact',
                    'columns': [
                        {
                            'columnName': 'PhoneNumber',
                            'columnAPIName': 'Phone',
                            'operator': 'equals',
                            'value': '+1234567890',
                            'condition': 'AND',
                        }
                    ],
                }
            ],
        },
        {
            'name': 'Email Search Configuration',
            'configId': '08f8c080-1d5a-4897-bcea-7b0e0c69abb6',
            'workflowId': 'q1r2s3t4-u5v6w7x8-y9z10a11b12c13d14e',
            'workflowType': 'Search',
            'workflowSubtype': 'EmailSearch',
            'dynamicDataMappingId': 'f1g2h3i4-j5k6l7m8-n9o10p11q12r13s14t',
            'crmName': 'Zendesk',
            'workflowInputPayload': { phoneNumber: 4005150009 },
            'phoneNumber': '+0987654321',
            'emailAddress': 'contact@domain.com',
            'screenPop': 'emailPopAction',
            'entities': [
                {
                    'entityName': 'User',
                    'entityAPIName': 'User',
                    'columns': [
                        {
                            'columnName': 'Email',
                            'columnAPIName': 'EmailAddress',
                            'operator': 'equals',
                            'value': 'contact@domain.com',
                            'condition': 'OR',
                        }
                    ],
                }
            ],
        },
        {
            'name': 'Custom Create Configuration',
            'configId': 'b1160c7d-6959-43f8-849b-209a1ad9cca0',
            'workflowId': 't1u2v3w4-x5y6z7a8-b9c10d11e12f13g14h',
            'workflowType': 'Create',
            'workflowSubtype': 'CustomSearch',
            'dynamicDataMappingId': 'k1l2m3n4-o5p6q7r8-s9t10u11v12w13x14',
            'crmName': 'ServiceNow',
            'workflowInputPayload': { phoneNumber: 4005150009 },
            'phoneNumber': '+1112233445',
            'emailAddress': 'newuser@domain.com',
            'screenPop': 'customCreatePopAction',
            'entities': [
                {
                    'entityName': 'Incident',
                    'entityAPIName': 'Incident',
                    'columns': [
                        {
                            'columnName': 'Description',
                            'columnAPIName': 'Description',
                            'operator': 'equal',
                            'value': 'System issue',
                            'condition': 'AND',
                        }
                    ],
                }
            ],
        }
    ],
};
//# sourceMappingURL=enhanced-workflow.mocks.js.map