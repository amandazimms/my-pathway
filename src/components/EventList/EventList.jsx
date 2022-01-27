import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {useSelector} from 'react-redux';
import EventItem from '../EventItem/EventItem';


function EventList(props) 
  // const events = useSelector(store => store.events.all);
  const events = ["fakeEvent1", "fakeEvent2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENTS' }); 
  }, []);

  return (
    <div>
      <h2>Here is all the events!</h2>

      <p>all events stringified: {JSON.stringify(events)}</p>

      {events.map(event => (
        // <EventItem event={event} key={event.id}/>
        <EventItem event={event}/>
      ))}

      <Link to="/event-new">
        <button>Add a New Event</button>
      </Link>

    </div>
  );
}

export default EventList;
