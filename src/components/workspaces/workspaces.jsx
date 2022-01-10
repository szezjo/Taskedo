import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Card, CardContent, Grid, List, Menu, MenuItem, CssBaseline, Typography, Toolbar, IconButton, Divider, Avatar, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import EditModal from './editModal'

const axios = require('axios');

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
zIndex: theme.zIndex.drawer + 1,
transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
    }),
}),
);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

const generateAvatar = (text) => {
    const split = text.split(" ");
    if(split.length===0) return '';
    if(split.length===1) return split[0].slice(0,1).toUpperCase();
    const firstWord = split[0].slice(0,1).toUpperCase();
    const secondWord = split[1].slice(0,1).toUpperCase();
    return `${firstWord}${secondWord}`;
}

const Workspaces = ({logout, loggedIn, workspaces, setWorkspaces, fetchData, changeBoard, setWorkspaceId, userEmail, username}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const [activeWorkspace, setActiveWorkspace] = useState(0);
    const menuOpen = Boolean(anchorEl);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [newBoardOpen, setNewBoardOpen] = React.useState(false);
    const handleNewBoardOpen = () => setNewBoardOpen(true);
    const handleNewBoardClose = () => setNewBoardOpen(false);

    const navigate = useNavigate();
    const routeChange = () => {
        const path = '';
        navigate(path);
    }

    useEffect(() => {
        const fetchData = async () => {
            axios.post("https://taskedo-alternative.herokuapp.com/user/get_workspaces", ({
                email: userEmail
            }))
            .then(res => {
                setWorkspaces(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }

        fetchData()
    }, [userEmail, setWorkspaces])

    const createWorkspace = async (name) => {
        axios.post("https://taskedo-alternative.herokuapp.com/user/create_workspace", ({
            "name": name,
            "email": userEmail
        }))
        .then(res => {
            fetchData()
            handleModalClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const createBoard = async (name) => {
        axios.post("https://taskedo-alternative.herokuapp.com/workspace/create_board", ({
            "name": name,
            "workspace_id": workspaces[activeWorkspace].id
        }))
        .then(res => {
            fetchData()
            handleNewBoardClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const goToBoard = (board) => {
        changeBoard(board)
        const path = '/board';
        navigate(path);
    }

    useEffect(() => {
        workspaces.length && setWorkspaceId(workspaces[activeWorkspace].id)
    }, [activeWorkspace, setWorkspaceId, workspaces])

    return !loggedIn ? <Navigate replace to='/' /> : (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={drawerOpen}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => setDrawerOpen(true)}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(drawerOpen && {display: 'none'}),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Tablice
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={drawerOpen}>
                    <DrawerHeader>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <List>
                        <ListItem 
                            button 
                            id="add-workspace-button"  
                            onClick={handleModalOpen}
                            key="AddWorkspace"
                        >
                            <ListItemIcon>
                                <Avatar>+</Avatar>
                            </ListItemIcon>
                            <ListItemText primary="Dodaj obszar" />
                        </ListItem>
                            {workspaces.map((workspace, index) => (
                                <ListItem button key={workspace.id} onClick={() => setActiveWorkspace(index)}>
                                    <ListItemIcon>
                                        <Avatar>{generateAvatar(workspace.name)}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={workspace.name} />
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            <ListItem 
                                button 
                                id="user-button" 
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                aria-expanded={menuOpen ? 'true' : undefined} 
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                key="UserAvatar"
                            >
                                <ListItemIcon>
                                    <Avatar sx={{ bgcolor: orange[500] }}>{generateAvatar(username)}</Avatar>
                                </ListItemIcon>
                                <ListItemText primary={username} />
                            </ListItem>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={menuOpen}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{'aria-labelledby': 'user-button'}}
                            >
                                <MenuItem onClick={() => {logout(); routeChange();}}>Wyloguj</MenuItem>
                            </Menu>
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Container maxWidth="md">
                        <Grid container spacing={4}>
                            {workspaces.length>0 && workspaces[activeWorkspace].boards.slice(0).reverse().map((board, index) => (
                                <Grid key={board.id} item xs={4}>
                                    <Card onClick={() => goToBoard(board)}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Tablica</Typography>
                                            <Typography variant="h5" component="div">{board.name}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            {workspaces.length && <Grid key="addBoard" item xs={4}>
                                <Card onClick={handleNewBoardOpen}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">Dodaj tablicę</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>}
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <EditModal open={modalOpen} handleEdit={createWorkspace} handleClose={handleModalClose} />
            <EditModal open={newBoardOpen} handleEdit={createBoard} handleClose={handleNewBoardClose} isBoardCreate />
        </ThemeProvider>
    )
}

export default Workspaces;