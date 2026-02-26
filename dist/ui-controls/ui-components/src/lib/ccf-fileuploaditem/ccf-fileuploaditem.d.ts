export interface CcfFileUploadItemProps {
    id: string;
    name: string;
    size?: string;
    uploaded: boolean;
    removeAttachment?: (id: string) => void;
    isReplyCard: boolean;
}
/**
 * Used to create container of attachment files
 * @param props - CcfFileUploadItemProps
 * @returns - JSX Element
 * @example -
 * ```
 * <CcfFileUploadItem {...{ id: file.id, name: file.name, size: formatBytes(file.size), uploaded: file.uploaded, removeAttachment: handleRemoveAttachment }} />
 * ```
 */
export declare function CcfFileUploadItem(props: CcfFileUploadItemProps): JSX.Element;
export default CcfFileUploadItem;
