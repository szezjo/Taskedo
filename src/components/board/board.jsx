import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Box, Container, IconButton, Stack, CssBaseline, Typography, Toolbar } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import List from './list'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const Board = ({board, workspaceId}) => {
    const navigate = useNavigate()
    const returnToWorkspaces = () => {
        const path = '/workspaces'
        navigate(path)
    }

    return !board ? <Navigate replace to='/workspaces' /> : (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton onClick={returnToWorkspaces}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography>{board.name}</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Container maxWidth="false">
                    <Stack direction="row" spacing={5} sx={{overflowX: 'auto'}}>
                        {board.lists && board.lists.map((list, index) => (
                           <List list={list} workspaceId={workspaceId} boardId={board.id} />
                        ))}
                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default Board;
