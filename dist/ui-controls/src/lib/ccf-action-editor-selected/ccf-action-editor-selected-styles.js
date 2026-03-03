/**
 * Styles for action editor props
 * @example CcfActionEditorSelectedStyles()
 */
const CcfActionEditorSelectedStyles = () => {
    const styles = {
        selections: {
            display: 'flex',
            flexDirection: 'row',
        },
        button: {
            textAlign: 'center',
            padding: 0,
            margin: 0,
            position: 'relative',
            height: '25px',
            width: '25px',
            minWidth: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        chip: {
            background: '#ffffff',
            border: '1px solid #dae2e8',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'row',
            padding: '2px 4px',
            marginRight: '6px',
            alignItems: 'center',
            label: {
                fontWeight: 400,
                fontSize: '14px',
                color: '#333333',
            },
            remove: {
                marginLeft: '5px',
                color: '#758994',
                cursor: 'pointer',
                fontSize: '1.25em',
                '::after': {
                    display: 'inline-block',
                    content: '"\u00D7"',
                    lineHeight: '0.5em',
                },
            },
        },
        '::not(::last-child)': {
            marginRight: '25px',
        },
    };
    return styles;
};
export default CcfActionEditorSelectedStyles;
//# sourceMappingURL=ccf-action-editor-selected-styles.js.map