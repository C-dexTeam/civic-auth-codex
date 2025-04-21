import { useState } from 'react'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import BlankLayout from "@/layout/BlankLayout"
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import WalletConnectionButton from '@/layout/auth/Wallet/WalletConnectionButton';

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState('')

    // ** Hooks
    const auth = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        auth.login(values)
            .catch(() => setError('Kullanıcı adı veya parola hatalı'))
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5">Giriş Yap</Typography>
                {error && (
                    <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={values.username}
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                        required
                    />
                    <TextField
                        label="Parola"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Giriş Yap
                    </Button>
                </form>

                <WalletConnectionButton text="Login Wallet" />

                <Link href={"/register"}>
                    Register
                </Link>
            </Box>
        </Container>
    )
};

Login.guestGuard = true
Login.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Login
