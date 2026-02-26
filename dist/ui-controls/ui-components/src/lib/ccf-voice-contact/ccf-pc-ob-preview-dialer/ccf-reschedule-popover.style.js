/**
 * CcfReschedulePopoverStyles - returns the CcfReschedulePopoverStyles styles component
 * @example <CcfReschedulePopoverStyles />
 */
const CcfReschedulePopoverStyles = () => {
    const styles = {
        dateTextField: {
            borderEndEndRadius: 0,
            borderStartEndRadius: 0,
            height: '40px',
            fontSize: '13px',
            '& input::placeholder': { fontSize: '13px' },
        },
        popoverFormControl: {
            '& .MuiTextField-root': { marginY: .5 },
            width: '100%',
        },
        closeIcon: {
            minWidth: '40px',
            '&:hover': { backgroundColor: 'transparent' },
        },
    };
    return styles;
};
export default CcfReschedulePopoverStyles;
//# sourceMappingURL=ccf-reschedule-popover.style.js.map