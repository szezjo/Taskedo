import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Box, Container, Card, CardContent, Grid, Paper, Stack, CssBaseline, Typography, ListItem, ListITemIcon, ListItemText, Toolbar } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon } from '@mui/icons-material';
import List from './list'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const Board = ({boardName}) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography>{boardName}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Container maxWidth="false">
                    <Stack direction="row" spacing={5} sx={{overflowX: 'auto'}}>
                        {['Lista 1', 'Lista 2', 'Lista 3', 'Lista 4', 'Lista 5', 'Lista 1', 'Lista 2', 'Lista 3', 'Lista 4', 'Lista 5'].map((text, index) => (
                           <List listName={text} />
                        ))}
                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Board;
