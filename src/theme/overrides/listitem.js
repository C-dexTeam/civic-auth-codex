import { hexToRGBA } from "@/utils/hex-to-rgba"

const listitem = theme => {
  return {
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
          // border: "1px solid #fff",
          // borderRadius: "0.5rem"
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          // backgroundColor: theme.palette.action.active,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "1.25rem",
          padding: "0rem 1rem",
          gap: "1rem",

          "& .MuiListItemIcon-root": {
            minWidth: "auto",
          },

          ...(ownerState.variant === "btn" ? {
            padding: "0.25rem 1rem !important",
            borderRadius: "0.5rem",

            "&:hover": {
              background: theme.palette.background.default,
              boxShadow: theme.shadows[2],
            },
          } : {
            ...(ownerState?.special
              ? {
                borderRadius: "0.5rem",

                ...(ownerState?.active
                  ? {
                    background: `linear-gradient(to right bottom, ${theme.palette[ownerState.color || "primary"].main} 0%, ${theme.palette.info.main} 70%)`,

                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                  }
                  : {
                    border: "1px solid transparent",
                    background: `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}), linear-gradient(to right bottom, ${theme.palette[ownerState.color || "primary"].main} 0%, ${theme.palette.info.main} 70%)`,
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",

                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }),
              }
              : {
                "&:hover": {
                  background: `linear-gradient(90deg, ${hexToRGBA(theme.palette.primary.main, 0)} 0%, ${theme.palette.primary.main} 50%, ${hexToRGBA(theme.palette.primary.main, 0)} 100%)`,
                  webkitBackgroundClip: "text",
                  backgroundClip: "text",
                  webkitTextFillColor: "transparent",
                  color: "transparent",
                },

                ...(ownerState?.active && {
                  // gradient text color
                  background: `linear-gradient(90deg, ${hexToRGBA(theme.palette.primary.main, 0)} 0%, ${theme.palette.primary.main} 50%, ${hexToRGBA(theme.palette.primary.main, 0)} 100%)`,
                  webkitBackgroundClip: "text",
                  backgroundClip: "text",
                  webkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "inline-block",

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "calc(-26%)",
                    left: "calc(50% - 37.5%)",
                    width: "75%",
                    height: "0.05rem",
                    // background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                    background: `linear-gradient(90deg, ${hexToRGBA(theme.palette.primary.main, 0)} 0%, ${theme.palette.primary.main} 50%, ${hexToRGBA(theme.palette.primary.main, 0)} 100%)`,
                  }
                })
              }
            )
          }),
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
  }
}

export default listitem
