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
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
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
export const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var _a;
        const splitBinaryString = (_a = reader === null || reader === void 0 ? void 0 : reader.result) === null || _a === void 0 ? void 0 : _a.toString().split('base64,');
        resolve((splitBinaryString === null || splitBinaryString === void 0 ? void 0 : splitBinaryString[1]) || '');
    };
    reader.onerror = (error) => reject(error);
});
//# sourceMappingURL=fileUtils.js.map