import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function SignUp() {
    const [getData, setData] = useState({
        name: '',
        email: '',
        password: '',
        appType: 'music'
    });

    const [getError, setError] = useState(null);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value });
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!getData.name) {
            setError('Username is mandatory');
            return;
        } else if (!getData.email) {
            setError('Email is mandatory');
            return;
        } else if (!getData.password) {
            setError('Password cannot be empty');
            return;
        }

        axios.post('https://academics.newtonschool.co/api/v1/user/signup', getData, {
            headers: {
                projectID: 'cp0doe0u3fx9'
            }
        }).then((result) => {
            localStorage.setItem('name', result.data.data.user.name);
            localStorage.setItem('token', result.data.token);
            navigate('/');
        }).catch((error) => {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Unknown error");
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LockOutlinedIcon />
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    {getError && <Alert severity="error">{getError}</Alert>}
                    <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={getData.name}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={getData.email}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={getData.password}
                            onChange={onChangeHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
