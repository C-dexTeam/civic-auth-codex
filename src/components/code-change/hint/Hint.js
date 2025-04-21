import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "@/configs/theme";

const HintDialog = ({ open, onClose, hint }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: `${theme.palette.background.default}`,
          borderRadius: "16px",
          color: "white",
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: `0px 0px 12px ${theme.palette.primary.light}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            color: theme.palette.secondary.main,
          }}
        >
          🚀 Hint from the Codex
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: theme.palette.primary.main, marginLeft: "auto" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            backgroundColor: theme.palette.action.active,
            padding: "12px",
            borderRadius: "8px",
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            sx={{ fontSize: "16px", color: theme.palette.secondary.light }}
          >
            {hint || "No hint available at the moment. Try again later 🌌"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default HintDialog;
