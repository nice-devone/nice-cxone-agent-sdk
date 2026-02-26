import { green, red, yellow, purple } from '@mui/material/colors';
export const enhancedWEThemeOptions = {
    palette: {
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
            highlight: '#AF008D',
            messageText: '#AFAFAF',
            black: '#000000',
            grey: '#CCCECF',
            filter: '#3F5C69',
            clearText: '#003D7A',
            searchTitle: '#004466',
        },
        background: {
            paper: '#fff',
            default: '#eaf0f6',
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
            outboundOptionBg: '#e2edff',
            scrollTrack: '#f4f7f9',
            scrollThumb: '#c9d0d6',
            scrollThumbHover: '#5555',
            socialReaction: '#005C99',
            transparent: 'transparent',
            slateGrey: '#d2d8db',
            charcoleGrey: '#D0D2D3',
        },
        boxshadow: {
            main: '#00000029',
            light: '#dde4e9',
            hover: '#ffffff29',
        },
        border: {
            main: '#dae2e8',
            dark: '#dcdcdc',
            input: '#C4C4C4',
            contrastText: '#B0CDDB',
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
            errorText: '#D72833',
            alertBackground: '#D72833',
        },
        grid: {},
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
//# sourceMappingURL=ccf-enhanced-workflow-execute-editor.theme.config.js.map