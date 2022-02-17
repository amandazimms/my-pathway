import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import MessageDetail from './MessageDetail';
import {makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card'; 
import Send from "@material-ui/icons/Send";

import '../Chat/Chat.css'; 

const useStyles = makeStyles({

  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },
});


export default function messageSessionFunction(props) {
  const dispatch = useDispatch();
  const classes = useStyles (); 
  const store = useSelector((store) => store);
  const [messageText, setMessageText] = useState('')
  const user = useSelector(store => store.user);
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
  
  <div className="chatWindow"> 
  <div>
      <ul className="chat" id="chatList"> 
      {store.message.activeMessageDetail.map(message => 
        (<MessageDetail message={message} 
        key={message.message_id}>
        { 
          user.id && user.role === "STUDENT" ? (
            <li className="self">
              <div className="msg">
                <p>{message.creator_first_name}</p>
                <div className="message">{message.message}</div>
              </div>
            </li>
          ) : (
            <> </> 
          )
        }
          
        </MessageDetail> ))}
  </ul> 
</div> 
      <div className="chatInputWrapper"> 
      <form onSubmit={handleNewMessage}> 
      <input
      type="text"
      placeholder='type a message here...' 
      value={messageText} 
      className="textarea input" 
      onChange={handleMessageText}></input>
      <Send onClick={handleNewMessage} className={classes.sendBtn}/> 
      </form>
      </div> 

    </div>
  );
}


