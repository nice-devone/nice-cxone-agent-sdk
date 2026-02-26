import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTranslator } from '@nice-devone/ui-controls';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { Button } from '@mui/material';
const ccfLogger = new CcfLogger('App.ErrorBoundary', 'CcfErrorBoundary');
/**
 *
 * @returns FallbackComponent Component of application
 * @param props -
 * @example `<FallbackComponent />`
 */
const FallbackComponent = () => {
    const [translate] = useTranslator();
    return (_jsxs("div", Object.assign({ style: { paddingLeft: '5px' } }, { children: [_jsx("p", { children: translate('unhandledExceptionError') }), _jsx(Button, Object.assign({ variant: "outlined", size: "small", "data-testid": "reloadAppBtn", title: translate('reloadAppBtn'), onClick: () => window.location.reload() }, { children: translate('reloadAppBtn') }))] })));
};
/**
 *
 * @returns CcfErrorBoundary -  to handle unhandled exceptions from components
 * @param props - ? - CcfErrorBoundaryProps
 * @example `<CcfErrorBoundary componentName='CcfCustomerCardContactHistory'><CcfCustomerCardContactHistory /></CcfErrorBoundary>`
 */
class CcfErrorBoundary extends React.Component {
    /**
     *
     * @returns set state for CcfErrorBoundary class component
     * @param props - ? - CcfErrorBoundaryProps
     * @example
     */
    constructor(props) {
        super(props);
        this.state = { error: false };
    }
    /**
     *
     * @returns set state
     * @param props - ? - error
     * @example
     */
    static getDerivedStateFromError(error) {
        return { error: error };
    }
    /**
     *
     * @returns Log the error
     * @param props - ? - error, errorInfo
     * @example
     */
    componentDidCatch(error) {
        // Log the error to an error reporting service
        ccfLogger.error('componentDidCatch', `An unhandled exception occurred in component ${this.props.componentName} - ` + JSON.stringify(error === null || error === void 0 ? void 0 : error.message));
    }
    /**
     *
     * @returns JSX element
     * @param props -
     * @example
     */
    render() {
        if (this.state.error) {
            return this.props.richFallbackText ? this.props.richFallbackText : _jsx(FallbackComponent, {});
        }
        return this.props.children;
    }
}
export default CcfErrorBoundary;
//# sourceMappingURL=ccf-error-boundary.js.map