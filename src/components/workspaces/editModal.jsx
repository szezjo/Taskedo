import React, { useState } from 'react';

import { TextField, Button, Box, Typography, Modal } from '@mui/material';

const style = {
    backgroundColor: '#202020',
    border: '2px solid #202020',
    borderRadius: 1,
    boxShadow: 24,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};

const EditModal = ({open, handleEdit, handleClose}) => {
    const [title, setTitle] = useState('');

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nowy obszar roboczy
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
                        <Button 
                            onClick={() => handleEdit(title)}
                            variant="contained"
                            sx={{ marginTop: 3, marginBottom: 2 }}
                        >
                            Zapisz
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default EditModal;