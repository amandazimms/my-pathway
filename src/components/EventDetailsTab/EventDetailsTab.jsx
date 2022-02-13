import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import { Button } from '@mui/material';
import ExamTable from '../ExamTable/ExamTable';
import EditEvent from '../EditEvent/EditEvent'
import EventCreate from '../EventCreate/EventCreate';


function EventDetailsTab(props) {
  const [isNew, setIsNew] = useState(props.isNew);
  const [editMode, setEditMode] = useState(false)
  const event = props.event;
  const dispatch = useDispatch();

  let eventStartTime = new Date(event.event_date_start).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let eventEndTime = new Date(event.event_date_end).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const deleteEvent = () => {
    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_EVENT', payload: { event_id: event.id } });
  }

  const setIsNewToFalse = () => {
    setIsNew(false);
    props.onSetIsNewFalse();
  }

  return (
    <>
      {   editMode // --- if we're currently editing the event ----
        ? <EditEvent onExit={ ()=>setEditMode(false) }/>
        : // --- if we're NOT currently editing the event ----
          <>
            <p><b>Event Title:</b> {event.event_name}</p>
            <p><b>Start Date and Time:</b> {eventStartTime}</p>
            <p><b>End Date and Time:</b> {eventEndTime}</p>
            <p><b>Proctor ID:</b> {event.proctor_id}</p>
          </> 
      }

      {   event.status === "UPCOMING" && !editMode
        ? 
          <>
            <Button variant="contained" color="primary" onClick={()=>{setEditMode(true)}}>Edit Event</Button>
              <br /><br />
            <Link to="/events-all">
              <Button variant="outlined" color="primary" onClick={deleteEvent}>Delete Event</Button>
            </Link>
              <br /><br />
          </>
        : <></>

      }

      {   isNew 
        ? <EventCreate
            onSetIsNewFalse={setIsNewToFalse}
          /> 
        : <></> 
      }
    </>
  );
}

export default EventDetailsTab;
