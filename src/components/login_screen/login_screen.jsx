import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { Alert, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';

const axios = require('axios');

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const LoginScreen = ({configureToken, loggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerOption, setRegisterOption] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [incorrectRegister, setIncorrectRegister] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const navigate = useNavigate();
    const routeChange = () => {
        const path = 'workspaces';
        navigate(path);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        axios.post("https://shrouded-lake-50073.herokuapp.com/user/login", ({
                email: email,
                password: password
            })
        )
        .then(res => {
            configureToken(res.data.token);
            routeChange();
        })
        .catch(err => {
            console.log(err)
            setRegisterSuccess(false)
            setIncorrectPassword(true);
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        axios.post("https://shrouded-lake-50073.herokuapp.com/user/register", ({
            email: email,
            name: username,
            password: password
        }))
        .then(res => {
            setRegisterSuccess(true)
            setEmail('')
            setPassword('')
            setUsername('')
            setRegisterOption(false)
        })
        .catch(err => {
            console.log(err)
            setRegisterSuccess(false)
            setIncorrectRegister(true)
        });
    }

    const removeAlerts = () => {setIncorrectPassword(false); setIncorrectRegister(false);}

    return loggedIn ? <Navigate replace to="/workspaces" /> :
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="sm">
                <CssBaseline />
                <Box sx={{marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="logo.png" style={{maxWidth: '150px', marginBottom: 24}} alt="Taskedo Logo" />
                    <Typography component="h1" variant="h4" sx={{ marginBottom: 4 }}>{registerOption ? 'Rejestracja' : 'Logowanie'}</Typography>
                    {incorrectPassword && <Alert severity="error">Niepoprawne dane logowania!</Alert>}
                    {incorrectRegister && <Alert severity="error">Błąd rejestracji. Użytkownik już istnieje.</Alert>}
                    {registerSuccess && <Alert severity="success">Zarejestrowano!</Alert>}
                    <Box component="form" onSubmit={registerOption ? handleSignup : handleLogin}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adres e-mail"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={removeAlerts}
                        />
                        {registerOption && <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nazwa użytkownika"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={removeAlerts}
                        />}
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Hasło"
                            name="password"
                            autoComplete="current-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={removeAlerts}
                        />
                        <Grid container justifyContent="center">
                            <Button type="submit" variant="contained" sx={{ marginTop: 3, marginBottom: 2 }}>{registerOption ? 'Załóż konto' : 'Zaloguj się'}</Button>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Typography component="p" variant="p" onClick={() => setRegisterOption(!registerOption)}>{registerOption ? 'Posiadasz już konto?' : 'Nie posiadasz konta? Załóż nowe!'}</Typography>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
};

export default LoginScreen;
