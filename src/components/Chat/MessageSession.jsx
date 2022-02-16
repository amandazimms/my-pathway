import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import MessageDetail from './MessageDetail';
import {makeStyles} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper"; 

const useStyles = makeStyles({

  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },

  grayPaper: {
    backgroundColor: '#F5F5F5',
  }, 

  chatTextBoxContainer: {
    position: "flex",
    bottom: "15px",
    left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)",
    height: "50px",
    backgroundColor: "#d3d4db",
    borderRadius: "10px",
    padding: "10px",
  },

  chatTextBox: {
    width: "calc(100% - 40px)",
    height: "20px",
    marginRight: "10px",
    fontFamily: "Helvetica-Neue-Light",
  },
  backBtn: {
    position: "fixed",
    height: "70px",
    width: "100px",
    right: "0px",
  },

  backIcon: {
    color: "white",
    height: "35px",
    width: "35px",
  },
});



export default function messageSessionFunction(props) {
  const dispatch = useDispatch();
  const classes = useStyles (); 
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Message Session Header');
  const [messageText, setMessageText] = useState('')

  const history = useHistory()

  useEffect(() => {
    getMessageDetail();
    const getMessageTimer = setInterval(() => {getMessageDetail()}, 3000);
    return () => clearInterval(getMessageTimer)
  },[])

  const getMessageDetail = () => {
    dispatch({
      type:'GET_MESSAGE_DETAIL',
      payload:{
        session_id:store.message.activeMessageSession.message_session_id
      }
    })
  }

  const handleMessageText = (event) => {
    setMessageText(event.target.value)
  }

  const handleNewMessage = () => {
    console.log('In handleNewMessage', messageText);
    dispatch({
      type:'CREATE_MESSAGE_DETAIL',
      payload:{
        message_session_id:store.message.activeMessageSession.message_session_id,
        creator_id:store.user.id,
        message:messageText
      }
    })
    setMessageText('')
  }



  return (
    <div>
    <Paper className={classes.grayPaper}> 
  
      {/* <button onClick={() => {history.goBack()}}>RETURN TO CHAT HOME</button>
      <h2>{heading}</h2> */}
     
      {/* <p>Event Name: {store.message.activeMessageSession.event_name}</p>
      <p>Message Session ID: {store.message.activeMessageSession.message_session_id}</p>
      <p>Student Name: {store.message.activeMessageSession.student_first_name} {store.message.activeMessageSession.student_last_name}</p>
      <p>Proctor Name: {store.message.activeMessageSession.proctor_first_name} {store.message.activeMessageSession.proctor_last_name}</p> */}
      
      <main id="chatview-container" className={classes.content}> 
      {/* <h2>Message Session Details</h2> */}
      {store.message.activeMessageDetail.map(message => (<MessageDetail message={message} key={message.message_id} />))}
      
      {/* box used to type a new message */}
      <div className={classes.chatTextBoxContainer}> 
      <TextField 
      type="text" 
      id='chattextbox' 
      placeholder='type message a...' 
      value={messageText} 
      className={classes.chatTextBox}
      onChange={handleMessageText}/>
      <Send onClick={handleNewMessage} className={classes.sendBtn}>Send Message</Send>
      </div>
      </main>
     </Paper> 
    </div>
  );
}


