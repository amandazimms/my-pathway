import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import '../Chat/Chat.css'; 
import ImageDisplay from '../ImageDisplay/ImageDisplay';

//styling for messages
// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   textAlign: 'center',
//   color: theme.palette.text.secondary, 
//   minWidth: '400px', 
//   height: 60,
//   lineHeight: '60px',
// }));

function messageDetailFunction(props) {

const store = useSelector(store => store);
const user = useSelector(store => store.user);

  return (
    <li className={props.className}>
      {   props.messageClassName === "themMessage"
        ? 
          <ImageDisplay
            url={props.message.creator_profile_picture}
            classToPass={"tableImageDisplay roundImage blueBorderDainty marginSides3"}
          />
        : <></>  
      }
           
      <div className="msg">
        
        <div className={props.messageClassName}>
          <p>
            <b>{props.message.creator_first_name}: </b> 
            <span className="messageDetailSpan">{props.message.message}</span>
          </p>
        </div> 
      </div>

      {   props.messageClassName === "selfMessage"
        ? 
          <>
          <ImageDisplay
            url={props.message.creator_profile_picture}
            classToPass={"tableImageDisplay roundImage blueBorderDainty marginSides3"}
          />
          </>
        : <></>  
      }
      </li>     
  );
}

export default messageDetailFunction;