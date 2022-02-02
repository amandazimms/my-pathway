import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
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

  const [eventDate, setEventDate] = useState('')
  const [eventName, setEventName] = useState('')
  const [eventTest, setEventTest] = useState('')
  const [eventProctor, setEventProctor] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_TESTS"
    })
    dispatch({
      type: "FETCH_ALL_PROCTORS"
    })
  },[])

  const handleDateChange = (event) => {
    // console.log('Int handleDateChange', event.target.value);
    setEventDate(event.target.value)
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

  

  const addEvent = () => {
    console.log('add');
    //this function should run when user(proctor) has FINISHED entering all of the details for an event, 
    //and then clicks "Add this event"   
    let newEvent = { 
      //@Jackie todo or @Amanda todo - change these values to real data from user Input
      event_name: "eventy mcEventerson", 
      test_id: 7, 
      proctor_id: 1, 
      event_date: Date.now(), 
      event_time: Date.now(),
      event_end_time: Date.now(),
      
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      created_by: user.id, //this is the proctor's id, should be already there in the store 
     } 
    dispatch({ type: 'ADD_EVENT', payload: { event: newEvent } }); 
  }; 

  const updateEvent = () => {
    console.log('update');

    //this function should run when user(proctor) has FINISHED entering all of the details for an event, 
    //and then clicks "update event" 
    let updatedEvent = { 
      //@Jackie todo or @Amanda todo - change these values to real data from user Input
      event_name: "eventy mcEventerson", 
      test_id: 1, 
      proctor_id: 1, 
      event_date: Date.now(), 
      event_time: Date.now(),
      event_end_time: Date.now(),
      
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: event.id, //this is also in store already
    } 
    dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } }); 
  }

  const deleteEvent = () => {
    console.log('delete');

    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_EVENT', payload: { event_id: event.id } }); 
  }

  const cheeseburgerEventTest = () => {
    console.log('in update test');

    let updatedEvent = {
      event_name: "Cheeseburger Event", 
      proctor_id: 1, //<- reminder that this is the proctor who proctors the event, not the one creating/updating it now.
      test_id: 1,
      event_date: "1999-02-02",
      //@Chris todo - uncomment below 2 lines and add value:
      // event_time: "19:00",
      // event_end_time: "21:00",
      url: "www.cheeseburger.com", 
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: event.id,//this is also in store already
    } 
    dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } }); 
  }



  const createEvent = () => {
    let newEvent = { 
      event_name: eventName, 
      proctor_id: store.user.id, //<- reminder that this is the proctor who proctors the event, not the one creating/updating it now.
      test_id: eventTest,
      event_date: eventDate,
      //@Chris todo - uncomment the next 2 lines and add values:
      // event_time: "19:00",
      // event_end_time: "21:00",
      url: "www.daffodil.com", 
      created_by: user.id, //this is the proctor's id, should be already there in the store 
    }
    dispatch({ type: 'ADD_EVENT', payload: { event: newEvent } }); 
  }

  return (
    <div>
      <br />
      <button onClick={cheeseburgerEventTest}>For Testing only :) Click to change existing event's title to cheeseburger (Update Test)</button>
      <br />
      <h2>Create New Event</h2>

      <TextField
        required
        id="outlined-required"
        label="Event Name"
        onChange={handleNameChange}
      />
      <br />
      <br />
      <TextField
        id="outlined-select"
        select
        label="Test"
        value={eventTest}
        sx={{ minWidth: 300 }}
        onChange={handleTestChange}
      >
        {store.test.all.map((test) => (
          <MenuItem key={test.id} value={test.id}>
            {test.title}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <TextField
        id="outlined-select"
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
        label="Event Date/Time"
        type="datetime-local"
        sx={{ minWidth: 300 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
      <br />
      <br />
      <Button variant="outlined" onClick={createEvent}>Create New Event</Button>
      <br />
      <br />
      <p>
          Event Name Is: {JSON.stringify(eventName)}
          <br />
          Event Date Is: {JSON.stringify(eventDate)}
          <br />
          Selected Test ID: {JSON.stringify(eventTest)}
          <br />
          Selected Proctor ID: {JSON.stringify(eventProctor)}
      
      </p>
     
      {/* <button onClick={daffodilEventTest}>4 Testing only :P Click to add a new event</button> */}

      <p> Here in the 'header' area will be some details about this event, 
          such as what time it starts, 
          who will proctor, and what the test will be.

          What is displayed below depends on whether the exam is upcoming, in progress, or completed.
      </p>

      {
        event.status==="upcoming"
        ? 
          <>
            <h3>This event is UPCOMING!</h3>
            <p>Here will be inputs /components to edit the event details. Examples:</p>
            <br></br>
            <p>Test: [Dropdown]</p>
            <p>Date: [Date picker]</p>
            <p>Time: [Time picker]</p>
            <p>Register Students: [Decide how to display this - list of all students?]</p>
            { isNew 
              ? <button onClick={addEvent}>Add This Event</button>
              : <>
                  <button onClick={updateEvent}>Update Event</button>
                  <button onClick={deleteEvent}>Delete Event</button>
                </>
            }    
          </>
        : <></>
      }

      {
        event.status==="inProgress"
        ? 
          <>
            <h3>This event is IN PROGRESS!</h3>
            <p>Here will be a list of students taking the exam. Examples:</p>
            <br></br>
            <p>Student: Jackie Spiess  |  ID Status: Verified                   |  Assistance: [    ]  |  [Enter Exam Button]</p>
            <p>Student: Amanda Zimms   |  ID Status: [Click to Verify Button]   |  Assistance: [Icon]  |  [Enter Exam Button]</p>
          </>
        : <></>
      }

      {
        event.status==="completed"
        ? 
          <>
            <h3>This event is COMPLETED</h3>
            <p>Here will be a list of student exam results. Examples:</p>
            <br></br>
            <p>Student: Nickolas C  |  ID #: 1234  |  Exam Started: 2:02pm |  [Details Button]</p>
            <p>Student: Chris N     |  ID #: 5678  |  Exam Started: 2:04pm |  [Details Button]</p>
          </>
        : <></>
      }
      
    </div>
  );
}

export default EventPage;
