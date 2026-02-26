/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
const customerCardActivityTitleStyles = (theme) => {
    var _a, _b;
    const styles = {
        smallFont: {
            fontSize: '9px',
            textDecoration: 'none',
        },
        title: {
            fontSize: '14px',
            fontWeight: 'bold',
        },
        iconCRMType: {
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDMydjI0SDB6Ii8+PHBhdGggZD0iTTE0LjI1NiA2LjIxMnYxNy4wMDlILjE2OHptMC02LjEwNWE3LjA0NCA3LjA0NCAwIDAgMS0xNC4wODggMGgxNC4wODhabTIuMzIxIDIzLjExM2E3LjA0NCA3LjA0NCAwIDEgMSAxNC4wODggMEgxNi41NzdabTAtNi4xMDRWLjEwN2gxNC4wOXoiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iIzAzMzYzRCIvPjwvZz48L3N2Zz4=)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '13px',
            backgroundPosition: '5px',
            border: '1px solid #00000029',
            padding: '2px 3px 1px 25px',
            borderRadius: '3px',
            maxWidth: 'max-content',
            '&:hover': {
                background: `${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.hover}`,
            },
        },
    };
    return styles;
};
export default customerCardActivityTitleStyles;
//# sourceMappingURL=ccf-customer-card-activity-title.style.js.map