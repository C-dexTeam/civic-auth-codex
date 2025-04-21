import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  LinearProgress,
  Grid,
  Container,
} from "@mui/material";
import { theme } from "@/configs/theme";

const xpProgress = 50;

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 0,
                }}
                src="/images/profil.png"
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  sx={{
                    "&:after": {
                      border: "none",
                    },
                    "&:before": {
                      border: "none",
                    },
                    background: "#1D1D1E",
                    color: theme.palette.secondary.light,
                    border: "1px solid transparent",
                    borderImageSource:
                      "linear-gradient(to bottom, #39D98A, #1B3B6F)",
                    borderImageSlice: 1,
                    transition: "all 0.3s ease-in-out",
                    height: 40,
                    width: 120,
                  }}
                >
                  Edit Profile
                </Button>

                <Typography
                  variant="h5"
                  sx={{ color: "#fff", mt: 1, textAlign: "right" }}
                >
                  0xRbcFu4k...YOm4n
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{
                  height: 16,
                  borderRadius: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    backgroundImage: "linear-gradient(to right, #35373F, #39D98A)",
                    borderRadius: 1,
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.secondary.main,
                  mt: 0.5,
                  display: "block",
                  textAlign: "right",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                {xpProgress} / 100 XP
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            {[1, 2, 3, 4].map((index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: 30,
                  gap: 1,
                  padding: 2,
                  border: `1px solid ${theme.palette.secondary.dark}`,
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: 0,
                    }}
                    src="/images/profil.png"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "space-between",
                    gap: 0.5,
                    marginLeft: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "14px",
                    }}
                  >
                    Quest Name
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    0
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* profılde goruntulenen nftler */}

        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: '100%', md: 900 },
                height: 900,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
                background: "radial-gradient(ellipse at center, rgba(196, 196, 196, 0.09) 10%, rgba(170, 167, 167, 0.12) 80%)",
                borderRadius: "100%",
                boxShadow: "0 0 50px rgba(231, 172, 137, 0.56)",
                overflow: "hidden",
                mx: 'auto',
              }}
            >
              {/* Planetary Rings */}
              
              {[1, 2, 3].map((ring) => (
                <Box
                  key={`ring-${ring}`}
                  sx={{
                    position: 'absolute',
                    width: ring * 280,
                    height: ring * 280,
                    borderRadius: '50%',
                    border: '2px solid rgba(242, 159, 82, 0.2)',
                    animation: 'rotate 60s linear infinite',
                    '@keyframes rotate': {
                      '0%': {
                        transform: 'rotate(0deg)',
                      },
                      '100%': {
                        transform: 'rotate(360deg)',
                      },
                    },
                  }}
                />
              ))}

              {/* NFT Görselleri */}

              {[...Array(10)].map((_, index) => {
                const ring = Math.floor(index / 4) + 1; // Distribute NFTs across 3 rings
                const angleStep = (2 * Math.PI) / 4; // 4 NFTs per ring
                const angle = (index % 4) * angleStep;
                const radius = ring * 140; // Ring radius
                
                return (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      top: '50%',
                      left: '50%',
                      width: 90,
                      height: 90,
                      transform: `
                        translate(-50%, -50%) 
                        rotate(${angle}rad) 
                        translateX(${radius}px)
                      `,
                      animation: `float ${3 + ring}s infinite ease-in-out`,
                      '@keyframes float': {
                        '0%, 100%': {
                          transform: `
                            translate(-50%, -50%) 
                            rotate(${angle}rad) 
                            translateX(${radius}px) 
                            translateY(-5px)
                          `,
                        },
                        '50%': {
                          transform: `
                            translate(-50%, -50%) 
                            rotate(${angle}rad) 
                            translateX(${radius}px) 
                            translateY(5px)
                          `,
                        },
                      },
                    }}
                  >
                    <img
                      src={"/images/nft.png"}
                      alt={`NFT ${index + 1}`}
                      width="50"
                      height="50"
                      style={{
                        borderRadius: "8px",
                        border: "2px solid rgba(242, 159, 82, 0.3)",
                        background: "rgba(56, 55, 55, 0.5)",
                        padding: 5,
                        boxShadow: "0 0 15px rgba(242, 159, 82, 0.2)",
                        transition: "all 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                );
              })}

              {/* Gezegen Merkezi */}
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #444 10%, #222 80%)",
                  boxShadow: "0 0 30px rgba(242, 159, 82, 0.97)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "120%",
                    height: "120%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(242, 159, 82, 0.2) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }
                }}
              >
                <img 
                  src="/images/space/planet-10.svg" 
                  alt="Planet" 
                  width="150" 
                  height="150"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(242, 159, 82, 0.5))"
                  }}
                />
              </Box>

              {/* Astronot */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <img src="/images/astronaut.png" alt="Astronaut" width="80" height="80" />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;