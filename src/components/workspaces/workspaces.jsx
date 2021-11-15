import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Card, CardContent, Grid, List, Menu, MenuItem, CssBaseline, Typography, Toolbar, IconButton, Divider, Avatar, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon } from '@mui/icons-material';
import { orange } from '@mui/material/colors';

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

const Workspaces = ({logout, loggedIn}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const navigate = useNavigate();
    const routeChange = () => {
        const path = '';
        navigate(path);
    }

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
                            {['Obszar roboczy', 'Studia', 'Praca', 'Taskedo Workspace'].map((text, _) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        <Avatar>{generateAvatar(text)}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
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
                                    <Avatar sx={{ bgcolor: orange[500] }}>U</Avatar>
                                </ListItemIcon>
                                <ListItemText primary="user" />
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
                            {['Tablica 1', 'Tablica 2', 'Tablica 3', 'Tablica 4', 'Tablica 5'].map((text, index) => (
                                <Grid key={text} item xs={4}>
                                    <Card>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Tablica</Typography>
                                            <Typography variant="h5" component="div">{text}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Workspaces;