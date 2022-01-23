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

  return (
    <div>
      <h2>{heading}</h2>
      <p>Event Name: {store.activeMessageSession.event_name}</p>
      <p>Student Name: {store.activeMessageSession.student_first_name} {store.activeMessageSession.student_last_name}</p>
      <p>Proctor Name: {store.activeMessageSession.proctor_first_name} {store.activeMessageSession.proctor_last_name}</p>

    </div>
  );
}

export default messageSessionFunction;
