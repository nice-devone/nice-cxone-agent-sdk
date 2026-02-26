import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { withTranslation } from '../../ccf-translator/ccf-translator';
/**
 *
 * @param props - TypographyProps
 * @example <CcfTranslatedTypography />
 * @returns
 */
const CcfTranslatedTypography = (_a) => {
    var { translator, locale, translationKey, children } = _a, other = __rest(_a, ["translator", "locale", "translationKey", "children"]);
    const translatedText = translator(translationKey) || children;
    return (_jsx(Typography, Object.assign({ children: translatedText }, other)));
};
export const CcfTypography = withTranslation(CcfTranslatedTypography);
//# sourceMappingURL=ccf-typography.js.map