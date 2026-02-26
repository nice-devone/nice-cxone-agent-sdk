import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState, memo } from 'react';
import { Box } from '@mui/material';
import { createdAtAgoTimeStamp } from '../../../../src/util/dayjs';
import { CcfTooltip, CcfTypography } from '@nice-devone/ui-controls';
import { useSelector } from 'react-redux';
import { getApplicationLocale } from '../../global.app.slice';
import { formatDateTime } from '@nice-devone/common-sdk';
/**
 * renders the time stamp of message
 * @param props - CcfContactMessageTimeStampProps
 * @example <CcfContactMessageTimeStamp />
 * @returns
 */
const CcfContactMessageTimeStamp = (props) => {
    const { createdAt, direction, styles, timestampPlacement, arrow = true } = props;
    // this will keep the reference of actual message createdAt value and will update after specific time interval;
    const [createdAtAgo, setCreatedAtAgo] = useState(createdAtAgoTimeStamp(createdAt));
    const intervalRef = useRef();
    const locale = useSelector(getApplicationLocale);
    useEffect(() => {
        // refresh the message timestamp after every minute. this will refresh for individual message.
        const id = setInterval(() => {
            setCreatedAtAgo(createdAtAgoTimeStamp(createdAt));
        }, 60000);
        // individual message interval reference
        intervalRef.current = id;
        // clear before unmounting the component.
        return () => clearInterval(intervalRef.current);
    }, []);
    useEffect(() => {
        if (createdAtAgo !== createdAtAgoTimeStamp(createdAt)) {
            setCreatedAtAgo(createdAtAgoTimeStamp(createdAt));
        }
    }, [createdAt]);
    return (_jsx(Box, Object.assign({ sx: (direction === 'inbound' ? styles === null || styles === void 0 ? void 0 : styles.inboundMessageTimeStamp : styles === null || styles === void 0 ? void 0 : styles.outboundMessageTimeStamp), "data-testid": 'timestamp' }, { children: _jsx(CcfTooltip, Object.assign({ "data-testid": 'timestamp-tooltip', styles: { ccfTooltip: Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.timeStampTooltip), ccfTooltipArrow: Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.timeStampTooltipArrow) }, title: formatDateTime(createdAt, locale), placement: timestampPlacement ? timestampPlacement : 'top-start', arrow: arrow }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "inherit" }, { children: createdAtAgo })) }) })) })));
};
export default memo(CcfContactMessageTimeStamp);
//# sourceMappingURL=ccf-contact-message-timestamp.js.map