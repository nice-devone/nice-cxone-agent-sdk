/**
 * Styling for Advance workflow execute editor general information Screen Component
 * @returns CcfEnhancedWEGeneralInformationStyles CSS properties as a JSON object
 * @example CcfEnhancedWEGeneralInformationStyles
 */
const CcfEnhancedWEGeneralInformationStyles = (theme) => {
    const styles = {
        mainContainer: {
            width: '100%',
        },
        newAgentHeadingContainer: {
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
        },
        infoContainer: {
            backgroundColor: theme.palette.background.paper,
            padding: '1.56rem 2rem',
        },
        workflowNameInputContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            borderRadius: '0',
            flexDirection: 'column',
            gap: '0.25rem',
            maxWidth: '18.75rem',
            '& input': {
                padding: '0.4rem 0.87rem',
            },
        },
        inputPlaceHolder: {
            height: '2.25rem',
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
        configurationDropdown: {
            maxHeight: '2.25rem',
            maxWidth: '18.75rem',
            textAlign: 'left',
            width: '100%',
            '& .MuiSelect-select': {
                minHeight: '0 !important',
            },
        },
        dropdownContainer: {
            marginTop: '1.5rem',
            marginBottom: '2.6rem',
        },
        dropdownMenu: {
            top: 0,
            maxHeight: 300,
            overflow: 'auto',
            minHeight: '6rem',
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
        dropdownPlaceHolder: {
            overflow: 'hidden',
            color: theme.palette.text.filter,
            textOverflow: 'ellipsis',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
        },
        assignToListItem: {
            textAlign: 'left',
        },
        selectWorkflow: {
            fontSize: '0.87rem',
            fontWeight: '400',
            lineHeight: '0.87rem',
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        cardContainer: {
            flexFlow: 'wrap',
            boxSizing: 'border-box',
            display: 'flex',
            placeContent: 'stretch flex-start',
            alignItems: 'stretch',
            maxHeight: '100%',
            marginTop: '0.5rem',
        },
        radioBtn: {
            display: 'flex',
            justifyContent: 'flex-start',
            marginLeft: '0.7rem',
            width: '100%',
            '& .MuiSvgIcon-root': {
                fontSize: '28',
                width: '1rem',
                height: '1rem',
            },
            '& .css-17vkg5j-MuiButtonBase-root-MuiRadio-root': {
                padding: '0.41rem 0 0.06rem 0.57rem',
            },
        },
        imageContainer: {
            paddingBottom: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        workflowCards: {
            boxSizing: 'border-box',
            maxWidth: '10.3rem',
            minWidth: '10.3rem',
            borderRadius: '0.2rem',
            cursor: 'pointer',
            boxShadow: `0 0.1rem 0.4rem ${theme.palette.boxshadow.main}`,
            margin: '0 1rem 1.03rem 0',
            minHeight: '6.2rem',
        },
        searchTypeText: {
            color: theme.palette.text.contrastText,
            textAlign: 'center',
            fontSize: '0.75rem',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '120%',
            minWidth: '1.75rem',
            minHeight: '2.25rem',
        },
        listItemIcons: {
            marginBottom: '0.5rem',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '2.12rem',
            height: '2.12rem',
        },
        labelTypography: {
            textAlign: 'left',
            color: theme.palette.text.secondary,
            fontSize: '0.81rem',
            lineHeight: '1rem',
        },
        inputLabel: {
            overflow: 'visible',
        },
        errorStyles: {
            color: 'red',
            fontSize: '0.81rem',
            fontWeight: '200',
            lineHeight: '1.1rem',
            minHeight: '2rem',
            margin: 0,
        },
        iconContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
    };
    return styles;
};
export default CcfEnhancedWEGeneralInformationStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-general-info.styles.js.map