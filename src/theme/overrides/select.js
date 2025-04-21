import { hexToRGBA } from "@/utils/hex-to-rgba"

const select = theme => {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          width: '100%',

          "& fieldset": {
            border: `1px solid ${theme.palette.border.secondary}`,
            borderRadius: "0.5rem",
            padding: 0,

            "&:hover": {
              borderColor: theme.palette.border.main,
            },
          },

          "& .MuiInputBase-input": {
            padding: "0.5rem",
            zIndex: 9,
          },

          "& .MuiSelect-icon": {
            color: theme.palette.text.primary
          },

          "&.Mui-disabled": {
            background: theme.palette.action.disabledBackground,
            color: theme.palette.text.disabled,
            cursor: "not-allowed",
            opacity: 0.7,
            pointerEvents: "none",
            borderRadius: "0.5rem",

            "& fieldset": {
              borderColor: theme.palette.action.disabled + " !important",
            },

            "& .MuiSelect-icon": {
              color: theme.palette.action.disabled
            }
          }
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          width: "100%",

          "&:hover": {
            background: hexToRGBA(theme.palette.primary.main, 0.1),
          },

          "&.Mui-disabled": {
            background: theme.palette.action.disabledBackground,
            color: theme.palette.text.disabled,
            cursor: "not-allowed",
            opacity: 0.5,
            pointerEvents: "none",
            "&.MuiMenuItem-root": {
              color: theme.palette.text.disabled
            }
          },

          "&.Mui-focusVisible": {
            background: hexToRGBA(theme.palette.primary.main, 0.1),
          }
        })
      }
    }
  }
}

export default select