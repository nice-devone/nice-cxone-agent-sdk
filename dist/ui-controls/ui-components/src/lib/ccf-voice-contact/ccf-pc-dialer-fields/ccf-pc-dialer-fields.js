import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, ListItem, ListItemText, useTheme } from '@mui/material';
import { CcfTooltip, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { userDefinedFieldDataType } from '../../../enums/user-defined-data-field-type';
import { formatPhoneNumber } from '../../../util/stringUtils';
import { formatDate } from '@fullcalendar/react';
import React from 'react';
/**
 * Component to display PC dialer fields
 * @param props - CcfPCDialerFieldsProps
 * ```
 * @example-
 * <CcfPCDialerFields otherInformationNewFormat={data} isToolTip={false}/>
 * ```
 */
export const CcfPCDialerFields = (props) => {
    const [translate] = useTranslator();
    const theme = useTheme();
    /**
     * Parses the otherInformationNewFormat to separate labels and values
     * @param props - none
     * ```
     * @example-
     * parseOtherInformationData()
     * ```
     */
    const parseOtherInformationData = () => {
        const fieldsList = [];
        if (props.otherInformationNewFormat) {
            const fields = props.otherInformationNewFormat.split(']@/');
            fields.forEach(field => {
                const labelAndValue = {
                    label: '',
                    value: '',
                };
                const splitData = field.split('~|^');
                labelAndValue.label = splitData[0].replace('$Localized:', '');
                switch (parseInt(splitData[2])) {
                    case userDefinedFieldDataType.Date:
                        labelAndValue.value = formatDate(new Date(splitData[1]));
                        break;
                    case userDefinedFieldDataType.Phone:
                        labelAndValue.value = formatPhoneNumber(splitData[1]);
                        break;
                    default:
                        labelAndValue.value = splitData[1];
                        break;
                }
                fieldsList.push(labelAndValue);
            });
        }
        return fieldsList;
    };
    const fieldsList = parseOtherInformationData();
    return (_jsx(List, Object.assign({ dense: true, disablePadding: true }, { children: fieldsList.map(field => {
            var _a, _b;
            return (_jsx(ListItem, { children: _jsx(CcfTooltip, Object.assign({ title: field.value, disableHoverListener: props.isToolTip }, { children: _jsx(ListItemText, { secondaryTypographyProps: props.isToolTip ? { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper } : {}, secondary: _jsxs(React.Fragment, { children: [_jsx(CcfTypography, Object.assign({ fontWeight: '700', variant: 'caption' }, { children: (translate((field.label.charAt(0).toLowerCase() + field.label.slice(1))) || field.label) })), _jsx(CcfTypography, Object.assign({ variant: 'caption', sx: props.isToolTip
                                        ? { display: 'block' }
                                        : {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '2',
                                            WebkitBoxOrient: 'vertical',
                                            wordBreak: 'break-word',
                                        } }, { children: field.value }))] }) }) })) }));
        }) })));
};
//# sourceMappingURL=ccf-pc-dialer-fields.js.map