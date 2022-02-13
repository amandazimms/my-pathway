import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

function EventCreate(props) {
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();

  const [eventName, setEventName] = useState('')
  const [eventTest, setEventTest] = useState('')
  const [eventProctor, setEventProctor] = useState('')
  const [eventDateEnd, setEventDateEnd] = useState('')
  const [eventDateStart, setEventDateStart] = useState('')

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_TESTS"
    })
    dispatch({
      type: "FETCH_ALL_PROCTORS"
    })
  }, [])

  const handleDateStartChange = (event) => {
    // console.log('Int   const handleDateStartChange = (event) => {
    setEventDateStart(event.target.value)
  }

  const handleDateEndChange = (event) => {
    // console.log('Int handleDateEndChange', event.target.value);
    setEventDateEnd(event.target.value)
  }

  const handleNameChange = (event) => {
    // console.log('Int handleNameChange', event.target.value);
    setEventName(event.target.value)
  }

  const handleTestChange = (event) => {
    // console.log('Int handleTestChange', event.target.value);
    setEventTest(event.target.value)
  }

  const handleProctorChange = (event) => {
    // console.log('Int handleProctorChange', event.target.value);
    setEventProctor(event.target.value)
  }

  const createEvent = () => {
    let newEvent = {
      event_name: eventName,
      proctor_id: store.user.id, //<- reminder that this is the proctor who proctors the event, not the one creating/updating it now.
      test_id: eventTest,
      event_date_start: eventDateStart,
      event_date_end: eventDateEnd,
      url: null,
      created_by: user.id, //this is the proctor's id, should be already there in the store 
    }
    dispatch({ type: 'ADD_EVENT', payload: { event: newEvent } });
    setIsNew(false)
  }

return (
    <div>
      <h2>Create New Event</h2>
        <TextField
          required
          id="outlined-required"
          label="Event Name"
          sx={{ minWidth: 300 }}
          onChange={handleNameChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-select-required"
          required
          select
          label="Test"
          value={eventTest}
          sx={{ minWidth: 300 }}
          onChange={handleTestChange}
        >
          {store.test.all.map((test) => (
            <MenuItem key={test.id} value={test.id}>
              {test.title} - {test.test_time_limit} Minutes
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />
        <TextField
          id="outlined-select-required"
          required
          select
          label="Proctor"
          value={eventProctor}
          sx={{ minWidth: 300 }}
          onChange={handleProctorChange}
        >
          {store.allUsers.proctorsOnly.map((proctor) => (
            <MenuItem key={proctor.id} value={proctor.id}>
              {proctor.first_name} {proctor.last_name}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />
        <TextField
          id="datetime-local"
          label="Event Start Date/Time"
          type="datetime-local"
          sx={{ minWidth: 300 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateStartChange}
        />
        <br />
        <br />
        <TextField
          id="datetime-local"
          label="Event End Date/Time"
          type="datetime-local"
          sx={{ minWidth: 300 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateEndChange}
        />
        <br />
        <br />
        <Button variant="outlined" onClick={createEvent}>Create New Event</Button>
    </div>
  );
}

export default EventCreate;
