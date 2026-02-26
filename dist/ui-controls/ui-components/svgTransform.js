"use strict";
module.exports = {
    /**
     *
     * @returns an object with the code.
     * @example
     */
    process() {
        return { code: 'module.exports = {};' };
    },
    /**
     *
     * @returns string
     * @example
     */
    getCacheKey() {
        // The output is always the same.
        return 'svgTransform';
    },
};
//# sourceMappingURL=svgTransform.js.map