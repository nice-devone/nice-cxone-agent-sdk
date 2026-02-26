import { green, red, yellow, purple } from '@mui/material/colors';
export const CcfStorybookThemeOptions = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 360,
            md: 575,
            lg: 768,
            xl: 1015,
        },
    },
    palette: {
        // mode: 'dark',
        primary: {
            main: '#007CBE',
            dark: '#1c639c',
        },
        secondary: {
            main: '#526b7a',
        },
        success: {
            main: '#39c44a',
            dark: '#23762d',
        },
        error: {
            main: '#e62e43',
        },
        warning: {
            main: '#fde000',
        },
        info: {
            light: '#2498d5',
            main: '#2179c1',
        },
        accent: {
            main: '#ffb000',
            dark: '#C78800',
        },
        text: {
            main: '#808080',
            light: '#8c95a5',
            dark: '#001633',
            contrastText: '#333333',
            primary: '#191c21',
            secondary: '#616c75',
            active: '#306484',
            information: '#006398',
            header: '#767676',
            noteLabel: '#007AB8',
            highlight: '#AF008D',
            messageText: '#AFAFAF',
            black: '#000000',
            grey: '#CCCECF',
            white: '#FFFFFF',
            searchTitle: '#004466',
            filter: '#3F5C69',
            yellowWarning: '#D78F05',
            clearText: '#003D7A',
            noResult: '#929292',
            charcolGrey: '#4a4a4a',
            // TODO- will be removed once the theme palette is complete
        },
        background: {
            paper: '#ffffff',
            default: '#f2f2f2',
            level1: '#f8fafb',
            LogoColor: '#eaf0f6',
            main: '#dedede',
            dark: '#066da3',
            light: '#f8fafb',
            hover: '#ecf5fa',
            hoverDark: '#343A41',
            toolTipBg: '#444d57',
            callControlHeader: '#f5f8fa',
            sparkleBlue: '#067EFF',
            toastBackground: '#fdeeef',
            noteInput: '#ECF3F8',
            noteBackground: '#FCE69D',
            outboundOptionBg: '#e2edff',
            scrollTrack: '#f4f7f9',
            scrollThumb: '#c9d0d6',
            scrollThumbHover: '#5555',
            socialReaction: '#005C99',
            transparent: 'transparent',
            selectedQueue: '#d9ebf5',
            digitalTag: '#b0cddb',
            rejectBox: '#e6e9ed',
            darkGrey: '#79797A',
            midnightBlack: '#222',
            copilotAddButton: '#107DBC',
            copilotGenerateButton: '#AFC1CE',
            copilotFeedbackTags: '#829AAB',
            feedbackTooltipBoxShadow: 'rgba(0, 0, 0, 0.24)',
        },
        disposition: {
            required: purple[600],
            optional: red[700],
            icon: '#245900',
        },
        agentState: {
            available: green[400],
            unavailable: red[700],
            working: yellow[800],
        },
        boxshadow: {
            main: '#00000029',
            light: '#dde4e9',
            hover: '#ffffff29',
        },
        border: {
            main: '#dae2e8',
            dark: '#F6F6F6',
            white: '#DAE1E7',
        },
        divider: '#e3e9ee',
        digitalStatus: {
            closedDark: '#F6384E',
            closedHover: '#FFE4E7',
            escalatedDark: '#A476D7',
            escalactedHover: '#F7F0FE',
            newDark: '#F05D21',
            newHover: '#FFF4EB',
            openDark: '#CC8605',
            openHover: '#FFF9E4',
            pendingDark: '#007AB8',
            pendingHover: '#E7F7FF',
            resolvedDark: '#2EA86B',
            resolvedHover: '#DAFFED',
            successText: '#007A31',
            errorText: 'D72833',
            alertBackground: 'D72833',
        },
        grid: {
            hover: '#F3F3F3',
            selected: '#ECF5FA',
            selectedHover: '#E0EFF7',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        allVariants: {
            fontFamily: '\'Open Sans\', sans-serif',
        },
        fontFamily: '\'Open Sans\', sans-serif',
        h6: { fontSize: '0.75em' /* 12px */ },
        h5: { fontSize: '0.8750em' /* 14px */ },
        h4: { fontSize: '1em' /* 16px */ },
        h3: { fontSize: '1.17em' /* 18.72px */ },
        h2: { fontSize: '1.5em' /* 24px */ },
        h1: { fontSize: '2em' /* 16px */ },
    },
    override: {
        Muibutton: {
            root: {
                textTransform: 'capitalize',
            },
        },
    },
    props: {
        MuiButton: {
            disableRipple: true,
            color: 'primary',
        },
        MuiCheckbox: {
            disableRipple: true,
            color: 'primary',
        },
    },
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true,
            },
        },
    },
};
//# sourceMappingURL=ccf-storybook.theme.config.js.map