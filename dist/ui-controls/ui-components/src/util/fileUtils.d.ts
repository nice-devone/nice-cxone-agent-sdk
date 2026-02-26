/**
 * Used to do the bytes size formatting into different sizes and returning the sizes in 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
 * @param bytes - number of bytes that needs formatting
 * @param decimals - decimal places to be considered
 * @returns - conversion size string
 * @example -
 * ```
 * formatBytes(20004);
 * ```
 */
export declare const formatBytes: (bytes: number, decimals?: number) => string;
/**
 * Used to convert files into base64 string
 * @param file - file that need conversion to base64
 * @returns - base64 string
 * @example -
 * ```
 *  const base64String = await toBase64(file);
 * ```
 *
 */
export declare const toBase64: (file: File) => Promise<string>;
