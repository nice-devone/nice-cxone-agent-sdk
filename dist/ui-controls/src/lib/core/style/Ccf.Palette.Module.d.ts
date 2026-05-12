declare module '@mui/material/styles/createPalette' {
    interface Palette {
        accent: Palette['primary'];
        boxshadow: Palette['primary'];
        border: Palette['primary'];
        disposition: DispositionColor;
        agentState: AgentStateColor;
        ringerIcon: Palette['primary'];
        endCall: Palette['primary'];
        digitalStatus: DigitalStatusColor;
        grid: GridPalette;
    }
    interface PaletteOptions {
        accent: PaletteOptions['primary'];
        boxshadow: PaletteOptions['primary'];
        border: PaletteOptions['primary'];
        disposition: DispositionColor;
        agentState: AgentStateColor;
        digitalStatus: DigitalStatusColor;
        grid: GridPalette;
    }
    interface PaletteColor {
        secondary?: string;
        hover?: string;
        yellow?: string;
        lightGray?: string;
        input?: string;
        customField?: string;
        menuItemHighlight?: string;
        emailFooter?: string;
        tabBorder?: string;
        toggleThumb?: string;
        inputError?: string;
        borderColor?: string;
    }
    interface SimplePaletteColorOptions {
        secondary?: string;
        hover?: string;
    }
    interface TypeText {
        primary: string;
        secondary: string;
        main: string;
        contrastText: string;
        light?: string;
        dark?: string;
        content?: string;
        active?: string;
        information: string;
        header: string;
        highlight?: string;
        noteLabel: string;
        messageText: string;
        black: string;
        grey: string;
        white: string;
        searchTitle: string;
        filter: string;
        yellowWarning: string;
        clearText: string;
        noResult: string;
        red: string;
        green: string;
        copilotAgentSearchText: string;
        lightGrey: string;
        charcolGrey: string;
        faqIcon: string;
        articleIcon: string;
        smartReplyIcon: string;
        emailPopupText: string;
        placeholder: string;
        ibAvatar: string;
        obAvatar: string;
        latencyBarLabel: string;
        asteriskRed: string;
    }
    interface TypeBackground {
        level1: string;
        LogoColor: string;
        main?: string;
        hover?: string;
        hoverDark?: string;
        light?: string;
        dark?: string;
        lightCoolGray: string;
        toolTipBg: string;
        callControlHeader?: string;
        sparkleBlue: string;
        toastBackground: string;
        outboundOptionBg: string;
        scrollTrack: string;
        scrollThumb: string;
        scrollThumbHover: string;
        likeReaction: string;
        noteInput: string;
        noteBackground: string;
        socialReaction: string;
        transparent: string;
        selectedQueue: string;
        digitalTag: string;
        zoomIconsBackground: string;
        header: string;
        lightBlue: string;
        rejectBox: string;
        darkGrey: string;
        lavenderBlush: string;
        lightYellow: string;
        darkYellow: string;
        copilotCardContent: string;
        copilotToasterBackground: string;
        footer: string;
        filterButton: string;
        checkboxHover: string;
        midnightBlack: string;
        copilotCardBackground: string;
        dispositionIcon: string;
        replyToMessageCardBackground: string;
        slateGrey: string;
        charcoleGrey: string;
        audioPlayerColor: string;
        callControls: string;
        copilotAddButton: string;
        copilotGenerateButton: string;
        copilotFeedbackTags: string;
        feedbackTooltipBoxShadow: string;
        copilotCardLightBlueBackground: string;
        copilotCardLightGreenBackground: string;
        copilotCardLightRedBackground: string;
        copilotCardLightYellowBackground: string;
        menuItemHighlight: string;
        avatarBackground: string;
        tableRowHover: string;
        PaginationHover: string;
        PaginationFocus: string;
        secondaryButtonPressed: string;
        pressedTextButtonBackground: string;
        editorBoxShadow: string;
        editorChipShadow: string;
        editorChipDeleteIcon: string;
        toggleHover: string;
        toggleChecked: string;
        primaryButtonHover: string;
        primaryButtonPressed: string;
        inputHoverBackground: string;
        chipFocusBackground: string;
    }
    interface DispositionColor {
        required: string;
        optional: string;
    }
    interface AgentStateColor {
        available: string;
        unavailable: string;
        working: string;
    }
    interface DigitalStatusColor {
        closedDark: string;
        closedHover: string;
        escalatedDark: string;
        escalactedHover: string;
        newDark: string;
        newHover: string;
        openDark: string;
        openHover: string;
        pendingDark: string;
        pendingHover: string;
        resolvedDark: string;
        resolvedHover: string;
        successText: string;
        errorText: string;
        alertBackground: string;
    }
    interface GridPalette {
        hover?: string;
        selected?: string;
        selectedHover?: string;
    }
}
export {};
