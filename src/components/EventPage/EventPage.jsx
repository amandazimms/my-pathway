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


  const [eventName, setEventName] = useState('')
  const [eventTest, setEventTest] = useState('')
  const [eventProctor, setEventProctor] = useState('')
  const [eventDateEnd, setEventDateEnd] = useState('')
  const [eventDateStart, setEventDateStart] = useState('')
  const [editEvent, setEditEvent] = useState(false)
  const [isNew, setIsNew] = useState(props.new)

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
        <>
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
        </> :
        <>
          <p> Here in the 'header' area will be some details about this event,
            such as what time it starts,
            who will proctor, and what the test will be.
          </p>

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

              {
                event.status === "UPCOMING" ?
                  <>
                    <Button variant="contained" color="primary" onClick={() => { setEditEvent(true) }}>Update Event</Button>
                    <br />
                    <br />
                    <Button variant="contained" color="primary" onClick={deleteEvent}>Delete Event</Button>
                    <br />
                    <br />
                  </>
                  :
                  <></>
              }
            </>
          }
          <p>Registered Students: [Decide how to display this - list of all students?]</p>
          <TableContainer sx={{ minWidth: 500, maxWidth: 1000 }} component={Paper}>
            <Table sx={{ minWidth: 500, maxWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {event.status === 'COMPLETE' || event.status === 'UPCOMING' || event.status === 'IN PROGRESS'?
                  <>
                  <TableCell>STUDENT</TableCell>
                  <TableCell align="left">EMAIL/USERNAME</TableCell>
                  </>
                  :
                  <></>
                  }
                  {event.status === 'COMPLETE' || event.status === 'IN PROGRESS'?
                  <>
                  <TableCell align="left">ID VERIFIED</TableCell>
                  <TableCell align="left">ASSISTANCE</TableCell>
                  <TableCell align="center">EXAM START</TableCell>
                  <TableCell align="center">EXAM END</TableCell>
                  <TableCell align="center">NUMBER OF INCIDENTS</TableCell>
                  </>
                  :
                  <></>
                  }

                  {event.status === 'COMPLETE' || event.status === 'UPCOMING' || event.status === 'IN PROGRESS'?
                  <>
                  <TableCell align="center">ACTION</TableCell>
                  </>
                  :
                  <></>
                  }

                </TableRow>
              </TableHead>
              <TableBody>
                {/* {events.map((event) => ( */}
                  {/* <TableRow
                    key={event.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {event.event_name}
                    </TableCell>
                    <TableCell align="left">{event.status}</TableCell>
                    <TableCell align="left">{new Date(event.event_date_start).toLocaleDateString([], { month: 'long', year: 'numeric', day: 'numeric' })}</TableCell>
                    <TableCell align="left">{new Date(event.event_date_start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</TableCell>
                    <TableCell align="left">{new Date(event.event_date_end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</TableCell>
                    <TableCell align="center">
                      {event.status === 'UPCOMING' ?
                        <Button variant="contained" onClick={() => setSelectedEvent(event)} >View Event</Button> :
                        <></>
                      }
                      {event.status === 'IN PROGRESS' ?
                        <Button variant="contained" onClick={() => setSelectedEvent(event)}>Enter Event</Button> :
                        <></>
                      }
                      {event.status === 'COMPLETE' ?
                        <Button variant="contained" onClick={() => setSelectedEvent(event)}>View Results</Button> :
                        <></>
                      }
                    </TableCell>
                  </TableRow> */}
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>


          <h3>Upcoming Example</h3>
          <p>Student: Nickolas C  |  ID #: 1234  |  [Edit Button] |  [Remove Button]</p>
          <p>Student: Chris N     |  ID #: 5678  |  [Edit Button] |  [Remove Button]</p>
          <br />
          <h3>In Progress Example</h3>
          <p>Student: Jackie Spiess  |  ID Status: Verified                   |  Assistance: [    ]  |  [Enter Exam Button]</p>
          <p>Student: Amanda Zimms   |  ID Status: [Click to Verify Button]   |  Assistance: [Icon]  |  [Enter Exam Button]</p>
          <br />
          <h3>Completed Example</h3>
          <p>Student: Nickolas C  |  ID #: 1234  |  Exam Started: 2:02pm |  [Details Button]</p>
          <p>Student: Chris N     |  ID #: 5678  |  Exam Started: 2:04pm |  [Details Button]</p>
        </>
      }
    </div>
  );
}

export default EventPage;
