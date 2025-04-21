import GradientCard from "@/components/card/GradientCard";
import CustomChip from "@/components/chip";
import { theme } from "@/configs/theme";
import WalletConnectionButton from "@/layout/auth/Wallet/WalletConnectionButton"
import Can from "@/layout/components/acl/Can"
import { hexToRGBA } from "@/utils/hex-to-rgba";
import { Box, Button, Card, CardContent, Divider, Typography, useTheme, useMediaQuery } from "@mui/material"
import { useKeenSlider } from "keen-slider/react"
import { useState } from "react";

const PartnersBox = () => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                bordeRadius: "1rem",
            }}
        >
            <Box sx={{ height: "2rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <img src="/images/logo/logo.png" alt="Codex Logo" /> Codex
            </Box>
        </Box>
    )
}

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

    const [sliderRef, instanceRef] = useKeenSlider({
        mode: "free",
        slides: {
            perView: isMobile ? 2 : isTablet ? 4 : 6,
            spacing: 16,
        },
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <>
            {/* Welcome to Codex */}
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "relative",
                        height: isMobile ? "calc(100vh - 8rem)" : "calc(100vh - 16rem)",
                        background: theme => hexToRGBA(theme.palette.background.default, 1),
                        padding: isMobile ? "1rem" : "2rem 1rem",
                        backdropFilter: "blur(3px)",
                        borderRadius: "1rem",
                    }}
                >
                    <Button>
                        <Typography sx={{ letterSpacing: "0.5rem", pl: "0.5rem" }}>
                            SOLANA
                        </Typography>
                    </Button>

                    <Box sx={{ mt: "1.5rem" }}>
                        <Box
                            sx={{
                                height: isMobile ? "6rem" : "9rem",
                                width: "auto",
                            }}
                        >
                            <img
                                src="/images/logo/logo-build-with.png"
                                alt="Solana Logo"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        gap: "1rem",
                        mt: "1rem",
                        flexDirection: isMobile ? "column" : "row",
                        width: isMobile ? "100%" : "auto"
                    }}>
                        <Button variant="gradient" fullWidth={isMobile}>Course</Button>
                        <Button fullWidth={isMobile}>Docs</Button>
                        <Button fullWidth={isMobile}>Read Doc</Button>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            zIndex: "-1",
                            width: isMobile ? "80%" : "auto",
                            height: "100%",
                            opacity: isMobile ? 0.5 : 1
                        }}
                    >
                        <img
                            src="/images/ellipse-solana.png"
                            style={{
                                width: "100%",
                                height: "auto",
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{
                    width: "50%",
                    height: "5%",
                    position: "absolute",
                    bottom: "0",
                    left: "calc(25%)",
                    background: theme => hexToRGBA(theme.palette.success.main, 0.5),
                    filter: "blur(100px)",
                    zIndex: "-1",
                    boxShadow: theme => `0 5rem 5rem ${hexToRGBA(theme.palette.success.main, 0.75)}`,
                }}>
                </Box>
                <Divider sx={{ height: "1px" }} />
            </Box>

            {/* Slider  */}
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    p: "1rem 2rem",
                    my: "2rem",
                    background: theme => hexToRGBA(theme.palette.background.default, 0.4),
                    backdropFilter: "blur(3px)",
                }}
            >
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ==
                                parseInt(instanceRef.current.track.details.slides.length / 2)
                            }
                        />
                    </>
                )}

                <div ref={sliderRef} className="keen-slider" style={{ maxWidth: "calc(100% - 1.5rem)" }}>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                    <div className="keen-slider__slide"><PartnersBox /></div>
                </div>
            </Box>

            {/* Statistics */}
            <Card sx={{ background: theme => hexToRGBA(theme.palette.background.default, 0.8) }}>
                <CardContent>
                    <Box sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-evenly",
                        gap: isMobile ? "2rem" : "0"
                    }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                            <CustomChip label="Users" color="secondary" sx={{ width: "5rem" }} />
                            <Typography variant="h3">5.2M</Typography>
                        </Box>

                        {!isMobile && <Box><Divider orientation="vertical" sx={{ width: "1px", height: "100%", background: theme.palette.text.primary }} /></Box>}

                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                            <CustomChip label="Users" color="secondary" sx={{ width: "5rem" }} />
                            <Typography variant="h3">+330K</Typography>
                        </Box>

                        {!isMobile && <Box><Divider orientation="vertical" sx={{ width: "1px", height: "100%", background: theme.palette.text.primary }} /></Box>}

                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                            <CustomChip label="Users" color="secondary" sx={{ width: "5rem" }} />
                            <Typography variant="h3">+10.1K</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Why Codex */}
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "relative",
                        height: isMobile ? "auto" : "calc(100vh)",
                        minHeight: isMobile ? "calc(100vh - 4rem)" : "auto",
                        padding: isMobile ? "2rem 0" : "2rem 1rem",
                        backdropFilter: "blur(3px)",
                        borderRadius: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "2rem",
                    }}
                >
                    <Box>
                        <Button>
                            <Typography sx={{ letterSpacing: "0.5rem", pl: "0.5rem" }}>
                                WHY CODEX
                            </Typography>
                        </Button>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? "2rem" : "4rem"
                    }}>
                        <Box sx={{ width: isMobile ? "100%" : "50%" }}>
                            <Typography variant="h2" sx={{ fontSize: isMobile ? "1.75rem" : "2.125rem" }}>
                                Why you should use Codex to learn Solana?
                            </Typography>

                            <Typography variant="caption2" sx={{ mt: "1rem" }}>
                                clarity to your cash flow, simplifies your financial decision-making, and  clarity to your cash flow, simplifies your financial decision-making, and  clarity to your cash flow, simplifies your financial decision-making, and
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                animation: `smoothFloatAndSway3D 50s cubic-bezier(0.42, 0, 0.58, 1) infinite`,
                                position: isMobile ? "relative" : "absolute",
                                right: isMobile ? "auto" : "5rem",
                                zIndex: "-1",
                                width: isMobile ? "100%" : "auto",
                                height: isMobile ? "15rem" : "calc(20rem)",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <img
                                src="/images/space/rocket.png"
                                style={{
                                    maxWidth: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    width: "50%",
                    height: "5%",
                    position: "absolute",
                    top: "50%",
                    background: theme => hexToRGBA(theme.palette.warning.main, 0.5),
                    filter: "blur(100px)",
                    zIndex: "-1",
                    boxShadow: theme => `0 5rem 5rem ${hexToRGBA(theme.palette.warning.main, 0.75)}`,
                }}>
                </Box>
            </Box>

            {/* Interactive Coding Lessons */}
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "relative",
                        height: isMobile ? "auto" : "calc(100vh)",
                        minHeight: isMobile ? "calc(100vh - 4rem)" : "auto",
                        padding: isMobile ? "2rem 0" : "2rem 1rem",
                        backdropFilter: "blur(3px)",
                        borderRadius: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "2rem",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column-reverse" : "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: isMobile ? "2rem" : "4rem"
                    }}>
                        <Box
                            sx={{
                                position: isMobile ? "relative" : "absolute",
                                left: isMobile ? "auto" : "2.5rem",
                                zIndex: "-1",
                                width: isMobile ? "100%" : "auto",
                                height: isMobile ? "15rem" : "calc(20rem)",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <img
                                src="/images/code-ide.png"
                                style={{
                                    maxWidth: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>

                        <Box sx={{
                            width: isMobile ? "100%" : "50%",
                            marginLeft: isMobile ? "0" : "auto"
                        }}>
                            <Typography variant="h2" sx={{ fontSize: isMobile ? "1.75rem" : "2.125rem" }}>
                                Interactive Coding Lessons
                            </Typography>

                            <Typography variant="caption2" sx={{ mt: "1rem", textAlign: "justify" }}>
                                CryptoZombies is the largest education platform for blockchain development, it's been around for 4+ years, with over 400k registered users that have finished multiple courses.
                                <br />
                                <br />
                                CryptoZombies was the first tutorial on the internet for NFTs, and is still very relevant to the new crop of web3 developers looking to enter the industry today. Currently the CryptoZombies curriculum is mostly focused on Ethereum and Solidity development, but is a lot of demand for content targeting other chains such as Binance, TRON, and even projects like Chainlink.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    width: "50%",
                    height: "5%",
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    background: theme => hexToRGBA(theme.palette.error.main, 0.5),
                    filter: "blur(100px)",
                    zIndex: "-1",
                    boxShadow: theme => `0 5rem 5rem ${hexToRGBA(theme.palette.error.main, 0.75)}`,
                }}>
                </Box>
            </Box>

            {/* NFT cards */}
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "relative",
                        height: isMobile ? "auto" : "calc(100vh)",
                        minHeight: isMobile ? "calc(100vh - 4rem)" : "auto",
                        padding: isMobile ? "2rem 0" : "2rem 1rem",
                        backdropFilter: "blur(3px)",
                        borderRadius: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "2rem",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between",
                        gap: isMobile ? "2rem" : "4rem",
                        alignItems: "center"
                    }}>
                        <Box sx={{
                            zIndex: "-2",
                            width: isMobile ? "100%" : "40rem",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <img
                                src="/images/nft-cards.png"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                }}
                            />
                        </Box>

                        <Box sx={{ mt: isMobile ? "0" : "1.5rem", width: isMobile ? "100%" : "auto" }}>
                            <Typography variant="h2" sx={{ fontSize: isMobile ? "1.75rem" : "2.125rem" }}>
                                You can earn NFT by completing the trainings!
                            </Typography>

                            <Typography variant="caption2" sx={{ my: "1rem", textAlign: "justify" }}>
                                You can become the owner of these cool NFTs by completing the roadmaps and lab samples on the platform. So lets start 🚀
                            </Typography>

                            <Button sx={{ mt: "1rem" }} fullWidth={isMobile}>
                                Start Course
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    width: "50%",
                    height: "10rem",
                    position: "absolute",
                    top: "50%",
                    background: theme => hexToRGBA(theme.palette.info.main, 0.5),
                    filter: "blur(100px)",
                    zIndex: "-1",
                    boxShadow: theme => `0 0rem 10rem ${hexToRGBA(theme.palette.info.main, 0.75)}`,
                }}>
                </Box>
            </Box>

            {/* <div>
                <WalletConnectionButton />

                <Can I="read" a="wallet">
                    If you see this message. Your wallet has been connected
                </Can>
            </div> */}
        </>
    )
}

function Arrow(props) {
    const theme = useTheme()

    return (
        <svg
            onClick={props.onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                webkitTransform: "translateY(-50%)",
                fill: props.disabled ? theme.palette.secondary.dark : theme.palette.secondary.main,
                cursor: "pointer",
                ...(props.left ? { left: "5px" } : { left: "auto", right: "5px" }),
            }}
        >
            {
                props.left && (
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                )
            }
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </ svg>
    )
}


export default Home