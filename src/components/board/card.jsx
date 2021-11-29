import React from 'react';

import { Typography, CardContent } from '@mui/material';
import MuiCard from '@mui/material/Card';
import EditModal from './editModal'

const Card = ({card, onCardChange}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return <>
        <MuiCard onClick={handleOpen} sx={{marginBottom: 1.5}}>
            <CardContent>
                <Typography variant="h6" component="div">{card.title}</Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{card.contents}</Typography>
            </CardContent>
        </MuiCard>
        <EditModal open={open} handleClose={handleClose} isNew={false} isCard={true} />
        </>
};

export default Card;