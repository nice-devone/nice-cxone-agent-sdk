/**
 * Styles for action editor props
 * @example CcfActionEditorSelectedStyles()
 */
declare const CcfActionEditorSelectedStyles: () => {
    selections: {
        display: string;
        flexDirection: string;
    };
    button: {
        textAlign: string;
        padding: number;
        margin: number;
        position: string;
        height: string;
        width: string;
        minWidth: string;
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    chip: {
        background: string;
        border: string;
        borderRadius: string;
        display: string;
        flexDirection: string;
        padding: string;
        marginRight: string;
        alignItems: string;
        label: {
            fontWeight: number;
            fontSize: string;
            color: string;
        };
        remove: {
            marginLeft: string;
            color: string;
            cursor: string;
            fontSize: string;
            '::after': {
                display: string;
                content: string;
                lineHeight: string;
            };
        };
    };
    '::not(::last-child)': {
        marginRight: string;
    };
};
export default CcfActionEditorSelectedStyles;
