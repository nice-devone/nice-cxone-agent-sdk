import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslator, CcfTooltip } from '@nice-devone/ui-controls';
import { Button, useTheme, Box, useMediaQuery } from '@mui/material';
import reactionPickerStyles from './ccf-reaction-picker.styles';
import { CcfIcon, CHANNEL_ICON_SIZE } from '../ccf-icon/ccf-icon';
import { REACTION_ICONS } from '../ccf-icon/ccf-icon-list';
import { ReactionType } from '@nice-devone/common-sdk';
const defaultOptions = {
    isSelected: false,
    reactionType: ReactionType.LIKE,
    iconName: REACTION_ICONS.LIKE,
    buttonName: 'like',
    handleReactionChange: () => {
        return;
    },
};
/**
 * Used to show reaction picker for the application
 * @param props -?- CcfReactionPicker
 * @example - `<CcfReactionPicker {...props}/>`
 */
export const CcfReactionPicker = (props) => {
    const [options, setReactionOptions] = useState(defaultOptions);
    const theme = useTheme();
    const isLessThanMd = useMediaQuery(theme.breakpoints.down('md'));
    const [translate] = useTranslator();
    const styles = reactionPickerStyles(theme);
    /**
      * Used to update reaction options
      * @param props -?- CcfReactionPickerProps
      * @example - `updateReactionOptions(props)`
      */
    const updateReactionOptions = (props) => {
        setReactionOptions((prevState) => (Object.assign(Object.assign({}, prevState), props)));
    };
    useEffect(() => {
        updateReactionOptions(props);
    }, [props]);
    /**
      * This method to toggle reaction
      *  @example - toggleReaction()
      */
    const toggleReaction = () => {
        setReactionOptions((prevState) => (Object.assign(Object.assign({}, prevState), { isSelected: !options.isSelected })));
        props.handleReactionChange(!options.isSelected);
    };
    return (_jsx(Box, Object.assign({ sx: styles.pickerPosition }, { children: _jsx(CcfTooltip, Object.assign({ title: isLessThanMd ? translate(options.buttonName) : '', arrow: true }, { children: _jsxs(Button, Object.assign({ variant: "outlined", size: "small", color: "secondary", tabIndex: 0, "data-testid": `${props.reactionType}-button`, onKeyUp: (e) => {
                    if (e.key === 'Enter')
                        toggleReaction();
                }, onClick: toggleReaction, sx: [
                    styles.reactionBtn,
                    options.isSelected ? styles.reactionBtnSelect : {}
                ] }, { children: [_jsx(CcfIcon, { iconName: options.iconName, size: CHANNEL_ICON_SIZE.EXTRA_SMALL, svgIconStyles: { sx: styles.reactionIconPosition } }), _jsxs("span", { children: [" ", isLessThanMd ? '' : translate(options.buttonName), " "] })] })) })) })));
};
export default CcfReactionPicker;
//# sourceMappingURL=ccf-reaction-picker.js.map