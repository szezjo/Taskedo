import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { Alert, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Input} from '@mui/material';
const axios = require('axios');

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

// const SERVER_URL = 'https://shrouded-lake-50073.herokuapp.com';
const SERVER_URL = 'http://localhost:5000';

const LoginScreen = ({configureToken, loggedIn, configureEmail}) => {
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
        axios.post(`${SERVER_URL}/user/login`, ({
                email: email,
                password: password
            })
        )
        .then(res => {
            configureEmail(email);
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
        axios.post(`${SERVER_URL}/user/register`, ({
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

    const config = {
        headers: {
            "Contetnt-Type":"multipart/form-data" 
        }
    };
    const uploadAndSend = (e) => {
        let file;
        if(e && e.target && e.target.files[0])
        {
            file = e.target.files[0];
        }
        const formData = new FormData();
        formData.append('workspace_id', "b6d258c00e62491abe6c0fd8f50ce180");
        formData.append('board_id', "3fc550d82a964b21a36e6ef8c65973b3");
        formData.append('list_id', "dad3d19123c246ee95b0dde113dddf49");
        formData.append('author', "Aitor piotrek");
        formData.append('comment', "test comment");
        formData.append('ticket_id', "ef210aee2a0b43f5ad87b2d2527aa909");
        formData.append('file', file)   
        e.preventDefault();
    
        axios.post(`${SERVER_URL}/workspace/add_comment_to_ticket`, formData, config)
        .then(res => {
            if (res.data.status === 'success') {
            console.log('File send successfully');
            }
            else{
            console.log('File send failed');
            }
        })
        .catch(err => {
            console.log(err)
        })
          
    }

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
                        <Input type="file" onChange={uploadAndSend}>zalacznik</Input> //! DODAJE ZALACZNIK TUTAJ DO ZMIANY
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
