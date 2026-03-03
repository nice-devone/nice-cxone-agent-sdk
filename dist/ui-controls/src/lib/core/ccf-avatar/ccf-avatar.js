import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Avatar, useTheme } from '@mui/material';
import ccfAvatarStyle from './ccf-avatar.styles';
/**
 * Function is set as wrapper for material UI Avatar component
 * @param param0 - CcfAvatarProps
 * @returns material ui Avatar component
 * @example <CcfAvatar />
 */
export const CcfAvatar = (_a) => {
    var { sx = [] } = _a, props = __rest(_a, ["sx"]);
    const theme = useTheme();
    const avatarStyle = ccfAvatarStyle(theme, props);
    return _jsx(Avatar, Object.assign({ sx: [avatarStyle.root, ...(Array.isArray(sx) ? sx : [sx])] }, props));
};
//# sourceMappingURL=ccf-avatar.js.map