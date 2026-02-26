/**
 * CcfCustomerCard - used to display customerCardNoteStyles
 *
 * @example <customerCardNoteStyles />
 */
const customerCardNoteStyles = (theme) => {
    const styles = {
        ccfNewNoteContent: {
            maxHeight: '200px',
            overflowY: 'auto',
            paddingLeft: '20px',
            letterSpacing: '0px',
            color: theme.palette.text.primary,
            opacity: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        noteBottomSeperator: {
            marginBottom: '4px',
            borderBottom: `1px solid ${theme.palette.background.toastBackground}`,
        },
        agentNameStyle: {
            fontWeight: '600',
            lineHeight: '16.34px',
            display: 'flex',
            width: '95%',
        },
        noteContent: {
            lineHeight: '20px',
            marginBottom: '8px',
            whiteSpace: 'pre-line',
        },
        contentWrap: {
            width: '90%',
            wordBreak: 'break-all',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
            whiteSpace: 'pre-line',
        },
        newNoteSaveBtnLayout: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '2%',
            marginBottom: '5%',
            height: '28px',
            width: '95%',
        },
        saveBtn: {
            marginRight: '4%',
        },
        newEditNoteTextBox: {
            width: '95%',
            fontSize: `${theme.typography.h6.fontSize}`,
            background: `${theme.palette.background.noteInput}`,
        },
        agentNameLabel: {
            fontWeight: '600',
            lineHeight: '16.34px',
            marginLeft: '2%',
            color: `${theme.palette.text.noteLabel}`,
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '50%',
        },
        flexDisplay: {
            display: 'flex',
        },
        dateLabel: {
            marginLeft: 'auto',
            paddingRight: '2%',
        },
        noInformation: {
            textAlign: 'center',
            padding: '8px 16px 16px',
            fontSize: `${theme.typography.h4.fontSize}`,
        },
        italicFont: {
            fontStyle: 'italic',
        },
        noteHeader: {
            alignItems: 'center',
        },
    };
    return styles;
};
export default customerCardNoteStyles;
//# sourceMappingURL=ccf-customer-card-notes.styles.js.map