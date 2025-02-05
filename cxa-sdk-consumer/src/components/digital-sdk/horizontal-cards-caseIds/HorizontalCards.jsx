import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';

const Cards = styled(Paper)(({ theme }) => ({
  width: 170,
  
  padding: theme.spacing(1),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const HorizontalCards = ({ contact,selected }) => {

    return (
        <Cards style={{
            backgroundColor: selected ? "lightblue" : "white",
        }} variant="outlined">
            <Box style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}><span>case Id : </span> {contact.caseId}
            </Box>
        </Cards>
    )
}
export default HorizontalCards;