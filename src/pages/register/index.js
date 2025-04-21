import { useUser } from "@civic/auth/react"
import { Button, Container, Typography, Card, CardContent } from "@mui/material"
import BlankLayout from "@/layout/BlankLayout"

const Register = () => {
  const { user, signIn, signOut, authStatus } = useUser()

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Register with Civic
          </Typography>

          {authStatus === "authenticating" && <Typography>Loading...</Typography>}

          {!user ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => signIn()}
              sx={{ marginTop: 2 }}
            >
              Sign up with Civic
            </Button>
          ) : (
            <>
              <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                Welcome, {user.name || "User"} 👋
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => signOut()}
                sx={{ marginTop: 2 }}
              >
                Logout
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

Register.guestGuard = true
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default Register
