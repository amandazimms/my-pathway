import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function chatFunction(props) {
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Chat Component');

  const openChat = () => {
    dispatch({
      type:'CREATE_MESSAGE_SESSION', 
      payload:{
        userId: store.user.id,
        examId: 1
      }
    })
  }

  return (
    <div>
      <h2>{heading}</h2>
      <p>USER ID: {store.user.id}</p>
      <button onClick={openChat}>Start Chat</button>
    </div>
  );
}

export default chatFunction;
