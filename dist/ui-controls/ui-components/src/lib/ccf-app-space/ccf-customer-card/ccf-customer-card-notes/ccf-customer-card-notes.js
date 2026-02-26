import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import customerCardNoteStyles from './ccf-customer-card-notes.styles';
import { useEffect, useState } from 'react';
import CcfCustomerCardNewNote from './ccf-customer-card-new-note';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerNotesThunk, deleteSelectedCustomerNoteThunk, selectCustomerNotesList, selectCurrentCaseNoteObj, selectCurrentCaseId, CcfCustomerCardActions, isCustomerNotesLoading, isCustomerNotesError, } from '../ccf-customer-card.slice';
import { CcfBox, CcfPopOver, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { DateTimeUtilService } from '@nice-devone/core-sdk';
import { DigitalContactStatus } from '@nice-devone/common-sdk';
import { getActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import customerCardDetailsStyles from '../ccf-customer-card-details/ccf-customer-card-details.style';
import { getcurrentCustomerContactInfo } from '../../ccf-digital-search/ccf-digital-search.slice';
/**
 * CcfCustomerCardNotes- used to display customer notes and to post new notes
 * @param props -?-CcfCustomerCardNotesProps
 * @example <CcfCustomerCardNotes />
 */
export function CcfCustomerCardNotes(props) {
    var _a;
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = customerCardNoteStyles(theme);
    const ccDetailsStyles = customerCardDetailsStyles(theme);
    const [translate] = useTranslator();
    const currentCaseNoteObj = useSelector(selectCurrentCaseNoteObj);
    const currentCaseId = useSelector(selectCurrentCaseId);
    const customerNotes = useSelector(selectCustomerNotesList);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isCustomerCardNotesLoading = useSelector(isCustomerNotesLoading);
    const isCustomerCardNotesError = useSelector(isCustomerNotesError);
    const [allNotes, updateAllNotes] = useState(customerNotes);
    const [moreIconEnable, setMoreIconEnable] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [callOnScrollEvent, setCallOnScrollEvent] = useState(false);
    const customerContactIdFromSearch = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.customerId;
    useEffect(() => {
        if (props.customerId && props.customerId.length > 0)
            dispatch(getCustomerNotesThunk({ customerId: props.customerId, currentPageIndex: currentPageIndex }));
    }, [currentCaseId]);
    useEffect(() => {
        if (currentCaseNoteObj && currentCaseNoteObj.caseId === currentCaseId && currentCaseNoteObj.noteCRUDState) {
            setMoreIconEnable(true);
        }
        else
            setMoreIconEnable(false);
    }, [currentCaseNoteObj, currentCaseId]);
    useEffect(() => {
        updateAllNotes(customerNotes);
    }, [customerNotes]);
    /**
     * dropdownOptions - dropdown
     * @example
     * ```
     * dropdownOptions()
     * ```
     */
    const dropdownOptions = {
        menuItems: [
            {
                items: [
                    {
                        label: translate('edit'),
                        closeOnSelection: true,
                        id: 'editActionBtn',
                        type: 'edit',
                    },
                    {
                        label: translate('delete'),
                        closeOnSelection: true,
                        type: 'delete',
                        id: 'deleteActionBtn',
                    }
                ],
            }
        ],
    };
    /**
     * Function to render read only note which can be edited and deleted
     * @param item -Note
     * @example - renderCustomerNote(item)
     */
    const renderCustomerNote = (item) => {
        var _a, _b, _c, _d;
        /**
         * Function to on selecting popover item selection
         * @param menuItem -PopOverMenuItem
         * @param event -React.MouseEvent<HTMLElement>
         * @example - onPopOverItemSelection(item, e)
         */
        const onPopOverItemSelection = (menuItem) => () => {
            switch (menuItem.type) {
                case 'edit':
                    editNote(item);
                    break;
                case 'delete':
                    deleteNote(item);
                    break;
            }
        };
        /**
         * Function to on selecting popover item selection
         * @param item -PopOverMenuItem
         * @param event -React.MouseEvent<HTMLElement>
         * @example - editControl(item, e)
         */
        const editNote = (item) => {
            setCurrentPageIndex(1);
            dispatch(CcfCustomerCardActions.updateCustomerNotesUsingCaseIdMap([
                item,
                true,
                undefined,
                props.customerId
            ]));
        };
        /**
         * Function to on selecting popover item selection
         * @param item -PopOverMenuItem
         * @param event -React.MouseEvent<HTMLElement>
         * @example - deleteControl(item)
         */
        const deleteNote = (item) => {
            setCurrentPageIndex(1);
            dispatch(deleteSelectedCustomerNoteThunk({ noteId: item.id ? item.id : '', customerId: props.customerId }));
        };
        return (_jsxs(CcfBox, Object.assign({ sx: styles.noteBottomSeperator }, { children: [_jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.flexDisplay), styles.noteHeader) }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.agentNameStyle }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'h6', sx: styles.agentNameLabel }, { children: ((item === null || item === void 0 ? void 0 : item.user) && ((_a = item === null || item === void 0 ? void 0 : item.user) === null || _a === void 0 ? void 0 : _a.firstName)) ? `${(_b = item === null || item === void 0 ? void 0 : item.user) === null || _b === void 0 ? void 0 : _b.firstName} ${(_c = item === null || item === void 0 ? void 0 : item.user) === null || _c === void 0 ? void 0 : _c.surname}` : '' })), _jsx(CcfTypography, Object.assign({ variant: 'h6', sx: item && item.createdAt && new Date(item.createdAt) < new Date(item.updatedAt) ? Object.assign(Object.assign({}, styles.dateLabel), styles.italicFont) : styles.dateLabel }, { children: `${item && item.createdAt && (new Date(item.createdAt) < new Date(item.updatedAt)) ? translate('edited') : ''} ${DateTimeUtilService.getRequiredDateFormat(item.updatedAt)}` }))] })), ((_d = activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactStatus) === null || _d === void 0 ? void 0 : _d.toLowerCase()) !== DigitalContactStatus.INCOMING.toLowerCase() && !customerContactIdFromSearch && !moreIconEnable && (_jsx(CcfPopOver, { optionList: dropdownOptions, onPopOverItemSelection: onPopOverItemSelection }))] })), _jsx(CcfTypography, Object.assign({ variant: 'h6', sx: Object.assign(Object.assign({}, styles.noteContent), styles.contentWrap), title: item.content }, { children: item.content }))] })));
    };
    /**
     * handle scrolling event
     * @example handlePageScroll()
    */
    function handlePageScroll(event) {
        const scrollElement = event.target;
        const bottom = (scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 1) || (event === null || event === void 0 ? void 0 : event.bottom);
        const morePageAvailable = (currentCaseNoteObj.totalRecords / 25) > currentPageIndex;
        if (bottom && morePageAvailable && !callOnScrollEvent) {
            setCurrentPageIndex(currentPageIndex + 1);
            setCallOnScrollEvent(true);
            dispatch(getCustomerNotesThunk({ customerId: props.customerId, currentPageIndex: currentPageIndex + 1 }));
        }
        setTimeout(() => {
            setCallOnScrollEvent(false);
        }, 1000);
    }
    /**
     * Function to get notes body
     * @example getNotesBody()
     */
    const getNotesBody = () => {
        return (allNotes && allNotes.length
            ?
                _jsxs(_Fragment, { children: [allNotes.map((item) => {
                            return currentCaseNoteObj.caseId === currentCaseId &&
                                currentCaseNoteObj.id !== undefined &&
                                currentCaseNoteObj.id === item.id &&
                                currentCaseNoteObj.editMode ? (
                            //opens up the UI for editing an existing note(also retains user inputs)
                            _jsx(CcfCustomerCardNewNote, { enableNewNoteBtn: props.enableNewNoteBtn, noteContent: currentCaseNoteObj, customerId: props.customerId }, item.id)) : (renderCustomerNote(item));
                        }), isCustomerCardNotesLoading && currentPageIndex > 1 && _jsx(CcfBox, { children: _jsx(CcfBox, { sx: ccDetailsStyles.loader }) })] })
            :
                (_jsx(CcfBox, Object.assign({ sx: styles.noInformation }, { children: translate(isCustomerCardNotesError ? 'genericError' : 'noInformationAvailable') }))));
    };
    return (_jsxs(Box, Object.assign({ sx: styles.ccfNewNoteContent, onScroll: handlePageScroll }, { children: [props.isNewNote && (
            //opens up the UI for adding a new customer note(also retains user inputs)
            _jsx(CcfCustomerCardNewNote, { noteContent: currentCaseNoteObj, enableNewNoteBtn: props.enableNewNoteBtn, customerId: props.customerId })), isCustomerCardNotesLoading && currentPageIndex === 1
                ? _jsx(CcfBox, { children: _jsx(CcfBox, { sx: ccDetailsStyles.loader }) })
                : getNotesBody()] })));
}
//# sourceMappingURL=ccf-customer-card-notes.js.map