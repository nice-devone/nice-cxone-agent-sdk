import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Box, CircularProgress, Grid, TextField, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../../ccf-enhanced-workflow-execute-editor.slice';
import CcfEnhancedSummaryTestStyles from './ccf-enhanced-workflow-exec-summary-test.styles';
import { CcfAutoComplete, CcfBox, CcfButton, CcfDeboucedInput, CcfLineIcon, CcfTypography } from '@nice-devone/ui-controls';
import { configBackButtonIcon } from '../ccf-enhanced-workflow-exec-icon';
import { fetchEWEConfigsTestResult } from '../../thunks';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ReactJson from 'react-json-view';
import CONSTANTS from '../../constants';
import { EnhancedWorkflowOperatorsEnum, EnhancedWorkflowConditionTypeEnum, WorkflowType } from '../../helpers/enhanced-workflow-models';
import { WorkflowPayloadGeneratorFactory } from '../../helpers/workflow-payload-generator-factory';
/**
 * Component displays agent advance workflow execution selected configuration data
 * @returns agent advance workflow execution configuration selected data
 * @example <CcfEnhancedSummaryTest />
 */
const CcfEnhancedSummaryTest = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const selectedEnhancedWorkflowConfig = (_a = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getnewEWEConfigurationCreated)) !== null && _a !== void 0 ? _a : {};
    const configurationnamefrominstance = (_b = useSelector(CcfEnhancedWorkflowExecuteEditorSlice.getConfigurations)) !== null && _b !== void 0 ? _b : {};
    const isPhone = selectedEnhancedWorkflowConfig.workflowSubtype === 'PhoneNumberSearch';
    const isEmail = selectedEnhancedWorkflowConfig.workflowSubtype === 'EmailSearch';
    const isDynamic = selectedEnhancedWorkflowConfig.workflowSubtype === 'CustomSearch';
    const ManualCreate = selectedEnhancedWorkflowConfig.workflowSubtype === 'ManualCreate';
    const { GENERAL_INFORMATION } = CcfEnhancedWorkflowExecuteEditorSlice.renderedScreen;
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const styles = CcfEnhancedSummaryTestStyles(theme);
    const dispatch = useDispatch();
    const [testFields, setTestFields] = useState({
        testEmailField: (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.emailAddress) || '',
        testPhoneField: (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.phoneNumber) || '',
        testFields: (isDynamic
            // Case 1: Dynamic Search → use all entities
            ? ((_c = selectedEnhancedWorkflowConfig.entities) !== null && _c !== void 0 ? _c : [])
                .flatMap(entity => { var _a; return (_a = entity.columns) !== null && _a !== void 0 ? _a : []; })
            // Case 2: Auto → only first entity
            : ((_f = (_e = (_d = selectedEnhancedWorkflowConfig.entities) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.columns) !== null && _f !== void 0 ? _f : [])).reduce((acc, column) => {
            acc[column.columnAPIName] = column.value || '';
            return acc;
        }, {}),
    });
    const [EWEConfigsTestResult, setEWEConfigsTestResult] = useState({});
    const confignamebycrminstance = Array.isArray(configurationnamefrominstance) ? configurationnamefrominstance.find(crminstance => crminstance.id === (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.configId)) : undefined;
    const confignamebyconfigId = confignamebycrminstance ? confignamebycrminstance.name : '';
    const [selectedEntityAPIName, setSelectedEntityAPIName] = useState(((_h = (_g = selectedEnhancedWorkflowConfig.entities) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.entityAPIName) || '');
    /**
        * Handle click on back button for phone/email search screen
        * @example handleBackToConfig()
      */
    const handleBackToConfig = () => {
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setComponentToRender(GENERAL_INFORMATION));
    };
    /**
          * Handle changes to test variables
          * @param key - The key of the test variable being changed
          * @param event - The change event
          * @example handleEWETestFieldChange('testVarEmail')
        */
    const handleEWETestFieldChange = (field, value) => {
        setTestFields(prev => {
            // check if the change belongs to top-level fields
            if (field === 'testEmailField' || field === 'testPhoneField') {
                return Object.assign(Object.assign({}, prev), { [field]: value });
            }
            // otherwise, it belongs to the nested testFields
            return Object.assign(Object.assign({}, prev), { testFields: Object.assign(Object.assign({}, prev.testFields), { [field]: value }) });
        });
    };
    /**
         * Handle click on test button for phone/email search screen
         * @example handleTestClick()
        */
    const handleTestClick = () => __awaiter(void 0, void 0, void 0, function* () {
        var _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        setIsLoading(true);
        const phoneRegex = /^[\d+\-()\s]*$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // Validation
        if (isPhone) {
            if (testFields.testPhoneField.trim() === '') {
                toast.error('Oops! It looks like the phone number is missing. Please enter a valid one.');
                setEWEConfigsTestResult({});
                setIsLoading(false);
                return;
            }
            else if (!phoneRegex.test(testFields.testPhoneField.trim())) {
                toast.error('Please enter a valid phone number');
                setEWEConfigsTestResult({});
                setIsLoading(false);
                return;
            }
        }
        else if (isEmail) {
            if (testFields.testEmailField.trim() === '') {
                toast.error('Oops! It looks like the email is missing. Please enter a valid one.');
                setEWEConfigsTestResult({});
                setIsLoading(false);
                return;
            }
            else if (!emailRegex.test(testFields.testEmailField.trim())) {
                toast.error('Please enter a valid email address');
                setEWEConfigsTestResult({});
                setIsLoading(false);
                return;
            }
        }
        else {
            const hasEmptyValue = Object.values(testFields.testFields).some((value) => value == null || (typeof value === 'string' && value.trim() === ''));
            if (hasEmptyValue) {
                toast.error('Please fill in all test variables before testing.');
                setEWEConfigsTestResult({});
                setIsLoading(false);
                return;
            }
        }
        try {
            // Base config
            const updatedConfig = Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { entities: (_j = selectedEnhancedWorkflowConfig.entities) === null || _j === void 0 ? void 0 : _j.map((entity) => {
                    var _a;
                    return (Object.assign(Object.assign({}, entity), { columns: (_a = entity.columns) === null || _a === void 0 ? void 0 : _a.map((column) => (Object.assign(Object.assign({}, column), { value: testFields.testFields[column.columnAPIName] }))) }));
                }) });
            let payloadGeneratedForConfig = WorkflowPayloadGeneratorFactory.getWorkflowPayloadGenerator(updatedConfig).generateQuery();
            // ManualCreate logic
            if (ManualCreate) {
                const selectedEntity = (_k = selectedEnhancedWorkflowConfig.entities) === null || _k === void 0 ? void 0 : _k.find((entity) => entity.entityAPIName === selectedEntityAPIName);
                if (!selectedEntity) {
                    toast.error('Please select a valid entity before creating manually.');
                    setIsLoading(false);
                    return;
                }
                // Update only the selected entity’s columns
                const manualUpdatedConfig = Object.assign(Object.assign({}, selectedEnhancedWorkflowConfig), { entities: (_l = selectedEnhancedWorkflowConfig.entities) === null || _l === void 0 ? void 0 : _l.map((entity) => {
                        var _a;
                        return entity.entityAPIName === selectedEntityAPIName
                            ? Object.assign(Object.assign({}, entity), { columns: (_a = entity.columns) === null || _a === void 0 ? void 0 : _a.map((column) => (Object.assign(Object.assign({}, column), { value: testFields.testFields[column.columnAPIName] }))) }) : entity;
                    }) });
                // Generate workflow payload only for selected entity
                const manualPayload = WorkflowPayloadGeneratorFactory.getWorkflowPayloadGenerator(Object.assign(Object.assign({}, manualUpdatedConfig), { entities: [selectedEntity] })).generateQuery();
                payloadGeneratedForConfig =
                    (_p = (_o = (_m = manualPayload === null || manualPayload === void 0 ? void 0 : manualPayload.list) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.workflowInput) !== null && _p !== void 0 ? _p : {};
            }
            // Dispatch payload logic
            const EWEConfigsTestApiPayload = {
                configId: selectedEnhancedWorkflowConfig.configId,
                workflowId: selectedEnhancedWorkflowConfig.workflowId,
                interactionID: CONSTANTS.WORKFLOW_EWETEST.InteractionID,
                contactID: CONSTANTS.WORKFLOW_EWETEST.ContactID,
                action: isPhone || isEmail || isDynamic ? WorkflowType.Search : WorkflowType.Create,
            };
            if (isPhone || isEmail) {
                EWEConfigsTestApiPayload.phoneNumber = isPhone ? testFields.testPhoneField : '';
                EWEConfigsTestApiPayload.email = !isPhone ? testFields.testEmailField : '';
            }
            else if (isDynamic) {
                EWEConfigsTestApiPayload.dynamicDataMappingId =
                    selectedEnhancedWorkflowConfig.dynamicDataMappingId || '';
                EWEConfigsTestApiPayload.searchFilter = payloadGeneratedForConfig || {};
            }
            else {
                EWEConfigsTestApiPayload.createFilter = payloadGeneratedForConfig || {};
            }
            const actionResult = yield dispatch(fetchEWEConfigsTestResult(EWEConfigsTestApiPayload));
            const EWEConfigsTestResultResponse = unwrapResult(actionResult);
            setEWEConfigsTestResult(EWEConfigsTestResultResponse);
            toast.success('Test has completed successfully!');
        }
        catch (error) {
            const err = error;
            const errMessage = (_t = (_s = (_r = (_q = err === null || err === void 0 ? void 0 : err.data) === null || _q === void 0 ? void 0 : _q.body) === null || _r === void 0 ? void 0 : _r.error_description) !== null && _s !== void 0 ? _s : err === null || err === void 0 ? void 0 : err.message) !== null && _t !== void 0 ? _t : 'Unexpected error';
            const errJsonFormatMessage = (_u = err === null || err === void 0 ? void 0 : err.data) === null || _u === void 0 ? void 0 : _u.body;
            const errParsedMessage = errJsonFormatMessage
                ? Object.assign({}, errJsonFormatMessage) : { error: errMessage };
            setEWEConfigsTestResult(errParsedMessage);
            toast.error(errMessage);
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs(CcfBox, Object.assign({ sx: styles.mainContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.headingContainer }, { children: [_jsx(Box, Object.assign({ sx: styles.pageHeading }, { children: selectedEnhancedWorkflowConfig.name })), _jsxs(CcfButton, Object.assign({ variant: "outlined", disableElevation: true, sx: styles.backButton, onClick: handleBackToConfig }, { children: [_jsx(Box, { component: "img", src: configBackButtonIcon, alt: "back", sx: styles.backButton.iconStyle }), _jsx(CcfTypography, Object.assign({ sx: styles.backButton.buttonTypography }, { children: "Configuration" }))] }))] })), _jsx(CcfBox, Object.assign({ sx: styles.bottomSectionWrapper }, { children: (() => {
                    var _a, _b;
                    if (isPhone || isEmail) {
                        return (_jsxs(CcfBox, Object.assign({ sx: styles.informationContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.configurationContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "CONFIGURATION" })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: confignamebyconfigId }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.configurationContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "WORKFLOW" })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: selectedEnhancedWorkflowConfig.workflowType }))] })), _jsxs(Grid, Object.assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsxs(Grid, Object.assign({ container: true, alignItems: "flex-end", spacing: 1 }, { children: [_jsx(Grid, Object.assign({ item: true }, { children: _jsxs(CcfBox, Object.assign({ sx: { display: 'flex', flexDirection: 'column', gap: '5px' } }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: isPhone ? 'TEST PHONE' : 'TEST EMAIL' })), _jsx(CcfDeboucedInput, { className: "fieldName-input", size: "small", required: true, variant: "outlined", id: "test-fields", value: isPhone ? testFields.testPhoneField : testFields.testEmailField, placeholder: "Enter", delay: 500, sx: { width: '250px' }, "data-testid": "test-box-ep", onChange: (e) => { handleEWETestFieldChange(isPhone ? 'testPhoneField' : 'testEmailField', e.target.value); } })] })) })), _jsx(Grid, { item: true, sx: { flexGrow: 1 } }), _jsx(Grid, Object.assign({ item: true }, { children: _jsx(CcfButton, Object.assign({ variant: "outlined", primary: true, disabled: isLoading, sx: { textTransform: 'none', mt: '25px' }, onClick: handleTestClick }, { children: _jsx(CcfTypography, { children: "Test" }) })) }))] })) })), isLoading && (_jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%" }, { children: _jsx(CircularProgress, { size: 30 }) }))), !isLoading ? (_jsx(Grid, Object.assign({ item: true, xs: 12, "data-testid": "testarea-box-res" }, { children: _jsx(ReactJson, { src: EWEConfigsTestResult, theme: "solarized", name: false, collapsed: false, displayDataTypes: false, enableClipboard: false, "data-testid": "testarea-box-res" }) }))) : null] }), 'test-param')] })));
                    }
                    if (isDynamic) {
                        const allColumns = ((_a = selectedEnhancedWorkflowConfig.entities) === null || _a === void 0 ? void 0 : _a.flatMap((entity) => entity.columns)) || [];
                        const totalInputs = allColumns.length;
                        return (_jsxs(_Fragment, { children: [selectedEnhancedWorkflowConfig.entities.map((entity) => (_jsxs(CcfBox, Object.assign({ sx: styles.informationContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.paramContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "SEARCH PARAMETERS" })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: entity.entityName }))] })), _jsx(CcfBox, Object.assign({ sx: styles.iconboxstyle }, { children: _jsx(CcfLineIcon, { sx: styles.iconStyle }) })), _jsx(CcfBox, Object.assign({ sx: styles.variablesContainer }, { children: entity.columns.map((column, index) => (_jsxs(React.Fragment, { children: [_jsx(CcfBox, Object.assign({ sx: styles.conditionBox }, { children: index > 0 && (_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.conditionType }, { children: EnhancedWorkflowConditionTypeEnum[column.condition] }))) })), _jsxs(CcfBox, Object.assign({ sx: styles.variablesRow }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.fieldContainer }, { children: [index === 0 && (_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "FIELD NAME" }))), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: column.columnName }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.fieldContainer }, { children: [index === 0 && (_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "OPERATOR" }))), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: EnhancedWorkflowOperatorsEnum[column.operator] }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.fieldContainer }, { children: [index === 0 && (_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "VARIABLE" }))), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: column.value }))] }))] }))] }, `${column.columnAPIName}-${entity.entityAPIName}-col`))) }))] }), `${entity.entityAPIName}-row`))), _jsxs(Grid, Object.assign({ container: true, spacing: 1 }, { children: [(() => {
                                            const rows = [];
                                            if (totalInputs <= 3) {
                                                allColumns.forEach((column, idx) => {
                                                    var _a;
                                                    rows.push(_jsxs(Grid, Object.assign({ container: true, spacing: 2, sx: { mt: 0.3 } }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, sm: 4 }, { children: _jsxs(Box, Object.assign({ display: "flex", flexDirection: "column", gap: 1, sx: { height: '100%', px: 1 } }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ((_a = column === null || column === void 0 ? void 0 : column.columnName) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase()) || 'Column Name' })), _jsx(CcfDeboucedInput, { size: "small", required: true, variant: "outlined", id: `test-field-${column.columnAPIName}`, value: testFields.testFields[column.columnAPIName] || '', placeholder: `Enter ${column.columnName}`, delay: 500, fullWidth: true, sx: { width: '100%' }, onChange: (e) => handleEWETestFieldChange(column.columnAPIName, e.target.value) })] })) })), idx === totalInputs - 1 && (_jsx(Grid, Object.assign({ item: true, xs: true, sx: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', pr: 1 } }, { children: _jsx(CcfButton, Object.assign({ variant: "outlined", primary: true, sx: { height: '40px', textTransform: 'none' }, onClick: handleTestClick }, { children: _jsx(CcfTypography, { children: "Test" }) })) })))] }), `single-${column.columnAPIName}`));
                                                });
                                            }
                                            else {
                                                for (let i = 0; i < totalInputs; i += 3) {
                                                    const group = allColumns.slice(i, i + 3);
                                                    rows.push(_jsxs(Grid, Object.assign({ container: true, spacing: 2, sx: { mt: 0.3 }, alignItems: "flex-end" }, { children: [group.map((column, index) => {
                                                                var _a;
                                                                return (_jsx(Grid, Object.assign({ item: true, xs: 12, sm: 4 }, { children: _jsxs(Box, Object.assign({ display: "flex", flexDirection: "column", gap: 1, sx: { height: '100%', px: 1 } }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ((_a = column === null || column === void 0 ? void 0 : column.columnName) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase()) || 'Column Name' })), _jsx(CcfDeboucedInput, { size: "small", required: true, variant: "outlined", id: `test-field-${column.columnAPIName}`, value: testFields.testFields[column.columnAPIName] || '', placeholder: `Enter ${column.columnName}`, delay: 500, fullWidth: true, sx: { width: '100%' }, onChange: (e) => handleEWETestFieldChange(column.columnAPIName, e.target.value) })] })) }), `input-${i + index}`));
                                                            }), i + group.length >= totalInputs && (_jsx(Grid, Object.assign({ item: true, xs: true, sx: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', pr: 1 } }, { children: _jsx(CcfButton, Object.assign({ variant: "outlined", primary: true, sx: { height: '40px', textTransform: 'none' }, onClick: handleTestClick }, { children: _jsx(CcfTypography, { children: "Test" }) })) })))] }), `group-${i}`));
                                                }
                                            }
                                            return rows;
                                        })(), isLoading && (_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%" }, { children: _jsx(CircularProgress, { size: 30, "data-testid": "loading-spinner" }) })) }))), !isLoading && (_jsx(Grid, Object.assign({ item: true, xs: 12, "data-testid": "testarea-box-res" }, { children: _jsx(CcfBox, Object.assign({ sx: { display: 'flex', flexDirection: 'column', gap: 2 } }, { children: _jsx(ReactJson, { src: EWEConfigsTestResult, theme: "solarized", name: false, collapsed: false, displayDataTypes: false, enableClipboard: false, "data-testid": "testarea-box-res" }) })) })))] }), 'test-param')] }));
                    }
                    return (_jsxs(_Fragment, { children: [(_b = selectedEnhancedWorkflowConfig.entities) === null || _b === void 0 ? void 0 : _b.map((entity) => (_jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.informationContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.paramContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "CREATE PARAMETERS" })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: entity.entityName }))] })), _jsx(CcfBox, Object.assign({ sx: styles.iconboxstyle }, { children: _jsx(CcfLineIcon, { sx: styles.iconStyle }) })), _jsx(CcfBox, Object.assign({ sx: styles.variablesContainer }, { children: entity.columns.map((column) => (_jsxs(CcfBox, Object.assign({ sx: styles.variablesRow }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.fieldContainer }, { children: [entity.columns.indexOf(column) === 0 && (_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "FIELD NAME" }))), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: column.columnAPIName }))] })), _jsxs(CcfBox, Object.assign({ sx: styles.fieldContainer }, { children: [entity.columns.indexOf(column) === 0 && (_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "VARIABLE" }))), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: column.value }))] }))] }), `${column.columnAPIName}-${entity.entityAPIName}-col`))) })), entity.entityAPIName + '-row' === selectedEnhancedWorkflowConfig.entities[0].entityAPIName + '-row' ? (_jsxs(_Fragment, { children: [_jsx(CcfLineIcon, { sx: styles.iconStyle }), _jsxs(CcfBox, Object.assign({ sx: styles.paramContainer }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "CONFIGURATION" })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: selectedEnhancedWorkflowConfig.name })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.headingTypography }, { children: "WORKFLOW" })), _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.contentTypography }, { children: selectedEnhancedWorkflowConfig.workflowSubtype }))] }))] })) : (_jsx(CcfBox, { sx: styles.paramContainer }))] }), `${entity.entityAPIName}-row`), _jsxs(CcfBox, Object.assign({ sx: styles.testContainer }, { children: [(selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.pinnedRecord) === 'true' && _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.featureCheckbox }, { children: "Pinned Records" })), (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.screenPop) === 'true' && _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.featureCheckbox }, { children: "Screen Pop" })), (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.relatesTo) === 'true' && _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.featureCheckbox }, { children: "Relates To" })), (selectedEnhancedWorkflowConfig === null || selectedEnhancedWorkflowConfig === void 0 ? void 0 : selectedEnhancedWorkflowConfig.cacheResponse) === 'true' && _jsx(CcfTypography, Object.assign({ variant: 'body1', sx: styles.featureCheckbox }, { children: "Cache Response" }))] }))] }))), ManualCreate && (_jsx(Grid, Object.assign({ container: true, spacing: 2, sx: { mt: 0.3 } }, { children: _jsxs(Grid, Object.assign({ item: true, xs: 12, sm: 4 }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: "SELECT ENTITY" })), _jsx(CcfAutoComplete, { disableClearable: true, options: selectedEnhancedWorkflowConfig.entities || [], value: (selectedEnhancedWorkflowConfig.entities || []).find((entity) => entity.entityAPIName === selectedEntityAPIName) || null, getOptionLabel: (option) => (option === null || option === void 0 ? void 0 : option.entityName) || '', isOptionEqualToValue: (option, value) => (option === null || option === void 0 ? void 0 : option.entityAPIName) === (value === null || value === void 0 ? void 0 : value.entityAPIName), onChange: (_, option) => {
                                                var _a;
                                                const selectedEntityName = (option === null || option === void 0 ? void 0 : option.entityAPIName) || '';
                                                setSelectedEntityAPIName(selectedEntityName);
                                                // 🔧 FIX: Reinitialize testFields for the newly selected entity
                                                const selectedEntity = (_a = selectedEnhancedWorkflowConfig.entities) === null || _a === void 0 ? void 0 : _a.find((entity) => entity.entityAPIName === selectedEntityName);
                                                if (selectedEntity) {
                                                    setTestFields((prev) => {
                                                        var _a;
                                                        return (Object.assign(Object.assign({}, prev), { testFields: (_a = selectedEntity.columns) === null || _a === void 0 ? void 0 : _a.reduce((acc, column) => {
                                                                acc[column.columnAPIName] = column.value || '';
                                                                return acc;
                                                            }, {}) }));
                                                    });
                                                }
                                            }, renderInput: (params) => {
                                                var _a, _b;
                                                return (_jsx(TextField, Object.assign({}, params, { placeholder: "Select an Entity", size: "small", InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (_jsxs(_Fragment, { children: [!((_a = selectedEnhancedWorkflowConfig.entities) === null || _a === void 0 ? void 0 : _a.length) ? (_jsx(CircularProgress, { color: "inherit", size: 20, "data-testid": "entity-loading-indicator" })) : null, (_b = params.InputProps) === null || _b === void 0 ? void 0 : _b.endAdornment] })) }) })));
                                            }, sx: styles.selectionDropdown, size: "small" })] })) }))), _jsxs(Grid, Object.assign({ container: true, spacing: 1 }, { children: [selectedEntityAPIName &&
                                        (() => {
                                            var _a, _b;
                                            const allColumns = ((_b = (_a = selectedEnhancedWorkflowConfig.entities) === null || _a === void 0 ? void 0 : _a.find((entity) => entity.entityAPIName === selectedEntityAPIName)) === null || _b === void 0 ? void 0 : _b.columns) || [];
                                            const totalInputs = allColumns.length;
                                            const rows = [];
                                            // CASE 1: 3 or fewer fields — one per row, button on last row
                                            if (totalInputs <= 3) {
                                                allColumns.forEach((column, idx) => {
                                                    var _a;
                                                    rows.push(_jsxs(Grid, Object.assign({ container: true, spacing: 2, sx: { mt: 0.3 } }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, sm: 4 }, { children: _jsxs(Box, Object.assign({ display: "flex", flexDirection: "column", gap: 1, sx: { height: '100%', px: 1 } }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ((_a = column === null || column === void 0 ? void 0 : column.columnName) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase()) || 'Column Name' })), _jsx(CcfDeboucedInput, { size: "small", required: true, variant: "outlined", id: `test-field-${column.columnAPIName}`, value: testFields.testFields[column.columnAPIName] || '', placeholder: `Enter ${column.columnName}`, delay: 500, fullWidth: true, sx: { width: '100%' }, onChange: (e) => { handleEWETestFieldChange(column.columnAPIName, e.target.value); } })] })) }), `input-${column.columnAPIName}`), idx === totalInputs - 1 && (_jsx(Grid, Object.assign({ item: true, xs: true, sx: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', pr: 1 } }, { children: _jsx(CcfButton, Object.assign({ variant: "outlined", primary: true, sx: {
                                                                        height: '40px',
                                                                        textTransform: 'none',
                                                                    }, onClick: handleTestClick }, { children: _jsx(CcfTypography, { children: "Test" }) })) })))] }), `single-${column.columnAPIName}`));
                                                });
                                            }
                                            // CASE 2: More than 3 fields — chunk into groups of 3
                                            else {
                                                for (let i = 0; i < totalInputs; i += 3) {
                                                    const group = allColumns.slice(i, i + 3);
                                                    rows.push(_jsxs(Grid, Object.assign({ container: true, spacing: 2, sx: { mt: 0.3 }, alignItems: "flex-end" }, { children: [group.map((column, index) => {
                                                                var _a;
                                                                return (_jsx(Grid, Object.assign({ item: true, xs: 12, sm: 4 }, { children: _jsxs(Box, Object.assign({ display: "flex", flexDirection: "column", gap: 1, sx: { height: '100%', px: 1 } }, { children: [_jsx(CcfTypography, Object.assign({ variant: "body2", sx: styles.labelTypography }, { children: ((_a = column === null || column === void 0 ? void 0 : column.columnName) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase()) || 'Column Name' })), _jsx(CcfDeboucedInput, { size: "small", required: true, variant: "outlined", id: `test-field-${column.columnAPIName}`, value: testFields.testFields[column.columnAPIName] || '', placeholder: `Enter ${column.columnName}`, delay: 500, fullWidth: true, sx: { width: '100%' }, onChange: (e) => { handleEWETestFieldChange(column.columnAPIName, e.target.value); } })] })) }), `input-${i + index}`));
                                                            }), i + group.length >= totalInputs && (_jsx(Grid, Object.assign({ item: true, xs: true, sx: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', pr: 1 } }, { children: _jsx(CcfButton, Object.assign({ variant: "outlined", primary: true, sx: { height: '40px', textTransform: 'none' }, onClick: handleTestClick }, { children: _jsx(CcfTypography, { children: "Test" }) })) })))] }), `group-${i}`));
                                                }
                                            }
                                            return rows;
                                        })(), isLoading && (_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%" }, { children: _jsx(CircularProgress, { size: 30, "data-testid": "loading-spinner" }) })) }))), !isLoading && (_jsx(Grid, Object.assign({ item: true, xs: 12, "data-testid": "testarea-box-res" }, { children: _jsx(CcfBox, Object.assign({ sx: { display: 'flex', flexDirection: 'column', gap: 2 } }, { children: _jsx(ReactJson, { src: EWEConfigsTestResult, theme: "solarized", name: false, collapsed: false, displayDataTypes: false, enableClipboard: false, "data-testid": "testarea-box-res" }) })) })))] }), 'test-param')] }));
                })() }))] })));
};
export default CcfEnhancedSummaryTest;
//# sourceMappingURL=ccf-enhanced-workflow-exec-summary-test.js.map