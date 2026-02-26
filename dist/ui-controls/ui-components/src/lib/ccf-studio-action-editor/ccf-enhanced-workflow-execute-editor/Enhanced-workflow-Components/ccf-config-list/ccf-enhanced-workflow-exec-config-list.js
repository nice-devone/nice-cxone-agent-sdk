import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WorkflowSubType } from '../../helpers/enhanced-workflow-models';
import List from '@mui/material/List';
import { ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { useState } from 'react';
import CcfListofEnhancedWEConfigStyles from './ccf-enhanced-workflow-exec-config-list-styles';
import { useSelector, useDispatch } from 'react-redux';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import { deleteHoverIcon, deleteUnhoverIcon, emailSearchIcon, phoneSearchIcon, customSearchTileIcon, automaticCreateTileIcon, manualCreateTileIcon } from '../ccf-enhanced-workflow-exec-icon';
import CcfEnhancedWEWarningPopOver from '../ccf-enhanced-workflow-popover';
import { initialnewEWEConfigurationCreated } from '../../ccf-enhanced-workflow-execute-editor.slice';
import { toast } from 'react-toastify';
/**
 * Component displays agent advance workflow execution configuration list
 * @returns agent advance workflow execution configuration list component
 * @example <ccfListofAWEConfig />
 */
const CcfListofEnhancedWEConfig = ({ workflowconfigdata }) => {
    var _a, _b, _c, _d;
    const [selectedConfigName, setSelectedConfigName] = useState(null);
    const [selectedConfigIcons, setSelectedConfigIcons] = useState({});
    const dispatch = useDispatch();
    const { SUMMARY_TEST, HOME_SCREEN } = CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen;
    const applicationExistingConfiguration = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getapplicationEWEConfiguration)) !== null && _a !== void 0 ? _a : {};
    const selectedEnhancedWorkflowConfig = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _b !== void 0 ? _b : {};
    const { configId } = selectedEnhancedWorkflowConfig;
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedIndexofConfig, setSelectedIndexofConfig] = useState(-1);
    const selectedConfigIndexforEdit = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getSelectedAWEConfigIndex)) !== null && _c !== void 0 ? _c : -1;
    const currentComponentRendered = (_d = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getCurrentComponentRendered)) !== null && _d !== void 0 ? _d : '';
    /**
   * This is used to set the selected id to state
   * @returns setSelectedConfigName(id)
   * @example handleSelect(id)
   */
    const handleSelect = (configdata, index) => {
        setSelectedConfigName(configdata.name);
        const { name, configId, crmName, workflowType, workflowSubtype, workflowId, dynamicDataMappingId, phoneNumber, emailAddress, entities, workflowInputPayload, cacheResponse, screenPop, pinnedRecord, relatesTo } = configdata;
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { name,
            configId,
            crmName,
            workflowType,
            workflowSubtype,
            workflowId,
            dynamicDataMappingId,
            phoneNumber,
            emailAddress,
            entities,
            workflowInputPayload,
            cacheResponse,
            screenPop,
            pinnedRecord,
            relatesTo })));
        const summarySubtypes = new Set([
            WorkflowSubType.PhoneNumberSearch,
            WorkflowSubType.EmailSearch,
            WorkflowSubType.CustomSearch,
            WorkflowSubType.AutomaticCreate,
            WorkflowSubType.ManualCreate
        ]);
        if (summarySubtypes.has(selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.workflowSubtype) ||
            summarySubtypes.has(workflowSubtype)) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(SUMMARY_TEST));
        }
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setActiveStep(0));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setselectedEWEConfigIndex(index));
    };
    /**
   * This is used to set the selected icons to state for performing action on it
   * @returns setSelectedConfigIcons([id]:prevSelectedConfigIcons)
   * @example handleSelectConfigIcons(id,type)
   */
    const handleSelectConfigIcons = (itemId, iconType, event) => {
        event.stopPropagation();
        setSelectedConfigIcons(prevSelectedConfigIcons => {
            const currentIcons = prevSelectedConfigIcons[itemId] || {
                delete: false,
            };
            const newIcons = Object.assign(Object.assign({}, currentIcons), { [iconType]: !currentIcons[iconType] });
            // If all icons are deselected, remove the entry from the object
            if (!newIcons.delete) {
                const _a = prevSelectedConfigIcons, _b = itemId, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                return rest;
            }
            return Object.assign(Object.assign({}, prevSelectedConfigIcons), { [itemId]: newIcons });
        });
    };
    /**
   * This is used to Delete the selected configs from the studio
   * @returns return success
   * @example handleDeleteOfSelectedConfiguration(name,index)
   */
    const handleDeleteOfSelectedConfiguration = (name, index) => {
        setSelectedName(name);
        setIsPopOverOpen(true);
        setSelectedIndexofConfig(index);
    };
    /**
   * This is used to Delete the selected configs from the studio
   * @returns return success
  * @example handleDeleteOfSelectedConfiguration(id)
   */
    const handleConfirmation = () => {
        const updatedConfigs = applicationExistingConfiguration.configs.filter((config) => config.name !== selectedName);
        const updatedApplicationExistingConfiguration = Object.assign(Object.assign({}, applicationExistingConfiguration), { configs: updatedConfigs });
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEnhancedWorkflowConfigs(updatedApplicationExistingConfiguration));
        if (currentComponentRendered === SUMMARY_TEST) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(HOME_SCREEN));
        }
        if (selectedConfigIndexforEdit === selectedIndexofConfig) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(HOME_SCREEN));
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(initialnewEWEConfigurationCreated));
        }
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEWEWorkflowsTestResult([]));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.thunks.handleApply());
        setIsPopOverOpen(false);
        toast.success('Enhanced Workflow Configuration Deleted Successfully');
    };
    const theme = useTheme();
    const styles = CcfListofEnhancedWEConfigStyles(theme);
    /**
     * Functions handles close of pop over
     * @example handleClose()
     */
    const handleClose = () => {
        const updatedIcons = Object.assign({}, selectedConfigIcons);
        if (updatedIcons[selectedName]) {
            updatedIcons[selectedName].delete = false;
        }
        setSelectedConfigIcons(updatedIcons);
        setIsPopOverOpen(false);
        toast.success('Enhanced Workflow Configuration Restored Successfully');
    };
    return (_jsxs(List, Object.assign({ sx: styles.listStyle }, { children: [workflowconfigdata.map((configdata, index) => {
                var _a;
                return (_jsxs(ListItemButton, Object.assign({ onClick: () => handleSelect(configdata, index), disableRipple: true, sx: {
                        position: 'relative',
                        borderTop: `0.5px solid ${theme.palette.border.dark}`,
                        borderBottom: `0.5px solid ${theme.palette.border.dark}`,
                        padding: '8px 2px 8px 8px',
                        margin: '0',
                        backgroundColor: ((selectedConfigName === configdata.name && configId) || selectedConfigIndexforEdit === index) ? theme.palette.background.paper : theme.palette.background.level1,
                        '&:hover': {
                            backgroundColor: theme.palette.background.default,
                        },
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            backgroundColor: ((selectedConfigName === configdata.name && configId) || selectedConfigIndexforEdit === index) ? theme.palette.primary.main : theme.palette.background.transparent,
                        },
                    } }, { children: [_jsx(ListItemText, { primary: _jsxs("span", Object.assign({ style: styles.listTextStyle }, { children: [_jsx(ListItemIcon, { sx: Object.assign(Object.assign({}, styles.searchTypeIconStyle), { backgroundImage: `url(${{
                                                'PhoneNumberSearch': phoneSearchIcon,
                                                'EmailSearch': emailSearchIcon,
                                                'CustomSearch': customSearchTileIcon,
                                                'AutomaticCreate': automaticCreateTileIcon,
                                                'ManualCreate': manualCreateTileIcon,
                                            }[configdata.workflowSubtype] || ''})` }) }), _jsx("span", Object.assign({ style: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word' } }, { children: configdata.name }))] })), primaryTypographyProps: {
                                fontSize: '13px',
                                width: 'auto',
                            } }), _jsx(ListItemIcon, { sx: Object.assign(Object.assign({}, styles.deleteIconStyle), { backgroundImage: ((_a = selectedConfigIcons[configdata.name]) === null || _a === void 0 ? void 0 : _a.delete) ? `url(${deleteHoverIcon})` : `url(${deleteUnhoverIcon})` }), onClick: (event) => { handleSelectConfigIcons(configdata.name, 'delete', event); handleDeleteOfSelectedConfiguration(configdata.name, index); } })] }), configdata.name));
            }), _jsx(CcfEnhancedWEWarningPopOver, { open: isPopOverOpen, onClose: handleClose, onConfirm: handleConfirmation, button1Title: 'No', button2Title: 'Yes', message: 'Are you sure you want to delete this configuration', title: 'Confirmation Required' })] })));
};
export default CcfListofEnhancedWEConfig;
//# sourceMappingURL=ccf-enhanced-workflow-exec-config-list.js.map