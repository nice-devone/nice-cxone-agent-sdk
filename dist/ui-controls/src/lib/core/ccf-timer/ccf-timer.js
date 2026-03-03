import { Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useImperativeHandle } from 'react';
import { useTimer } from 'react-timer-hook';
;
/**
 * Component to display timer for the selected contact
 * @param ref - TimerRef
 * ```
 * @example-
 * <CcfTimer />
 * ```
 */
export const CcfTimer = forwardRef((props, ref) => {
    const { expiryTimestamp } = props;
    const { seconds, minutes, restart, //function to restart the timer
     } = useTimer({ expiryTimestamp });
    useImperativeHandle(ref, () => ({
        restart: (timeStamp) => restart(timeStamp),
    }), [restart]);
    return (_jsxs(_Fragment, { children: [`${minutes}`, ":", `${seconds}`.padStart(2, '0')] }));
});
//# sourceMappingURL=ccf-timer.js.map