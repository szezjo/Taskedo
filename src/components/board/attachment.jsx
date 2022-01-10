import React from 'react';

import { Chip } from '@mui/material';

const Attachment = ({children, id, index, removeAttachment}) => {
    return (
        <Chip onDelete={(e) => removeAttachment(e,id,index)} onClick={() => window.open(`https://taskedo-alternative.herokuapp.com${children.url}`)} label={children.filename} sx={{margin: 0.4}} />
    )
}

export default Attachment;