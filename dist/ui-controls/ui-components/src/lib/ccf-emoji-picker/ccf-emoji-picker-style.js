/**
 * @example styles for emoji picker component
 */
const CcfEmojiPickerStyles = () => {
    const styles = {
        '.emoji-mart': {
            boxSizing: 'border-box',
            lineHeight: 1.15,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            fontSize: '12px',
            display: 'inline-block',
            color: '#222427',
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            background: '#fff',
        },
        '.emoji-mart *': {
            boxSizing: 'border-box',
            lineHeight: 1.15,
        },
        // '.emoji-mart-emoji': {
        //   padding: '6px',
        // },
        '.emoji-mart-bar': {
            border: '0 solid #d9d9d9',
        },
        '.emoji-mart-bar:first-child': {
            borderBottomWidth: '1px',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
        },
        '.emoji-mart-bar:last-child': {
            borderTopWidth: '1px',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
        },
        '.emoji-mart-anchors': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0 6px',
            lineHeight: '0',
        },
        '.emoji-mart-anchor': {
            position: 'relative',
            display: 'block',
            flex: '1 1 auto',
            color: '#858585',
            textAlign: 'center',
            padding: '3px 4px',
            overflow: 'hidden',
            transition: 'color .1s ease-out',
            margin: '0',
            boxShadow: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
        },
        '.emoji-mart-anchor:focus': {
            outline: '0',
        },
        '.emoji-mart-anchor:hover': {
            color: '#464646',
        },
        '.emoji-mart-anchor:focus, .emoji-mart-anchor-selected': {
            color: '#464646',
        },
        '.emoji-mart-anchor-selected .emoji-mart-anchor-bar': {
            bottom: '0',
        },
        '.emoji-mart-anchor-bar': {
            position: 'absolute',
            bottom: '-3px',
            left: '0',
            width: '100%',
            height: '3px',
            backgroundColor: '#464646',
        },
        '.emoji-mart-anchors i': {
            display: 'inline-block',
            width: '100%',
            maxWidth: '22px',
        },
        '.emoji-mart-anchors svg, .emoji-mart-anchors img': {
            fill: 'currentColor',
            height: '18px',
            width: '18px',
        },
        '.emoji-mart-scroll': {
            overflowY: 'scroll',
            overflowX: 'hidden',
            height: '7.75rem',
            padding: '0 6px 6px 6px',
            willChange: 'transform', // avoids "repaints on scroll" in mobile Chrome
        },
        '.emoji-mart-search': {
            marginTop: '6px',
            padding: '0 6px',
            position: 'relative',
        },
        '.emoji-mart-search input': {
            fontSize: '13px',
            display: 'block',
            width: '100%',
            padding: '4px 22px 4px 6px',
            borderRadius: '5px',
            border: '1px solid #d9d9d9',
            outline: 0,
        },
        '.emoji-mart-search input, .emoji-mart-search input::-webkit-search-decoration, .emoji-mart-search input::-webkit-search-cancel-button, .emoji-mart-search input::-webkit-search-results-button, .emoji-mart-search input::-webkit-search-results-decoration': {
            // remove webkit/blink styles for <input type="search"> via https://stackoverflow.com/a/9422689
            '-webkit-appearance': 'none',
        },
        '.emoji-mart-search-icon': {
            position: 'absolute',
            top: '4px',
            right: '11px',
            zIndex: 2,
            padding: '2px 5px 1px',
            border: 'none',
            background: 'none',
        },
        '.emoji-mart-category .emoji-mart-emoji span': {
            zIndex: 1,
            position: 'relative',
            textAlign: 'center',
            cursor: 'pointer',
        },
        '.emoji-mart-category .emoji-mart-emoji:hover:before': {
            zIndex: 0,
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f4f4f4',
            borderRadius: '100%',
        },
        '.emoji-mart-category-label': {
            zIndex: 2,
            position: 'relative',
            // position: '-webkit-sticky',
            // position: 'sticky',
            top: 0,
        },
        '.emoji-mart-category-label span': {
            display: 'block',
            width: '100%',
            fontWeight: '500',
            padding: '5px 6px',
            backgroundColor: '#fff',
            // backgroundColor: rgba(255, 255, 255, .95),
        },
        '.emoji-mart-category-list': {
            margin: 0,
            padding: 0,
        },
        '.emoji-mart-category-list li': {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'inline-block',
        },
        '.emoji-mart-emoji': {
            position: 'relative',
            display: 'inline-block',
            fontSize: 0,
            margin: 0,
            padding: 0,
            border: 'none',
            background: 'none',
            boxShadow: 'none',
        },
        '.emoji-mart-emoji-native': {
            fontFamily: '"Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"',
        },
        '.emoji-mart-no-results': {
            fontSize: '14px',
            textAlign: 'center',
            paddingTop: '70px',
            color: '#858585',
        },
        '.emoji-mart-no-results-img': {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
        },
        '.emoji-mart-no-results .emoji-mart-category-label': {
            display: 'none',
        },
        '.emoji-mart-no-results .emoji-mart-no-results-label': {
            marginTop: '.2em',
        },
        '.emoji-mart-no-results .emoji-mart-emoji:hover:before': {
            content: 'none',
        },
        '.emoji-mart-preview': {
            position: 'relative',
            height: '25px',
        },
        '.emoji-mart-preview-emoji, .emoji-mart-preview-data, .emoji-mart-preview-skins': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        '.emoji-mart-preview-emoji': {
            left: '12px',
        },
        '.emoji-mart-preview-data': {
            left: '68px',
            right: '12px',
            wordBreak: 'break-all',
        },
        '.emoji-mart-preview-skins': {
            right: '15px',
            textAlign: 'right',
        },
        '.emoji-mart-preview-skins:hover': {
            cursor: 'pointer',
        },
        '.emoji-mart-preview-skins.custom': {
            right: '10px',
            textAlign: 'right',
        },
        '.emoji-mart-preview-name': {
            fontSize: '14px',
        },
        '.emoji-mart-preview-shortname': {
            fontSize: '12px',
            color: '#888',
        },
        '.emoji-mart-preview-shortname + .emoji-mart-preview-shortname, .emoji-mart-preview-shortname + .emoji-mart-preview-emoticon, .emoji-mart-preview-emoticon + .emoji-mart-preview-emoticon': {
            marginLeft: '.5em',
        },
        '.emoji-mart-preview-emoticon': {
            fontSize: '11px',
            color: '#bbb',
        },
        '.emoji-mart-title span': {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        '.emoji-mart-title .emoji-mart-emoji': {
            padding: 0,
        },
        '.emoji-mart-title-label': {
            color: '#999A9C',
            fontSize: '26px',
            fontWeight: '300',
        },
        '.emoji-mart-skin-swatches': {
            fontSize: 0,
            padding: '2px 0',
            border: '1px solid #d9d9d9',
            borderRadius: '12px',
            backgroundColor: '#fff',
        },
        '.emoji-mart-skin-swatches.custom': {
            fontSize: 0,
            border: 'none',
            backgroundColor: '#fff',
        },
        '.emoji-mart-skin-swatches.opened .emoji-mart-skin-swatch': {
            width: '16px',
            padding: '0 2px',
        },
        '.emoji-mart-skin-swatches.opened .emoji-mart-skin-swatch.selected:after': {
            opacity: '.75',
        },
        '.emoji-mart-skin-swatch': {
            display: 'inline-block',
            width: 0,
            verticalAlign: 'middle',
            'transition-property': 'width, padding',
            'transition-duration': '.125s',
            'transition-timing-function': 'ease-out',
        },
        '.emoji-mart-skin-swatch:nth-child(1)': {
            'transition-delay': '0s',
        },
        '.emoji-mart-skin-swatch:nth-child(2)': {
            'transition-delay': '.03s',
        },
        '.emoji-mart-skin-swatch:nth-child(3)': {
            'transition-delay': '.06s',
        },
        '.emoji-mart-skin-swatch:nth-child(4)': {
            'transition-delay': '.09s',
        },
        '.emoji-mart-skin-swatch:nth-child(5)': {
            'transition-delay': '.12s',
        },
        '.emoji-mart-skin-swatch:nth-child(6)': {
            'transition-delay': '.15s',
        },
        '.emoji-mart-skin-swatch.selected': {
            position: 'relative',
            width: '16px',
            padding: '0 2px',
        },
        '.emoji-mart-skin-swatch.selected:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '4px',
            margin: '-2px 0 0 -2px',
            backgroundColor: '#fff',
            borderRadius: '100%',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity .2s ease-out',
        },
        '.emoji-mart-skin-swatch.custom': {
            display: 'inline-block',
            width: 0,
            height: '38px',
            overflow: 'hidden',
            verticalAlign: 'middle',
            'transition-property': 'width, height',
            'transition-duration': '.125s',
            'transition-timing-function': 'ease-out',
            cursor: 'default',
        },
        '.emoji-mart-skin-swatch.custom.selected': {
            position: 'relative',
            width: '36px',
            height: '38px',
            padding: '0 2px 0 0',
        },
        '.emoji-mart-skin-swatch.custom.selected:after': {
            content: '""',
            width: 0,
            height: 0,
        },
        '.emoji-mart-skin-swatches.custom .emoji-mart-skin-swatch.custom:hover': {
            backgroundColor: '#f4f4f4',
            borderRadius: '10%',
        },
        '.emoji-mart-skin-swatches.custom.opened .emoji-mart-skin-swatch.custom': {
            width: '36px',
            height: '38px',
            padding: '0 2px 0 0',
        },
        '.emoji-mart-skin-swatches.custom.opened .emoji-mart-skin-swatch.custom.selected:after': {
            opacity: .75,
        },
        '.emoji-mart-skin-text.opened': {
            display: 'inline-block',
            verticalAlign: 'middle',
            textAlign: 'left',
            color: '#888',
            fontSize: '11px',
            padding: '5px 2px',
            width: '95px',
            height: '40px',
            borderRadius: '10%',
            backgroundColor: '#fff',
        },
        '.emoji-mart-skin': {
            display: 'inline-block',
            width: '100%',
            paddingTop: '100%',
            maxWidth: '12px',
            borderRadius: '100%',
        },
        '.emoji-mart-skin-tone-1': { backgroundColor: '#ffc93a' },
        '.emoji-mart-skin-tone-2': { backgroundColor: '#fadcbc' },
        '.emoji-mart-skin-tone-3': { backgroundColor: '#e0bb95' },
        '.emoji-mart-skin-tone-4': { backgroundColor: '#bf8f68' },
        '.emoji-mart-skin-tone-5': { backgroundColor: '#9b643d' },
        '.emoji-mart-skin-tone-6': { backgroundColor: '#594539' },
        // For screen readers only, via https://stackoverflow.com/a/19758620
        '.emoji-mart-sr-only': {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0,
        },
        // Dark mode styles
        '.emoji-mart-dark': {
            color: '#fff',
            borderColor: '#555453',
            backgroundColor: '#222',
        },
        '.emoji-mart-dark .emoji-mart-bar': {
            borderColor: '#555453',
        },
        '.emoji-mart-dark .emoji-mart-search input': {
            color: '#fff',
            borderColor: '#555453',
            backgroundColor: '#2f2f2f',
        },
        '.emoji-mart-dark .emoji-mart-search-icon svg': {
            fill: '#fff',
        },
        '.emoji-mart-dark .emoji-mart-category .emoji-mart-emoji:hover:before': {
            backgroundColor: '#444',
        },
        '.emoji-mart-dark .emoji-mart-category-label span': {
            backgroundColor: '#222',
            color: '#fff',
        },
        '.emoji-mart-dark .emoji-mart-skin-swatches': {
            borderColor: '#555453',
            backgroundColor: '#222',
        },
        '.emoji-mart-dark .emoji-mart-anchor:hover, .emoji-mart-dark .emoji-mart-anchor:focus, .emoji-mart-dark .emoji-mart-anchor-selected': {
            color: '#bfbfbf',
        },
        emojiButton: { cursor: 'pointer',
            padding: '0.313rem',
            marginTop: '0.163rem' },
    };
    return styles;
};
export default CcfEmojiPickerStyles;
//# sourceMappingURL=ccf-emoji-picker-style.js.map