import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MessageDetail from './MessageDetail';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Send from "@material-ui/icons/Send";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

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
  const classes = useStyles();
  const store = useSelector((store) => store);
  const [messageText, setMessageText] = useState('')
  const user = useSelector(store => store.user);
  const history = useHistory()
  const messagesEndRef = useRef()
  const objDiv = document.getElementById("chatList");

  useEffect(() => {
    getMessageDetail();
    scrollText();
    const getMessageTimer = setInterval(() => { getMessageDetail() }, 3000);
    return () => {
      clearInterval(getMessageTimer);
    }
  }, [store.message.activeMessageDetail.length])

  const getMessageDetail = () => {
    dispatch({
      type: 'GET_MESSAGE_DETAIL',
      payload: {
        session_id: store.message.activeMessageSession.message_session_id
      }
    })
  }

  const scrollText = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' })
  }

  const handleMessageText = (event) => {
    setMessageText(event.target.value)
  }

  const handleNewMessage = () => {
    dispatch({
      type: 'CREATE_MESSAGE_DETAIL',
      payload: {
        message_session_id: store.message.activeMessageSession.message_session_id,
        creator_id: store.user.id,
        message: messageText
      }
    })
    setMessageText('')
  }



  return (

    <div className="chatWindow">
      <div>
        <div className="chat" id="chatList">
          <div>
            {store.message.activeMessageDetail.map(message =>
            (message.creator_id === store.user.id ?
              <MessageDetail
                message={message}
                key={message.message_id}
                className="self"
                messageClassName="selfMessage"
              /> :
              <MessageDetail
                message={message}
                key={message.message_id}
                className="them"
                messageClassName="themMessage"
              />
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="chattextareadiv">

        <input
          type="text"
          placeholder='type a message here...'
          value={messageText}
          className="chattextarea"
          onChange={handleMessageText}>
        </input>

        {/* <Send onClick={handleNewMessage} className={classes.sendBtn} /> */}
        <SendIcon
          className="chatSendIcon blueColor" 
          onClick={handleNewMessage}
        />
        {/* <Button className="sendMessageButton buttonInsideInput" variant="contained" color="primary" onClick={handleNewMessage}>Send</Button> */}

      </div>
      
    </div>
  );
}


