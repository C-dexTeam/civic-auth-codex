import { tooltipClasses } from "@mui/material"

const tooltip = theme => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ ownerState }) => ({
          zIndex: 999999,

          backgroundColor: ownerState.color ? theme.palette[ownerState.color]?.light : theme.palette.background.default,
          color: ownerState.color ? theme.palette[ownerState.color]?.dark : theme.palette.text.primary,
          fontSize: theme.typography.pxToRem(12),
          padding: "0.5rem 0.75rem",
          fontFamily: "inherit",
          borderRadius: "0.5rem",
          border: "1px solid " + (ownerState.color ? theme.palette[ownerState.color]?.dark : theme.palette.border.secondary),

          [`& .${tooltipClasses.arrow}`]: {
            "&::before": {
              backgroundColor: ownerState.color ? theme.palette[ownerState.color]?.light : theme.palette.background.default,
              borderBottomRightRadius: "3px",
              border: "1px solid " + (ownerState.color ? theme.palette[ownerState.color]?.dark : theme.palette.border.secondary),
            },
          },
        }),
      },
    }
  }
}

export default tooltip