import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

//Material-UI imports 
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function TestItem(props) {

  const store = useSelector(store => store);
  const [test, setTest] = useState(props.test);
  
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Functional Component');
  
  const selectedTest = useSelector(store => store.test.selected);

  const setSelectedTest = (_test) => {
    console.log('clicked edit test');
    dispatch({ type: 'SET_SELECTED_TEST', payload: _test });
  }


  return (
    <div>
      <h2>I'm a test</h2>
      <p>stringified test:{JSON.stringify(test)}</p>

      <Link to="/test" onClick={() => setSelectedTest(test)}>
        {/* when the edit button is clicked, this will move user to the /test page, and set the selectedTest to this one */}
        <button>Edit this test</button>
      </Link>
    </div>
    
  );
}

export default TestItem;
