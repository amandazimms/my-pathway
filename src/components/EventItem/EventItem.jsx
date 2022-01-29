import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


function EventItem(props) {

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
      <h2>I'm an event</h2>
      <p>stringified event:{JSON.stringify(event)}</p>

      <Link to="/event" onClick={() => setSelectedEvent(event)}>
        {/* when the edit button is clicked, this will move user to the /event page, and set the selectedEvent to this one */}
        <button>Edit this event</button>
      </Link>
    </div>
  );
}

export default EventItem;
