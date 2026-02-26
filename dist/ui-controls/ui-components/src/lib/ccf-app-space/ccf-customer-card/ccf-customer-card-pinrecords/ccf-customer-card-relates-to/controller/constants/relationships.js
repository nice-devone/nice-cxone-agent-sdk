/**
 * A map with all supported ServiceNow CRM relationships.
 */
export const relationships = {
    'servicenow': {
        sn_customerservice_case: {
            relatableEntities: ['csm_consumer', 'customer_account', 'customer_contact'],
            relateableEntityFields: {
                csm_consumer: 'consumer',
                customer_account: 'account',
                customer_contact: 'contact',
            },
        },
        incident: {
            relatableEntities: ['sys_user'],
            relateableEntityFields: {
                sys_user: 'caller_id',
            },
        },
        interaction: {
            relatableEntities: ['sys_user'],
            relateableEntityFields: {
                sys_user: 'opened_for',
            },
        },
    },
    'msd': {
        phonecall: {
            relatableEntities: ['contact', 'account', 'systemuser', 'lead'],
            relateableEntityFields: {
                contact: ['from', 'to'],
                account: ['from', 'to'],
                systemuser: ['from', 'to'],
                lead: ['from', 'to'],
            },
        },
    },
};
//# sourceMappingURL=relationships.js.map