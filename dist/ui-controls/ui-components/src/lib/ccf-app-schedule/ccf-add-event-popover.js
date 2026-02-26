import { jsx as _jsx } from "react/jsx-runtime";
import { CcfAddEventIcon, CcfPopOver, CcfPopoverIcon, useTranslator, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { commitmentActions, getCommitmentPermission } from '../ccf-commitment/ccf-commitment.slice';
import { getCommitmentItems } from '../global.app.slice';
import { phoneOBSkillsSelector } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { useMediaQuery, useTheme } from '@mui/material';
import ccfAppSchedulerStyles from './ccf-app-schedule.styles';
/**
 *custom hook to give commitment popover items
 * @returns -addEventPopoverItems, disableAddEvent
 * @example - `useCCfCommitmentPopOverItems()`
 */
export const useCcfCommitmentAddEventPopOverItems = () => {
    const allAddEventPopoverItems = useSelector(getCommitmentItems);
    const { create: hasCreateCommitmentPermission } = useSelector(getCommitmentPermission);
    const phoneOBSkills = useSelector(phoneOBSkillsSelector);
    const addEventPopoverItems = (!hasCreateCommitmentPermission || !(phoneOBSkills === null || phoneOBSkills === void 0 ? void 0 : phoneOBSkills.length))
        ? [...allAddEventPopoverItems].filter((item) => item.translationKey !== 'commitment')
        : allAddEventPopoverItems;
    const disableAddEvent = !(addEventPopoverItems === null || addEventPopoverItems === void 0 ? void 0 : addEventPopoverItems.length);
    return { addEventPopoverItems, disableAddEvent };
};
/**
 * CcfCommitments - returns add commitment to schedular app
 * @returns - CcfCommitments
 * @example - `<CcfCommitments />`
 */
export const CcfAddEventPopover = ({ paperProps }) => {
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('md'));
    const schedulerStyles = ccfAppSchedulerStyles(theme, isSmView);
    /**
     * @returns - addEventPopEver styles
     * @example - addEventPopoverStyles()
     */
    const addEventPopoverStyles = () => {
        const styles = {
            addEventIconStyle: {
                width: '21px',
                [theme.breakpoints.down('md')]: {
                    paddingRight: '2px',
                },
                paddingRight: '6px',
            },
            popOverIconStyles: {
                width: '14px',
                paddingLeft: '5px',
                [theme.breakpoints.down('md')]: {
                    paddingLeft: '3px',
                    paddingRight: '1px',
                },
            },
        };
        return styles;
    };
    const styles = addEventPopoverStyles();
    const { addEventPopoverItems } = useCcfCommitmentAddEventPopOverItems();
    const optionList = {
        menuItems: [
            {
                items: addEventPopoverItems,
            }
        ],
    };
    /**
     * Pop over action handler.
     * @example
     * @returns
     */
    const onPopOverItemSelection = (item) => () => {
        switch (item.type) {
            case 'commitment':
                dispatch(commitmentActions.showCommitmentForm(true));
        }
        return;
    };
    return (_jsx(CcfPopOver, { disableTooltip: true, tooltipTitle: 'addCommitments', onPopOverItemSelection: (item) => onPopOverItemSelection(item), iconComponent: _jsx(CcfAddEventIcon, { sx: styles.addEventIconStyle, viewBox: "0 0 20 20" }), endIconComponent: _jsx(CcfPopoverIcon, { sx: styles.popOverIconStyles, viewBox: "0 0 7 6" }), labelComponent: !isSmView ? translate('add') : undefined, optionList: optionList, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, transformOrigin: { vertical: 'top', horizontal: 'center' }, PaperProps: paperProps, buttonSx: schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.focussedElement, popOverMenuItemExtraStyles: schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.focussedElement }));
};
//# sourceMappingURL=ccf-add-event-popover.js.map