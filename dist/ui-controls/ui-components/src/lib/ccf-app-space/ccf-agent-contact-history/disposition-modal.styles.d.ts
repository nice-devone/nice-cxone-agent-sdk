import { Theme } from '@mui/material';
/**
 *
 * @param theme - MUI theme object
 * @example - const styles = CreateDispositionStyles(theme)
 */
export declare const CreateDispositionModalStyles: (theme: Theme) => {
    modalContainer: {
        [x: string]: string | {
            width: string;
            fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        };
        position: string;
        top: string;
        left: string;
        transform: string;
        backgroundColor: string;
        border: string;
        borderRadius: string;
        boxShadow: string;
        padding: string;
        width: string;
        fontSize: string;
    };
    modalContentContainer: {
        display: string;
        width: string;
    };
    modalContent: {
        '> :not(:first-of-type)': {
            marginTop: string;
        };
        width: string;
        overflow: string;
        wordBreak: string;
    };
    contactName: {
        [x: string]: string | number | {
            fontSize: string;
        };
        fontSize: string;
        fontWeight: number;
    };
    skillAndDateRow: {
        display: string;
        alignItems: string;
        justifyContent: string;
        wordBreak: string;
    };
    skillContainer: {
        display: string;
        alignItems: string;
    };
    skillText: {
        fontSize: string;
        margin: string;
    };
    interactionDate: {
        fontSize: string;
    };
    dispositionAndDurationRow: {
        display: string;
        justifyContent: string;
    };
    dispositionContainer: {
        display: string;
        flexWrap: string;
    };
    dispositionTitle: {
        fontWeight: number;
        fontSize: string;
        marginRight: string;
    };
    dispositionStatus: {
        fontSize: string;
    };
    durationContainer: {
        display: string;
        textWrap: string;
    };
    interactionDuration: {
        fontSize: string;
    };
    dispositionNotesTitle: {
        fontWeight: number;
        fontSize: string;
    };
    dispositionNotesText: {
        fontSize: string;
        marginTop: string;
        overflowY: string;
        maxHeight: string;
    };
    closeButtonColumn: {
        fontSize: string;
        display: string;
        alignItems: string;
        '> button': {
            padding: number;
        };
    };
    dispositionTagsContainer: {
        marginTop: string;
    };
    dispositionTags: {
        ':not(:last-of-type)': {
            marginRight: string;
        };
    };
    buttonsContainer: {
        display: string;
        justifyContent: string;
        marginTop: string;
        '> :not(:first-of-type)': {
            marginLeft: string;
        };
    };
    closeButton: {
        color: string;
    };
    button: {
        fontSize: string;
        color: string;
        border: string;
        '&:hover,&:active, &:focus, &:focus-visible': {
            border: string;
        };
        backgroundColor: string;
        '&:hover, &:focus, &:focus-visible': {
            backgroundColor: string;
        };
        '&:active': {
            backgroundColor: string;
        };
        '&:focus-visible': {
            outline: string;
        };
    };
    scroll: {
        '*::-webkit-scrollbar': {
            width: string;
            height: string;
        };
        '*::-webkit-scrollbar-track': {
            backgroundColor: string;
        };
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: string;
            borderRadius: string;
        };
        '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: string;
        };
    };
};
