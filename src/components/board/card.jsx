import React from 'react';

import { Typography, CardContent } from '@mui/material';
import MuiCard from '@mui/material/Card';

const Card = ({cardName, cardDescription, onNameChange, onDescriptionChange}) => (
<MuiCard>
    <CardContent>
        <Typography variant="h6" component="div">{cardName}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{cardDescription}</Typography>
    </CardContent>
</MuiCard>

)

export default Card;