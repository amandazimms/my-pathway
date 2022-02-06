import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import EditEvent from '../EditEvent/EditEvent'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EventRegisterStudents from '../EventRegisterStudents/EventRegisterStudents';
import ExamTable from '../ExamTable/ExamTable';

function EventPage(props) {
  //This is the page that displays "one event".

  //status will be passed as props, either "inProgress", "upcoming", or "completed"

  //If it's an event in progress, it will look like wireframe "NEW view of Event in progress, proctor's view", from figma

  //If it's upcoming, it will look like wireframe "Create/Edit Event" in figma, with isNew=false
  //  If proctor just clicked "add event" from the EventList page, ^ it will also look like that - with isNew=true

  //If it's a completed evnet, it will look like wireframe "Proctor view of Individual event results" from figma
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const event = useSelector(store => store.event.selected);
  const exams = useSelector(store => store.event.exams);

  const [eventName, setEventName] = useState('')
  const [eventTest, setEventTest] = useState('')
  const [eventProctor, setEventProctor] = useState('')
  const [eventDateEnd, setEventDateEnd] = useState('')
  const [eventDateStart, setEventDateStart] = useState('')
  const [editEvent, setEditEvent] = useState(false)
  const [isNew, setIsNew] = useState(props.new)
  const [showRegistration, setShowRegistration] = useState(false);

  let eventStartTime = new Date(store.event.selected.event_date_start).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  let eventEndTime = new Date(store.event.selected.event_date_end).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_TESTS"
    })
    dispatch({
      type: "FETCH_ALL_PROCTORS"
    })
    dispatch({
      type: "FETCH_EVENT_EXAMS",
      payload:{
        event_id:store.event.selected.id
      }
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


  const deleteEvent = () => {
    console.log('delete');

    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_EVENT', payload: { event_id: event.id } });
  }

  const unregisterStudent = (student) => {
    dispatch({ type:'UNREGISTER_STUDENT_TO_EVENT', 
      payload: {exam_id: student.exam_id, event_id: event.id} });
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
      
      {isNew ?
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
        </div> :
        <div>
            <h3>This event is {event.status}!</h3>
            {editEvent ?
              <>
                <EditEvent complete={() => { setEditEvent(false) }} />
                <br />
                <Button variant="contained" color="primary" onClick={() => { setEditEvent(false) }}>Cancel Changes</Button>
              </> :
              <>
                <p><b>Event Title:</b> {store.event.selected.event_name}</p>
                <p><b>Start Date and Time:</b> {eventStartTime}</p>
                <p><b>End Date and Time:</b> {eventEndTime}</p>
              </>
            }
        </div>   
      }

      { event.status === "UPCOMING" 
        ? <>
            {
              showRegistration 
              ? <>
                  <p>You are now viewing Registration 'tab'</p>
                  <Button onClick={() => setShowRegistration(false)}>Show Setttings Tab Instead</Button>
                  <EventRegisterStudents/> 
                  <ExamTable 
                    mode={event.status} 
                    rows={exams} 
                    headerText={"STUDENTS"}
                    onUnregisterStudent={ (student)=>unregisterStudent(student)}
                  />
                </>
              : <>
                  <p>You are now viewing Settings 'tab'</p>
                  <Button onClick={() => setShowRegistration(true)}>Show Registration Tab Instead</Button>
                  <br />
                  <br />
                  <Button variant="contained" color="primary" onClick={() => { setEditEvent(true) }}>Update Event</Button>
                  <br />
                  <br />
                  <Button variant="contained" color="primary" onClick={deleteEvent}>Delete Event</Button>
                  <br />
                  <br />
                
                
                </>  
            }
          </>
        : <></> 
      }

      

    </div>
  );
}

export default EventPage;
