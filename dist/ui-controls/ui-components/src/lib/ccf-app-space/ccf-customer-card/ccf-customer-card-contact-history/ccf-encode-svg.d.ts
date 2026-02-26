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
export default function encodeSVG(reactElement: JSX.Element, shouldAddXmlns?: boolean): string;
