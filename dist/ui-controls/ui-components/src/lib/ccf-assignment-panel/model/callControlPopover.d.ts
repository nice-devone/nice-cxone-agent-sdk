/// <reference types="react" />
export interface CallDetails {
    messageType: string;
}
export interface CallControlPopOver {
    callDetails: CallDetails;
    selectedPopOverType: string;
}
export interface PopOverMenuItemList {
    headerLabel: string;
    subItemHeader?: string;
    showBackArrowIcon: boolean;
    items: PopOverMenuItem[];
}
export interface PopOverMenuItem {
    label: string;
    icon: React.ReactElement;
    type?: string;
    closeOnSelection: boolean;
}
