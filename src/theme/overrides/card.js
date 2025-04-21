import { hexToRGBA } from "@/utils/hex-to-rgba"

const card = theme => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: ownerState.round == "lg" ? "1rem" : "0.5rem",
          border: `1px solid ${hexToRGBA(theme.palette.border.secondary, 1)}`,
          "&.MuiMenu-paper": {
            marginTop: "0.5rem"
          }
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          position: "relative",
          backgroundColor: ownerState.mode == "dark" ? theme.palette.background.default : theme.palette.background.paper,
          borderRadius: "0rem",
          border: "none",
          "& .MuiCardContent-root": {
            paddingBottom: ownerState.variant == "gradient" ? `1rem` : `2rem`,
          },

          ...(
            ownerState.variant == "flat"
              ? {
              }
              : ownerState.variant == "special"
                ? {
                  background: theme.palette.background.default,
                  "&::before": {
                    content: '""',
                    display: "block",
                    width: "auto",
                    height: "auto",
                    minHeight: "50%",
                    maxHeight: "50%",
                    aspectRatio: 1,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    borderTop: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 0.3)}`,
                    borderLeft: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 0.3)}`,
                  },
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: "auto",
                    height: "auto",
                    minHeight: "50%",
                    maxHeight: "50%",
                    aspectRatio: 1,
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    borderBottom: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 0.3)}`,
                    borderRight: `2px solid ${hexToRGBA(theme.palette[ownerState.color || "primary"]?.main, 0.3)}`
                  }
                }
                : ownerState.variant == "gradient"
                  ? {
                    position: "relative",
                    borderRadius: "1rem",
                    border: "double 1px transparent",
                    background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), linear-gradient(to right top, ${theme.palette[ownerState.color || "primary"].main} 0%, ${theme.palette.background.default} 75%)`,
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box, border-box",
                    overflow: "visible",

                    // "& .MuiCardContent-root": {
                    //   paddingBottom: `calc(1rem + ${ownerState.btnHeight || 48}px + 1px + 4px) !important`,
                    // },

                    "&::before": {
                      content: '""',
                      display: "block",
                      borderRadius: "1.5rem 0 0 0 ",
                      width: `calc(${ownerState.btnWidth || 96}px + 4px)`,
                      height: `calc(${ownerState.btnHeight || 48}px + 4px)`,
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      border: "double 1px transparent",
                      background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), linear-gradient(to right top, ${theme.palette[ownerState.color || "primary"].main} -50%, ${theme.palette.background.default} 100%)`,
                      backgroundOrigin: "border-box",
                      backgroundClip: "content-box, border-box",
                      borderBottom: "none",
                      borderRight: "none",
                    },
                    "&::after": {
                      content: '""',
                      display: "block",
                      borderRadius: "calc(1.5rem - 1px) 0 calc(1.5rem - 1px) 0",
                      width: `calc(${ownerState.btnWidth || 96}px + 1px + 4px)`,
                      height: `calc(${ownerState.btnHeight || 48}px + 1px + 4px)`,
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      border: "none",
                      background: "inherit",
                    },
                    // "& .MuiCardContent-root": {
                    //   borderRadius: "1rem",
                    //   background: theme.palette.background.default,
                    // }
                  }
                  : {
                    borderRadius: ownerState.round == "lg" ? "1rem" : "0.5rem",
                    border: `1px solid ${hexToRGBA(theme.palette.border.secondary, 1)}`,
                  }
          ),
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          padding: "0.5rem 1rem",
          borderBottom: `0.5px solid ${hexToRGBA(theme.palette.border.light, 1)}`,
          "& .MuiCardHeader-title": {
            color: theme.palette[ownerState.color || "text"]?.[!ownerState.color || ownerState.color == "text" ? "primary" : "main"],
          },
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          padding: "2rem 1rem !important",

          ...(ownerState.size == "small" ? {
            padding: "0.75rem",
            paddingBottom: "0.75rem !important",
          } : {})
        }),
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          padding: "0.5rem 1rem",
          borderTop: ownerState.flat ? "unset" : `0.5px dashed ${hexToRGBA(theme.palette.border.light, 1)}`,
        }),
      },
    }
  }
}

export default card
