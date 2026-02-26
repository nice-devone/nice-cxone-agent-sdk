import PropTypes from 'prop-types';
/**
 * SemiCircleProgress component
 * @example - <SemiCircleProgress />
 */
export declare function SemiCircleProgress({ stroke, strokeWidth, background, diameter, orientation, direction, showPercentValue, percentage, }: {
    stroke?: string | undefined;
    strokeWidth?: number | undefined;
    background?: string | undefined;
    diameter?: number | undefined;
    orientation?: string | undefined;
    direction?: string | undefined;
    showPercentValue?: boolean | undefined;
    percentage?: number | undefined;
}): JSX.Element;
export declare namespace SemiCircleProgress {
    var propTypes: {
        stroke: PropTypes.Requireable<string>;
        strokeWidth: PropTypes.Requireable<number>;
        background: PropTypes.Requireable<string>;
        diameter: PropTypes.Requireable<number>;
        orientation: PropTypes.Requireable<string>;
        direction: PropTypes.Requireable<string>;
        showPercentValue: PropTypes.Requireable<boolean>;
        percentage: (props: any, propName: any) => Error | undefined;
    };
}
