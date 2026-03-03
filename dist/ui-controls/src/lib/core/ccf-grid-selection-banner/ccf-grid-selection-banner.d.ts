import React from 'react';
/**
 * Interface for the action buttons on the banner component
 */
export interface actionButton {
    /**
     * id to be used for unique button identifier
    */
    buttonId: string;
    /**
     * label to display name of the button
    */
    buttonLabel: string;
}
/**
 * Interface for the grid selection banner at the top
 */
export interface CcfGridSelectionBannerDetails {
    /**
     * label to display on the title section of the banner
    */
    headerTitle: string;
    /**
     * list of actionable buttons to be displayed on the banner
    */
    actionButtons: actionButton[];
}
/**
 * Interface for the grid selection banner props
 */
export interface CcfGridSelectionBannerProps {
    /**
     * grid selection props object of type CcfGridSelectionBannerDetails
    */
    gridSelectionDetails: CcfGridSelectionBannerDetails;
    /**
     * Function to pass button click event from this component to parent
    */
    handleActionButtonClick: ((event: React.MouseEvent<HTMLButtonElement>, actionButtonId: string) => void);
    /**
     * boolean value which gives true if screen size is smaller than 575px
    */
    isTwoColumnDesign: boolean;
}
/**
 * @example `<CcfGridSelectionBanner gridSelectionDetails={gridSelectionDetails} handleActionButtonClick={handleActionButtonClick} />`
 *
 * @returns Selection Banner component for ccf grid
 *
 */
export declare const CcfGridSelectionBanner: (props: CcfGridSelectionBannerProps) => JSX.Element;
export default CcfGridSelectionBanner;
