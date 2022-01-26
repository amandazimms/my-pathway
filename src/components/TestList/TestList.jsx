import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';


function TestList(props) {

  // const tests = useSelector(store => store.test.all);
  const tests = ["fakeTest1", "fakeTest2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_TESTS' }); 
  }, []);
  

  return (
    <div>
      <h2>Here's all the tests</h2>
      <p>all tests stringified: {JSON.stringify(tests)}</p>

      {tests.map(test => (
        // <TestItem test={test} key={test.id}/>
        <TestItem test={test}/>
      ))}

      <Link to="/test-new">
        <button>Add a New Test</button>
      </Link>

    </div>
  );
}

export default TestList;
