import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


function EventItem(props) {
  //this is one event item which is displayed in the .map of eventList

  const store = useSelector((store) => store);
  const selectedEvent = useSelector(store => store.event.selected);

  const [event, setEvent] = useState(props.event);

  const dispatch = useDispatch();

  const setSelectedEvent = (_event) => {
    console.log('clicked edit event');
    dispatch({ type: 'SET_SELECTED_EVENT', payload: _event });
  }

  return (
    <div>
      <h2>Event: {event.name}</h2>
      <p>Status: {event.status}</p>
      <p>Date: {event.date}</p>

      {
        event.status==="upcoming"
        ? <Link to="/event" onClick={() => setSelectedEvent(event)}>
            {/* when the view button is clicked, this will move user to the /event page, and set the selectedEvent to this one */}
            <button>View (upcoming) Event</button>
          </Link>
        : <></>
      }
      {
        event.status==="inProgress"
        ? <Link to="/event" onClick={() => setSelectedEvent(event)}>
            {/* when the enter button is clicked, this will move user to the /event page, and set the selectedEvent to this one */}
            <button>Enter (in progress) Event</button>
          </Link>
        : <></>
      }
      {
        event.status==="completed"
        ? <Link to="/event" onClick={() => setSelectedEvent(event)}>
            {/* when the view button is clicked, this will move user to the /event page, and set the selectedEvent to this one */}
            <button>View (completed) Event Results</button>
          </Link>
        : <></>
      }
     
    </div>
  );
}

export default EventItem;
