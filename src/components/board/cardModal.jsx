import React, { useState } from 'react';

import { TextField, Button, Box, Typography, Modal, Stack, IconButton } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import NewComment from './newCommentBox'
import Comment from './comment'

const style = {
    backgroundColor: '#202020',
    border: '2px solid #202020',
    borderRadius: 1,
    boxShadow: 24,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minWidth: '500px',
    p: 4,
    maxHeight: '80%',
    overflowY: 'auto',
};

const CardModal = ({open, handleEdit, handleClose, handleComment, initTitle, initDescription}) => {
    const [title, setTitle] = useState(initTitle);
    const [description, setDescription] = useState(initDescription);

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edytuj kartę
                    </Typography>
                    <Box component="form">
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Tytuł"
                            name="name"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Opis"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{marginTop: 3}}>
                            <Stack direction="row" spacing={2}>
                                <IconButton aria-label="add attachment" sx={{width: '24px', height: '24px'}} component="span" ><AddLinkIcon /></IconButton>
                            </Stack>
                            <Button 
                                onClick={() => {
                                    handleEdit(title, description)
                                    setTitle('')
                                    setDescription('')
                                }}
                                variant="contained"
                                sx={{ marginTop: 3, marginBottom: 2 }}
                            >
                                Zapisz
                            </Button>
                        </Stack>
                        <Stack direction="column" spacing={2} sx={{marginTop: 3}}>
                            <Typography component="h5" variant="h5">Komentarze</Typography>
                            <NewComment />
                            <Comment userAvatar="S">Hello! </Comment>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CardModal;