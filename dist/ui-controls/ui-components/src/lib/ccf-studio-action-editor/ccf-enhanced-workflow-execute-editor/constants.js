import { phoneSearchTileIcon, emailSearchTileIcon, customSearchTileIcon, smsSearchTileIcon, whatsappSearchIcon, automaticCreateTileIcon, manualCreateTileIcon, } from './Enhanced-workflow-Components/ccf-enhanced-workflow-exec-icon';
const PARAMETERS = {
    CONFIGURATION_ID: 'configurationId',
    WORKFLOW_ID: 'workflowId',
};
const WORKFLOW_EWETEST = {
    InteractionID: '',
    ContactID: '',
};
const WORKFLOW_TYPES = [
    {
        icon: '', searchType: 'PhoneNumberSearch', title: 'Phone Number Search',
        additionalIcons: [
            { src: phoneSearchTileIcon, width: 1.6, height: 2.12, marginRight: 5, backgroundSize: 'contain' },
            { src: smsSearchTileIcon, width: 2.12, height: 2.12, marginRight: 0, backgroundSize: 'auto' },
            { src: whatsappSearchIcon, width: 2.12, height: 2.12, marginRight: 0, backgroundSize: 'auto' }
        ],
    },
    { icon: emailSearchTileIcon, searchType: 'EmailSearch', title: 'Email Search' },
    { icon: customSearchTileIcon, searchType: 'CustomSearch', title: 'Dynamic Search' },
    { icon: automaticCreateTileIcon, searchType: 'AutomaticCreate', title: 'Automatic Create' },
    { icon: manualCreateTileIcon, searchType: 'ManualCreate', title: 'Manual Create' }
];
export default {
    PARAMETERS,
    ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY: 'enhancedworkflowExecuteEditorSlice',
    WORKFLOW_TYPES,
    WORKFLOW_EWETEST,
};
//# sourceMappingURL=constants.js.map