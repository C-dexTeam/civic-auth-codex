import React, { useState, useRef, useEffect } from "react";
import { Typography, Button, Box, Divider } from "@mui/material";
import Editor from "@monaco-editor/react";
import { theme } from "@/configs/theme";
import axios from "axios";

const CodeEditorComponent = ({
  fileName = "deneme.js",
  language,
  val,
  onChange,
  onRun,
  onStop,
  chapterID,
  courseID,
  editorRef,
}) => {
  const [value, setValue] = useState(val);
  const [editorLanguage, setEditorLanguage] = useState(language);
  const [isCorrect, setIsCorrect] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false); 

  useEffect(() => {
    setValue(val);
    setEditorLanguage(language);
  }, [val, language]);

  const handleRun = async () => {
    setIsSubmitted(true);
    try {
      const response = await axios({
        method: "POST",
        url: `/api/v1/private/chapters/run`,
        data: { 
          chapterID: chapterID,
          courseID: courseID,
          userCode: value },
        headers: { "Content-Type": "application/json" },
      });

      setIsCorrect(true); 
      onRun(response.data);
    } catch (error) {
      setIsCorrect(false); 
      onRun(error.response?.data?.message || error.message);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box
      sx={{
        border: `2px solid ${theme.palette.secondary.light}`,
        borderRadius: "16px",
        padding: "16px",
        height: "80vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", gap: "6px" }}>
          {["red", "yellow", "green"].map((color, index) => (
            <Box
              key={index}
              sx={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
          ))}
        </Box>

        <Typography variant="h6" sx={{ color: `${theme.palette.primary.main}` }}>
          {fileName}
        </Typography>
      </Box>
      <Divider sx={{ marginTop: "16px" }} />

      <Box sx={{ marginTop: "16px", flexGrow: 1, borderRadius: "16px", overflow: "hidden" }}>
        <Editor
          height="100%"
          language={editorLanguage}
          value={value}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 10 },
            formatOnType: true,
            formatOnPaste: true,
            formatOnSave: true,
          }}
          onMount={(editor) => {
            // editorRef.current = editor;
            editor.focus();
          }}
        />
      </Box>
      <Divider sx={{ marginTop: "16px" }} />

      {isSubmitted && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "16px",
            padding: "16px",
            borderRadius: "8px",
            border: `2px solid ${
              isCorrect ? theme.palette.success.main : theme.palette.error.main
            }`,
            backgroundColor: isCorrect
              ? "rgba(0, 255, 0, 0.1)"
              : "rgba(255, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: isCorrect
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {isCorrect
              ? "Congratulations, your solution is correct! You can proceed to other transactions!"
              : "Error: There is an issue with your code. Please try again."}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <Button variant="empty" color="primary" onClick={handleRun}>
          Run
        </Button>
        <Button variant="empty" color="secondary" onClick={onStop}>
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export default CodeEditorComponent;
