import { __rest } from "tslib";
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Box, Chip, Link, Popover, TextField, useTheme, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addDigitalMessageTag, CcfAssignmentAction, digitalMessageTagError, digitalTagLoadingState, getAllDigitalMessageTags, getDigitalContactMessageByMessageId, getDigitalMessageTagsByName, getDigitalMessageTagsByPageNumber, getDigitalMessageTagsCount, getDigitalMessageTagsCurrentPage, getDigitalTagExpandedState, getDigitalTagPopOverPosition, getNewDigitalTagAddedState, getNonIncomingActiveContactInSelectedInteraction, removeDigitalMessageTag, searchDigitalMessageTagByName } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { hexToRgbA } from '../../util/colorUtils';
import { CcfAppToastMessage, CcfBox, CcfButton, CcfCloseIcon, CcfDigitalTagAddIcon, CcfDigitalTagIcon, CcfLoader, CcfPlusIcon, CcfTooltip, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import popOverTagStyles from './ccf-popover-tag.style';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import { EventKeys } from '../../enums/event-keys';
/**
 * @param param -CcfPopoverTagProps
 * @returns popover which allows to select from digital message tag
 * @example <CcfPopoverTag/>
 */
export function CcfPopoverTag(props) {
    var _a;
    const dispatch = useDispatch();
    const digitalTagError = useSelector(digitalMessageTagError);
    const showSpinner = useSelector(digitalTagLoadingState);
    const options = useSelector(getAllDigitalMessageTags);
    const { message, isPrivateChannel, isDisabled, isPreviousCaseMessage, isNextCaseMessage } = props;
    const theme = useTheme();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeContactDigitalMessage = useSelector(getDigitalContactMessageByMessageId(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId, message === null || message === void 0 ? void 0 : message.id));
    const currentMessageTags = (activeContactDigitalMessage && activeContactDigitalMessage.length > 0) ? activeContactDigitalMessage[0].tags : [];
    const styles = popOverTagStyles(theme);
    const [isTagSearched, setTagSearched] = useState(false);
    const [tagSearchLoading, setTagSearchLoading] = useState(false);
    const [selectedTag, setTagValue] = useState(currentMessageTags);
    const [showTagDropdown, setDropdownState] = useState(false);
    const [translate] = useTranslator();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [tagsToShow, setTagsToShow] = useState(2); // items to show in dom
    const isExpanded = useSelector(getDigitalTagExpandedState); // flag is used to maintain show more and view less functionality; 
    const [selectedTagCount, setSelectedTagCount] = useState(0); // selected Tags to show in dom after put request
    const newTagAddedDetails = useSelector(getNewDigitalTagAddedState);
    const isNewTagAdded = newTagAddedDetails && Object.keys(newTagAddedDetails).length;
    let open = Boolean(anchorEl);
    let openPublic = Boolean((newTagAddedDetails === null || newTagAddedDetails === void 0 ? void 0 : newTagAddedDetails.isNewDigitalTagAdded) && (newTagAddedDetails === null || newTagAddedDetails === void 0 ? void 0 : newTagAddedDetails.messageId) === (message === null || message === void 0 ? void 0 : message.id));
    const id = open ? 'popover' : undefined;
    const popOverReferencePosition = useSelector(getDigitalTagPopOverPosition); // getting popover position to render in case of public channels
    const searchedDigitalTags = useSelector(getDigitalMessageTagsByName);
    useEffect(() => {
        if (digitalTagError) {
            setAnchorEl(null); // close the popover first
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'genericError' }), {
                autoClose: false,
                containerId: 'ComponentToastContainer',
            });
            dispatch(CcfAssignmentAction.showDigitalTagLoading(false));
            dispatch(CcfAssignmentAction.setDigitalTagErrorState(false));
            dispatch(CcfAssignmentAction.setDigitalTagAddedState({}));
        }
    }, [digitalTagError]);
    useEffect(() => {
        if ((selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) > 2) {
            setSelectedTagCount(selectedTag.length - 2);
        }
        if ((selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) === 0) {
            setDropdownState(false);
        }
    }, [selectedTag]);
    useEffect(() => {
        setTagSearchLoading(false);
    }, [searchedDigitalTags]);
    useEffect(() => {
        if (message && message.tags) {
            setTagValue(message.tags);
            isExpanded && setTagsToShow(message.tags.length);
        }
    }, [currentMessageTags]);
    useEffect(() => {
        if (!open) {
            setDropdownState(false);
        }
    }, [open]);
    useEffect(() => {
        if (!isExpanded) {
            setTagsToShow(2);
        }
        else {
            if (message)
                setTagsToShow(message.tags ? message.tags.length : 2);
        }
    }, [isExpanded]);
    /**
     * method to search message tag by text
     * @param props - e,value
     * @example onInputChange
     * @returns
     */
    const onInputChange = (_event, value) => {
        if (value.length > 1) {
            dispatch(searchDigitalMessageTagByName({ tagName: value }));
            setTagSearched(true);
            setTagSearchLoading(true);
        }
        else if (value.length <= 1) {
            setTagSearched(false);
        }
    };
    /**
     * method to set the value of selected message tag
     * @param props - e,value
     * @example handleChange
     * @returns
     */
    const handleChange = (_e, value) => {
        const tag = [...selectedTag];
        let duplicateSelection = false;
        if (tag.length > 0) {
            duplicateSelection = tag.some((item) => item.id === value.id);
            !duplicateSelection && tag.push(value);
        }
        else
            tag.push(value);
        isExpanded && setTagsToShow(tag.length);
        if (message && tag) {
            !duplicateSelection && dispatch(CcfAssignmentAction.showDigitalTagLoading(true));
            dispatch(addDigitalMessageTag({ messageId: message.id, tagId: value.id }));
            dispatch(CcfAssignmentAction.setDigitalTagAddedState({ messageId: message.id, isNewDigitalTagAdded: true }));
        }
    };
    /**
   * deletes a tag from a particular message
   * @param props - id
   * @example handleDelete
   * @returns
   */
    const handleDelete = (id) => {
        if (message) {
            dispatch(CcfAssignmentAction.showDigitalTagLoading(true));
            dispatch(removeDigitalMessageTag({ messageId: message === null || message === void 0 ? void 0 : message.id, tagId: id }));
            dispatch(CcfAssignmentAction.setDigitalTagAddedState({ isNewDigitalTagAdded: true, messageId: message === null || message === void 0 ? void 0 : message.id }));
        }
    };
    /**
      * handle open popover event
      * @example openPopOverMenu()
      */
    const openPopOverMenu = (event) => {
        var _a, _b;
        open = true;
        openPublic = true;
        setAnchorEl(event.currentTarget);
        const anchorReference = { top: (_a = event.currentTarget.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.top, left: (((_b = event.currentTarget.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.left) + 25) };
        dispatch(CcfAssignmentAction.setDigitalTagsPopOverState(anchorReference));
    };
    /**
     * handle close event
     * @example handleClose()
     */
    const handleClose = () => {
        setAnchorEl(null);
        setTagSearched(false);
        dispatch(CcfAssignmentAction.setDigitalTagAddedState({}));
        dispatch(CcfAssignmentAction.setMax100DigitalTags({}));
    };
    /**
     * handle showMore functionality
     * @example showMoreTags()
     */
    const showMoreTags = () => {
        if (!isExpanded) {
            setTagsToShow(selectedTagCount + 2);
            dispatch(CcfAssignmentAction.setDigitalTagsExpandedState(true));
        }
        else {
            setTagsToShow(2);
            dispatch(CcfAssignmentAction.setDigitalTagsExpandedState(false));
        }
    };
    /**
   * Handles the key down event for a tag, triggering deletion when Enter or Space is pressed.
   * @param event - React KeyboardEvent object
   * @param tagID - ID of the tag to be deleted
   * @example focusChipCancelIcon (event, tagID)
   */
    const focusChipCancelIcon = (event, tagID) => {
        const acceptableKeys = new Set([EventKeys.ENTER, ' ']);
        if (acceptableKeys.has(event.key)) {
            handleDelete(tagID);
        }
    };
    return (_jsxs(CcfBox, { children: [_jsx(CcfBox, Object.assign({ tabIndex: 0, "aria-label": `${props.author} ${(_a = selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) !== null && _a !== void 0 ? _a : 0} tag`, role: "button", onClick: openPopOverMenu, "data-testid": "open-popover", onKeyUp: (e) => {
                    if (e.key === 'Enter') {
                        openPopOverMenu(e);
                    }
                }, sx: isDisabled ? styles.disableTagOperations : {} }, { children: (isPreviousCaseMessage || isNextCaseMessage) ? ((selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) !== 0 && _jsx(CcfDigitalTagAddIcon, { count: selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length, "data-testid": "digitalMessageTag", htmlColor: isDisabled ? theme.palette.text.disabled : theme.palette.text.black })) : _jsx(CcfDigitalTagAddIcon, { count: selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length, "data-testid": "digitalMessageTag", htmlColor: isDisabled ? theme.palette.text.disabled : theme.palette.text.black }) })), _jsxs(Popover, Object.assign({ anchorReference: isNewTagAdded && !isPrivateChannel ? 'anchorPosition' : 'anchorEl', sx: showSpinner ? styles.disablePopover : styles.popover, open: isNewTagAdded && !isPrivateChannel ? openPublic : open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: { vertical: 'top', horizontal: 'right' }, anchorPosition: { top: popOverReferencePosition === null || popOverReferencePosition === void 0 ? void 0 : popOverReferencePosition.top, left: popOverReferencePosition === null || popOverReferencePosition === void 0 ? void 0 : popOverReferencePosition.left }, transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, PaperProps: {
                    'aria-labelledby': 'tags-dialog-title',
                    role: 'dialog',
                } }, { children: [showSpinner && (_jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%", style: { position: 'absolute', top: '35%' } }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) }))), _jsxs(CcfBox, Object.assign({ sx: styles.tagStack }, { children: [_jsxs(CcfBox, Object.assign({ sx: { margin: '5px -3px', display: 'flex' } }, { children: [_jsx(CcfDigitalTagIcon, { sx: styles.digitalIcon, fontSize: "medium" }), _jsx(CcfTypography, { id: "tags-dialog-title", variant: "h5", sx: styles.addTagText, translationKey: "tags" }), _jsx(CcfCloseIcon, { "data-testid": "close-popup", role: 'button', "aria-label": translate('close'), onKeyUp: (e) => { if (e.key === 'Enter')
                                            handleClose(); }, tabIndex: 0, viewBox: "-8 -6 32 32", onClick: handleClose, fontSize: "medium", sx: { marginLeft: 'auto' } })] })), ((selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) === 0) && _jsx(CcfTypography, { variant: "h5", translationKey: "firstTag" }), (selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) > 0 &&
                                (selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.slice(0, tagsToShow).map((tagItem) => (_jsx(CcfBox, Object.assign({ style: { display: 'inline-flex', maxWidth: '100%' } }, { children: _jsx(CcfTooltip, Object.assign({ title: tagItem.title }, { children: (isPreviousCaseMessage || isNextCaseMessage) ? _jsx(Chip, { tabIndex: 0, sx: styles.chipStyle, style: { backgroundColor: hexToRgbA(tagItem.color, 0.2) }, label: tagItem.title, size: "small", "data-testid": "chipIcon", classes: styles === null || styles === void 0 ? void 0 : styles.chip }) : _jsx(Chip, { tabIndex: 0, sx: styles.chipStyle, style: { backgroundColor: hexToRgbA(tagItem.color, 0.2) }, label: tagItem.title, size: "small", "data-testid": "chipIcon", onDelete: () => handleDelete(tagItem === null || tagItem === void 0 ? void 0 : tagItem.id), deleteIcon: _jsx(CancelIcon, { tabIndex: 0, onKeyDown: (e) => focusChipCancelIcon(e, tagItem === null || tagItem === void 0 ? void 0 : tagItem.id), "aria-label": `Remove ${tagItem.title} tag`, "data-testid": "removeTagsChip", role: "button" }), classes: styles === null || styles === void 0 ? void 0 : styles.chip }) })) }), tagItem.id)))), ((selectedTag === null || selectedTag === void 0 ? void 0 : selectedTag.length) > 2) && _jsxs(Link, Object.assign({ component: "button", variant: "body2", "data-testid": "show-more-link", onClick: () => {
                                    showMoreTags();
                                } }, { children: [!isExpanded && _jsx("span", { children: '+' + selectedTagCount }), isExpanded && _jsx(CcfTypography, { variant: "h5", sx: styles.viewLess, translationKey: "viewLess" })] }))] })), (!showTagDropdown && !isNewTagAdded && !isPreviousCaseMessage && !isNextCaseMessage) && (_jsxs(CcfButton, Object.assign({ sx: styles === null || styles === void 0 ? void 0 : styles.addNewBtn, "aria-label": translate('addNew'), variant: "outlined", "data-testid": "btn-add", primary: true, onClick: () => setDropdownState(!showTagDropdown), isFocused: true, disableRipple: true }, { children: [_jsx(CcfPlusIcon, { fill: theme.palette.background.paper, sx: styles.plusIcon }), _jsx(CcfTypography, { sx: styles.addNewBtnText, translationKey: "addNew" })] }))), (showTagDropdown || Boolean(isNewTagAdded)) && (_jsx(Autocomplete, { openOnFocus: true, blurOnSelect: true, tabIndex: 0, id: id, filterOptions: (x) => x, loading: tagSearchLoading, options: isTagSearched ? searchedDigitalTags : options, renderOption: (props, option) => {
                            return (_createElement("li", Object.assign({}, props, { key: option === null || option === void 0 ? void 0 : option.id }), option === null || option === void 0 ? void 0 : option.title));
                        }, size: "small", "data-testid": "tags-dropdown", getOptionLabel: (option) => showSpinner ? option === null || option === void 0 ? void 0 : option.title : '', sx: styles.autocomplete, renderInput: (params) => (_jsx(TextField, Object.assign({}, params, { label: translate('messageTags'), sx: styles.tagNameFont, size: "small" }))), onChange: (e, tag) => tag && handleChange(e, tag), onInputChange: onInputChange, ListboxComponent: ListboxComponent, slotProps: {
                            popper: {
                                id: 'message-tags-popper',
                                role: 'listbox',
                            },
                        } }))] }))] }));
}
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children } = props, other = __rest(props, ["children"]);
    const dispatch = useDispatch();
    const [totalPages, setTotalPages] = useState(1);
    const [callOnScrollEvent, setCallOnScrollEvent] = useState(false);
    const digitalMessageTagsCount = useSelector(getDigitalMessageTagsCount);
    let currentPageIndex = useSelector(getDigitalMessageTagsCurrentPage);
    ;
    useEffect(() => {
        let totalPages = Math.floor(digitalMessageTagsCount / 50);
        totalPages = digitalMessageTagsCount % 50 === 0 ? totalPages : totalPages + 1;
        setTotalPages(totalPages);
    }, [digitalMessageTagsCount]);
    /**
     * handle close event
     * @example handleClose()
     */
    function handlePageScroll(event) {
        const scrollElement = event.target;
        const bottom = (scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 1) || (event === null || event === void 0 ? void 0 : event.bottom);
        if (bottom && currentPageIndex < totalPages && !callOnScrollEvent) {
            currentPageIndex = currentPageIndex + 1;
            setCallOnScrollEvent(true);
            dispatch(getDigitalMessageTagsByPageNumber(currentPageIndex));
            dispatch(CcfAssignmentAction.setCurrentDigitalTagsPage(currentPageIndex));
        }
        setTimeout(() => {
            setCallOnScrollEvent(false);
        }, 1000);
    }
    return (_jsx(Box, Object.assign({}, other, { role: 'listbox', ref: ref, onScroll: handlePageScroll, style: { minHeight: 'auto' }, "data-testid": "render-options-list" }, { children: children })));
});
export default CcfPopoverTag;
//# sourceMappingURL=ccf-popover-tag.js.map