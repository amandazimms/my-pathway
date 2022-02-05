import { Button } from '@mui/material';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 

function EventRegisterStudents(props) {

  const user = useSelector(store => store.user);
  const searchResults = useSelector(store => store.allUsers.searchedStudents);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState(props.text || '');

  const doSearch = (event) => {
    dispatch({ type:'SEARCH_FOR_STUDENTS', payload: {search_text: event.target.value} });
  }

  return (
    <div>
      <p>Register Student to Event:</p>
      <input type="text" placeholder="Enter student to search for" onChange={ (event) => doSearch(event) }></input>
      <p>Here's the results stringified: {JSON.stringify(searchResults)}</p>
    </div>
  );
}

export default EventRegisterStudents;
