import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import './TestCreate.css'
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { v4 as uuid } from 'uuid';
import Grid from '@mui/material/Grid'; 

function TestCreate(props) {

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);

  const [testName, setTestName] = useState('')
  const [shuffleQuestions, setShuffleQuestions] = useState(false)
  const [testTimeLimit, setTestTimeLimit] = useState('')
  const [passThreshold, setPassThreshold] = useState(.75);
  const [attemptsAllowed, setAttemptsAllowed] = useState('')
  const [editTest, setEditTest] = useState(false)
  const [isNew, setIsNew] = useState(props.new)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_TESTS"
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

  const handlePercentageChange = (event) => {
    setPassThreshold(event.target.value);
  }

  const addTest = () => {
    let newTest ={
      title: testName,
      test_time_limit: testTimeLimit,
      question_shuffle: shuffleQuestions,
      test_attempt_limit: attemptsAllowed,
      pass_threshold: passThreshold,
      id: test.id, //already in store
      created_by: user.id,
    }
    dispatch({
      type: "ADD_TEST",
      payload:{test: newTest}
    }); 
    props.onClickCreate();
  }

  const setSelectedTest= (test) => {
    dispatch({ type: 'FETCH_SELECTED_TEST', payload: {test_id: test.test_id} }); 
  }
  
return(
<div> 
<div className="container">

 <Grid container
 spacing={0}
 direction="column"
 alignItems="center"
 justifyContent="center"
>
  <div className="form-check">
              <h2 className="heading">Create New Test</h2>

              <TextField
                required
                id="outlined-required"
                label="Test Name"
                sx={{ minWidth: 300 }}
                onChange={handleTestTitleChange}
              />
              <br />
              <br />
              <TextField
                id="outlined-select-required"
                required
                select
                label="Time"
                value={testTimeLimit}
                sx={{ minWidth: 300 }}
                onChange={handleTimeLimitChange}
              >
            <MenuItem key={uuid.v4} value={45}>00:45:00</MenuItem>
            <MenuItem key={uuid.v4} value={60}>01:00:00</MenuItem>
            <MenuItem key={uuid.v4} value={90}>01:30:00</MenuItem>
            <MenuItem key={uuid.v4} value={105}>01:45:00</MenuItem>
            <MenuItem key={uuid.v4} value={120}>02:00:00</MenuItem>
          </TextField>
          <br></br>
          <br></br>
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
                required
                select
                label="Pass Threshold"
                value={passThreshold}
                sx={{ minWidth: 300 }}
                onChange={handlePercentageChange}
              >
            <MenuItem key={uuid.v4} value={.5}>50%</MenuItem>
            <MenuItem key={uuid.v4} value={.55}>55%</MenuItem>
            <MenuItem key={uuid.v4} value={.6}>60%</MenuItem>
            <MenuItem key={uuid.v4} value={.65}>65%</MenuItem>
            <MenuItem key={uuid.v4} value={.7}>70%</MenuItem>
            <MenuItem key={uuid.v4} value={.75}>75%</MenuItem>
            <MenuItem key={uuid.v4} value={.8}>80%</MenuItem>
            <MenuItem key={uuid.v4} value={.85}>85%</MenuItem>
            <MenuItem key={uuid.v4} value={.9}>90%</MenuItem>
            <MenuItem key={uuid.v4} value={.95}>95%</MenuItem>
            <MenuItem key={uuid.v4} value={1}>100%</MenuItem>
          </TextField>
          <br></br>
          <br></br>

          <TextField
            id="outlined-select-required"
            label="Number of Attempts Allowed"
            required
            select
            value={attemptsAllowed}
            sx={{ minWidth: 300 }}
            onChange={handleAttemptsChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem> 
            </TextField>
          <br />
          <br />

        
          <div className="flexParent">
            <Button variant="contained" onClick={addTest}>
              Create New Test
            </Button>
          </div>
        
    </div>
    </Grid>  
    </div> 
    </div>

);
}

export default TestCreate;