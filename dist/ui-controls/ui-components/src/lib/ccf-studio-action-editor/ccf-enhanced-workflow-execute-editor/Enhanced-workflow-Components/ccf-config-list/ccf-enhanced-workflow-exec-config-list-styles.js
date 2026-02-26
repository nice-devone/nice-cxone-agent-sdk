import { checkHoverIcon, historyHoverIcon, checkUnhoverIcon, historyUnhoverIcon, deleteUnhoverIcon, deleteHoverIcon } from '../ccf-enhanced-workflow-exec-icon';
/**
 * Styling for Advance workflow execute editor display total configuration available left section component
 * @returns CcfListofEnhancedWEConfigStyles CSS properties as a JSON object
 * @example CcfListofEnhancedWEConfigStyles
*/
const CcfListofEnhancedWEConfigStyles = (theme) => {
    const styles = {
        listStyle: {
            width: '100%',
        },
        historyIconStyle: {
            [theme.breakpoints.up('md')]: {
                minWidth: '20px',
                width: '15px',
                height: '15px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                minWidth: '15px',
                width: '12px',
                height: '12px',
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: '12px',
                width: '10px',
                height: '10px',
            },
            margin: '0 5px 0 5px',
            backgroundImage: `url(${historyUnhoverIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            '&:hover': {
                backgroundImage: `url(${historyHoverIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
            },
        },
        checkIconStyle: {
            [theme.breakpoints.up('md')]: {
                minWidth: '20px',
                width: '15px',
                height: '15px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                minWidth: '15px',
                width: '12px',
                height: '12px',
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: '12px',
                width: '10px',
                height: '10px',
            },
            margin: '0 5px 0 0',
            backgroundImage: `url(${checkUnhoverIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            '&:hover': {
                backgroundImage: `url(${checkHoverIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
            },
        },
        deleteIconStyle: {
            [theme.breakpoints.up('md')]: {
                minWidth: '20px',
                width: '15px',
                height: '15px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                minWidth: '15px',
                width: '12px',
                height: '12px',
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: '12px',
                width: '10px',
                height: '10px',
            },
            margin: '0 5px 0 0',
            backgroundImage: `url(${deleteUnhoverIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            '&:hover': {
                backgroundImage: `url(${deleteHoverIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
            },
        },
        searchTypeIconStyle: {
            margin: '2px 5px 0 0',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            width: '15px',
            height: '15px',
            minWidth: '15px',
        },
        listTextStyle: {
            display: 'flex',
            justifycontent: 'flexstart',
            alignitems: 'flexstart',
        },
    };
    return styles;
};
export default CcfListofEnhancedWEConfigStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-config-list-styles.js.map