import React from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';
import Card from './card'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    paddingBottom: '40px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minWidth: '250px',
  }));

const List = ({listName}) => (
    <Item elevation={3} key={listName}><Typography sx={{marginBottom: '10px'}}>{listName}</Typography>
    <Card cardName="karta nazwa" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa2" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa3" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa4" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa5" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa6" cardDescription="lorem ipsum sth sth yes yes hi hi" />
    <Card cardName="karta nazwa7" cardDescription="lorem ipsum sth sth yes yes hi hi" />
</Item>
)

export default List;
