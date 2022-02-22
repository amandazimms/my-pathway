import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import EventRegisterStudents from '../EventRegisterStudents/EventRegisterStudents';
import ExamTable from '../ExamTable/ExamTable';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EventCreate from '../EventCreate/EventCreate';
import EventStudentsTab from '../EventStudentsTab/EventStudentsTab';
import EventDetailsTab from '../EventDetailsTab/EventDetailsTab';


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

  const [isNew, setIsNew] = useState(props.new)
  const [showRegistration, setShowRegistration] = useState(false);
  // const [selectedTab, setSelectedTab] = useState('1');

  const dispatch = useDispatch();

  const setDefaultTab = () => {
    if (!event.status) { //if this value is falsy, it's a not-yet-created event
      return '1';
    }
    else if (event.status === "UPCOMING") {
      return '1';
    } 
    else {
      return '2';
    }
  }
  const [selectedTab, setSelectedTab] = useState( ()=>setDefaultTab() );


  let eventStartTime = new Date(event.event_date_start).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      {/* <p>Event: {JSON.stringify(event)}</p> */}
      {   isNew 
        ? <></>
        : <h2 className="heading">{event.event_name}: {eventStartTime}</h2>
      }
      <Box sx={{width: '100%', typography: 'body1'}}> 
        <TabContext value={selectedTab} centered textColor="secondary" indicatorColor="secondary">
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleTabChange} centered>
              <Tab label="Details" value="1" /> 
              <Tab label="Students" value="2" disabled={isNew}/> 
            </TabList>
          </Box>

          {/* --- DETAILS TAB --- */}
          <TabPanel value="1"> 
            <EventDetailsTab
              event={event}
              isNew={isNew}
              onSetIsNewFalse={()=>setIsNew(false)}
            />
          </TabPanel>

          {/* --- STUDENTS TAB --- */}
          <TabPanel value="2">
            <EventStudentsTab
              event={event}
              isNew={isNew}
            />
          </TabPanel>
         
        </TabContext>
      </Box>
      
    </div>
  );
}

export default EventPage;
