import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { MediaType } from '@nice-devone/common-sdk';
import { CcfBox, useTranslator, } from '@nice-devone/ui-controls';
import CcfDispositionStyles from './ccf-disposition.styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../ccf-icon/ccf-icon';
import { CHANNEL_ICON_NAME } from '../ccf-icon/ccf-icon-list';
/**
 * Component to display disposition header
 * @param param - CcfDispositionHeaderProps
 * @returns - display disposition header
 * @example CcfDispositionHeader
 */
export function CcfDispositionHeader({ activeContact, }) {
    var _a;
    const theme = useTheme();
    const dispositionStyles = CcfDispositionStyles(theme);
    const [translate] = useTranslator();
    const isMdView = useMediaQuery(theme.breakpoints.down('md'));
    // Assign customer name, else 'Unknown' translated as per the selected locale
    const skillOrQueueTranslated = translate((_a = activeContact === null || activeContact === void 0 ? void 0 : activeContact.skillOrQueueName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || (activeContact === null || activeContact === void 0 ? void 0 : activeContact.skillOrQueueName);
    /**
     * gets correct icon for contact type
     * @example getIcon()
     * @returns an icon
     */
    const getIcon = () => {
        var _a;
        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL) {
            return (_jsx(CcfIcon, { customStyle: { display: 'flex', alignItems: 'center', marginRight: '5px' }, iconName: (_a = activeContact.channelName) === null || _a === void 0 ? void 0 : _a.toLowerCase(), size: CHANNEL_ICON_SIZE.SMALL }));
        }
        else if (activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) {
            const mediaType = activeContact.media === MediaType.WORKITEM ? 'WORK_ITEM' : activeContact.media.toUpperCase().split(' ').join('');
            return (_jsx(CcfIcon, { customStyle: { display: 'flex', alignItems: 'center', marginRight: '5px' }, iconName: CHANNEL_ICON_NAME[mediaType], size: CHANNEL_ICON_SIZE.SMALL }));
        }
        else
            return null;
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Stack, Object.assign({ direction: "row", alignItems: "flex-start" }, { children: [getIcon(), _jsxs(Stack, Object.assign({ sx: Object.assign({}, dispositionStyles.textForDispositionCards) }, { children: [_jsx(Box, Object.assign({ sx: [Object.assign({}, dispositionStyles.textForDispositionDetails), dispositionStyles.textOverflow] }, { children: translate('outcome') })), _jsx(Tooltip, Object.assign({ title: skillOrQueueTranslated, placement: "bottom", arrow: true }, { children: _jsx(Box, Object.assign({ sx: [dispositionStyles.subTextForDispositionDetails, dispositionStyles.textOverflow] }, { children: skillOrQueueTranslated })) }))] }))] })), _jsx(CcfBox, Object.assign({ sx: dispositionStyles.dispositionHeaderCloseArrow }, { children: _jsx(KeyboardArrowDownIcon, { sx: dispositionStyles.digitalDispositionDownArrowIcon }) }))] }));
}
export default CcfDispositionHeader;
//# sourceMappingURL=ccf-disposition-header.js.map