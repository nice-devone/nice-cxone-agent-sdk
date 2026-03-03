import React from 'react';
interface RadioTypePref {
    data: Array<{
        value: string;
        label: string;
        toolTipText: string;
    }>;
    defaultSelected: string;
    showInfoIcon: boolean;
}
export declare enum LabelType {
    /**
      * @remarks - enum for phone number type
    */
    PHONE_NUMBER = "Set Phone Number",
    /**
      * @remarks - enum for station ID type
    */
    STATION_ID = "Set Station ID",
    /**
      * @remarks - enum for acs connection type
    */
    CONNECT_ACS = "Connect using ACS",
    /**
      * @remarks - enum for softphone type
    */
    INTEGRATED_SOFTPHONE = "Integrated Softphone",
    /**
     * @remarks - enum for acs type
    */
    ACS = "phone-AcsEnabled",
    /**
     * @remarks - enum for default type
    */
    DEFAULT = "defaultToolTipLabel"
}
export interface CcfRadioHighlightProps {
    onRadioButtonSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: RadioTypePref;
}
/**
 *
 * @param props - any
 * @example <CcfRadioHighlight />
 * @returns
 */
export declare function CcfRadioHighlight(props: any): JSX.Element;
export default CcfRadioHighlight;
