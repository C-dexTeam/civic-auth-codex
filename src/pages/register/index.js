import { useState } from 'react'
import { TextField, Button, Container, Typography, Card, CardContent } from '@mui/material'
import BlankLayout from "@/layout/BlankLayout"
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // ** Hooks
    const auth = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        auth.register(values)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <CardContent>
                    <Typography variant="h5">Register</Typography>

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            required
                        />
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
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            required
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={values.confirmPassword}
                            onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                            required
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                            Register
                        </Button>
                    </form>

                    <Link href={"/login"}>
                        <Button color='secondary'>Login</Button>
                    </Link>
                </CardContent>
            </Card>
        </Container>
    )
}

Register.guestGuard = true
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default Register