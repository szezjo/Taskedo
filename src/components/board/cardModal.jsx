import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import { TextField, Button, Box, Typography, Modal, Stack, IconButton, Tooltip } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import InfoIcon from '@mui/icons-material/Info';
import NewComment from './newCommentBox'
import Comment from './comment'
import Attachment from './attachment';

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

const Input = styled('input')({
    display: 'none',
});

const parseTime = (date) => {
    return moment(date).format("DD-MM-YYYY, HH:mm");
}

const CardModal = ({open, handleEdit, handleClose, handleComment, handleAttachment, initTitle, initDescription, comments, attachments, creationDate, modifyDate, username, removeAttachment}) => {
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
                                <label htmlFor="upload-file-button">
                                    <Input id="upload-file-button" type="file" onChange={handleAttachment} />
                                    <IconButton aria-label="add attachment" sx={{width: '24px', height: '24px'}} component="span" ><AddLinkIcon /></IconButton>
                                </label>
                                <Tooltip sx={{whiteSpace: 'pre-line'}} title={`utworzono: ${parseTime(creationDate)}, zmodyfikowano: ${parseTime(modifyDate)}`}><InfoIcon /></Tooltip>
                            </Stack>
                            <Button 
                                onClick={() => {
                                    handleEdit(title, description)
                                }}
                                variant="contained"
                                sx={{ marginTop: 3, marginBottom: 2 }}
                            >
                                Zapisz
                            </Button>
                        </Stack>
                        <Box sx={{marginTop: 3}}>
                            {attachments && attachments.map((attachment, index) => (
                                <Attachment key={`${index}`} id={attachment.id} index={index} removeAttachment={removeAttachment}>{attachment}</Attachment>
                            ))}
                        </Box>
                        <Stack direction="column" spacing={2} sx={{marginTop: 3}}>
                            <Typography component="h5" variant="h5">Komentarze</Typography>
                            <NewComment handleComment={handleComment} username={username}/>
                            {comments && comments.slice(0).reverse().map((comment, index) => (
                                <Comment key={`${index}`} username={comment.author} creationDate={parseTime(comment.creation_date)}>{comment.content}</Comment>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CardModal;