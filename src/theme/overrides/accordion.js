import { hexToRGBA } from "@/utils/hex-to-rgba";

const accordion = (theme) => {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "8px 0 !important", 
          borderTop: "none",
          borderBottom: "none",
          borderRadius: "12px", 
          overflow: "hidden",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "&:first-of-type": {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          },
          "&:last-of-type": {
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          },
        },
        // expanded: {
        //   margin: "8px 0", 
        //   transition: "none",
        //   scrollBehavior: "auto",
        // },
      },
    },
  };
};

export default accordion;
