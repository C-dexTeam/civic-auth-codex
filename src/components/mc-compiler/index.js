import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography } from '@mui/material';
import { theme } from '@/configs/theme';

const MdCompiler = ({ markdown }) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        maxWidth: '100%',
        wordBreak: 'break-word',
        borderRadius: '10px',
      }}
    >
      <ReactMarkdown
        components={{
          code({ inline, children, ...props }) {
            return inline ? (
              <Box
                component="code"
                sx={{
                  backgroundColor: '#2d2d2d',
                  padding: '3px 6px',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '0.95em',
                  color: `${theme.palette.secondary.main}`,
                }}
                {...props}
              >
                {children}
              </Box>
            ) : (
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#2d2d2d',
                  padding: '12px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.95em',
                  overflowX: 'auto',
                  color: `${theme.palette.secondary.main}`,
                  marginTop: '10px',
                }}
                {...props}
              >
                <code>{children}</code>
              </Box>
            );
          },
          strong({ children, ...props }) {
            return (
              <Box
                component="subtitle2"
                sx={{
                  color: ` ${theme.palette.success.main}`,
                  fontWeight: 'bold',
                }}
                {...props}
              >
                {children}
              </Box>
            );
          },
          p({ children, ...props }) {
            return (
              <Box
                sx={{
                  marginBottom: '8px',
                }}
                {...props}
              >
                {children}
              </Box>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};

export default MdCompiler;
