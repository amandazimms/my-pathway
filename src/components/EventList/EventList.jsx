import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import EventItem from '../EventItem/EventItem';
import { Button } from '@mui/material';


function EventList(props) {
  //this is a page that displays all events; it's wireframe "Proctor View - Events" from figma
  const events = useSelector(store => store.event.all);

  // const events = [
  //   {name: "fakeEvent1", status: "upcoming", date: '2487'},
  //   {name: "fakeEvent2", status: "inProgress", date: '2022'},
  //   {name: "fakeEvent3", status: "completed", date: '1999'},
  // ]
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENTS' }); 
  }, []);

  return (
    <div>
        <Link to="/event-new">
        <Button variant="contained" color="secondary">Add a New Event</Button>
      </Link>
      <br />
      <br />
      <h2>Here are all the events!</h2>

      {/* <p>all events stringified: {JSON.stringify(events)}</p> */}
      {events.map(event => (
        <EventItem event={event} key={event.id}/>
      ))}

    

    </div>
  );
}

export default EventList;
