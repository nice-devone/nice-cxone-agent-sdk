interface CcfNameRelates {
    entityValue: string;
    entityName: string;
}
interface CcfNameRelatesToProps {
    nameList: CcfNameRelates[];
    relatesToList: CcfNameRelates[];
    selectedContactId: string;
}
/**
 * Component for rendering a name relates to dropdown.
 *
 * @param CcfNameRelatesToProps - props - The properties for the component.
 * @returns - JSX.Element The rendered component.
 * @example - CcfNameRelatesTo(data: CcfNameRelatesToProps)
 */
export declare function CcfNameRelatesTo({ nameList, relatesToList, selectedContactId, }: CcfNameRelatesToProps): JSX.Element;
export default CcfNameRelatesTo;
