
const tabs = theme => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          minHeight: "3.5rem",

          "& .MuiButtonBase-root": {
            color: theme.palette.text.primary,
            minHeight: "fit-content",
            borderRadius: "0.5rem",
            alignItems: "center",
            textTransform: "unset",

            "& .MuiSvgIcon-root": {
              height: "24px",
              width: "auto",
            }
          },

          '&:hover': {
          },

          ...(ownerState.type === "box" && {
            alignItems: "center",
            backgroundColor: "transparent !important",

            "&:has(.MuiButtonBase-root.Mui-disabled .MuiSvgIcon-root[data-testid='KeyboardArrowLeftIcon'])": {
              "& .MuiTabs-scroller": {
                marginLeft: "0px !important",
              }
            },

            "&:has(.MuiButtonBase-root.Mui-disabled .MuiSvgIcon-root[data-testid='KeyboardArrowRightIcon'])": {
              "& .MuiTabs-scroller": {
                marginRight: "0px !important",
              }
            },

            "& .MuiTabs-flexContainer": {
              gap: "0.5rem",
              alignItems: "center",
            },

            "& .MuiTabs-scroller": {
              display: "flex",
              margin: "0px 0.5rem",
            },

            "& .MuiButtonBase-root": {
              minWidth: "fit-content",
              minHeight: "fit-content",
              padding: "0.5rem",
              color: theme.palette.text.primary,
              backgroundColor: "transparent",
              border: "1px solid " + theme.palette.border.secondary,
              borderRadius: "0.5rem",
              textTransform: "unset",

              "&.MuiTab-root": {
                padding: "0.625rem 1rem !important",
              },

              "&:hover": {
                border: "1px solid " + theme.palette.border.main,
              },

              "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                border: "1px solid " + theme.palette.secondary.dark,

                "&:hover": {
                  border: "1px solid " + theme.palette.secondary.dark,
                },
              }
            },
            "& .Mui-disabled, & .MuiTabs-indicator": { display: "none" },

            "& .MuiTabScrollButton-root": {
              backgroundColor: theme.palette.background.paper,
              borderRadius: "0.5rem",
              minHeight: "fit-content",
              height: "fit-content",

              "&:hover": {
              },
            },
          })
        }),
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
  }
}

export default tabs
