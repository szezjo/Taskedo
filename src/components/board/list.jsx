import React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import Card from './card'
import EditModal from './editModal'

const axios = require('axios');

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingBottom: '40px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minWidth: '250px',
  }));

const List = ({list, workspaceId, boardId}) => {
    const [open, setOpen] = React.useState(false);
    const [isEditingList, setIsEditingList] = React.useState(false);
    const handleEditListOpen = () => {setIsEditingList(true); setOpen(true);}
    const handleNewCardOpen = () => {setIsEditingList(false); setOpen(true);}
    const handleClose = () => setOpen(false);

    const [displayedList, setDisplayedList] = React.useState(list.tickets);

    const createCard = async (name, description) => {
        axios.post("https://shrouded-lake-50073.herokuapp.com/workspace/create_ticket", ({
            "title": name,
            "contents": description,
            "workspace_id": workspaceId,
            "board_id": boardId,
            "list_id": list.id,
        }))
        .then(res => {
            setDisplayedList([...displayedList, {'title': name, 'contents': description}])
            handleClose()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleEdit = async (name, description) => {
        !isEditingList && await createCard(name, description)
    }

    return (
        <>
    <Item elevation={3} key={list.name}>
    <Box sx={{ display: 'flex', p: 1 }}>
        <Typography sx={{marginBottom: '10px', flexGrow: 1}}>{list.name}</Typography>
        <IconButton aria-label="edit list" sx={{width: '24px', height: '24px'}} component="span" onClick={handleEditListOpen}><EditIcon /></IconButton>
        <IconButton aria-label="new card" sx={{width: '24px', height: '24px'}} component="span" onClick={handleNewCardOpen}><AddIcon /></IconButton>
    </Box>
    {displayedList && displayedList.map((card, index) => (
        <Card card={card} />
    ))}
    </Item>
    <EditModal open={open} handleEdit={handleEdit} handleClose={handleClose} isNew={!isEditingList} isCard={!isEditingList} />
    </>
)};

export default List;
