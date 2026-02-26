/**
 * @example styles for emoji picker component
 */
declare const CcfEmojiPickerStyles: () => {
    '.emoji-mart': {
        boxSizing: string;
        lineHeight: number;
        fontFamily: string;
        fontSize: string;
        display: string;
        color: string;
        border: string;
        borderRadius: string;
        background: string;
    };
    '.emoji-mart *': {
        boxSizing: string;
        lineHeight: number;
    };
    '.emoji-mart-bar': {
        border: string;
    };
    '.emoji-mart-bar:first-child': {
        borderBottomWidth: string;
        borderTopLeftRadius: string;
        borderTopRightRadius: string;
    };
    '.emoji-mart-bar:last-child': {
        borderTopWidth: string;
        borderBottomLeftRadius: string;
        borderBottomRightRadius: string;
    };
    '.emoji-mart-anchors': {
        display: string;
        flexDirection: string;
        justifyContent: string;
        padding: string;
        lineHeight: string;
    };
    '.emoji-mart-anchor': {
        position: string;
        display: string;
        flex: string;
        color: string;
        textAlign: string;
        padding: string;
        overflow: string;
        transition: string;
        margin: string;
        boxShadow: string;
        background: string;
        border: string;
        cursor: string;
    };
    '.emoji-mart-anchor:focus': {
        outline: string;
    };
    '.emoji-mart-anchor:hover': {
        color: string;
    };
    '.emoji-mart-anchor:focus, .emoji-mart-anchor-selected': {
        color: string;
    };
    '.emoji-mart-anchor-selected .emoji-mart-anchor-bar': {
        bottom: string;
    };
    '.emoji-mart-anchor-bar': {
        position: string;
        bottom: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string;
    };
    '.emoji-mart-anchors i': {
        display: string;
        width: string;
        maxWidth: string;
    };
    '.emoji-mart-anchors svg, .emoji-mart-anchors img': {
        fill: string;
        height: string;
        width: string;
    };
    '.emoji-mart-scroll': {
        overflowY: string;
        overflowX: string;
        height: string;
        padding: string;
        willChange: string;
    };
    '.emoji-mart-search': {
        marginTop: string;
        padding: string;
        position: string;
    };
    '.emoji-mart-search input': {
        fontSize: string;
        display: string;
        width: string;
        padding: string;
        borderRadius: string;
        border: string;
        outline: number;
    };
    '.emoji-mart-search input, .emoji-mart-search input::-webkit-search-decoration, .emoji-mart-search input::-webkit-search-cancel-button, .emoji-mart-search input::-webkit-search-results-button, .emoji-mart-search input::-webkit-search-results-decoration': {
        '-webkit-appearance': string;
    };
    '.emoji-mart-search-icon': {
        position: string;
        top: string;
        right: string;
        zIndex: number;
        padding: string;
        border: string;
        background: string;
    };
    '.emoji-mart-category .emoji-mart-emoji span': {
        zIndex: number;
        position: string;
        textAlign: string;
        cursor: string;
    };
    '.emoji-mart-category .emoji-mart-emoji:hover:before': {
        zIndex: number;
        content: string;
        position: string;
        top: number;
        left: number;
        width: string;
        height: string;
        backgroundColor: string;
        borderRadius: string;
    };
    '.emoji-mart-category-label': {
        zIndex: number;
        position: string;
        top: number;
    };
    '.emoji-mart-category-label span': {
        display: string;
        width: string;
        fontWeight: string;
        padding: string;
        backgroundColor: string;
    };
    '.emoji-mart-category-list': {
        margin: number;
        padding: number;
    };
    '.emoji-mart-category-list li': {
        listStyle: string;
        margin: number;
        padding: number;
        display: string;
    };
    '.emoji-mart-emoji': {
        position: string;
        display: string;
        fontSize: number;
        margin: number;
        padding: number;
        border: string;
        background: string;
        boxShadow: string;
    };
    '.emoji-mart-emoji-native': {
        fontFamily: string;
    };
    '.emoji-mart-no-results': {
        fontSize: string;
        textAlign: string;
        paddingTop: string;
        color: string;
    };
    '.emoji-mart-no-results-img': {
        display: string;
        marginLeft: string;
        marginRight: string;
        width: string;
    };
    '.emoji-mart-no-results .emoji-mart-category-label': {
        display: string;
    };
    '.emoji-mart-no-results .emoji-mart-no-results-label': {
        marginTop: string;
    };
    '.emoji-mart-no-results .emoji-mart-emoji:hover:before': {
        content: string;
    };
    '.emoji-mart-preview': {
        position: string;
        height: string;
    };
    '.emoji-mart-preview-emoji, .emoji-mart-preview-data, .emoji-mart-preview-skins': {
        position: string;
        top: string;
        transform: string;
    };
    '.emoji-mart-preview-emoji': {
        left: string;
    };
    '.emoji-mart-preview-data': {
        left: string;
        right: string;
        wordBreak: string;
    };
    '.emoji-mart-preview-skins': {
        right: string;
        textAlign: string;
    };
    '.emoji-mart-preview-skins:hover': {
        cursor: string;
    };
    '.emoji-mart-preview-skins.custom': {
        right: string;
        textAlign: string;
    };
    '.emoji-mart-preview-name': {
        fontSize: string;
    };
    '.emoji-mart-preview-shortname': {
        fontSize: string;
        color: string;
    };
    '.emoji-mart-preview-shortname + .emoji-mart-preview-shortname, .emoji-mart-preview-shortname + .emoji-mart-preview-emoticon, .emoji-mart-preview-emoticon + .emoji-mart-preview-emoticon': {
        marginLeft: string;
    };
    '.emoji-mart-preview-emoticon': {
        fontSize: string;
        color: string;
    };
    '.emoji-mart-title span': {
        display: string;
        verticalAlign: string;
    };
    '.emoji-mart-title .emoji-mart-emoji': {
        padding: number;
    };
    '.emoji-mart-title-label': {
        color: string;
        fontSize: string;
        fontWeight: string;
    };
    '.emoji-mart-skin-swatches': {
        fontSize: number;
        padding: string;
        border: string;
        borderRadius: string;
        backgroundColor: string;
    };
    '.emoji-mart-skin-swatches.custom': {
        fontSize: number;
        border: string;
        backgroundColor: string;
    };
    '.emoji-mart-skin-swatches.opened .emoji-mart-skin-swatch': {
        width: string;
        padding: string;
    };
    '.emoji-mart-skin-swatches.opened .emoji-mart-skin-swatch.selected:after': {
        opacity: string;
    };
    '.emoji-mart-skin-swatch': {
        display: string;
        width: number;
        verticalAlign: string;
        'transition-property': string;
        'transition-duration': string;
        'transition-timing-function': string;
    };
    '.emoji-mart-skin-swatch:nth-child(1)': {
        'transition-delay': string;
    };
    '.emoji-mart-skin-swatch:nth-child(2)': {
        'transition-delay': string;
    };
    '.emoji-mart-skin-swatch:nth-child(3)': {
        'transition-delay': string;
    };
    '.emoji-mart-skin-swatch:nth-child(4)': {
        'transition-delay': string;
    };
    '.emoji-mart-skin-swatch:nth-child(5)': {
        'transition-delay': string;
    };
    '.emoji-mart-skin-swatch:nth-child(6)': {
        'transition-delay': string;
    };
    '.emoji-mart-skin-swatch.selected': {
        position: string;
        width: string;
        padding: string;
    };
    '.emoji-mart-skin-swatch.selected:after': {
        content: string;
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        margin: string;
        backgroundColor: string;
        borderRadius: string;
        pointerEvents: string;
        opacity: number;
        transition: string;
    };
    '.emoji-mart-skin-swatch.custom': {
        display: string;
        width: number;
        height: string;
        overflow: string;
        verticalAlign: string;
        'transition-property': string;
        'transition-duration': string;
        'transition-timing-function': string;
        cursor: string;
    };
    '.emoji-mart-skin-swatch.custom.selected': {
        position: string;
        width: string;
        height: string;
        padding: string;
    };
    '.emoji-mart-skin-swatch.custom.selected:after': {
        content: string;
        width: number;
        height: number;
    };
    '.emoji-mart-skin-swatches.custom .emoji-mart-skin-swatch.custom:hover': {
        backgroundColor: string;
        borderRadius: string;
    };
    '.emoji-mart-skin-swatches.custom.opened .emoji-mart-skin-swatch.custom': {
        width: string;
        height: string;
        padding: string;
    };
    '.emoji-mart-skin-swatches.custom.opened .emoji-mart-skin-swatch.custom.selected:after': {
        opacity: number;
    };
    '.emoji-mart-skin-text.opened': {
        display: string;
        verticalAlign: string;
        textAlign: string;
        color: string;
        fontSize: string;
        padding: string;
        width: string;
        height: string;
        borderRadius: string;
        backgroundColor: string;
    };
    '.emoji-mart-skin': {
        display: string;
        width: string;
        paddingTop: string;
        maxWidth: string;
        borderRadius: string;
    };
    '.emoji-mart-skin-tone-1': {
        backgroundColor: string;
    };
    '.emoji-mart-skin-tone-2': {
        backgroundColor: string;
    };
    '.emoji-mart-skin-tone-3': {
        backgroundColor: string;
    };
    '.emoji-mart-skin-tone-4': {
        backgroundColor: string;
    };
    '.emoji-mart-skin-tone-5': {
        backgroundColor: string;
    };
    '.emoji-mart-skin-tone-6': {
        backgroundColor: string;
    };
    '.emoji-mart-sr-only': {
        position: string;
        width: string;
        height: string;
        padding: number;
        margin: string;
        overflow: string;
        clip: string;
        border: number;
    };
    '.emoji-mart-dark': {
        color: string;
        borderColor: string;
        backgroundColor: string;
    };
    '.emoji-mart-dark .emoji-mart-bar': {
        borderColor: string;
    };
    '.emoji-mart-dark .emoji-mart-search input': {
        color: string;
        borderColor: string;
        backgroundColor: string;
    };
    '.emoji-mart-dark .emoji-mart-search-icon svg': {
        fill: string;
    };
    '.emoji-mart-dark .emoji-mart-category .emoji-mart-emoji:hover:before': {
        backgroundColor: string;
    };
    '.emoji-mart-dark .emoji-mart-category-label span': {
        backgroundColor: string;
        color: string;
    };
    '.emoji-mart-dark .emoji-mart-skin-swatches': {
        borderColor: string;
        backgroundColor: string;
    };
    '.emoji-mart-dark .emoji-mart-anchor:hover, .emoji-mart-dark .emoji-mart-anchor:focus, .emoji-mart-dark .emoji-mart-anchor-selected': {
        color: string;
    };
    emojiButton: {
        cursor: string;
        padding: string;
        marginTop: string;
    };
};
export default CcfEmojiPickerStyles;
