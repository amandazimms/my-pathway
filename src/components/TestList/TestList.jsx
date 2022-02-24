import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestCard from '../TestCard/TestCard'
import { Button } from '@material-ui/core';
import Container from '@mui/material/Container';
import '../TestList/TestList.css'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


function TestList(props) {
  /*
    Displays list of tests to proctor - these tests are TestCards
  */

  const tests = useSelector(store => store.test.all);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_TESTS' }); 
  }, []);
  


  return (
    <div>
      <div>

        <div className="addNewTest">
        <Box sx={{flexGrow: 1}}>
      
          <h2>
            <div className="newButtonContainer">
              <Link to="/test-new">
              <button className="addButton">
                + Add New Test 
              </button>
              </Link>
            </div>
          </h2>

        </Box>
      </div>

      <Container>
        <div className="heading">
        <h2 className="heading">RECENT TESTS</h2>
        </div>

        <div className="testCardContainer">
        
        {tests.map(test => (
          <TestCard test={test} key={test.id}/>
        ))}
        
        </div>
      </Container>

    </div>
    </div>
  );
}

export default TestList;
