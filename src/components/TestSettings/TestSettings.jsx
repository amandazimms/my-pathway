import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button'; 
import '../TestSettings/TestSettings.css'; 
import {Link} from 'react-router-dom'; 
import Grid from '@mui/material/Grid'; 
import TestCreate from '../TestCreate/TestCreate';
import TestEdit from '../TestEdit/TestEdit';
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';

function TestSettings(props) {
  //This is the page a proctor is brought to upon clicking "add test" or "edit test";
  //if we arrive here by clicking "add" a new test, props.new will be true (see app.jsx, routes).
  //if we arrive by clicking "edit" an existing test, props.new will be false.
  //use isNew to conditionally render things! 
  
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);

  const dispatch = useDispatch();
  
  const [isNew, setIsNew]=useState(props.isNew);
  const [newTest, setNewTest] = useState({
    title: "",
    points_possible: "",
    test_time_limit: "",
    question_shuffle: "",
    test_attempt_limit: "", 
    created_by: user.id, 
  })

  const deleteTest = () => {
    dispatch({ type: 'DELETE_TEST', payload: { test_id: test.id } }); 
  }

  const createTest = () => {
    setIsNew(false);
    props.onClickCreate();
  }

  return (
    <div> 
   { isNew 
      ? 
        <>
          <TestCreate 
            onClickCreate={ ()=>createTest() }
          /> 
        </> 
      : <>
          <TestEdit /> 

          <Grid container
            alignItems="center"
            justifyContent="center" > 
            <Grid item> 

            <AreYouSureButton
              beginningText={"Delete Test"}
              areYouSureText={"Delete this test and all questions in it?"}
              onButtonClick={deleteTest}
              beginningVariant={"outlined"}
              areYouSureVariant={"contained"}
              linkPath={"/tests-all"}
            />

            </Grid> 
          </Grid> 
        </> 
    }
    </div> 
  );
}

export default TestSettings;

