import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, useTheme } from '@mui/material';
import directoryEntryDetailsStyles from './ccf-directory-entries-details.styles';
import { useSelector } from 'react-redux';
import { selectFullViewDirectoryFlg } from '../+state/ccf-directory.slice';
import { AddressType, ProfileType } from '../ccf-directory-utils';
/**
 * Component to be used for rendering Text type entities
 * @param props - infoCardDetails
 * @example <DirectoryEntryInfoCard />
 * @returns
 */
export const DirectoryEntryInfoCard = (props) => {
    const theme = useTheme();
    const { infoCardDetails } = props;
    const classes = directoryEntryDetailsStyles(theme);
    const isFullViewDirectoryState = useSelector(selectFullViewDirectoryFlg);
    const FullViewInfo = (infoCardDetails.profileType === ProfileType.ADDRESS) ? classes.fullViewAddressInfo : classes.fullViewInfo;
    const InfoContainer = (infoCardDetails.profileType === ProfileType.ADDRESS) ? classes.addressContainer : classes.infoContainer;
    const isFullViewStyle = isFullViewDirectoryState ? FullViewInfo : InfoContainer;
    const directoryEntryText = (infoCardDetails.profileType === ProfileType.COMPANY) ? classes.directoryEntryCompanyText : classes.directoryEntryCardText;
    const showComma = (infoCardDetails.fieldType === AddressType.CITY || infoCardDetails.fieldType === AddressType.STATE) ? ', ' : ' ';
    return (_jsx(Box, Object.assign({ sx: isFullViewStyle }, { children: _jsx(Box, Object.assign({ sx: classes.infoText }, { children: _jsx(Box, Object.assign({ sx: classes.ellipsisWithTooltip }, { children: _jsxs(Typography, Object.assign({ noWrap: true, sx: directoryEntryText, title: infoCardDetails.value }, { children: [infoCardDetails.value, showComma] })) })) })) })));
};
//# sourceMappingURL=ccf-directory-entry-card.js.map