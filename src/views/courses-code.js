import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Box, Divider } from "@mui/material";
import Editor from "@monaco-editor/react";
import { theme } from "@/configs/theme";
import Description from "@/components/code-change/description/Description";
import Template from "@/components/code-change/template/Template";
import HintDialog from "@/components/code-change/hint/Hint";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getChaptersByID } from "@/store/chapters/chaptersSlice";
import CodeEditorComponent from "@/components/code-editor";

function Code() {
  const [code, setCode] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  
  const [isFailed, setIsFailed] = useState(false);
  const [output, setOutput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [hintOpen, setHintOpen] = useState(false);
  const hintText = "No hint available at the moment. Try again later 🌌";
  const router = useRouter();
  const dispatch = useDispatch();
  const { chapters: chaptersSlice } = useSelector((state) => state);

  useEffect(() => {
    if (router.isReady) {
      dispatch(getChaptersByID({ id: router.query.code }));
    }
  }, [router.isReady, router.query.code]);


  const testsExist = chaptersSlice?.data?.data?.tests?.length > 0;

  const markdownContent =
    chaptersSlice?.data?.data?.content ||
    "🚀 Oops! This section seems **empty**. Let's add some useful content for now:\n\n" +
      "## Welcome!  \n" +
      "In this chapter, you will learn the basics of Solidity. Ready to write your first smart contract? Let's get started! 🎉\n\n" +
      "```solidity\n" +
      "pragma solidity >=0.5.0 <0.6.0;\n\n" +
      "contract HelloWorld {\n" +
      '    string public message = "Hello, Blockchain!";\n' +
      "}\n" +
      "```";


      const handleRun = (outputData) => {
        setOutput(outputData?.data);
        setIsSubmitted(true);
      };

    

  return (
    <Box maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
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
                justifyContent: "start",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Button
                startIcon={<span>📌</span>}
                variant={"outlined"}
                onClick={() => setActiveTab("description")}
                sx={{
                  color:
                    activeTab === "description"
                      ? theme.palette.success.main
                      : theme.palette.secondary.light,
                  fontSize: "13px",
                  outline: "none",
                  border: "1px solid",
                  padding: "0em 1.5em",
                }}
              >
                Description
              </Button>

              {testsExist && (
                <Button
                  startIcon={<span>🚀</span>}
                  variant={"outlined"}
                  onClick={() => setActiveTab("expected")}
                  sx={{
                    color:
                      activeTab === "expected"
                        ? theme.palette.success.main
                        : theme.palette.secondary.light,
                    fontSize: "13px",
                    outline: "none",
                    border: "1px solid",
                    padding: "0em 1.5em",
                  }}
                >
                  Examples
                </Button>
              )}

              <Button
                startIcon={<span>💡</span>}
                variant={"outlined"}
                onClick={() => setHintOpen(true)}
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: "13px",
                  outline: "none",
                  border: "1px solid",
                  padding: "0em 1.5em",
                }}
              >
                Hint
              </Button>
            </Box>

            <Box sx={{ marginTop: "24px", flexGrow: 1 }}>
              {activeTab === "description" ? (
                <Description markdownContent={markdownContent} />
              ) : (
                <Template /> 
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
        <CodeEditorComponent
            fileName="HelloWorld.sol"
            language="solidity"
            val={chaptersSlice?.data?.data?.frontendTemplate || ""}
            onChange={setCode}
            onRun={handleRun}
            chapterID={router.query.code}
            courseID={router.query.course}
            apiData={{
              programmingId: router.query.code,
            }}
          />
          <HintDialog
            open={hintOpen}
            onClose={() => setHintOpen(false)}
            hint={hintText}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Code;
