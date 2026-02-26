/**
* This method to convert hex value to rgba
* @param value  - string type of value
* @example -
* ```
* hexToRgbA(#fff,0.4);
* ```
*
* @returns  - rgba color with alpha
*/
export const hexToRgbA = (hex, alpha) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        const d = Number('0x' + c.join(''));
        return 'rgba(' + [(d >> 16) & 255, (d >> 8) & 255, d & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
};
//# sourceMappingURL=colorUtils.js.map