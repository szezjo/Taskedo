import React from 'react';

import { Typography, CardContent } from '@mui/material';
import MuiCard from '@mui/material/Card';
import CardModal from './cardModal'

const axios = require('axios');

const Card = ({card, workspaceId, boardId, listId}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [displayedCard, setDisplayedCard] = React.useState(card);

    const updateCard = async (title, contents) => {
        axios.put("https://shrouded-lake-50073.herokuapp.com/workspace/update_ticket", ({
            "title": title,
            "contents": contents,
            "workspace_id": workspaceId,
            "board_id": boardId,
            "list_id": listId,
            "ticket_id": card.id,

        }))
        .then(res => {
            setDisplayedCard(res.data);
            handleClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const createComment = async(comment) => {
        axios.post("https://shrouded-lake-50073.herokuapp.com/workspace/add_comment_to_ticket", ({
            "comment": comment,
            "author": "Username",
            "workspace_id": workspaceId,
            "board_id": boardId,
            "list_id": listId,
            "ticket_id": card.id,

        }))
        .then(res => {
            setDisplayedCard(res.data.ticket);
            handleClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return <>
        <MuiCard onClick={handleOpen} sx={{marginBottom: 1.5}}>
            <CardContent>
                <Typography variant="h6" component="div">{displayedCard.title}</Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{displayedCard.contents}</Typography>
            </CardContent>
        </MuiCard>
        <CardModal open={open} handleClose={handleClose} handleEdit={updateCard} handleComment={createComment} displayedCard={displayedCard} initTitle={card.title} initDescription={card.contents} />
        </>
};

export default Card;