import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import MessageDetail from './MessageDetail';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function messageSessionFunction(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
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
      <button onClick={() => {history.goBack()}}>RETURN TO CHAT HOME</button>
      <h2>{heading}</h2>
      <p>Event Name: {store.message.activeMessageSession.event_name}</p>
      <p>Message Session ID: {store.message.activeMessageSession.message_session_id}</p>
      <p>Student Name: {store.message.activeMessageSession.student_first_name} {store.message.activeMessageSession.student_last_name}</p>
      <p>Proctor Name: {store.message.activeMessageSession.proctor_first_name} {store.message.activeMessageSession.proctor_last_name}</p>
      
      <h2>Message Session Details</h2>
      {store.message.activeMessageDetail.map(message => (<MessageDetail message={message} key={message.message_id} />))}
      <label htmlFor="message">Message:</label><input type="text" id='message' value={messageText} onChange={handleMessageText}/>
      <button onClick={handleNewMessage}>Send Message</button>
    </div>
  );
}

export default messageSessionFunction;
