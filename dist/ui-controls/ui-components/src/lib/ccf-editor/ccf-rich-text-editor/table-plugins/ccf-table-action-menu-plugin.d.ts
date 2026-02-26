import { TableCellNode } from '@lexical/table';
import * as React from 'react';
import { ReactPortal } from 'react';
declare type TableCellActionMenuProps = Readonly<{
    contextRef: {
        current: null | HTMLElement;
    };
    onClose: () => void;
    setIsMenuOpen: (isOpen: boolean) => void;
    tableCellNode: TableCellNode;
}>;
/**
 *
 * @example <TableActionMenu/>
 * @returns Table cell action menues
 */
export declare const TableActionMenu: React.FC<TableCellActionMenuProps>;
/**
 *
 * @example <TableCellActionMenuContainer/>
 * @returns Table cell action menues
 */
export declare function TableCellActionMenuContainer({ anchorElem, }: {
    anchorElem: HTMLElement;
}): JSX.Element;
/**
 *
 * @example <TableActionMenuPlugin/>
 * @returns enbles cell actions on table component
 */
export default function TableActionMenuPlugin({ anchorElem, }: {
    anchorElem?: HTMLElement;
}): ReactPortal;
export {};
