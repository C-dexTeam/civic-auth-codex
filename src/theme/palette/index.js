import { hexToRGBA } from "@/utils/hex-to-rgba";

const text = {
    primary: "#f0f0f0",
    secondary: "#0F0F0F",
};

const border = {
    main: "#A1A6B4",
    light: "#DEE0E8",
    secondary: "#35373F"
}

const palette = {
    action: {
        active: hexToRGBA(border.main, 0.12),
        disabled: hexToRGBA(border.main, 0.5),
        disabledBackground: border.secondary,
        focus: hexToRGBA(border.secondary, 0.5),
        hover: hexToRGBA(border.light, 0.5),
        selected: border.light,
    },
    common: {
        black: text.secondary,
        white: text.primary,
    },
    divider: border.main,
    primary: {
        main: "#39D98A",
        light: "#ABFFD8",
        dark: "#01572F",
        contrastText: text.secondary,
        hoverText: text.primary,
    },
    secondary: {
        main: "#A1A6B4",
        light: "#DEE0E8",
        dark: "#35373F",
        contrastText: text.secondary,
        hoverText: text.primary,
    },
    success: {
        main: "#39D98A",
        light: "#ABFFD8",
        dark: "#01572F",
        contrastText: text.secondary,
        hoverText: text.primary,
    },
    warning: {
        main: "#E3BE44",
        light: "#FFF3AF",
        dark: "#816B0E",
        contrastText: text.secondary,
        hoverText: text.primary,
    },
    info: {
        main: "#1B3B6F",
        light: "#AABBD8",
        dark: "#00122F",
        contrastText: text.secondary,
        hoverText: text.primary,
    },
    error: {
        main: "#D72638",
        light: "#FFAAAD",
        dark: "#570003",
        contrastText: text.secondary,
        hoverText: text.primary,
    },
    background: {
        default: "#0B0C10",
        paper: "#1D1F2B",
    },
    border: {
        main: border.main,
        light: border.light,
        secondary: border.secondary,
    },
    text: {
        primary: text.primary,
        secondary: text.secondary,
        disabled: border.main,
    },
};

export default palette;