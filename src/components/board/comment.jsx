import React from 'react';

import { Paper, Typography, Avatar, Tooltip } from '@mui/material';

const generateAvatar = (text) => {
    console.log(text)
    const split = text.split(" ");
    console.log(split)
    if(split.length===0) return '';
    if(split.length===1) return split[0].slice(0,1).toUpperCase();
    const firstWord = split[0].slice(0,1).toUpperCase();
    const secondWord = split[1].slice(0,1).toUpperCase();
    return `${firstWord}${secondWord}`;
}

const Comment = ({ username, children, creationDate }) => {
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <Tooltip title={`autor: ${username}, utworzono: ${creationDate}`}><Avatar>{generateAvatar(username)}</Avatar></Tooltip>
            <Typography
                sx={{ ml: 1, flex: 1 }}
            >
                {children}
            </Typography>
        </Paper>
    )
}

export default Comment;