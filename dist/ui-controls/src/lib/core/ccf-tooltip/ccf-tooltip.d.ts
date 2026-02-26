import { TooltipProps } from '@mui/material';
import { CSSProperties } from 'react';
import { withTranslationProps } from '../../ccf-translator/ccf-translator';
export interface CcfTooltipProps extends TooltipProps {
    tooltipForRTL?: string;
    styles?: {
        ccfTooltipArrow?: CSSProperties;
        ccfTooltip: CSSProperties;
    };
}
export declare const CcfTooltip: import("react").FC<Omit<CcfTooltipProps & withTranslationProps, keyof withTranslationProps> & import("../../ccf-translator/ccf-translator").CcfTranslatorProps>;
