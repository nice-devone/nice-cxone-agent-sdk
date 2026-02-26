/**
 * Component displays text input to send the transcript
 * @returns Component to display Transcript Section
 * ```
 * @example
 * <CcfDigitalTranscript/>
 * ```
 */
const CcfDigitalTranscriptStyles = (theme) => {
    const styles = {
        zeroPadding: { padding: 0 },
        dialogWrapper: { width: '400px', maxWidth: '400px', padding: '16px', height: '206px' },
        dialogWrapperSm: { width: '400px', maxWidth: '400px', padding: '16px', height: '72px' },
        flexCenter: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        flexPadding: { display: 'flex', padding: theme.spacing(1) },
        emailAddressText: {
            fontWeight: '600',
            lineHeight: '24px',
            textTransform: 'uppercase',
        },
        closeIcon: {
            position: 'absolute',
            right: 8,
            top: 8,
        },
    };
    return styles;
};
export default CcfDigitalTranscriptStyles;
//# sourceMappingURL=ccf-digital-transcript.styles.js.map