import React from "react";
import MdCompiler from "@/components/mc-compiler";
import { Box } from "@mui/material";
import { theme } from "@/configs/theme";

const Description = ({ markdownContent }) => {
  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
      }}
    >
      <MdCompiler markdown={markdownContent} />
    </Box>
  );
};

export default Description;
