import themeConfig from "@/configs/themeConfig"

const defaultStyle = {
    fontFamily: `${themeConfig.fontFamily}`,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 500,
    // cursor: "default",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    width: "fit-content",
    maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"

}

const typography = theme => {
    return {
        ...defaultStyle,
        h1: {
            ...defaultStyle,
            fontSize: "3rem",
            lineHeight: "4rem",
        },
        h2: {
            ...defaultStyle,
            fontSize: "2.5rem",
            lineHeight: "3.5rem",
        },
        h3: {
            ...defaultStyle,
            fontSize: "2rem",
            lineHeight: "3rem",
        },
        h4: {
            ...defaultStyle,
            fontSize: "1.5rem",
            lineHeight: "2.5rem",
        },
        h5: {
            ...defaultStyle,
            fontSize: "1.25rem",
        },
        h6: {
            ...defaultStyle,
            fontSize: "1.125rem",
        },
        subtitle: {
            ...defaultStyle,
            fontSize: "1.25rem",
            lineHeight: "2rem",
            fontWeight: 700
        },
        subtitle1: {
            ...defaultStyle,
            fontWeight: 700
        },
        subtitle2: {
            ...defaultStyle,
            fontSize: "1.5rem",
            lineHeight: "2rem",
            fontWeight: 700,
        },
        body: {
            ...defaultStyle,
            fontSize: "1.25rem",
            lineHeight: "2rem",
        },
        body1: {
            ...defaultStyle,
        },
        body2: {
            ...defaultStyle,
            fontSize: "1.5rem",
            lineHeight: "2rem",
        },
        caption: {
            ...defaultStyle,
            lineHeight: "1rem",
            fontSize: "0.75rem",
            color: theme.palette.secondary.main,
        },
        caption1: {
            ...defaultStyle,
            color: theme.palette.secondary.main,
        },
        caption2: {
            ...defaultStyle,
            fontSize: "1.25rem",
            lineHeight: "1.5rem",
            color: theme.palette.secondary.main,
        },
        link: {
            ...defaultStyle,
            fontSize: "inherit",
            lineHeight: "inherit",
            cursor: "pointer",
            "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "underline",
            }
        },
        link2: {
            ...defaultStyle,
            cursor: "pointer",
            "&:hover": {
                color: theme.palette.primary.main
            }
        },
        slim: {
            color: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
            fontWeight: 300,
        },
        strong: {
            color: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
            fontWeight: 700,
        },
    }
}

export default typography