import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';
import { Button } from '@material-ui/core';
import Container from '@mui/material/Container';
import '../TestList/TestList.css'; 


function TestList(props) {

  const tests = useSelector(store => store.test.all);
  // const tests = ["fakeTest1", "fakeTest2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_TESTS' }); 
  }, []);
  

  return (
    <div>
      {/* <h2>Here's all the tests</h2> */}
      {/* <p>all tests stringified: {JSON.stringify(tests)}</p> */}
      
      <div className="testListContainer">

        <div className="addNewTest">
        <Container>
          <h2>
            <div className="newButtonContainer">
              <button className="addButton">
                + Add New Test 
              </button>
            </div>
          </h2>
        </Container>
      </div>

      <Container>
        <div className="heading">
        <h2 fontFamily="Helvetica-Neue-Light">Recent Tests</h2>
        </div>

        <div className="testCardContainer">
        {tests.map(test => (
        <TestItem test={test} key={test.id}/>
      ))}
        </div>
      </Container>


      {/* <div className="cards">
        <h2>Recent Tests</h2>
      {tests.map(test => (
        <TestItem test={test} key={test.id}/>
      ))}
      </div> */}

    </div>
    </div>
  );
}

export default TestList;
