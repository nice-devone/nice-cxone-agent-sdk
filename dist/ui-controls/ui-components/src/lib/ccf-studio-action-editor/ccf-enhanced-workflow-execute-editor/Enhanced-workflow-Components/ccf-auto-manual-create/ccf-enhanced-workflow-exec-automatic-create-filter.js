import { __awaiter } from "tslib";
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import CcfAutomaticCreateStyles from './ccf-enhanced-workflow-exec-automatic-create-filter-styles';
import { useTheme, Box, Grid, Card, CardContent, TextField, CircularProgress, Paper } from '@mui/material';
import { CcfBox, CcfTypography, CcfButton, CcfDeboucedInput, CcfAutoComplete } from '@nice-devone/ui-controls';
import CcfEnhancedWEStepperContainer from '../ccf-stepper-section/ccf-enhanced-workflow-exec-stepper-container';
import { useSelector, useDispatch } from 'react-redux';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { WorkflowType, WorkflowSubType } from '../../helpers/enhanced-workflow-models';
import { fetchWorkflowEntitiesFields } from '../../thunks';
/**
 * Component displays Enhanced workflow execution application Automatic Create screen.
 *
 * This component renders a "Automatic Create" section for the Enhanced workflow execution application.
 *
 * @returns JSX.Element A component displaying the Enhanced workflow execution Automatic Create screen.
 * @example
 *   <CcfEnhancedWEAutomaticCreate />
 */
const CcfEnhancedWEAutoCreateFilter = () => {
    var _a, _b, _c, _d;
    const theme = useTheme();
    const styles = CcfAutomaticCreateStyles(theme);
    const dispatch = useDispatch();
    const configselectedcrmentities = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getEntities)) !== null && _a !== void 0 ? _a : [];
    const selectedEnhancedWorkflowConfig = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _b !== void 0 ? _b : {};
    const [selectedEntityforCreate, setSelectedEntityforCreate] = useState('');
    const [newRow, setNewRow] = useState({ fieldName: '', operator: '', variable: '', condition: '' });
    const applicationExistingConfiguration = (_c = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getapplicationEWEConfiguration)) !== null && _c !== void 0 ? _c : {};
    const crmentityFieldsOptions = (_d = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getEntitiesFields)) !== null && _d !== void 0 ? _d : {};
    /**
     * useEffect to set the selected entity value to the state when the component renders
     */
    useEffect(() => {
        var _a;
        if (((_a = selectedEnhancedWorkflowConfig.entities) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            setSelectedEntityforCreate(selectedEnhancedWorkflowConfig.entities[0].entityName);
        }
    }, [selectedEnhancedWorkflowConfig.entities]);
    /**
     * Function to fetch fields for all CRM selected
     * @example - fetchAllEntitiesFields()
     */
    const fetchAllEntitiesFields = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Promise.all(selectedEnhancedWorkflowConfig.entities.map(entity => dispatch(fetchWorkflowEntitiesFields({
                entityName: entity.entityAPIName,
                configurationId: selectedEnhancedWorkflowConfig.configId,
            }))));
        }
        catch (error) {
            console.error('Error while fetching fields for all entities:', error);
        }
    });
    // Load the fields of the previously configured entities
    useEffect(() => {
        fetchAllEntitiesFields();
    }, []);
    /**
   * Function to set the selected entity for create and call the API to fetch the fields of the selected entity
   * @example - handleAddEntity()
   */
    const handleAddEntity = () => {
        var _a, _b;
        if (!selectedEntityforCreate) {
            toast.error('Please select an entity before adding.');
            return;
        }
        dispatch(fetchWorkflowEntitiesFields({
            entityName: ((_a = configselectedcrmentities.find(entity => entity.label === selectedEntityforCreate)) === null || _a === void 0 ? void 0 : _a.name) || '',
            configurationId: selectedEnhancedWorkflowConfig.configId,
        }));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.addRow({
            entity: selectedEntityforCreate,
            row: newRow,
            entityAPIName: ((_b = configselectedcrmentities.find(entity => entity.label === selectedEntityforCreate)) === null || _b === void 0 ? void 0 : _b.name) || '',
        }));
        setNewRow({ fieldName: '', operator: '', variable: '', condition: '' });
    };
    /**
   * Function to delete the added entity
   * @example - handleDeleteEntity()
   */
    const handleDeleteEntity = () => {
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setSelectedConfiguration(Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { entities: [] })));
    };
    /**
     * Function to update the fields value for the column of entities
     * @example - handleColumnChange()
     */
    const handleColumnChange = (entityIndex, paramIndex, fieldName, value, label) => {
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.updateColumnCriteria({
            entityIndex,
            paramIndex,
            fieldName,
            value,
            label,
        }));
    };
    /**
   * Function to remove the added entity field and variable row of the selected entity
   * @example - handleDeleteColumn()
   */
    const handleDeleteColumn = (entityIndex, paramIndex) => {
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.deleteColumn({
            entityIndex,
            paramIndex,
        }));
    };
    /**
   * Function to add the new row for entity field and variable addition
   * @example - handleAddEntityFieldRow()
   */
    const handleAddEntityFieldRow = (entityName) => {
        const entity = selectedEnhancedWorkflowConfig.entities.find((entity) => entity.entityName === entityName);
        if (entity) {
            if (entity.columns.length < 5) {
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.addEntityRow({
                    entity: entityName,
                    row: newRow,
                    entityAPIName: entityName,
                }));
                setNewRow({ fieldName: '', operator: '', variable: '', condition: '' });
            }
            else {
                toast.info('Maximum of 5 rows allowed for each entity');
            }
        }
    };
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        const currentConfigId = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.configId;
        const currentWorkflowType = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.workflowType;
        const currentWorkflowSubtype = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.workflowSubtype;
        // Early return if configs is empty or undefined
        if (!((_a = applicationExistingConfiguration === null || applicationExistingConfiguration === void 0 ? void 0 : applicationExistingConfiguration.configs) === null || _a === void 0 ? void 0 : _a.length)) {
            // Reset the automatic create page if entities length greater than 1
            if (((_b = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.entities) === null || _b === void 0 ? void 0 : _b.length) > 1) {
                dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.resetPage());
                setSelectedEntityforCreate('');
            }
            return;
        }
        const existingConfigId = (_c = applicationExistingConfiguration.configs[0]) === null || _c === void 0 ? void 0 : _c.configId;
        // Reset the automatic create page only if currentConfigId exists and is different
        if ((currentConfigId && currentConfigId !== existingConfigId) || (((_d = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.entities) === null || _d === void 0 ? void 0 : _d.length) > 1)) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.resetPage());
            setSelectedEntityforCreate('');
            return;
        }
        // Check if we're switching from Manual Create to Automatic Create mode with multiple entities
        // This ensures we reset the page when changing modes to prevent invalid entity states
        if (currentWorkflowType === WorkflowType.Create && currentWorkflowSubtype === WorkflowSubType.AutomaticCreate && ((_e = selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.entities) === null || _e === void 0 ? void 0 : _e.length) > 1) {
            dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.resetPage());
        }
    }, [selectedEnhancedWorkflowConfig.configId, applicationExistingConfiguration]);
    /**
   * Function to handle the field change in the autocomplete component
   * @example - handleFieldChange()
   */
    const handleFieldChange = (entityIndex, paramIndex, _, newValue) => {
        handleColumnChange(entityIndex, paramIndex, 'fieldName', (newValue === null || newValue === void 0 ? void 0 : newValue.name) || '', newValue === null || newValue === void 0 ? void 0 : newValue.label);
    };
    return (_jsxs(CcfBox, Object.assign({ sx: styles.mainContainer }, { children: [_jsx(CcfEnhancedWEStepperContainer, {}), _jsxs(Box, Object.assign({ sx: styles.filterContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: "CREATE PARAMETERS" })), _jsxs(Grid, Object.assign({ container: true, spacing: 2, alignItems: "center" }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 8, sm: 6, md: 4 }, { children: _jsx(CcfAutoComplete, { disableClearable: true, options: configselectedcrmentities || [], value: (configselectedcrmentities === null || configselectedcrmentities === void 0 ? void 0 : configselectedcrmentities.find((config) => config.label === selectedEntityforCreate)) || null, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.label) || '', isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.label) === (value === null || value === void 0 ? void 0 : value.label), onChange: (_, option) => {
                                        setSelectedEntityforCreate((option === null || option === void 0 ? void 0 : option.label) || '');
                                    }, renderInput: (params) => {
                                        var _a;
                                        return _jsx(TextField, Object.assign({}, params, { placeholder: "Select Item", size: "small", InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (_jsxs(React.Fragment, { children: [configselectedcrmentities.length === 0 ? _jsx(CircularProgress, { color: "inherit", size: 20, "data-testid": "entity-loading-indicator" }) : null, (_a = params.InputProps) === null || _a === void 0 ? void 0 : _a.endAdornment] })) }) }));
                                    }, sx: styles.selectionDropdown, size: "small" }) })), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfButton, Object.assign({ "data-testid": "add-entity-button", sx: styles.buttonAdd, variant: "contained", disabled: (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.entities.length) === 1, onClick: () => {
                                        handleAddEntity();
                                    } }, { children: _jsx(CcfTypography, Object.assign({ sx: styles.buttonTypography }, { children: "Add Entity" })) })) }))] }))] })), _jsx(Box, Object.assign({ sx: styles.fieldscontainer }, { children: selectedEnhancedWorkflowConfig.entities.map((entity, entityIndex) => (_jsx(Card, Object.assign({ variant: "outlined" }, { children: _jsxs(CardContent, { children: [_jsxs(Grid, Object.assign({ container: true, alignItems: "center", spacing: 1.5 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: true }, { children: _jsx(CcfTypography, Object.assign({ variant: "caption", color: "textSecondary", sx: styles.paramHeadingTypography }, { children: "Select the CXone Data below that you would like mapped to the external software." })) })), _jsx(Grid, Object.assign({ item: true }, { children: _jsxs(CcfButton, Object.assign({ "data-testid": 'delete-create-entity-button', onClick: () => handleDeleteEntity(), sx: Object.assign(Object.assign({}, styles.buttonAdd), { color: theme.palette.text.clearText }) }, { children: [_jsx(DeleteIcon, { style: styles.deleteIcon }), _jsx(CcfTypography, Object.assign({ sx: styles.buttonTypography }, { children: "Delete All" }))] })) }))] })), entity.columns.map((param, paramIndex) => {
                                var _a;
                                return (_jsxs(Grid, Object.assign({ container: true, spacing: 1, style: { marginTop: '10px' }, alignItems: "center" }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, sm: 3, md: 3 }, { children: _jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.dropdownContainer), { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }) }, { children: [_jsxs(CcfTypography, Object.assign({ variant: "body2", sx: Object.assign({}, styles.labelTypography) }, { children: ["FIELD NAME", _jsx("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] })), _jsx(CcfAutoComplete, { disableClearable: true, "data-testid": `fieldName-select-${entityIndex}-${paramIndex}`, options: (crmentityFieldsOptions[entity.entityAPIName] || []).map((field, index) => (Object.assign(Object.assign({}, field), { id: `${field.name}-${index}` }))), value: ((_a = crmentityFieldsOptions[entity.entityAPIName]) === null || _a === void 0 ? void 0 : _a.find(field => field.name === param.columnAPIName)) || null, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.label) || '', isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.name) === (value === null || value === void 0 ? void 0 : value.name), onChange: (event, newValue) => handleFieldChange(entityIndex, paramIndex, event, newValue), renderOption: (props, option) => (_createElement("li", Object.assign({}, props, { key: option.id }),
                                                            _jsx("span", { children: option.label }))), renderInput: (params) => {
                                                            var _a;
                                                            return (_jsx(TextField, Object.assign({}, params, { placeholder: "Select field", size: "small", sx: styles.autocompleteInput, InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (_jsxs(React.Fragment, { children: [!crmentityFieldsOptions[entity.entityAPIName] && (_jsx(CircularProgress, { color: "inherit", size: 20 })), (_a = params.InputProps) === null || _a === void 0 ? void 0 : _a.endAdornment] })) }) })));
                                                        }, sx: styles.selectionDropdown, PaperComponent: (props) => (_jsx(Paper, Object.assign({}, props, { sx: styles.paperComponent }))) })] })) })), _jsx(Grid, Object.assign({ item: true, xs: 12, sm: 4, md: 4 }, { children: _jsxs(CcfBox, Object.assign({ sx: styles.variableInputContainer }, { children: [_jsxs(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ["VARIABLE", _jsx("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] })), _jsx(CcfDeboucedInput, { inputProps: {
                                                            'data-testid': `variable-input-${entityIndex}-${paramIndex}`,
                                                        }, className: "variable-input", size: "small", required: true, variant: "outlined", id: "variable-input", value: param.value || '', placeholder: 'Enter value of field', delay: 500, onChange: (e) => handleColumnChange(entityIndex, paramIndex, 'variable', e.target.value), sx: styles.inputPlaceHolder })] })) })), _jsx(Grid, Object.assign({ item: true, xs: 12, sm: 2, md: 2 }, { children: _jsx(CcfButton, Object.assign({ "data-testid": `delete-row-button-${entityIndex}-${paramIndex}`, onClick: () => handleDeleteColumn(entityIndex, paramIndex), color: "error", size: "small", style: { marginTop: '18px' }, "aria-label": "delete", sx: styles.buttonDelete }, { children: _jsx(DeleteIcon, {}) })) }))] }), `${param.columnName + paramIndex}`));
                            }), _jsx(CcfButton, Object.assign({ onClick: () => handleAddEntityFieldRow(entity.entityName), "data-testid": 'add-button', style: { marginTop: '8px', minWidth: '3px', borderRadius: '9px', padding: '1px 1px' }, primary: true }, { children: _jsx(AddIcon, {}) }))] }) }), entity.entityName))) }))] })));
};
export default CcfEnhancedWEAutoCreateFilter;
//# sourceMappingURL=ccf-enhanced-workflow-exec-automatic-create-filter.js.map