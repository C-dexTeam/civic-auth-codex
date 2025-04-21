import { hexToRGBA } from "@/utils/hex-to-rgba"

const divider = theme => {
  return {
    MuiDivider: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          height: "0.5px",
          // background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
          background: `linear-gradient(90deg, ${hexToRGBA(theme.palette[ownerState?.color ?? "primary"].main, 0)} 0%, ${theme.palette[ownerState?.color ?? "primary"].main} 50%, ${hexToRGBA(theme.palette[ownerState?.color ?? "primary"].main, 0)} 100%)`,
          border: "none"
        }),
      },
    }
  }
}

export default divider
