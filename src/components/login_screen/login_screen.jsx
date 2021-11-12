import React from 'react';

import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const LoginScreen = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const userInput = new FormData(e.currentTarget);
        console.log(`${userInput.get('username')} ${userInput.get('password')}`);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="sm">
                <CssBaseline />
                <Box sx={{marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src="logo.png" style={{maxWidth: '150px', marginBottom: 24}} alt="Taskedo Logo" />
                    <Typography component="h1" variant="h4" sx={{ marginBottom: 4 }}>Logowanie</Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nazwa użytkownika"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Hasło"
                            name="password"
                            autoComplete="current-password"
                            type="password"
                        />
                        <Grid container justifyContent="center">
                            <Button type="submit" variant="contained" sx={{ marginTop: 3, marginBottom: 2 }}>Zaloguj się</Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
};

export default LoginScreen;
