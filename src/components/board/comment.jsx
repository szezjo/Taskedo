import React from 'react';

import { Paper, Typography, Avatar } from '@mui/material';

const Comment = ({ userAvatar, children }) => {
    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <Avatar>{userAvatar}</Avatar>
            <Typography
                sx={{ ml: 1, flex: 1 }}
            >
                {children}
            </Typography>
        </Paper>
    )
}

export default Comment;