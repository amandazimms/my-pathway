import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import {Grid} from '@mui/material'; 

function TestEdit(props) {
  //This is the page that displays "one event".

  //status will be passed as props, either "inProgress", "upcoming", or "completed"

  //If it's an event in progress, it will look like wireframe "NEW view of Event in progress, proctor's view", from figma

  //If it's upcoming, it will look like wireframe "Create/Edit Event" in figma, with isNew=false
  //  If proctor just clicked "add event" from the EventList page, ^ it will also look like that - with isNew=true

  //If it's a completed evnet, it will look like wireframe "Proctor view of Individual event results" from figma
  
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);


  const [testName, setTestName] = useState(test.title)
  const [testTimeLimit, setTestTimeLimit] = useState(test.test_time_limit)
  const [shuffleQuestions, setShuffleQuestions] = useState(test.question_shuffle)
  const [attemptsAllowed, setAttempsAllowed] = useState(test.test_attempt_limit)
  const [isEditMode, setIsEditMode] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_TESTS"
    })
    dispatch({
      type: "FETCH_ALL_PROCTORS"
    })
  }, [])

  const handleTestTitleChange = (event) => {
    // console.log('Int   const handleDateStartChange = (event) => {
    setTestName(event.target.value)
  }

  const handleTimeLimitChange = (event) => {
    // console.log('Int handleDateEndChange', event.target.value);
    setTestTimeLimit(event.target.value)
  }

  const handleShuffleChange = (event) => {
    // console.log('Int handleNameChange', event.target.value);
    setShuffleQuestions(event.target.value)
  }

  const handleAttemptsChange = (event) => {
    // console.log('Int handleTestChange', event.target.value);
    setAttemptsAllowed(event.target.value)
  }

  const updateTest = () => {
    console.log('In updateTest');

    //this function should run when user(proctor) has FINISHED entering all of the details for an event, 
    //and then clicks "update event" 
    let updatedTest = {
      title: testName,
      test_time_limit: testTimeLimit,
      question_shuffle: shuffleQuestions,
      test_attempt_limit: attemptsAllowed,

      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: test.id, //this is also in store already
    }
    dispatch({ type: 'UPDATE_TEST_SETTINGS', payload: { event: updatedTest } });
    setIsEditMode(false);  
  }

  return (
    <div>

 { isEditMode ?
    <div> 
          <h2>Edit Event</h2>
          <TextField
            required
            id="outlined-required"
            label="Test Name"
            value={testName}
            sx={{ minWidth: 300 }}
            onChange={handleTestTitleChange}
          />
          <br />
          <br />
          <TextField
            id="outlined-select-required"
            required
            select
            label="Time Alotted"
            value={testTimeLimit}
            sx={{ minWidth: 300 }}
            onChange={handleTimeLimitChange}
          >
            <MenuItem value={45}>00:45:00</MenuItem>
            <MenuItem value={60}>01:00:00</MenuItem>
            <MenuItem value={90}>01:30:00</MenuItem>
            <MenuItem value={105}>01:45:00</MenuItem>
            <MenuItem value={120}>02:00:00</MenuItem>
          </TextField>
          <br />
          <br />
          <TextField
            id="outlined-select-required"
            required
            select
            label="Order of questions"
            value={shuffleQuestions}
            sx={{ minWidth: 300 }}
            onChange={handleShuffleChange}
          >
            <MenuItem value={true}>Shuffle questions</MenuItem>
            <MenuItem value={false}>Do not shuffle questions</MenuItem>
          </TextField>
          <br />
          <br />
          <TextField
            id="outlined-select-required"
            label="Number of Attempts Allowed"
            type="integer"
            value={attemptsAllowed}
            sx={{ minWidth: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleAttemptsChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem> 
            </TextField>
          <br />
          <br />
       
          <Button variant="outlined" onClick={updateTest}>Save Changes</Button>
          <br></br>
          <br></br>
        </div> 
        : 
        <>
       
        <Grid container spacing={2}> 
        <Grid item xs={2}>
        <h2 className="heading">Current Test</h2> 
        </Grid>
        <Grid item xs={12}>
        <TextField
            id="outlined-required"
            label="Test Name"
            value={testName}
            sx={{ minWidth: 300 }}
          />
        </Grid>
        <Grid item xs={8}> 
        <TextField
            id="outlined-select-required"
            label="Time Alotted"
            value={testTimeLimit}
            sx={{ minWidth: 300 }}
            /> 
        </Grid>
        <Grid item xs={8}> 
        <TextField
            id="outlined-select-required"
            label="Order of questions"
            value={shuffleQuestions}
            sx={{ minWidth: 300 }}
          />
          </Grid> 
          <Grid item xs={8}> 
        <TextField  id="outlined-select-required"
            label="Number of Attempts Allowed"
            type="integer"
            value={attemptsAllowed}
            sx={{ minWidth: 300 }}
            InputLabelProps={{
              shrink: true,
            }}></TextField>
            </Grid>
        <Grid item xs={5}> 
        <Button variant="outlined" onClick={()=> setIsEditMode(true)}>Edit Test</Button> 
        <br></br>
        <br></br>
        </Grid> 
        </Grid> 
        </> 
    } 
    </div>
  );
}

export default TestEdit;