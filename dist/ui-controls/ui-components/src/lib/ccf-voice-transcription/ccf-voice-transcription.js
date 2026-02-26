import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CcfInteractionSpaceStyles from '../ccf-interaction-space/ccf-interaction-space-styles';
import CcfTabsGroup from '../ccf-interaction-space/ccf-tabs-group/ccf-tabs-group';
import CcfNavigationItemsStyles from '../ccf-navigation/ccf-navigation-items-styles';
import { useIsVoiceTranscriptEnabled } from '../../hooks/useVoiceTranscriptEnabled';
/**
 * VoiceTranscription component displays the transcription for a given contact.
 *
 * @param contactId - The ID of the contact whose transcription is displayed.
 * @example \<CcfVoiceTranscription contactId=\{\}\>
 */
export const CcfVoiceTranscription = ({ contact, selectedInteractionId }) => {
    const theme = useTheme();
    const themeStyles = CcfInteractionSpaceStyles(theme, false);
    const styles = CcfNavigationItemsStyles(theme);
    const [tabs, setTabs] = useState({});
    useEffect(() => {
        setTabs({
            interactionId: selectedInteractionId,
            caseId: undefined,
            contactId: contact === null || contact === void 0 ? void 0 : contact.contactId,
            createdAt: (contact === null || contact === void 0 ? void 0 : contact.createdAt) || '',
            id: contact === null || contact === void 0 ? void 0 : contact.contactId,
            isPreviewCase: false,
            value: (contact === null || contact === void 0 ? void 0 : contact.contactId) || '',
        });
    }, []);
    /**
     * No-operation function used as a placeholder for required callbacks in CcfTabGroup
     * @example emptyFunction
     */
    const emptyFunction = () => { };
    const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
    return (isVoiceTranscriptEnabled && selectedInteractionId
        ? _jsx(Grid, Object.assign({ sx: themeStyles.rightGridContainer }, { children: _jsx(Grid, Object.assign({ item: true, padding: 1, xs: 8, sx: Object.assign(Object.assign({ display: { xl: 'flex' } }, styles.interactionSpaceResponsive), themeStyles.heightFull), xl: 12 }, { children: _jsx(CcfTabsGroup, { tabs: [tabs], selectedTab: contact === null || contact === void 0 ? void 0 : contact.contactId, disableAddChannel: true, showAddChannel: false, onTabClose: emptyFunction, showPopOver: emptyFunction, updateSelectedTab: emptyFunction }) })) }))
        : _jsx("div", {}));
};
export default CcfVoiceTranscription;
//# sourceMappingURL=ccf-voice-transcription.js.map