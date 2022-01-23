import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  getSessions();
  const getSessionsTimer = setInterval(() => {getSessions()}, 10000);
    return () => clearInterval(getSessionsTimer)
  },[])

  const history = useHistory()

  const getSessions = () => {
    console.log('getSesssions Started');
    dispatch({
      type:'GET_AVAILALE_MESSAGE_SESSIONS',
      payload:{
        exam_id:1,
        user_id:store.user.id
      }
    })
  };

  const newChat = () => {
    dispatch({
      type:'CREATE_MESSAGE_SESSION', 
      payload:{
        userId: store.user.id,
        examId: 1,
        done: () => {
          history.push('/message_session');
        }
      }
    })
    dispatch({
      type:'UNSET_ACTIVE_MESSAGE_DETAIL'})
  };

  const resumeChat = (event) => {
    console.log('setActiveChat event details', event.target.value);
    dispatch({
      type: 'GET_MESSAGE_SESSION',
      payload: {
        session_id: event.target.value,
        done: () => {
          history.push('/message_session');
        }
      }
    })
  };

  return (
    <div>
      <h2>{heading}</h2>
      <h5>{store.user.first_name} {store.user.last_name} - {store.user.role}</h5>
      {store.availableMessageSessions.length === 0?
      <button onClick={newChat}>Start New Chat</button>:
      <>
      {store.availableMessageSessions.map(session => (<div key={session.message_session_id} > <p>Chat Between {session.proctor_first_name} and {session.student_first_name}, Chat ID: {session.message_session_id}</p><button value={session.message_session_id} onClick={resumeChat}>Join Chat</button></div>))}
      </>
      }
      {/* <MessageSession /> */}

    </div>
  );
}

export default chatFunction;
