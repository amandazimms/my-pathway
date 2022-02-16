import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';


//styling for messages
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary, 
  minWidth: '400px', 
  height: 60,
  lineHeight: '60px',
}));

function messageDetailFunction(props) {

const store = useSelector((store) => store);
const user = useSelector((store) => store.user);



  return (
    <main id="chatview-container">
      <Grid container spacing={1}>
        <Grid item xs={4}>
            <Box
              sx={{
                p: 1,
                display: 'grid',
                gridTemplateColumns:' fit-content(100%)',
                gap: 1,
              }}
            >
  <Grid container justifyContent="center"> 
      <Avatar 
      style={{marginRight: "14px"}}
      float="left">
      </Avatar>
    <Item elevation={3}>
      {props.message.message}
      </Item>
 </Grid> 

        </Box> 
        </Grid>
        </Grid> 

      {/* <p><b>{props.message.creator_first_name} Said: </b>{props.message.message}</p> */}
       {/* <p>{JSON.stringify(props)}</p> */}
    </main>
  );
}

export default messageDetailFunction;