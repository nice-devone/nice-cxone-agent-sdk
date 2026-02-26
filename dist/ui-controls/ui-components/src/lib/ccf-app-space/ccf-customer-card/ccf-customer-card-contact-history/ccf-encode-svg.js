import ReactDOMServer from 'react-dom/server';
/**
 * Function to convert CcfIcon to svg
 * In Adaptive card implementation Icon or Image can be displayed in 2 ways
 * 1) Direct URL
 * 2) By converting icon component into base^4 string
 * for second way we are using below method
 * @param reactElement -any
 * @param shouldAddXmlns - Boolean flag indicating whether to add the xmlns attribute
 * @returns data url for svg
 * @example getChannelSVG
 */
export default function encodeSVG(reactElement, shouldAddXmlns) {
    shouldAddXmlns = shouldAddXmlns !== null && shouldAddXmlns !== void 0 ? shouldAddXmlns : false;
    const svgFormat = ReactDOMServer.renderToString(reactElement);
    const xmlnsTag = '"http://www.w3.org/2000/svg" ';
    const formatedSvg = appendStringInMiddle(svgFormat, 5, 'xmlns=' + xmlnsTag);
    if (shouldAddXmlns) {
        return 'data:image/svg+xml,' + escape(svgFormat);
    }
    return 'data:image/svg+xml,' + escape(formatedSvg);
}
/**
 * Function to add xmlns to svg
 * @param svg - svg string
 * @param index - Start index
 * @param tagToAdd - Tag to add
 * @returns Appended svg string
 * @example appendStringInMiddle
 */
function appendStringInMiddle(svg, index, tagToAdd) {
    return svg.substring(0, index) + tagToAdd + svg.substring(index, svg.length);
}
//# sourceMappingURL=ccf-encode-svg.js.map