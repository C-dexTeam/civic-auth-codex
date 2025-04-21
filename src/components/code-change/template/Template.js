import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { theme } from "@/configs/theme";

const TestCases = () => {
  const testCases = [
    { id: 1, nums: "[2, 7, 11, 15]", target: "9" },
    { id: 2, nums: "[3, 2, 4]", target: "6" },
    { id: 3, nums: "[3, 3]", target: "6" },
  ];

  return (
    <Box sx={{ height: "100%", overflow: "auto" }}>
      <Typography variant="h4" color={`${theme.palette.primary.main}`}>
        Expected Test Cases
      </Typography>
      {testCases.map((testCase, index) => (
        <Accordion
          key={testCase.id}
          sx={{
            backgroundColor: `${theme.palette.action.hover}`,
            color: "white",
            borderRadius: "8px",
            mb: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography>Case {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* input yazısı */}
                <Typography
                  variant="body1"
                  color={`${theme.palette.secondary.main}`}
                >
                  Input
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  value={testCase.nums}
                  InputProps={{ readOnly: true }}
                  sx={{
                    backgroundColor: `${theme.palette.action.hover}`,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      borderColor: `${theme.palette.secondary.main}`,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  color={`${theme.palette.secondary.main}`}
                >
                  Output
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={testCase.target}
                  InputProps={{ readOnly: true }}
                  sx={{
                    backgroundColor: `${theme.palette.action.hover}`,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      borderColor: `${theme.palette.secondary.main}`,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default TestCases;
