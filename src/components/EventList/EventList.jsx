import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import EventItem from '../EventItem/EventItem';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; 
import '../EventList/EventList.css'; 


function EventList(props) {
  //this is a page that displays all events; it's wireframe "Proctor View - Events" from figma
  const events = useSelector(store => store.event.all);
  const dispatch = useDispatch();
  let history = useHistory()


  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENTS' }); 
  }, []);


  const setSelectedEvent = (event) => {
    dispatch({ type: 'SET_SELECTED_EVENT', payload: event });
    history.push('/event')
  }
  
  const unsetSelectedEvent = () => {
    dispatch({ type: 'UNSET_SELECTED_EVENT' });
  }

  return (
    <div>
        <Link to="/event-new">
          <Button variant="contained" color="secondary" onClick={unsetSelectedEvent}>Add a New Event</Button>
        </Link>
      <br />
      <br />
      <h2 className="heading">EVENTS</h2>
      
      <Box display="flex"
      justifyContent="center">
      <TableContainer sx={{ minWidth: 500, maxWidth: 1000 }} component={Paper} >
      <Table sx={{ minWidth: 500, maxWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>EVENT NAME</TableCell>
            <TableCell align="left">STATUS</TableCell>
            <TableCell align="left">DATE</TableCell>
            <TableCell align="left">START TIME</TableCell>
            <TableCell align="center">END TIME</TableCell>
            <TableCell align="center">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {event.event_name}
              </TableCell>
              <TableCell align="left">{event.status}</TableCell>
              <TableCell align="left">{new Date(event.event_date_start).toLocaleDateString([], {month: 'long', year: 'numeric', day: 'numeric'})}</TableCell>
              <TableCell align="left">{new Date(event.event_date_start).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</TableCell>
              <TableCell align="left">{new Date(event.event_date_end).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</TableCell>
              <TableCell align="center">
                {event.status === 'UPCOMING'?
                <Button variant="contained" onClick={() => setSelectedEvent(event)} >View Event</Button>:
                <></>
                }
                {event.status === 'IN PROGRESS'?
                <Button variant="contained" onClick={() => setSelectedEvent(event)}>Enter Event</Button>:
                <></>
                }
                {event.status === 'COMPLETE'?
                <Button variant="contained" onClick={() => setSelectedEvent(event)}>View Results</Button>:
                <></>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  
</div>
  );
}

export default EventList;
