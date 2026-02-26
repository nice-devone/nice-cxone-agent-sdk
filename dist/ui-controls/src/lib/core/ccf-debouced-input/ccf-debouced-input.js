import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
/**
 * Component to provide debounced input
 * @param props - CcfDeboucedInputProps
 * @example <CcfDeboucedInput />
 * @returns debounced input
 */
export function CcfDeboucedInput(props) {
    var _a;
    const { delay, onChange, onDebounceChange, value, trim, id } = props, rest = __rest(props, ["delay", "onChange", "onDebounceChange", "value", "trim", "id"]);
    const [debounce, updateDebouncer] = useState({
        delay,
        timer: null,
        value: value,
    });
    useEffect(() => {
        if (value === '' && !value) {
            updateDebouncer(Object.assign(Object.assign({}, debounce), { value: '' }));
        }
        else {
            updateDebouncer(Object.assign(Object.assign({}, debounce), { value: value }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    /**
     * function to update debounced input
     * @param e - HTMLTextAreaElement | HTMLInputElement
     * @example  debouncedUpdate
  
     */
    function debouncedUpdate(e) {
        if (debounce.timer)
            clearTimeout(debounce.timer);
        const timer = setTimeout(() => {
            updateDebouncer((prevState) => {
                return Object.assign(Object.assign({}, prevState), { value: e.target.value });
            });
            if (onChange)
                onChange(e);
            if (onDebounceChange)
                onDebounceChange(e.target.value);
        }, debounce.delay);
        updateDebouncer((prevState) => (Object.assign(Object.assign({}, prevState), { timer, value: e.target.value })));
    }
    return _jsx(TextField, Object.assign({ id: id, "data-testid": 'debounced-input', onChange: debouncedUpdate, value: !trim ? debounce.value : (_a = debounce.value) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, ' ') }, rest));
}
export default CcfDeboucedInput;
//# sourceMappingURL=ccf-debouced-input.js.map