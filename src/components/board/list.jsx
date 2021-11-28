import React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import Card from './card'
import EditModal from './editModal'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingBottom: '40px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minWidth: '250px',
  }));

const List = ({listName}) => {
    const [open, setOpen] = React.useState(false);
    const [isEditingList, setIsEditingList] = React.useState(false);
    const handleEditListOpen = () => {setIsEditingList(true); setOpen(true);}
    const handleNewCardOpen = () => {setIsEditingList(false); setOpen(true);}
    const handleClose = () => setOpen(false);

    return (
        <>
    <Item elevation={3} key={listName}>
    <Box sx={{ display: 'flex', p: 1 }}>
        <Typography sx={{marginBottom: '10px', flexGrow: 1}}>{listName}</Typography>
        <IconButton aria-label="edit list" sx={{width: '24px', height: '24px'}} component="span" onClick={handleEditListOpen}><EditIcon /></IconButton>
        <IconButton aria-label="new card" sx={{width: '24px', height: '24px'}} component="span" onClick={handleNewCardOpen}><AddIcon /></IconButton>
    </Box>
    <Card cardName="karta nazwa" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa2" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa3" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa4" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa5" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa6" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa7" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    </Item>
    <EditModal open={open} handleClose={handleClose} isNew={!isEditingList} isCard={!isEditingList} />
    </>
)};

export default List;
