/**
 * CcfReschedulePopoverStyles - returns the CcfReschedulePopoverStyles styles component
 * @example <CcfReschedulePopoverStyles />
 */
declare const CcfReschedulePopoverStyles: () => {
    dateTextField: {
        borderEndEndRadius: number;
        borderStartEndRadius: number;
        height: string;
        fontSize: string;
        '& input::placeholder': {
            fontSize: string;
        };
    };
    popoverFormControl: {
        '& .MuiTextField-root': {
            marginY: number;
        };
        width: string;
    };
    closeIcon: {
        minWidth: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
};
export default CcfReschedulePopoverStyles;
