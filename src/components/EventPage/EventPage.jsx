import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function EventPage(props) {
  //This is the page a proctor is brought to upon clicking "add event" or "edit event";
  //if we arrive here by clicking "add" a new event, props.new will be true (see app.jsx, routes).
  //if we arrive by clicking "edit" an existing event, props.new will be false.
  //use isNew to conditionally render things! 
  const isNew = props.new; 

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const event = useSelector(store => store.event.selected);

  const dispatch = useDispatch();

  //proctor inputs
  //const [title, setTitle] = useState('');
  
  const addEvent = () => {
    //this function should run when user(proctor) has FINISHED entering all of the settings for a event, 
    //and then clicks "Create event"
    console.log('in add event');
   
    let newEvent = { 
      //TODO edit these columns
      //@Jackie or @Amanda todo: fill in this commented block with actual input values from DOM. 
      //  event_name: ,
      //  test_id: ,
      //  proctor_id: ,
      //  event_date: , 
      //  event_time: ,
      //  event_end_time: ,
      //  url: ,

      // (will later add create_date, last_modified_date, last_modified_by in the router)
       created_by: user.id, //this is the proctor's id, should be already there in the store 
     } 
    dispatch({ type: 'ADD_EVENT', payload: { event: newEvent } ); 
  }; 

  const updateEvent = () => {
    console.log('in update event');

    let updatedEvent = { 
      //@Amanda todo: fill in this commented block with actual input values from DOM. 
      //for update we could have the form auto populate each field with the existing choice
      //then it would work the same as add?
      //  event_name: ,
      //  test_id: ,
      //  proctor_id: ,
      //  event_date: , 
      //  event_time: ,
      //  event_end_time: ,
      //  url: ,
      // (will later add last_modified_date in the router)
      
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: event.id, //this is also in store already
    } 
    dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } }); 
  }

  const deleteEvent = () => {
    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_EVENT', payload: { event_id: event.id } }); 
  }


  return (
    <div>
      <h2>Event</h2>
      { isNew
          // if we arrived at this page via "add event..."
        ? <button onClick={addEvent}>Create Event</button>
        
          // else (if we arrived at this page via "edit (existing) event")
        : <>
            <button onClick={updateEvent}>Save Event</button>

            {/* @Jackie or @Amanda todo - delete button may not make the most sense here */}
            <button onClick={deleteEvent}>Delete Event</button>
          </>
      }

    </div>
  );
}

export default EventPage;
