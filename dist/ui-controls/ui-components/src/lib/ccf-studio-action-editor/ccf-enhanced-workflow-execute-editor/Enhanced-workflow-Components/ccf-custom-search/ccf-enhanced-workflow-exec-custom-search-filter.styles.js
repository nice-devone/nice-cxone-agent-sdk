/**
 * Styling for Advance workflow execute editor general information Screen Component
 * @returns CcfadvanceWECustomsearchfilterStyles CSS properties as a JSON object
 * @example CcfadvanceWECustomsearchfilterStyles
 */
const CcfEnhancedWECustomsearchfilterStyles = (theme) => {
    const styles = {
        labelTypography: {
            textAlign: 'left',
            color: theme.palette.text.secondary,
            fontSize: '0.81rem',
            lineHeight: '1rem',
        },
        mainContainer: {
            width: '100%',
            paddingTop: '16px',
        },
        filterContainer: {
            padding: '16px',
            borderRadius: '8px',
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto',
            backgroundColor: theme.palette.background.level1,
        },
        content: {
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            padding: '16px',
            overflowY: 'auto',
            workflowMappingContainer: {
                display: 'flex',
                flexDirection: 'column',
            },
        },
        dropdownPlaceHolder: {
            overflow: 'hidden',
            color: theme.palette.text.filter,
            textOverflow: 'ellipsis',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
        },
        buttonAdd: {
            color: theme.palette.background.paper,
            backgroundColor: 'white',
            minWidth: '6.25rem',
            fontWeight: 600,
            textTransform: 'none',
            height: '20px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '0 12px',
            '&.Mui-disabled': {
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.grey[300]}`,
                cursor: 'not-allowed',
                opacity: 0.6,
            },
        },
        buttonDelete: {
            color: theme.palette.text.searchTitle,
            backgroundColor: 'white',
            marginTop: '0',
            marginLeft: '0',
            padding: 0,
            minWidth: 'unset',
            width: 'auto',
            height: 'auto',
            background: 'none',
            border: 'none',
        },
        selectionDropdown: {
            maxHeight: '2.5rem',
            maxWidth: '18.75rem',
            textAlign: 'left',
            width: '100%',
            '& .MuiSelect-select': {
                minHeight: '0 !important',
            },
        },
        autocompleteInput: {
            '& .MuiInputBase-root': {
                height: '40px',
                fontSize: '0.81rem',
                '& .MuiInputBase-input::placeholder': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '13px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                    opacity: 1,
                },
            },
            '& input': {
                padding: '6px 14px',
            },
        },
        paperComponent: {
            '&.MuiAutocomplete-paper': {
                maxHeight: '200px',
                marginTop: '4px',
                '& .MuiAutocomplete-listbox': {
                    maxHeight: 'none',
                    padding: 0,
                },
                '& .MuiAutocomplete-option': {
                    fontSize: '0.81rem',
                    fontWeight: 400,
                    lineHeight: '1.1rem',
                    minHeight: '2.25rem',
                    padding: '4px 14px',
                    color: theme.palette.text.contrastText,
                    textAlign: 'left',
                },
            },
        },
        dropdownMenu: {
            top: 0,
            maxHeight: 200,
            overflow: 'auto',
            '& .MuiMenuItem-root': {
                fontSize: '0.81rem',
                fontWeight: '400',
                lineHeight: '1.1rem',
                textAlign: 'left',
                color: theme.palette.text.contrastText,
                minHeight: '2.25rem',
            },
            '& .MuiMenu-list': {
                paddingTop: '0',
            },
            '&::-webkit-scrollbar': {
                width: '0.25rem',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.text.light,
                borderRadius: '0.25rem',
            },
        },
        inputPlaceHolder: {
            '& .MuiOutlinedInput-root': {
                '& input::placeholder': {
                    color: theme.palette.text.filter,
                    opacity: '1',
                    textOverflow: 'ellipsis',
                    fontSize: '0.81rem',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                },
            },
        },
        variableInputContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            borderRadius: '0',
            flexDirection: 'column',
            gap: '0.25rem',
            maxWidth: '18.75rem',
        },
        dropdownContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            borderRadius: '0',
            flexDirection: 'column',
            gap: '0.25rem',
        },
        paramHeadingTypography: {
            fontSize: '0.75rem',
            fontWeight: '400',
            lineHeight: '1rem',
            textAlign: 'left',
            color: theme.palette.text.contrastText,
        },
        paramTypography: {
            fontSize: '1.1rem',
            fontWeight: '600',
            lineHeight: '1.1rem',
            color: theme.palette.text.black,
        },
        buttonTypography: {
            fontSize: '0.69rem',
            fontWeight: '600',
            lineHeight: '0.75rem',
            color: theme.palette.text.searchTitle,
            Paddingbottom: '0.5rem',
        },
        deleteIcon: {
            marginRight: '4px',
            width: '12px',
            height: '12px',
        },
    };
    return styles;
};
export default CcfEnhancedWECustomsearchfilterStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-custom-search-filter.styles.js.map