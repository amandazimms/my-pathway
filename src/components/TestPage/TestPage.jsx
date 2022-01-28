import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';
import TestSettings from '../TestSettings/TestSettings';
import QuestionList from '../QuestionList/QuestionList';

function TestPage(props) {
  //This is the page a proctor is brought to upon clicking "add test" or "edit test";
  //if we arrive here by clicking "add" a new test, props.new will be true (see app.jsx, routes).
  //if we arrive by clicking "edit" an existing test, props.new will be false.
  //use isNew to conditionally render things! 

  //are we pushing to master?
  const isNew = props.new; 

  

  return (
    <div>
      < TestSettings />
      < QuestionList /> 

    </div>
  );
}

export default TestPage;
