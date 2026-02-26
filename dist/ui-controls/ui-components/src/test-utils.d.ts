import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
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
declare function render(ui: ReactJSXElement, { store, ...renderOptions }?: {
    store?: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<any, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<any, import("redux").AnyAction, undefined>]> | undefined;
}): import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>;
export * from '@testing-library/react';
export { render };
