/// <reference types="react" />
interface SharedSortableContainerProps<TItem, TContainerId> {
    id: TContainerId;
    items: TItem[];
    label: string;
    getItemKey: (item: TItem, index: number) => string;
    renderItem: (item: TItem, index: number, containerId: TContainerId, containerItems: TItem[], crossContainerItemLimit?: number, computedLastIndex?: number) => React.ReactNode;
    emptyText?: string;
    computedLastIndex?: number;
    hideIfEmpty?: boolean;
    crossContainerItemLimit?: number;
}
/**
 * Reusable, extensible wrapper component for building droppable + sortable containers
 *
 * - Droppable area setup
 * - SortableContext registration
 * - Rendering flow
 * - Theming and layout
 *
 * @param props - Component props.
 * @param id - Unique droppable container ID.
 * @param items - List of items rendered inside the container.
 * @param label - Label used for DOM identification.
 * @param getItemKey - Function to extract a unique key for each item.
 * @param renderItem - Function that renders each sortable item.
 * @param emptyText - Text shown when container has no items.
 * @param hideIfEmpty - When true, hides the entire container if empty.
 * @param crossContainerItemLimit -  Other container  length for cross container move.
 *
 * @example
 * ```
 * <SharedSortableContainer
 *   id="droppable-1"
 *   label="Navigation"
 *   items={navigationItems}
 *   hideIfEmpty={true}
 *   getItemKey={(item) => item.menuName}
 *   renderItem={(item, index, containerId) => (
 *     <SortableItem
 *       key={item.menuName}
 *       item={item}
 *       idx={index}
 *       containerId={containerId}
 *     />
 *   )}
 * />
 * ```
 */
export declare function SharedSortableContainer<TItem, TContainerId extends string>({ id, items, label, getItemKey, renderItem, emptyText, computedLastIndex, hideIfEmpty, crossContainerItemLimit, }: SharedSortableContainerProps<TItem, TContainerId>): JSX.Element | null;
declare const CcfSharedSortableContainer: <TItem, TContainerId>(props: SharedSortableContainerProps<TItem, TContainerId>) => JSX.Element | null;
export default CcfSharedSortableContainer;
