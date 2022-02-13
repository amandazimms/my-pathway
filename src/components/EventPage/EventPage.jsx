import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import EditEvent from '../EditEvent/EditEvent'
import EventRegisterStudents from '../EventRegisterStudents/EventRegisterStudents';
import ExamTable from '../ExamTable/ExamTable';
import AboutPage from '../AboutPage/AboutPage';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EventCreate from '../EventCreate/EventCreate';


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


  const [editEvent, setEditEvent] = useState(false)
  const [isNew, setIsNew] = useState(props.new)
  const [showRegistration, setShowRegistration] = useState(false);
  const [value, setValue] = React.useState('1');

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
    if (!isNew){
      dispatch({
        type: "FETCH_EVENT_EXAMS",
        payload:{
          event_id:store.event.selected.id
        }
      })
    } 
  }, [])


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteEvent = () => {
    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_EVENT', payload: { event_id: event.id } });
  }

  const unregisterStudent = (student) => {
    dispatch({ type:'UNREGISTER_STUDENT_TO_EVENT', 
      payload: {exam_id: student.exam_id, event_id: event.id} });
  }
  
  const setSelectedExam = (exam) => {
    dispatch({ type: 'FETCH_SELECTED_EXAM', payload: {exam_id: exam.exam_id} }); 
  }

  return (
    <div>
      
      {isNew ?
      // ==== NEW EVENT (arrived here via clicking "add new event" button) ========
        <div>
          <EventCreate/>
        </div> 
        :
       // ==== EXISTING EVENT  ============================================
        <div>
            <h3>This event is {event.status}!</h3>
            {
              editEvent 
              ?
              // --- are we currently editing the event? ----
              <>
                <EditEvent complete={() => { setEditEvent(false) }} />
                <br />
                <Button variant="contained" color="primary" onClick={() => { setEditEvent(false) }}>Cancel Changes</Button>
              </> 
              :
              // --- are we NOT currently editing the event? ----
              <>
                <p><b>Event Title:</b> {store.event.selected.event_name}</p>
              
                <p><b>Start Date and Time:</b> {eventStartTime}</p>
               
                <p><b>End Date and Time:</b> {eventEndTime}</p>
             
             </> 
            }
        </div>   
      }
      
      { event.status === "UPCOMING" 
      //=== UPCOMING EVENT ========================================
        ? <>
            {
                <Box sx={{width: '100%', typography: 'body1'}}> 
                <TabContext value={value} centered textColor="secondary" indicatorColor="secondary">
                  <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleTabChange} centered>
                      <Tab label="Event Settings" value="1" /> 
                      <Tab label="Event Registration" value="2" disabled={isNew}/> 
                    </TabList>
                  </Box>
            
               <>
                {/* --- REGISTRATION TAB --- */}
                <TabPanel value="2">
                  <EventRegisterStudents/> 
                  <div className="a100pxSpacer"></div>
                  <h3 className="heading">REGISTERED STUDENTS</h3>
                  <ExamTable 
                    mode={event.status} 
                    rows={exams} 
                    onUnregisterStudent={ (student)=>unregisterStudent(student)}
                    onSetSelectedExam={ (exam)=>setSelectedExam(exam) }
                  />
                  
                  </TabPanel>
                </>
               <>
                 {/* --- SETTINGS TAB --- */}
                  <TabPanel value="1"> 
                  <Button variant="contained" color="primary" onClick={() => { setEditEvent(true) }}>Update Event</Button>
                  <br />
                  <br />
                  <Button variant="contained" color="primary" onClick={deleteEvent}>Delete Event</Button>
                  <br />
                  <br />
                  </TabPanel>
                </> 
                </TabContext>
                </Box>
            }
          </>
        : 
        <></> 
      }
    </div>
  );
}

export default EventPage;
