import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

function EventPage(props) {
  //This is the page that displays "one event".

  //status will be passed as props, either "inProgress", "upcoming", or "completed"

  //If it's an event in progress, it will look like wireframe "NEW view of Event in progress, proctor's view", from figma

  //If it's upcoming, it will look like wireframe "Create/Edit Event" in figma, with isNew=false
  //  If proctor just clicked "add event" from the EventList page, ^ it will also look like that - with isNew=true

  //If it's a completed evnet, it will look like wireframe "Proctor view of Individual event results" from figma
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
      proctor_id: eventProctor,
      test_id: eventTest,
      event_date_start: eventDateStart,
      event_date_end: eventDateEnd,
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: event.id, //this is also in store already
    }
    dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } });
    props.complete()
  }







  return (
    <div>

          <h2>Edit Event</h2>
          <TextField
            required
            id="outlined-required"
            label="Event Name"
            value={eventName}
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
            value={eventDateStart}
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
            value={eventDateEnd}
            sx={{ minWidth: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateEndChange}
          />
          <br />
          <br />
          <Button variant="outlined" onClick={updateEvent}>Save Changes</Button>
    </div>
  );
}

export default EventPage;
