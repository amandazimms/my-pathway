import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';
import TestSettings from '../TestSettings/TestSettings';
import QuestionList from '../QuestionList/QuestionList';

function TestPage(props) {

  

  return (
    <div>
      < TestSettings />
      < QuestionList /> 

    </div>
  );
}

export default TestPage;
