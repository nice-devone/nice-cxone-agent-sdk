import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo, useState } from 'react';
// Added ts-ignore as TS doesn't allow initial value to be null
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: not sure why TS doesn't like using null as the value?
export const CellContext = createContext({
    cellEditorConfig: null,
    cellEditorPlugins: null,
    set: () => {
        //empty: as value is passed later
    },
});
/**
 * Compoenet to return the context of selected cell
 * @example <TableContext/>
 * @returns selected cell context
 */
export function TableContext({ children }) {
    const [contextValue, setContextValue] = useState({
        cellEditorConfig: null,
        cellEditorPlugins: null,
    });
    return (_jsx(CellContext.Provider, Object.assign({ value: useMemo(() => ({
            cellEditorConfig: contextValue.cellEditorConfig,
            cellEditorPlugins: contextValue.cellEditorPlugins,
            set: (cellEditorConfig, cellEditorPlugins) => {
                setContextValue({ cellEditorConfig, cellEditorPlugins });
            },
        }), [contextValue.cellEditorConfig, contextValue.cellEditorPlugins]) }, { children: children })));
}
//# sourceMappingURL=ccf-table-plugin.js.map