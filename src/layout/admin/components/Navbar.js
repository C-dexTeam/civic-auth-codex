import NavigationList from "@/layout/components/navigation";
import { Home, OpenInNew } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminNavbar = () => {
  const router = useRouter()

  return (
    <Box sx={{
      background: theme => theme.palette.background.paper,
      border: theme => `1px solid ${theme.palette.border.secondary}`,
    }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '1rem 0rem',
            width: 'calc(100%)',
          }}
        >
          <Box component="div" sx={{ borderRadius: '1.25rem 0rem 1.25rem 0rem', textAlign: 'center' }}>
            <Link href="/admin">
              <Box sx={{ height: "2.5rem" }}>
                <img src="/images/logo/logo-admin-dashboard.png" alt="Codex Logo" />
              </Box>
            </Link>

          </Box>

          <NavigationList admin />

          <Box sx={{ display: "flex", gap: "1rem" }}>
            {/* <Button color="info" variant="outlined">En</Button> */}
            <Button
              color="primary"
              variant="outlined"
              onClick={() => window.open('/', '_blank')}
              startIcon={<Home />}
              endIcon={<OpenInNew />}
            >
              Homepage
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminNavbar;
