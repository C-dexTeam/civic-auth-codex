
import Navbar from "@/layout/components/Navbar";
import Footer from "@/layout/components/Footer";
import ScrollTop from "@/layout/components/ScrollTop";
// import NextNProgress from "nextjs-progressbar";
import { useState, useEffect, Fragment } from "react";
import { Box, Container } from "@mui/material";
// import CustomBreadcrumbs from "@/components/breadcrumbs";
import { useRouter } from "next/router";
import navigation from "@/navigation";
import findParent from "@/utils/findParent";
import AdminNavbar from "./components/Navbar";

const AdminLayout = ({ children }) => {

    const router = useRouter();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <>{children}</>

    return (
        <Fragment>
            {/* <NextNProgress
                color="#e11d48"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
                options={{ easing: "ease-in-out", speed: 500 }}
            /> */}
            <AdminNavbar />

            <Box sx={{
                width: '100%', display: 'flex',
                // mt: "96px",
                py: '40px',
                minHeight: `calc(100vh - 80px)`,
                gap: '40px',
            }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            // minHeight: `calc(100vh - ${(navbarHeight || 0) + (footerHeight || 0)}px)`
                            position: 'relative',
                            minHeight: `calc(100%)`,
                            maxWidth: '100%',
                            width: '100%',
                            // ml: '200px'
                        }}
                    >
                        {/* <CustomBreadcrumbs titles={titles} /> */}

                        <Box sx={{}}>
                            {children}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* <Footer /> */}
            {/* Other components */}
            <ScrollTop />
        </Fragment>
    );
};

export default AdminLayout;
