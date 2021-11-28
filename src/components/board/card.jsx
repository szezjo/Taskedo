import React, { useState } from 'react';

import { Typography, CardContent } from '@mui/material';
import MuiCard from '@mui/material/Card';
import EditModal from './editModal'

const Card = ({cardName, cardDescription, onNameChange, onDescriptionChange}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return <>
        <MuiCard onClick={handleOpen} sx={{marginBottom: 1.5}}>
            <CardContent>
                <Typography variant="h6" component="div">{cardName}</Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{cardDescription}</Typography>
            </CardContent>
        </MuiCard>
        <EditModal open={open} handleClose={handleClose} isNew={false} isCard={true} />
        </>
};

export default Card;