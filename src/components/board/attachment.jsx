import React from 'react';

import { Chip } from '@mui/material';

const Attachment = ({children}) => {
    return (
        <Chip onClick={() => window.open(`https://taskedo-alternative.herokuapp.com${children.url}`)} label={children.filename} sx={{margin: 0.4}} />
    )
}

export default Attachment;