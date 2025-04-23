import { Box, Button, Container } from "@mui/material"
import NavigationList from "./navigation"
import { useRouter } from "next/router"

const Navbar = () => {
  const router = useRouter()

  const handleConnectClick = () => {
    router.push("/register")
  }

  return (
    <Box
      sx={{
        background: theme => theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '0.5rem 0rem',
            width: '100%',
            height: '80px',
          }}
        >
          <Box component="div" sx={{ borderRadius: '1.25rem 0rem 1.25rem 0rem', textAlign: 'center' }}>
            <Box sx={{ height: "2.5rem" }}>
              <img src="/images/logo/logo-horizontal.png" alt="Codex Logo" />
            </Box>
          </Box>

          <Box
            sx={{
              background: theme => theme.palette.background.paper,
              borderRadius: "2rem",
              border: theme => `1px solid ${theme.palette.border.secondary}`,
              p: '0.5rem 1rem',
            }}
          >
            <NavigationList />
          </Box>

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button
              onClick={handleConnectClick}
              color="primary"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'success.main', // yazı rengi hover'da yeşil
                }
              }}
            >
              Connect Wallet
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
