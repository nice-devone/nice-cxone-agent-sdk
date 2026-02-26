/// <reference types="react" />
export interface withHoverProps {
    isHovering: boolean;
    onMouseEnter?: () => void;
    onMouseOut?: () => void;
}
/**
 * Component to be used for hover
 * @param WrapperComponent - React.ComponentType<T>
 * @example withHover()
 * @returns
 */
export declare function withHover<T>(WrapperComponent: React.ComponentType<T>): React.FC<T>;
export default withHover;
