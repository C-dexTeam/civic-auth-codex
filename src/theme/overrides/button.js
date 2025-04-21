import { hexToRGBA } from "@/utils/hex-to-rgba"

const button = theme => {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: ownerState.color ? `${theme.palette[ownerState.color || "primary"]?.main}` : `${theme.palette.text.primary}`,
          background: ownerState.bgc ? `${theme.palette.background.default}` : `${theme.palette.background.paper}`,
          padding: "0.5em 1em",
          borderRadius: "0.5em",
          textTransform: "none",
          position: "relative",
          fontSize: "1em",
          fontHeight: "1.5em",
          zIndex: 1,
          fontWeight: 300,

          "&.Mui-disabled": {
            color: `${theme.palette.text.disabled}`,
            background: `${theme.palette.action.disabledBackground}`,
            cursor: "not-allowed",
            opacity: 0.7,
            pointerEvents: "none",
          },

          "&:hover": {
            background: `${hexToRGBA(theme.palette[ownerState.color || "primary"].main, 0.1)} !important`,
            color: `${theme.palette[ownerState.color || "primary"].hoverText}`,
          },

          ...(
            ownerState.size === "small"
              ? {
                padding: "0.25em 0.5em",
              }
              : ownerState.size === "large" && {
                padding: "0.75em 1.5em",
              }
          ),

          ...(
            ownerState.variant === "outlined"
              ? { // outlined button
                background: "inherit !important",
                outline: `0.1em solid ${theme.palette[ownerState.color || "primary"].main}`,
                outlineOffset: "-0.1em",

                "&.Mui-disabled": {
                  outline: `0.1em solid ${theme.palette.action.disabled}`,
                  color: `${theme.palette.text.disabled}`,
                }
              }
              : ownerState.variant === "gradient"
                ? { // gradient button
                  background: `linear-gradient(90deg, ${theme.palette[ownerState.color || "primary"].main}, ${theme.palette[ownerState.color || "primary"].dark}) !important`,
                  color: `${theme.palette[ownerState.color || "primary"].contrastText} !important`,
                  outline: "none",
                  webkitTransition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",
                  transition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",

                  "&.Mui-disabled": {
                    background: `${theme.palette.action.disabledBackground} !important`,
                    color: `${theme.palette.text.disabled} !important`,
                  },

                  "&:hover": {
                    webkitTextFillColor: `${theme.palette[ownerState.color || "primary"].contrastText}`,
                    textFillColor: `${theme.palette[ownerState.color || "primary"].contrastText}`,
                    webkitTransition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",
                    transition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",

                    "&::before": {
                      background: `${theme.palette.background.default} !important`,
                      transition: "none",
                    },
                    "&::after": {
                      background: `${theme.palette.background.default} !important`,
                      transition: "none",
                    },
                  }
                }
                : ownerState.variant === "contained"
                  ? { // contained button
                    borderRadius: "1.25rem 0 1.25rem 0",
                    background: `${theme.palette[ownerState.color || "primary"].main} !important`,
                    color: `${theme.palette[ownerState.color || "primary"].contrastText} !important`,
                    outline: "none",
                    webkitTransition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",
                    transition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",

                    "&.Mui-disabled": {
                      background: `${theme.palette.action.disabledBackground} !important`,
                      color: `${theme.palette.text.disabled} !important`,
                    },

                    "&:hover": {
                      webkitTextFillColor: `${theme.palette[ownerState.color || "primary"].contrastText}`,
                      textFillColor: `${theme.palette[ownerState.color || "primary"].contrastText}`,
                      webkitTransition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",
                      transition: "all 0.45s cubic-bezier(0.86, 0, 0.07, 1)",

                      "&::before": {
                        background: `${theme.palette.background.default} !important`,
                        transition: "none",
                      },
                      "&::after": {
                        background: `${theme.palette.background.default} !important`,
                        transition: "none",
                      },
                    }
                  }
                  : ownerState.variant == "empty"
                    ? { // empty button
                      color: `${theme.palette.text.primary}`,
                      border: "none",
                      background: "transparent",
                      padding: "0",
                      "&:hover": {
                        background: "transparent",
                        color: `${theme.palette[ownerState.color || "primary"].main}`,
                      },
                    }
                    : { // default button
                      color: `${theme.palette.text.primary}`,
                      borderRadius: "0em",

                      "&.Mui-disabled": {
                        "&::before, &::after": {
                          borderColor: `${theme.palette.action.disabled}`,
                        }
                      },

                      "&::before": {
                        content: '""',
                        display: "block",
                        width: "15%",
                        height: "calc(100% - 4px)",
                        position: "absolute",
                        left: "0px",
                        borderTop: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 1)}`,
                        borderBottom: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 1)}`,
                        borderLeft: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 1)}`
                      },
                      "&::after": {
                        content: '""',
                        display: "block",
                        width: "15%",
                        height: "calc(100% - 4px)",
                        position: "absolute",
                        right: "0px",
                        borderTop: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 1)}`,
                        borderBottom: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 1)}`,
                        borderRight: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 1)}`
                      },
                    }
          ),
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: `${theme.palette.text.primary}`,

          "&.Mui-disabled": {
            color: `${theme.palette.text.disabled}`,
            background: "transparent",
            cursor: "not-allowed",
            opacity: 0.7,
          }
        })
      }
    }
  }
}

export default button
