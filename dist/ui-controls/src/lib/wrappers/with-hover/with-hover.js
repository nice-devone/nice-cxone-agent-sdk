import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
/**
 * Component to be used for hover
 * @param WrapperComponent - React.ComponentType<T>
 * @example withHover()
 * @returns
 */
export function withHover(WrapperComponent) {
    /**
     *
     * @param props - React.FC<T>
     * @example TranslatedComponent()
     * @returns
     */
    const TranslatedComponent = (props) => {
        const [hover, updateHover] = useState(false);
        return (_jsx(WrapperComponent, Object.assign({}, props, { onMouseEnter: () => updateHover(true), onMouseOut: () => updateHover(false), isHovering: hover })));
    };
    return TranslatedComponent;
}
export default withHover;
//# sourceMappingURL=with-hover.js.map