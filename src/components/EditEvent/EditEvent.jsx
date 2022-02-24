import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Grid from '@material-ui/core/Grid';


function EditEvent(props) {
   /*
    Component for editing a new event. Note that this does not have to do with registering students to an event; that is handled separately
     
    Could be refactored to utilize the same componet as EventCreate to be DRYer 
  */
 
  const isNew = props.new;
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const event = useSelector(store => store.event.selected);


  const [eventName, setEventName] = useState(event.event_name)
  const [eventTest, setEventTest] = useState(event.test_id)
  const [eventProctor, setEventProctor] = useState(event.proctor_id)
  const [eventDateEnd, setEventDateEnd] = useState(new Date(store.event.selected.event_date_end).toLocaleString('sv-SE').replace(' ','T'))
  const [eventDateStart, setEventDateStart] = useState(new Date(store.event.selected.event_date_start).toLocaleString('sv-SE').replace(' ','T'))

  const dispatch = useDispatch();

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


  const updateEvent = () => {
    console.log('In updateEvent');

    //this function should run when user(proctor) has FINISHED entering all of the details for an event, 
    //and then clicks "update event" 
    let updatedEvent = {
      event_name: eventName,
      proctor_id: user.id, //<- reminder that the eventual idea is that this is the proctor who proctors the event, not the one creating/updating it now.
      test_id: eventTest,
      event_date_start: eventDateStart,
      event_date_end: eventDateEnd,
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: event.id, //this is also in store already
    }
    dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } });
    props.onExit()
  }

return (
  <div className="container">
    <Grid container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
          <h2 className="heading">Edit Event</h2>
          <TextField
            required
            id="outlined-required"
            label="Event Name"
            value={eventName}
            sx={{ minWidth: 300 }}
            onChange={handleNameChange}
          />
          <br />
          <TextField
            id="outlined-select-required"
            required
            select
            label="Test"
            className="inputLimitSize"
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


          {/* we didn't have time to build out the CRUD fully here - 
          if uncommented, this does allow you to assign a proctor to an event (and can be edited),
          but we didn't scope for actually allowing that proctor & only that proctor
            to be the one to proctor that specific exam */}
          {/* <TextField
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
          <br /> */}

          <TextField
            id="datetime-local"
            label="Event Start Date/Time"
            type="datetime-local"
            value={eventDateStart}
            sx={{ minWidth: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateStartChange}
          />
          <br />
          <TextField
            id="datetime-local"
            label="Event End Date/Time"
            type="datetime-local"
            value={eventDateEnd}
            sx={{ minWidth: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateEndChange}
          />
          <br />
          <Button variant="outlined" onClick={updateEvent}>Save Changes</Button>
          <br/>
          <Button variant="contained" color="primary" onClick={ ()=>props.onExit() }>Cancel Changes</Button>
        </Grid>
    </div>
  );
}

export default EditEvent;
