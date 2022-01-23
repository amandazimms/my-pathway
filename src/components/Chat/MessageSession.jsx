import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

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

  const handleMessageText = (event) => {
    setMessageText(event.target.value)
  }

  const handleNewMessage = () => {
    console.log('In handleNewMessage', messageText);
    dispatch({
      type:'CREATE_MESSAGE_DETAIL',
      payload:{
        message_session_id:store.activeMessageSession.message_session_id,
        creator_id:store.user.id,
        message:messageText
      }
    })
    setMessageText('')
  }

  return (
    <div>
      <h2>{heading}</h2>
      <p>Event Name: {store.activeMessageSession.event_name}</p>
      <p>Student Name: {store.activeMessageSession.student_first_name} {store.activeMessageSession.student_last_name}</p>
      <p>Proctor Name: {store.activeMessageSession.proctor_first_name} {store.activeMessageSession.proctor_last_name}</p>
      <label htmlFor="message">Message:</label><input type="text" id='message' value={messageText} onChange={handleMessageText}/>
      <button onClick={handleNewMessage}>Send Message</button>
    </div>
  );
}

export default messageSessionFunction;
