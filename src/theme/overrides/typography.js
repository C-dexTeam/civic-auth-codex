
const typography = theme => {
  return {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontFamily: 'Montserrat Alternates',
          color: ownerState?.color && theme.palette[ownerState?.color]?.[ownerState?.color == "text" ? "primary" : "main"],
          // color: theme.palette.text.primary,
        }),
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
          color: theme.palette.text.primary,
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        }
      }
    }
  }
}

export default typography
