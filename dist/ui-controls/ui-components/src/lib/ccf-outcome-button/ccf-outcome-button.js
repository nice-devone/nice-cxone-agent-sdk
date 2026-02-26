import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, useTheme } from '@mui/material';
import { CcfTooltip, CcfOutcomeResolveIcon } from '@nice-devone/ui-controls';
import { dispositionInteractionActions, getIsDispositionOpen } from '../ccf-disposition/ccf-disposition-slice';
import { useDispatch, useSelector } from 'react-redux';
import { contactControlStyles } from '../../styles/ccf-contact-control.style';
import { getNonIncomingActiveContactInSelectedInteraction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { contactButtons, MediaType } from '@nice-devone/common-sdk';
/**
 * CcfOutcomeButton - renders outcome button
 * @param props - CcfOutcomeButtonInterface
 * @example <CcfOutcomeButton />
 */
export const CcfOutcomeButton = ({ sx, disabled, placement, dispositionType, isSmViewConference, controlClicked }) => {
    const dispatch = useDispatch();
    const isDispositionOpen = useSelector(getIsDispositionOpen);
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const disableIcon = disabled || false;
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const applyResponsiveStyles = isSmViewConference ||
        (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE ||
        ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.elevatedFrom) && dispositionType === MediaType.VOICE);
    /**
     * Function to handle outcome button click
     * @example handleOutcomeClick(event);
     */
    const handleOutcomeClick = (event) => {
        event.stopPropagation();
        dispatch(dispositionInteractionActions.setDispositionType(dispositionType || ''));
        dispatch(dispositionInteractionActions.displayDispositionCard(!isDispositionOpen));
        controlClicked === null || controlClicked === void 0 ? void 0 : controlClicked(contactButtons.outcome, event);
    };
    return _jsx(CcfTooltip, Object.assign({ title: '', translationKey: 'outcome', arrow: true, placement: placement }, { children: _jsx(IconButton, Object.assign({ tabIndex: 0, onClick: handleOutcomeClick, sx: Object.assign(Object.assign({}, controlStyles.markAsResolved), sx), disabled: disableIcon, id: 'disposition-outcomes' }, { children: _jsx(CcfOutcomeResolveIcon, { viewBox: '0 0 25 26', sx: [controlStyles.resolvedIcon, applyResponsiveStyles ? controlStyles.controlIconsResponsiveStyles : {}] }) })) }));
};
//# sourceMappingURL=ccf-outcome-button.js.map