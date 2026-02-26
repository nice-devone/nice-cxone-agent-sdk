/**
 * style object for editor-placeholder
 * @returns editorPlaceholderStyles styles object
 * ```
 * @example
 * const styles = editorPlaceholderStyles();
 * ```
 */
export const editorPlaceholderStyles = () => {
    const styles = {
        wrap: {
            backgroundColor: 'rgba(245, 248, 250, 1)',
            display: 'flex',
            padding: '15px',
            border: '1px dashed rgba(210, 216, 219, 1)',
            borderRadius: '8px',
            justifyContent: 'center',
            gap: '5px',
            height: '100%',
            alignItems: 'center',
        },
        text: {
            color: 'rgba(0, 124, 190, 1)',
            fontFamily: 'Open Sans',
            fontSize: '1rem',
            fontWeight: '500',
        },
    };
    return styles;
};
//# sourceMappingURL=editor-placeholder.styles.js.map