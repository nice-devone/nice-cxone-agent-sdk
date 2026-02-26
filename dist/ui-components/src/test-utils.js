import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from './mockStore';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { CcfStorybookThemeOptions } from '@nice-devone/ui-controls';
/**
 * Used to override the render method of testing-library/react so that we can reduce the boilerplate code for passing the store for every components to be tested
 * @param ui - JSX Element
 * @param param - mock Store
 * @example -
 * ```
 * import { render } from '../../test-utils';
 *
 * render(</ccfComponent {...mockProps} />)
 * ```
 */
function render(ui, _a = {}) {
    var { store = mockStore } = _a, renderOptions = __rest(_a, ["store"]);
    const theme = createTheme(CcfStorybookThemeOptions);
    /**
     * Wrapper component to wrap the ui element passed with Provider
     * @param param- children elements
     * @example -
     * ```
     * rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
     * ```
     */
    const Wrapper = ({ children }) => _jsx(Provider, Object.assign({ store: store }, { children: _jsx(ThemeProvider, Object.assign({ theme: theme }, { children: children })) }));
    return rtlRender(ui, Object.assign({ wrapper: Wrapper }, renderOptions));
}
// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
//# sourceMappingURL=test-utils.js.map