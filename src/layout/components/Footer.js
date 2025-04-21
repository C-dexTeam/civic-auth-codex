import { Facebook, LinkedIn, X } from "@mui/icons-material";
import { Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";


const Footer = () => {
  return (
    <>
      <Box sx={{ background: theme => theme.palette.background.default }}>
        <Box sx={{ width: "100%", borderTop: theme => "0.5px solid " + theme.palette.border.secondary }}></Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "50%" }}>
            <Divider color="info" />
          </Box>
        </Box>

        <Container sx={{ position: "relative", pt: 2, pb: 4 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", gap: "1rem", width: '100%' }}>
                <Typography variant="body1">© 2024 Codex Team</Typography>
                <Typography variant="body1">Privacy Policy</Typography>
                <Typography variant="body1">Terms of Use</Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption1" sx={{ textAlign: "justify" }}>
                  Codex is very important project for solana. The codex team was here property of their respective owners. property of their respective owners. Unless otherwise noted, use of third party logos does not imply endorsement of, sponsorship of, or affiliation with Cobalt.
                  <br />
                  <br />
                  Cobalt is a financial technology company, not a bank. Banking services are provided by Celtic Bank and Evolve Bank & Trust®, Members FDIC.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <img
                  src="/images/footer/dokunus.png"
                  style={{
                    position: "absolute",
                    top: 0,
                  }}
                />

                <IconButton>
                  <X />
                </IconButton>

                <IconButton>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* <Box sx={{ width: '100%', height: 'calc(100%)', display: "flex", justifyContent: "end", alignItems: "center", position: "absolute", right: 0, bottom: 0 }}>
            <img src="/images/footer/dokunus.png" />
          </Box> */}
        </Container>

      </Box>
    </>
  );
};

export default Footer;
