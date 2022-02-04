import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function EventItem(props) {
  //this is one event item which is displayed in the .map of eventList

  const event = props.event;

  const dispatch = useDispatch();

  const store = useSelector((store) => store);
  const selectedEvent = useSelector(store => store.event.selected);

  const setSelectedEvent = (_event) => {
    console.log('clicked edit event');
    dispatch({ type: 'SET_SELECTED_EVENT', payload: _event });
  }
  let eventCreateDate = new Date(event.create_date).toLocaleDateString( 'en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
  });
  let eventStartTime = new Date(event.event_date_start).toLocaleDateString( 'en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  let eventEndTime = new Date(event.event_date_end).toLocaleDateString( 'en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div>
      <h2>Event: {event.event_name}</h2>
      <p>URL: {event.url}</p>
      <p>Status: {event.status}</p> 
      <p>Start Date: {eventStartTime}</p>
      <p>End Date: {eventEndTime}</p>
      {/* <p>event stringified: {JSON.stringify(event)}</p> */}

      <Link to="/event" onClick={() => setSelectedEvent(event)}>
        {/* when the view button is clicked, this will move user to the /event page, and set the selectedEvent to this one */}
        <Button variant="contained" color="primary">View Event</Button>
      </Link>

      {/* {
        event.status==="UPCOMING"
        ? <Link to="/event" onClick={() => setSelectedEvent(event)}>
            <Button variant="contained" color="secondary">View (upcoming) Event</Button>
          </Link>
        : <></>
      }
      {
        event.status==="IN PROGRESS"
        ? <Link to="/event" onClick={() => setSelectedEvent(event)}>

            <button>Enter (in progress) Event</button>
          </Link>
        : <></>
      }
      {
        event.status==="COMPLETE"
        ? <Link to="/event" onClick={() => setSelectedEvent(event)}>

            <button>View (completed) Event Results</button>
          </Link>
        : <></>
      } */}
     
    </div>
  );
}

export default EventItem;