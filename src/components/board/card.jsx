import React from 'react';

import { Typography, CardContent } from '@mui/material';
import MuiCard from '@mui/material/Card';
import CardModal from './cardModal'

const axios = require('axios');

const Card = ({card, workspaceId, boardId, listId, fetchData, username}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [displayedCard, setDisplayedCard] = React.useState(card);
    const [displayedComments, setDisplayedComments] = React.useState(card.comments);
    const [displayedAttachments, setDisplayedAttachments] = React.useState(card.attachments);

    const updateCard = async (title, contents) => {
        axios.put("https://taskedo-alternative.herokuapp.com/workspace/update_ticket", ({
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
        console.log("hello")
        axios.post("https://taskedo-alternative.herokuapp.com/workspace/add_comment_to_ticket", ({
            "comment": comment,
            "author": username,
            "workspace_id": workspaceId,
            "board_id": boardId,
            "list_id": listId,
            "ticket_id": card.id,

        }))
        .then(res => {
            setDisplayedComments(res.data.ticket.comments);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const config = {
        headers: {
            "Content-Type":"multipart/form-data" 
        }
    };

    const createAttachment = (e) => {
        let file;
        if(e && e.target && e.target.files[0])
        {
            file = e.target.files[0];
        }
        const formData = new FormData();
        formData.append('workspace_id', workspaceId);
        formData.append('board_id', boardId);
        formData.append('list_id', listId);
        formData.append('author', "test");
        formData.append('ticket_id', card.id);
        formData.append('file', file)   
        e.preventDefault();
    
        axios.post(`https://taskedo-alternative.herokuapp.com/workspace/add_attachment`, formData, config)
        .then(res => {
            if (res.data.status === 'success') {
            console.log('File send successfully');
            console.log(res.data.attachment);
            setDisplayedAttachments([...displayedAttachments, res.data.attachment]);
            }
            else{
            console.log('File send failed');
            }
        })
        .catch(err => {
            console.log(err)
        })    
    }

    const removeAttachment = (e, id, index) => {
        console.log(id);
        const formData = new FormData();
        formData.append('workspace_id', workspaceId);
        formData.append('board_id', boardId);
        formData.append('list_id', listId);
        formData.append('ticket_id', card.id);
        formData.append('attachment_id', id);
        e.preventDefault();

        axios.post(`https://taskedo-alternative.herokuapp.com/workspace/delete_attachment`, formData, config)
        .then(res => {
            if (res.data.status === 'success') {
                const newDisplayedAttachments = [...displayedAttachments];
                newDisplayedAttachments.splice(index, 1);
                setDisplayedAttachments(newDisplayedAttachments);
            }
            else{
            console.log('File send failed');
            }
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
        <CardModal open={open} handleClose={handleClose} handleEdit={updateCard} handleComment={createComment} handleAttachment={createAttachment} removeAttachment={removeAttachment} displayedCard={displayedCard} initTitle={card.title} initDescription={card.contents} comments={displayedComments} attachments={displayedAttachments} creationDate={displayedCard.creation_date} modifyDate={displayedCard.modification_date} username={username} />
        </>
};

export default Card;