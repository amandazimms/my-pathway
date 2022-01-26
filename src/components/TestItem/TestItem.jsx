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

const newTest = { 
       title: '', 
       points_possible: '', 
       test_time_limit: '', 
       question_shuffle: '', 
       test_attempt_limit: '',
      //  created_by: user.id, //this is the proctor's id, should be already there in the store 
     } 


const addTest = (event) => {
  console.log('add test here')
  dispatch({ type: 'ADD_TEST', payload: { test: newTest } });
}

//for tabs 
const [selectedTab, setSelectedTab] = useState(0);

const handleTabChange = (event, value) => {
      setSelectedTab(value);
    };


  return (
    <div>
      <h2>I'm a test</h2>
      <p>stringified test:{JSON.stringify(test)}</p>

      <Link to="/test" onClick={() => setSelectedTest(test)}>
        {/* when the edit button is clicked, this will move user to the /test page, and set the selectedTest to this one */}
        <button>Edit this test</button>
      </Link>


      <div className='add-test'>
      <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Questions" />
          <Tab label="Settings"/> 
        </Tabs>
      </Box>

    
    
      <h2>Add A Test</h2>
       <form>

      <div className='input-text'>
      <label>Title</label> 
      <input required defaultValue={newTest.title} type="text" name="title" />
      </div>

       <div className='input-text'>
       <label>Points Possible</label> 
       <input required defaultValue={newTest.points_possible}  type="integer" name="points" />
       </div>

       <div className='input-text'>
       <label>Test Time Limit</label> 
       <input required defaultValue={newTest.test_time_limit} type="integer" name="time limit" />
       </div>

       <div className='input-text'>
       <label>Question Shuffle</label> 
       <input required defaultValue={newTest.question_shuffle}  type="boolean" name="true false" />
       </div>

       <div className='input-text'>
       <label>Number of Attempts Allowed</label> 
       <input required defaultValue={newTest.test_attempt_limit}  type="integer" name="attempts" />
       </div>
       
       <button onClick={addTest} variant='contained' color='primary' type='submit'>Add Test</button>

       </form>
    </div>
    </div>
  );
}

export default TestItem;
