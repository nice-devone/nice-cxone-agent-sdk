import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { KnowledgeAssistCard } from '../knowledge-assist-card/knowledge-assist-card';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import knowledgeAssistGroupStyles from './knowledge-assist-group.styles';
import { useSelector } from 'react-redux';
import { getApplicationLocale } from '../../../global.app.slice';
/**
 * Knowledge Assist Group component
 * @example - <KnowledgeAssistGroup />
 */
export function KnowledgeAssistGroup(props) {
    var _a, _b, _c, _d, _e;
    const kaGroupStyles = knowledgeAssistGroupStyles();
    const locale = useSelector(getApplicationLocale);
    // Utility functions
    /**
     * function to truncate the text
     * @example - truncateText('Hello World', 5);
     */
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };
    /**
     * function to format the TimeStamp
     * @example - formatTimestamp(timeStamp);
     */
    const formatTimestamp = (timestamp) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(timestamp).toLocaleTimeString(locale, options);
    };
    /**
     * function to get styles for accordian
     * @example -
     * ```
     * const styles = getAccordianStyleBasedOnScreenSize();
     * ```
     */
    const getAccordianStyleBasedOnScreenSize = () => {
        return props.isBelowMd ? kaGroupStyles.smViewAccordianSummary : kaGroupStyles.accordianSummary;
    };
    return (_jsx("div", Object.assign({ style: kaGroupStyles.mainBox }, { children: _jsxs(Accordion, Object.assign({ variant: 'outlined', disableGutters: true, style: kaGroupStyles.accordianMain, defaultExpanded: true }, { children: [_jsx(AccordionSummary, Object.assign({ style: kaGroupStyles.accordianSummaryHeight, expandIcon: _jsx(ExpandMoreIcon, {}) }, { children: _jsxs("div", Object.assign({ style: getAccordianStyleBasedOnScreenSize() }, { children: [_jsx("div", Object.assign({ style: kaGroupStyles.accordianHeading }, { children: truncateText(((_a = props.suggestion) === null || _a === void 0 ? void 0 : _a.transcript) === undefined ? '' : props.suggestion.transcript, 50) })), _jsx("div", Object.assign({ style: kaGroupStyles.accordianTimeStamp }, { children: ((_b = props.suggestion) === null || _b === void 0 ? void 0 : _b.timestamp) === undefined ? '' : formatTimestamp(props.suggestion.timestamp) }))] })) })), _jsx(AccordionDetails, { children: _jsx("div", Object.assign({ style: kaGroupStyles.kbArticlesContainer }, { children: (props.suggestion != undefined && ((_c = props.suggestion) === null || _c === void 0 ? void 0 : _c.articles) != undefined && ((_d = props.suggestion.articles) === null || _d === void 0 ? void 0 : _d.length) > 0) && ((_e = props.suggestion) === null || _e === void 0 ? void 0 : _e.articles.map((article, index) => (_jsx(KnowledgeAssistCard, { isBelowMd: props.isBelowMd, article: article }, index)))) })) })] })) })));
}
//# sourceMappingURL=knowledge-assist-group.js.map