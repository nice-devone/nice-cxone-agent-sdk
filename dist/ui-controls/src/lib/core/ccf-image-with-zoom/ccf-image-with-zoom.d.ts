export interface CcfImageWithZoomProps {
    imgUrl: string;
    imgAltText: string;
    isModalOpen: boolean;
    closeModal: () => void;
    isInboxCollapsed?: boolean;
}
/**
 * Component displays image adaptive cards with zoom capability
 * @param props - CcfImageWithZoomProps
 * @returns image expanded with zoom options
 * @example `<CcfImageWithZoom imgUrl={imgUrl} imgAltText={imgAltText} isModalOpen={isModalOpen} closeModal={closeModal} isInboxCollapsed={true} />`
 */
export declare function CcfImageWithZoom({ imgUrl, imgAltText, isModalOpen, closeModal, isInboxCollapsed }: CcfImageWithZoomProps): JSX.Element;
export default CcfImageWithZoom;
