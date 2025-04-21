
const textfield = theme => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          // width: "fit-content",

          "& .MuiButtonBase-root": {
            color: theme.palette.border.secondary,
          },

          "&:hover": {
            ".MuiButtonBase-root": {
              color: theme.palette.border.main,
            }
          },
          "& .Mui-focused": {
            ".MuiButtonBase-root": {
              color: theme.palette.primary.main,
            }
          },

          "& fieldset": {
            border: `1px solid ${theme.palette.border.secondary}`,
            borderRadius: "0.5rem",
            padding: 0,

            "&:hover": {
              borderColor: theme.palette.border.main,
            },

          },

          // yazı rengi
          "& .MuiInputBase-input": {
            padding: "0.5rem",
            zIndex: 9,
          },

          "& .MuiInputBase-root": {
            padding: 0,
            paddingRight: "0.5rem",
            paddingLeft: "0.5rem",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            // borderColor: theme.palette.error.main,
          }

          // ...(ownerState.variant === "filled" && {
          //     borderRadius: "0.75rem",
          //     "& input, & textarea": {
          //         border: "unset !important",
          //     },
          //     "& .MuiInputBase-root": {
          //         backgroundColor: "#FCFCFC",
          //     },
          //     "& .MuiInputBase-root::before": {
          //         display: "none",
          //         border: "unset !important",
          //     },
          //     "& .MuiInputBase-root::after": {
          //         display: "none",
          //         border: "unset !important",
          //     },
          // }),
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: theme.palette.border.main,
        })
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: theme.palette.border.secondary,

          "&:hover": {
            color: theme.palette.border.light,
          }
        })
      }
    }
  }
}

export default textfield
