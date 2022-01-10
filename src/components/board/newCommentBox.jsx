import React, { useState } from 'react';

import { Paper, InputBase, Divider, IconButton, Avatar } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

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

const NewComment = ({ handleComment, username }) => {
    const [comment, setComment] = useState('');

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
            <Avatar>{generateAvatar(username)}</Avatar>
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
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => {
                handleComment(comment);
                setComment('');
            }}>
                <AddCommentIcon />
            </IconButton>
        </Paper>
    )
}

export default NewComment;