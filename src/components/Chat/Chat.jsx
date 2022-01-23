import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import messageDetailFunction from './MessageDetail';
import MessageSession from './MessageSession';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function chatFunction(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Chat Component');

  useEffect(() => {
    dispatch({
      type:'GET_AVAILALE_MESSAGE_SESSIONS',
      payload:{
        exam_id:1,
        user_id:store.user.id
      }
    })
  },[])

  const openChat = () => {
    dispatch({
      type:'CREATE_MESSAGE_SESSION', 
      payload:{
        userId: store.user.id,
        examId: 1
      }
    })
  }
  const setActiveChat = (event) => {
    console.log('setActiveChat event details', event.target.value);
    dispatch({
      type:'GET_MESSAGE_SESSION',
      payload:{
        session_id:event.target.value
      }
    })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <button onClick={openChat}>Start New Chat</button>
      {store.availableMessageSessions.map(session => (<div><p>Chat Between {session.proctor_first_name} and {session.student_first_name}</p><button value={session.message_session_id} onClick={setActiveChat}>Join Chat</button></div>))}
      <MessageSession />

    </div>
  );
}

export default chatFunction;
