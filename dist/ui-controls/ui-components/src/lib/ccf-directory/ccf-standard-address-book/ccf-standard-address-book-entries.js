import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme, } from '@mui/material';
import { CcfAddressBookIcon, CcfAppToastMessage, CcfFavouriteIcon, CCfToggleIconButton, CcfTooltip, CcfTypography, CcfUnfavoredIcon, useTranslator } from '@nice-devone/ui-controls';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agentDirectoryActions, DirectorySearchRecord, selectSearchBoxQueryValue, standardAddressBookEntries, standardAddressBookEntriesMoreDetails, standardBookEntries, toggleFavoriteStandardAdrsBook, totalAddressBookMatchRecordsCount, favoriteStandardAddressBookList, getCurrentFavsInDirectory, getFavoritesToastReference } from '../+state/ccf-directory.slice';
import ccfDirectoryStyles from '../ccf-directory.styles';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import { toast } from 'react-toastify';
import { getFavoritesStatesToastReference } from '../../ccf-agent-state/ccf-agent-state.slice';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component for standard address book
 * @param props - CcfStandardAddressBookProps
 * @example - <CcfStandardAddressBook />
 * @returns
 */
export function CcfStandardAddressBook(props) {
    const { addressBookId, renderTwoColumnDesign, fromFavorites } = props;
    const dispatch = useDispatch();
    const favoriteEntries = useSelector(favoriteStandardAddressBookList);
    const addressBookEntries = useSelector(standardAddressBookEntries);
    const standardAddBookEntries = fromFavorites ? favoriteEntries : addressBookEntries;
    const standardAddressBookMoreDetails = useSelector(standardAddressBookEntriesMoreDetails);
    const theme = useTheme();
    const directoryStyles = ccfDirectoryStyles(theme);
    const searchBoxQuery = useSelector(selectSearchBoxQueryValue);
    const [offsetStandardAddressBookIndex, setOffsetStandardAddressBookIndex] = useState(25);
    const [callOnScrollEvent, setCallOnScrollEvent] = useState(false);
    const totalStandardAddressMatchRecords = useSelector(totalAddressBookMatchRecordsCount);
    const [StandardAddressBookDetails, setStandardAddressBookDetails] = useState(null);
    const [translate] = useTranslator();
    const fontSizes = {
        small: 'small',
        smaller: 'smaller',
    };
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    const currentFavsInDirectory = useSelector(getCurrentFavsInDirectory);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const appToastContainer = useRef();
    const DIRECTORY_MAX_FAVS_ALLOWED = 25;
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    /**
     *
     * @param addressBookEntryId - addressBookEntryId
     * @example This function is used to show more entries for this address book
     */
    const showMoreAddressBookDetails = useCallback((addressBookEntryId) => {
        const payload = {
            addressBookEntryId: addressBookEntryId,
            isVisible: true,
        };
        dispatch(agentDirectoryActions.displayStandardAddressDetails(payload));
    }, [dispatch]);
    useEffect(() => {
        if (renderTwoColumnDesign && (standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length)) {
            // Added the below `if` condition because when particular addressbook was selected from the dropdown
            // (for which first entry was shown when "All" was selected),
            // more details were not rendering      
            if ((standardAddressBookMoreDetails === null || standardAddressBookMoreDetails === void 0 ? void 0 : standardAddressBookMoreDetails.addressBookEntryId) === standardAddBookEntries[0].addressBookEntryId
                && standardAddressBookMoreDetails.displayDetails) {
                renderStandardAddBookDetails();
            }
            else {
                dispatch(agentDirectoryActions.displayStandardAddressDetails({
                    addressBookEntryId: standardAddBookEntries[0].addressBookEntryId,
                    isVisible: true,
                }));
            }
        }
    }, [showMoreAddressBookDetails, renderTwoColumnDesign, standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length]);
    useEffect(() => {
        if (standardAddressBookMoreDetails.displayDetails) {
            renderStandardAddBookDetails();
        }
    }, [standardAddressBookMoreDetails]);
    /**
      * lazily loaded the standard addressbook details
      * @example renderStandardAddBookDetails()
    */
    const renderStandardAddBookDetails = () => __awaiter(this, void 0, void 0, function* () {
        const bookDetails = yield import('./ccf-standard-address-book-details/ccf-standard-address-book-details');
        const StandardAddressBookDetails = bookDetails === null || bookDetails === void 0 ? void 0 : bookDetails.CcfStandardAddressBookDetails;
        setStandardAddressBookDetails(_jsx(StandardAddressBookDetails, { addressBookEntryId: standardAddressBookMoreDetails.addressBookEntryId, standardAddressBookDetails: standardAddBookEntries || [], renderTwoColumnDesign: renderTwoColumnDesign }));
    });
    /**
     * Function is used to handle pagination for two column view as scroll bar is into child component.
     */
    const handlePageScroll = useCallback((e) => {
        const scrollElement = e.target;
        const bottom = (scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 1) || (e === null || e === void 0 ? void 0 : e.bottom);
        if (!callOnScrollEvent && bottom && (offsetStandardAddressBookIndex < totalStandardAddressMatchRecords)) {
            setCallOnScrollEvent(true);
            const payload = {
                adressBookId: addressBookId === null || addressBookId === void 0 ? void 0 : addressBookId.toString(),
                startIndex: (offsetStandardAddressBookIndex),
                recordsToLoad: DirectorySearchRecord.DirectoryCount,
                searchText: searchBoxQuery,
            };
            setOffsetStandardAddressBookIndex(offsetStandardAddressBookIndex + DirectorySearchRecord.DirectoryCount);
            dispatch(standardBookEntries(payload));
        }
        setTimeout(() => {
            setCallOnScrollEvent(false);
        }, 100);
    }, [dispatch, offsetStandardAddressBookIndex, totalStandardAddressMatchRecords, callOnScrollEvent, searchBoxQuery]);
    /**
     * Function to toggle favorite option for selected Standard Address Book entry
     * @param entries - A single address book entry to toggle favorite status
     * @example
     * ```
     * toggleFavorite(entry)
     * ```
     */
    const toggleFavorite = (entries) => {
        var _a, _b;
        const totalFavoritesCount = currentFavsInDirectory ?
            (_a = Object.values(currentFavsInDirectory)) === null || _a === void 0 ? void 0 : _a.reduce((sumOfFavs, favsArray) => sumOfFavs + ((favsArray === null || favsArray === void 0 ? void 0 : favsArray.length) || 0), 0) : 0;
        if (totalFavoritesCount >= DIRECTORY_MAX_FAVS_ALLOWED && !((_b = currentFavsInDirectory === null || currentFavsInDirectory === void 0 ? void 0 : currentFavsInDirectory.standardAdrsBook) === null || _b === void 0 ? void 0 : _b.includes(entries === null || entries === void 0 ? void 0 : entries.addressBookEntryId))) {
            favoritesToastReference && toast.dismiss(favoritesToastReference);
            favoritesToastReferenceFortState && toast.dismiss(favoritesToastReferenceFortState);
            appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'favsLimitExceeded', extraArgs: { format: [DIRECTORY_MAX_FAVS_ALLOWED || ''] } }), {
                autoClose: false,
                closeOnClick: true,
                position: 'top-center',
                containerId: 'AppToastContainer',
            });
            dispatch(agentDirectoryActions.updateFavsToastReference(appToastContainer.current));
        }
        else {
            dispatch(toggleFavoriteStandardAdrsBook({ addressBooksEntries: [entries] }));
        }
    };
    /**
    * Function to narrate favorite option for selected Agent
    * @param entry - Address book entry
    * @example narrationForFavorite()
    */
    const narrationForFavorite = (standardAddressBookDetails) => {
        const addressBookName = `${standardAddressBookDetails === null || standardAddressBookDetails === void 0 ? void 0 : standardAddressBookDetails.addressBookName}`;
        return (standardAddressBookDetails === null || standardAddressBookDetails === void 0 ? void 0 : standardAddressBookDetails.isFavorite) ? `${translate('remove')} ${addressBookName} ${translate('standardAddressBookHeading')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${addressBookName} ${translate('standardAddressBookHeading')} ${translate('to')} ${translate('favorites')}`;
    };
    return (standardAddressBookMoreDetails &&
        _jsxs(Box, Object.assign({ sx: (renderTwoColumnDesign && (standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length)) ? directoryStyles.scrollerClass : {} }, { children: [_jsx(Box, Object.assign({ "data-testId": 'standardDetailsComponent', onScroll: handlePageScroll, sx: renderTwoColumnDesign ? directoryStyles.twoColumnStyles : {} }, { children: (!standardAddressBookMoreDetails.displayDetails || renderTwoColumnDesign) && standardAddBookEntries && (standardAddBookEntries === null || standardAddBookEntries === void 0 ? void 0 : standardAddBookEntries.length) > 0 && standardAddBookEntries.map((standardAddressBookDetails) => {
                        var _a;
                        return (_jsxs(Box, Object.assign({ "data-testId": "showStandardAddressDetails", onClick: () => showMoreAddressBookDetails(standardAddressBookDetails.addressBookEntryId), sx: (standardAddressBookMoreDetails.displayDetails && standardAddressBookMoreDetails.addressBookEntryId === standardAddressBookDetails.addressBookEntryId) ? Object.assign(Object.assign({}, directoryStyles.directoryItem), directoryStyles.selectedBackground) : directoryStyles.directoryItem }, { children: [_jsxs(Box, Object.assign({ sx: [directoryStyles.iconContainer, isFavoritesFTEnabled ? directoryStyles.addBookList : {}] }, { children: [_jsxs(CcfTypography, Object.assign({ sx: directoryStyles.headerText, variant: 'h5' }, { children: [standardAddressBookDetails.firstName, "  ", standardAddressBookDetails === null || standardAddressBookDetails === void 0 ? void 0 : standardAddressBookDetails.middleName, " ", standardAddressBookDetails.lastName] })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && isFavoritesFTEnabled &&
                                            _jsx(CcfTooltip, Object.assign({ title: translate('favorites'), arrow: true }, { children: _jsx("div", Object.assign({ "aria-hidden": 'true' }, { children: _jsx(CCfToggleIconButton, { sx: [directoryStyles.hoverDisabledButton, directoryStyles.focussedElement], icon: _jsx(CcfFavouriteIcon, { id: 'dirAgentavoriteIcon', htmlColor: (_a = theme.palette.digitalStatus) === null || _a === void 0 ? void 0 : _a.openDark }), isToggled: standardAddressBookDetails === null || standardAddressBookDetails === void 0 ? void 0 : standardAddressBookDetails.isFavorite, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, size: fontSizes.small, toggleIcon: _jsx(CcfUnfavoredIcon, { id: 'dirAddBookToggleFavoriteIcon' }), onClick: () => toggleFavorite(standardAddressBookDetails), tabIndex: 0, "data-testid": "favorite-toggle", onKeyDown: (e) => { if (e.key === 'Enter')
                                                            toggleFavorite(standardAddressBookDetails); }, "aria-label": narrationForFavorite(standardAddressBookDetails) }) })) }))] }), standardAddressBookDetails.addressBookEntryId), _jsxs(Box, { children: [_jsx(CcfAddressBookIcon, {}), _jsx(CcfTypography, Object.assign({ sx: directoryStyles.addressBookName, variant: 'h6' }, { children: standardAddressBookDetails.addressBookName }))] })] }), standardAddressBookDetails.addressBookEntryId));
                    }) })), standardAddressBookMoreDetails.displayDetails && _jsx(Box, Object.assign({ sx: renderTwoColumnDesign ? directoryStyles.twoColumnStyles : {} }, { children: StandardAddressBookDetails }))] })));
}
export default CcfStandardAddressBook;
//# sourceMappingURL=ccf-standard-address-book-entries.js.map