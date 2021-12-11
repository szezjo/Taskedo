import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Box, Container, IconButton, Stack, CssBaseline, Typography, Toolbar } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import List from './list'
import AddIcon from '@mui/icons-material/Add';
import EditModal from './editModal'
const axios = require('axios');

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

    const [displayedBoard, setDisplayedBoard] = React.useState(board.lists);

    const createList = async (name) => {
        axios.post("https://shrouded-lake-50073.herokuapp.com/workspace/create_list", ({
            "name": name,
            "workspace_id": workspaceId,
            "board_id": board.id,
        }))
        .then(res => {
            setDisplayedBoard([...displayedBoard, {'name': name, 'list_id': res.data.id, 'tickets': [] }])
            handleClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        {displayedBoard && displayedBoard.map((list, index) => (
                           <List list={list} workspaceId={workspaceId} boardId={board.id} />
                        ))}
                        <IconButton onClick={handleOpen} sx={{width: '48px', height: '48px'}}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Container>
            </Box>
            <EditModal open={open} handleClose={handleClose} handleEdit={createList} isNew={true} isCard={false} />
        </ThemeProvider>
    );
}

export default Board;
