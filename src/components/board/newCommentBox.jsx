import React, { useState } from 'react';

import { Paper, InputBase, Divider, IconButton, Avatar } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

const NewComment = ({ handleComment }) => {
    const [comment, setComment] = useState('');

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <Avatar>U</Avatar>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Dodaj komentarz"
                multiline
                minRows={1}
                maxRows={8}
                inputProps={{ 'aria-label': 'add comment' }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <AddCommentIcon />
            </IconButton>
        </Paper>
    )
}

export default NewComment;