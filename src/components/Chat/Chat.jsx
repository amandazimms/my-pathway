import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function chatFunction(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const messageSession = useSelector(store => store.message.availableMessageSession);

  const [heading, setHeading] = useState('Chat Component');
  const [examId, setExamId] = useState(null)
  const [openChat, setOpenChat] = useState(false)
   
  useEffect(() => {
    //need this
    //either get the message session and set that as the active one,
    //or if that doesn't exist, create one and set that as active
    const getSessionsTimer = setInterval(() => {getSessions()}, 15000);
      return () => clearInterval(getSessionsTimer)
  },[])

  const history = useHistory()

  const getSessions = () => {
    if(examId != null ){
      dispatch({
        type:'GET_AVAILALE_MESSAGE_SESSIONS',
        payload:{
          exam_id:examId,
          user_id:store.user.id
        }
      })
      setOpenChat(true)
    }
  };

  const newChat = () => {
    dispatch({
      type:'CREATE_MESSAGE_SESSION', 
      payload:{
        userId: store.user.id,
        examId: examId,
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

  const handleExamId = (event) => {
      setExamId(event.target.value)
  }

  return (
    <div>
      <h2>{heading}</h2>
      {/* <p>{JSON.stringify(store.message)}</p> */}
      <h5>{store.user.first_name} {store.user.last_name} - {store.user.role}</h5>
      <label htmlFor="examId">Enter Exam ID:</label>
      <input type="text" id='examId' value={examId} onChange={handleExamId}/>
        <br />
      <button onClick={getSessions}>Find Active Chats</button>
        <br />

      { messageSession.length === 0 && openChat === true
        ?
          <>
          <h6><b>NO ACTIVE CHATS FOUND</b></h6>
          <button onClick={newChat}>Start New Chat</button>
          </>
        :
        <>
          { messageSession.map(session => (
            <div key={session.message_session_id} > 
              <p>
                Chat Between {session.proctor_first_name} and {session.student_first_name} 
              </p>
              <p>Chat ID: {session.message_session_id}</p>
              <button value={session.message_session_id} onClick={resumeChat}>Join Chat</button>
            </div>
            ))}
        </>
      }

    </div>
  );
}

export default chatFunction;
