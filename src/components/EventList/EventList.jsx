import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import EventItem from '../EventItem/EventItem';


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
      <h2>Here is all the events!</h2>

      <p>all events stringified: {JSON.stringify(events)}</p>
      {events.map(event => (
        <EventItem event={event} key={event.id}/>
      ))}

      <Link to="/event-new">
        <button>Add a New Event</button>
      </Link>

    </div>
  );
}

export default EventList;
